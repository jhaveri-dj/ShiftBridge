import { FileText, ClipboardList, Users, Percent, Timer } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { DownloadReportButton } from "@/components/download-report-button";
import { reports } from "@/data/reports";
import { hospitalMetrics } from "@/data/metrics";

export default function ReportsPage() {
  return (
    <AppShell breadcrumbs={[{ label: "Reports" }]}>
      <PageHeader
        title="Reports"
        subtitle="Staffing performance and competency coverage reporting across units."
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard
          label="Open staffing gaps"
          value={String(hospitalMetrics.openStaffingGaps)}
          icon={ClipboardList}
          level="critical"
        />
        <MetricCard
          label="Available qualified nurses"
          value={String(hospitalMetrics.availableQualifiedNurses)}
          sublabel="Fewer than open gaps"
          icon={Users}
          level="warning"
        />
        <MetricCard label="Fill rate" value={hospitalMetrics.fillRate} icon={Percent} />
        <MetricCard label="Avg time to fill" value={hospitalMetrics.avgTimeToFill} icon={Timer} />
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        {reports.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center justify-between gap-4 px-6 py-4 ${
              i !== reports.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.description}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden text-right text-xs text-muted-foreground sm:block">
                <p>{r.cadence}</p>
                <p>Last generated {r.lastGenerated}</p>
              </div>
              <DownloadReportButton reportName={r.name} />
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
