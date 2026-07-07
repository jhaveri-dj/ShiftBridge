import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { StatusBadge, statusLevelFromFillRisk } from "@/components/status-badge";
import { requests } from "@/data/requests";
import { units } from "@/data/units";

export default function RequestsIndexPage() {
  return (
    <AppShell breadcrumbs={[{ label: "Staffing Requests" }]}>
      <PageHeader
        title="Staffing Requests"
        subtitle="Open requests across units, with AI-ranked nurse matches and approval status."
      />

      <div className="space-y-3">
        {requests.map((req) => {
          const unit = units.find((u) => u.id === req.unitId);
          return (
            <Link
              key={req.id}
              href={`/requests/${req.unitId}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-semibold text-foreground">
                    {req.unitName}
                  </h3>
                  {unit && (
                    <StatusBadge
                      label={unit.statusLabel}
                      level={statusLevelFromFillRisk(req.gapSeverity)}
                    />
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {req.shiftNeed} · {req.qualifiedMatchCount} qualified matches ·
                  Status: {req.status}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary">
                View request <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
