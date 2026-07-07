import { GraduationCap, Clock, Users, TrendingUp } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { trainingPaths } from "@/data/trainingPaths";

export default function TrainingPage() {
  return (
    <AppShell breadcrumbs={[{ label: "Training Paths" }]}>
      <PageHeader
        title="Training Paths"
        subtitle="Microcredential modules that close near-miss competency gaps and expand the qualified match pool."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {trainingPaths.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="h-4.5 w-4.5" />
              </div>
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                {t.category}
              </span>
            </div>
            <h3 className="mt-3 text-base font-semibold text-foreground">{t.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t.description}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {t.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> {t.eligibleNurseCount} eligible nurses
              </span>
              <span className="col-span-2 flex items-center gap-1.5 text-good">
                <TrendingUp className="h-3.5 w-3.5" /> {t.matchPoolImpact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
