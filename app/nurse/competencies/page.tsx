import { AppShell, PageHeader } from "@/components/app-shell";
import { CompetencyBar } from "@/components/competency-bar";
import { getNurseById } from "@/data/nurses";
import type { Competency } from "@/data/types";

const CATEGORY_ORDER: Competency["category"][] = [
  "Clinical Care",
  "Documentation",
  "Unit Readiness",
  "Professional Practice",
];

export default function NurseCompetenciesPage() {
  const alex = getNurseById("alex-chen")!;
  const byCategory = CATEGORY_ORDER.map((category) => ({
    category,
    items: alex.competencies.filter((c) => c.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <AppShell breadcrumbs={[{ label: "My Competencies" }]}>
      <PageHeader
        title="My Competencies"
        subtitle="Your current competency readiness across clinical care, documentation, unit readiness, and professional practice."
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-6">
          {byCategory.map((group) => (
            <div key={group.category}>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {group.category}
              </p>
              <div className="space-y-4">
                {group.items.map((c) => (
                  <CompetencyBar
                    key={c.name}
                    name={c.name}
                    status={c.status}
                    level={c.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-foreground">
          Keep your competencies current
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Competencies marked &ldquo;Refresher recommended&rdquo; won&rsquo;t block you
          from a shift, but completing them improves your match score for future
          offers. Check with your professional practice lead about scheduling one.
        </p>
      </div>
    </AppShell>
  );
}
