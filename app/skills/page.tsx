import { AppShell, PageHeader } from "@/components/app-shell";
import { FilterSelect } from "@/components/skill-select";
import { CompetencyBar } from "@/components/competency-bar";
import { MatchScorePill } from "@/components/match-score-card";
import { EligibilityVerdictLine } from "@/components/eligibility-verdict";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nurses } from "@/data/nurses";
import { cn } from "@/lib/utils";
import type { CompetencyStatus } from "@/data/types";
import {
  computeEligibility,
  sortRequiredCompetencies,
  extractRecency,
  REQUIRED_FOR_ORTHO,
  competencyLabel,
} from "@/lib/eligibility";

const COMPARISON_COMPETENCIES = [
  "Post-op ortho care",
  "Wound care",
  "Falls prevention",
  "VTE prophylaxis",
  "Epic documentation",
];

const STATUS_CLASS: Record<CompetencyStatus, string> = {
  current: "text-good",
  refresher: "text-warning",
  "not-eligible": "text-critical",
};

export default function SkillsPage() {
  return (
    <AppShell breadcrumbs={[{ label: "Skills Repository" }]}>
      <PageHeader
        title="Skills Repository"
        subtitle="Competency readiness across units, roles, and redeployment pathways."
      />

      <div className="mb-6 flex flex-wrap gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <FilterSelect label="Unit" options={["All units", "Orthopedics 7W", "Medicine 4E", "ICU", "Post-Acute / Rehab"]} />
        <FilterSelect label="Role" options={["All roles", "Staff RN", "Float Pool RN", "Charge RN"]} />
        <FilterSelect label="Shift" options={["All shifts", "Day", "Night"]} />
        <FilterSelect label="Requirement type" options={["All requirements", "Required", "Preferred"]} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {nurses.map((nurse) => {
          const verdict = computeEligibility(nurse);
          const requiredComps = sortRequiredCompetencies(nurse.competencies);
          const otherComps = nurse.competencies.filter(
            (c) => !REQUIRED_FOR_ORTHO.includes(c.name),
          );
          const recency = extractRecency(nurse.lastRelevantShift);

          return (
            <div key={nurse.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{nurse.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {nurse.role} · {nurse.homeUnit}
                  </p>
                </div>
                {nurse.matchScore && <MatchScorePill score={nurse.matchScore} />}
              </div>

              <EligibilityVerdictLine verdict={verdict} className="mb-4" />

              <div className="space-y-2.5">
                {requiredComps.map((c) => (
                  <CompetencyBar
                    key={c.name}
                    name={c.name}
                    status={c.status}
                    level={c.level}
                    required
                    recency={c.status === "current" ? recency : undefined}
                  />
                ))}
              </div>

              {otherComps.length > 0 && (
                <>
                  <p className="mb-2 mt-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Other / growth competencies
                  </p>
                  <div className="space-y-2.5">
                    {otherComps.map((c) => (
                      <CompetencyBar key={c.name} name={c.name} status={c.status} level={c.level} />
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mb-6 overflow-x-auto rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Nurse comparison — Orthopedics 7W competencies
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nurse</TableHead>
              {COMPARISON_COMPETENCIES.map((c) => (
                <TableHead key={c}>{c}</TableHead>
              ))}
              <TableHead>Match score</TableHead>
              <TableHead>Training gap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nurses.map((nurse) => {
              const gapCount = nurse.competencies.filter((c) => c.status !== "current").length;
              return (
                <TableRow key={nurse.id}>
                  <TableCell className="font-medium text-foreground">{nurse.name}</TableCell>
                  {COMPARISON_COMPETENCIES.map((name) => {
                    const comp = nurse.competencies.find((c) => c.name === name);
                    return (
                      <TableCell
                        key={name}
                        className={cn(
                          "whitespace-nowrap",
                          comp ? STATUS_CLASS[comp.status] : "text-muted-foreground",
                        )}
                      >
                        {comp ? competencyLabel(comp, true) : "—"}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    {nurse.matchScore ? <MatchScorePill score={nurse.matchScore} /> : "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {gapCount === 0 ? "None" : `${gapCount} competenc${gapCount === 1 ? "y" : "ies"}`}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Training recommendations
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {nurses.map((nurse) => {
            const gaps = nurse.competencies.filter((c) => c.status !== "current");
            return (
              <div key={nurse.id} className="rounded-xl bg-muted/60 p-4">
                <p className="text-sm font-semibold text-foreground">{nurse.name}</p>
                <ul className="mt-2 space-y-1.5">
                  {gaps.length === 0 ? (
                    <li className="text-sm text-muted-foreground">
                      No outstanding training gaps — fully current on all tracked competencies.
                    </li>
                  ) : (
                    gaps.slice(0, 3).map((g) => (
                      <li key={g.name} className="text-sm text-muted-foreground">
                        Recommend a{" "}
                        <span className="font-medium text-foreground">{g.name}</span>{" "}
                        {g.status === "not-eligible" ? "certification pathway" : "refresher module"}{" "}
                        before next redeployment.
                      </li>
                    ))
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
