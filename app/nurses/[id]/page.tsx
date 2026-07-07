import { notFound } from "next/navigation";
import {
  Briefcase,
  Building2,
  Calendar,
  MonitorCheck,
  History,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge, statusLevelFromRisk } from "@/components/status-badge";
import { MatchScoreRing } from "@/components/match-score-card";
import { CompetencyBar } from "@/components/competency-bar";
import { RedeploymentChart } from "@/components/redeployment-chart";
import { ChartCard } from "@/components/chart-card";
import { NurseActions } from "@/components/nurse-actions";
import { EligibilityVerdictLine } from "@/components/eligibility-verdict";
import { getNurseById, nurses } from "@/data/nurses";
import {
  computeEligibility,
  sortRequiredCompetencies,
  extractRecency,
  REQUIRED_FOR_ORTHO,
} from "@/lib/eligibility";

export function generateStaticParams() {
  return nurses.map((n) => ({ id: n.id }));
}

export default async function NurseProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const nurse = getNurseById(id);
  if (!nurse) notFound();

  const verdict = computeEligibility(nurse);
  const requiredComps = sortRequiredCompetencies(nurse.competencies);
  const otherComps = nurse.competencies.filter(
    (c) => !REQUIRED_FOR_ORTHO.includes(c.name),
  );
  const recency = extractRecency(nurse.lastRelevantShift);

  return (
    <AppShell
      breadcrumbs={[
        { label: "Nurse Matches", href: "/nurses" },
        { label: nurse.name },
      ]}
    >
      <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-xl font-semibold text-accent-foreground">
              {nurse.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {nurse.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {nurse.role} · {nurse.homeUnit}
              </p>
            </div>
          </div>
          {nurse.matchScore && <MatchScoreRing score={nurse.matchScore} size={84} />}
        </div>

        <EligibilityVerdictLine verdict={verdict} className="mt-5" />

        <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-4">
          {nurse.matchScore && (
            <StatusBadge
              label={`${nurse.matchScore}% match for Orthopedics 7W`}
              level={nurse.matchScore >= 85 ? "good" : nurse.matchScore >= 70 ? "warning" : "critical"}
            />
          )}
          <StatusBadge
            label={nurse.floatEligible ? "Float eligible" : "Not float eligible"}
            level={nurse.floatEligible ? "good" : "warning"}
          />
          <StatusBadge
            label={`Overtime risk: ${nurse.overtimeRisk}`}
            level={statusLevelFromRisk(nurse.overtimeRisk)}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Approval required: {nurse.approvalRequired}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:grid-cols-3 xl:grid-cols-5">
        <ProfileItem icon={Briefcase} label="Role" value={nurse.role} />
        <ProfileItem icon={Building2} label="Home unit" value={nurse.homeUnit} />
        <ProfileItem
          icon={Calendar}
          label="Years experience"
          value={String(nurse.yearsExperience)}
        />
        <ProfileItem
          icon={History}
          label="Last relevant shift"
          value={nurse.lastRelevantShift}
        />
        <ProfileItem icon={MonitorCheck} label="EHR status" value={nurse.ehrStatus} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-foreground">
              Why this nurse is a strong match
            </h2>
            <ul className="space-y-2.5">
              {nurse.matchReasons.map((reason, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold text-foreground">
              Competency readiness
            </h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Required for Orthopedics 7W, ranked by what needs attention first.
            </p>
            <div className="space-y-3">
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
                <p className="mb-2.5 mt-6 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Other / growth competencies
                </p>
                <div className="space-y-3">
                  {otherComps.map((c) => (
                    <CompetencyBar key={c.name} name={c.name} status={c.status} level={c.level} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <ChartCard
            title="Redeployment history"
            subtitle="Last 6 redeployments — unit and outcome rating"
          >
            <RedeploymentChart history={nurse.redeploymentHistory} />
          </ChartCard>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Manager notes</h2>
            <blockquote className="rounded-xl bg-muted/60 p-4 text-sm italic leading-relaxed text-foreground">
              &ldquo;{nurse.managerNote.quote}&rdquo;
            </blockquote>
            <p className="mt-2 text-xs text-muted-foreground">
              — {nurse.managerNote.author}
            </p>
          </div>

          <NurseActions nurse={nurse} />
        </div>
      </div>
    </AppShell>
  );
}

function ProfileItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
