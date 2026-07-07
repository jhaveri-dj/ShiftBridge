import {
  ClipboardList,
  Users,
  Percent,
  Timer,
  TrendingUp,
  Target,
  Search,
  Sparkles,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { UnitCard } from "@/components/unit-card";
import { CollapsibleStats } from "@/components/collapsible-stats";
import { units } from "@/data/units";
import { hospitalMetrics } from "@/data/metrics";
import { Input } from "@/components/ui/input";
import type { Unit } from "@/data/types";

const INSIGHTS = [
  "Orthopedics 7W has the highest unresolved risk due to a 2 RN night gap and high post-op census — prioritize this request first.",
  "Post-Acute / Rehab can release one RN after 9PM if census stays stable, offsetting part of the Orthopedics 7W gap.",
  "ICU remains acuity-restricted with zero redeployable capacity and no open gaps — exclude it from tonight's matching pool.",
  "Two of four Orthopedics 7W matches would require overtime approval — approving Alex Chen first avoids added overtime risk.",
];

const SEVERITY_RANK: Record<Unit["status"], number> = {
  "critical-shortage": 0,
  "at-risk": 1,
  "available-capacity": 2,
  stable: 3,
};

const sortedUnits = [...units].sort(
  (a, b) => SEVERITY_RANK[a.status] - SEVERITY_RANK[b.status],
);

export default function CommandCenterPage() {
  return (
    <AppShell breadcrumbs={[{ label: "Command Center" }]}>
      <PageHeader
        title="Command Center"
        subtitle="Today's staffing picture across units, gaps, and available qualified coverage."
      />

      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          label="Open staffing gaps"
          value={String(hospitalMetrics.openStaffingGaps)}
          icon={ClipboardList}
          level="critical"
        />
        <MetricCard label="Fill rate" value={hospitalMetrics.fillRate} sublabel="Last 7 days" icon={Percent} />
      </div>

      <CollapsibleStats>
        <MetricCard
          label="Available qualified nurses"
          value={String(hospitalMetrics.availableQualifiedNurses)}
          sublabel="Fewer than open gaps"
          icon={Users}
          level="warning"
        />
        <MetricCard label="Avg time to fill" value={hospitalMetrics.avgTimeToFill} icon={Timer} />
        <MetricCard label="Overtime risk" value={hospitalMetrics.overtimeRisk} icon={TrendingUp} level="critical" />
        <MetricCard label="Competency match rate" value={hospitalMetrics.competencyMatchRate} icon={Target} level="warning" />
      </CollapsibleStats>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by unit, shift, competency, or urgency"
              className="h-7 border-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {sortedUnits.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">
              AI Triage Insights
            </h2>
          </div>
          <ul className="space-y-4">
            {INSIGHTS.map((insight, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {insight}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </AppShell>
  );
}
