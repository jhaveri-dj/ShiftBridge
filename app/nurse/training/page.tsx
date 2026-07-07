"use client";

import { useState } from "react";
import { GraduationCap, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { getNurseById } from "@/data/nurses";
import { trainingPaths } from "@/data/trainingPaths";

export default function NurseTrainingPage() {
  const alex = getNurseById("alex-chen")!;
  const gapCategories = new Set<string>(
    alex.competencies.filter((c) => c.status !== "current").map((c) => c.category),
  );

  const recommended = trainingPaths.filter((t) => gapCategories.has(t.category));
  const optional = trainingPaths.filter((t) => !recommended.includes(t));

  return (
    <AppShell breadcrumbs={[{ label: "Training" }]}>
      <PageHeader
        title="Training"
        subtitle="Modules that close your current competency gaps and improve future match scores."
      />

      <div className="space-y-5">
        <div>
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Recommended for you
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {recommended.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No recommended modules right now — you&rsquo;re current on everything
                required for tonight&rsquo;s offer.
              </p>
            ) : (
              recommended.map((t) => <TrainingCard key={t.id} module={t} highlighted />)
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Optional / not yet eligible
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {optional.map((t) => (
              <TrainingCard key={t.id} module={t} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function TrainingCard({
  module: t,
  highlighted,
}: {
  module: (typeof trainingPaths)[number];
  highlighted?: boolean;
}) {
  const [started, setStarted] = useState(false);

  return (
    <div
      className={
        highlighted
          ? "rounded-2xl border border-primary/30 bg-primary/5 p-4 shadow-sm"
          : "rounded-2xl border border-border bg-card p-4 shadow-sm"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" /> {t.duration}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-xs text-good">
        <TrendingUp className="h-3.5 w-3.5" /> {t.matchPoolImpact}
      </div>
      <Button
        size="sm"
        variant={started ? "outline" : "default"}
        disabled={started}
        className="mt-4 w-full"
        onClick={() => setStarted(true)}
      >
        {started ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5" /> Refresher started ✓
          </>
        ) : (
          "Start refresher"
        )}
      </Button>
    </div>
  );
}
