import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { CompetencyBar } from "@/components/competency-bar";
import { EligibilityVerdictLine } from "@/components/eligibility-verdict";
import { SelfReportedSkills } from "@/components/self-reported-skills";
import { Button } from "@/components/ui/button";
import { getNurseById } from "@/data/nurses";
import {
  computeEligibility,
  sortRequiredCompetencies,
  extractRecency,
  REQUIRED_FOR_ORTHO,
} from "@/lib/eligibility";
import type { Competency } from "@/data/types";

/** Verification source shown per competency — presentation-only lookup by
 * category, since the data model doesn't track a source field. */
const SOURCE_BY_CATEGORY: Record<Competency["category"], string> = {
  "Clinical Care": "Credential file",
  Documentation: "LMS",
  "Unit Readiness": "Manager attestation",
  "Professional Practice": "LMS",
};

export default function NurseCompetenciesPage() {
  const alex = getNurseById("alex-chen")!;
  const verdict = computeEligibility(alex);
  const requiredComps = sortRequiredCompetencies(alex.competencies);
  const otherComps = alex.competencies.filter(
    (c) => !REQUIRED_FOR_ORTHO.includes(c.name),
  );
  const recency = extractRecency(alex.lastRelevantShift);
  const refresherComps = alex.competencies.filter(
    (c) => c.status === "refresher",
  );

  return (
    <AppShell breadcrumbs={[{ label: "My Competencies" }]}>
      <PageHeader
        title="My Competencies"
        subtitle="Your current competency readiness, ranked by what needs attention first."
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        {/* MAIN — readiness list */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="mb-4 text-xs text-muted-foreground">
            Required for Orthopedics 7W. Anything marked &ldquo;blocks assignment&rdquo;
            would stop you from taking this shift; refreshers marked
            &ldquo;recommended&rdquo; won&rsquo;t.
          </p>
          <div className="space-y-4">
            {requiredComps.map((c) => (
              <CompetencyBar
                key={c.name}
                name={c.name}
                status={c.status}
                level={c.level}
                required
                recency={c.status === "current" ? recency : undefined}
                source={c.status === "current" ? SOURCE_BY_CATEGORY[c.category] : undefined}
              />
            ))}
          </div>

          {otherComps.length > 0 && (
            <>
              <p className="mb-3 mt-6 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Other / growth competencies
              </p>
              <div className="space-y-4">
                {otherComps.map((c) => (
                  <CompetencyBar
                    key={c.name}
                    name={c.name}
                    status={c.status}
                    level={c.level}
                    recency={c.status === "current" ? recency : undefined}
                    source={c.status === "current" ? SOURCE_BY_CATEGORY[c.category] : undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* SIDE — eligibility, refresher, add skill */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-foreground">
              Eligibility summary
            </h2>
            <EligibilityVerdictLine verdict={verdict} />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Anything marked &ldquo;blocks assignment&rdquo; must be resolved
              before you can be matched to that unit. Refreshers improve your match
              score but never block a shift.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <GraduationCap className="h-4 w-4 text-primary" /> Recommended
              refresher
            </h2>
            {refresherComps.length === 0 ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                You&rsquo;re current on everything required for tonight&rsquo;s offer.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {refresherComps.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                    {c.name}
                  </li>
                ))}
              </ul>
            )}
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full"
              render={<Link href="/nurse/training" />}
              nativeButton={false}
            >
              View training <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <SelfReportedSkills />
        </div>
      </div>
    </AppShell>
  );
}
