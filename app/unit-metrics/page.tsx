"use client";

import { Building2, Sparkles, RadioTower } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { cn } from "@/lib/utils";
import {
  baseUnitMetrics,
  baseUnitInsights,
  occupancyPct,
} from "@/data/unitMetrics";
import { useUnitReports, formatUpdatedAgo } from "@/lib/unit-reports";

function occupancyLevel(pct: number | null): "good" | "warning" | "critical" | null {
  if (pct === null) return null;
  if (pct >= 90) return "critical";
  if (pct >= 75) return "warning";
  return "good";
}

const OCC_STYLES: Record<"good" | "warning" | "critical", string> = {
  good: "bg-good-bg text-good border-good/20",
  warning: "bg-warning-bg text-warning border-warning/20",
  critical: "bg-critical-bg text-critical border-critical/20",
};

export default function UnitMetricsPage() {
  const { reports, ready } = useUnitReports();

  const merged = baseUnitMetrics.map((m) => {
    const r = reports[m.id];
    if (!r) return { ...m, reported: false as const };
    return {
      ...m,
      census: r.census,
      expectedDischarges: r.expectedDischarges,
      expectedAdmissions: r.expectedAdmissions,
      note: r.note,
      updatedAt: r.updatedAt,
      reportedBy: r.reportedBy,
      reported: true as const,
    };
  });

  const liveUpdates = merged.filter((m) => m.reported);

  return (
    <AppShell breadcrumbs={[{ label: "Unit Metrics" }]}>
      <PageHeader
        title="Unit Metrics"
        subtitle="Live operational picture per unit: census, occupancy, staffing, and expected patient flow today."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {merged.map((m) => {
            const pct = occupancyPct(m);
            const level = occupancyLevel(pct);
            const bedded = m.bedCapacity > 0;
            const net = m.expectedAdmissions - m.expectedDischarges;
            return (
              <div
                key={m.id}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Building2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {m.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Manager: {m.manager}
                      </p>
                    </div>
                  </div>
                  {level ? (
                    <span
                      className={cn(
                        "shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold",
                        OCC_STYLES[level],
                      )}
                    >
                      {pct}% occupancy
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      Nurse pool
                    </span>
                  )}
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                  <Metric
                    label="Current census"
                    value={
                      bedded ? `${m.census} / ${m.bedCapacity}` : "Not bedded"
                    }
                  />
                  <Metric label="Nurses staffed" value={`${m.nursesStaffed}`} />
                  <Metric
                    label="Expected discharges"
                    value={`${m.expectedDischarges}`}
                  />
                  <Metric
                    label="Expected admissions"
                    value={`${m.expectedAdmissions}`}
                  />
                </dl>

                {bedded && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Projected net change tonight:{" "}
                    <span
                      className={cn(
                        "font-medium",
                        net > 0
                          ? "text-critical"
                          : net < 0
                            ? "text-good"
                            : "text-foreground",
                      )}
                    >
                      {net > 0 ? `+${net}` : net} patients
                    </span>
                  </p>
                )}

                <div className="mt-auto">
                  {m.reported ? (
                    <div className="mt-4 rounded-lg border border-highlight/30 bg-highlight/10 px-3 py-2">
                      <p className="flex items-center gap-1.5 text-xs font-medium text-highlight">
                        <RadioTower className="h-3.5 w-3.5" />
                        Live update from {m.reportedBy}, {formatUpdatedAgo(m.updatedAt)}
                      </p>
                      {m.note && (
                        <p className="mt-1 text-xs leading-relaxed text-foreground">
                          {m.note}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                      Baseline figures. No manager update submitted yet today.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="h-fit space-y-6">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold text-foreground">AI Insights</h2>
            </div>
            <ul className="space-y-4">
              {baseUnitInsights.map((insight, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-highlight/15 text-highlight">
                <RadioTower className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold text-foreground">
                Manager updates
              </h2>
            </div>
            {!ready ? (
              <p className="text-xs text-muted-foreground">Loading updates.</p>
            ) : liveUpdates.length === 0 ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                No live manager updates yet. When a unit manager submits a
                structured update, it replaces the twice-daily verbal bed-huddle
                call and appears here in seconds.
              </p>
            ) : (
              <ul className="space-y-3">
                {liveUpdates.map((m) => (
                  <li key={m.id} className="text-sm leading-relaxed">
                    <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {m.name}, {formatUpdatedAgo(m.updatedAt)}
                    </span>
                    <span className="text-foreground">
                      Census {m.census}, {m.expectedDischarges} discharges and{" "}
                      {m.expectedAdmissions} admissions expected.
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">
        {value}
      </dd>
    </div>
  );
}
