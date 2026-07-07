"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { baseUnitMetrics, occupancyPct } from "@/data/unitMetrics";
import {
  useUnitReports,
  formatUpdatedAgo,
  type UnitReport,
} from "@/lib/unit-reports";

const UNIT_ID = "ortho-7w";

export default function UnitReportPage() {
  const base = baseUnitMetrics.find((m) => m.id === UNIT_ID)!;
  const { reports, ready, saveReport } = useUnitReports();

  const [form, setForm] = useState({
    census: String(base.census),
    discharges: String(base.expectedDischarges),
    admissions: String(base.expectedAdmissions),
    note: "",
  });
  const [prefilled, setPrefilled] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (!ready || prefilled) return;
    const r = reports[UNIT_ID];
    if (r) {
      // Prefill once from any previously submitted report for this unit.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        census: String(r.census),
        discharges: String(r.expectedDischarges),
        admissions: String(r.expectedAdmissions),
        note: r.note,
      });
      setSavedAt(r.updatedAt);
    }
    setPrefilled(true);
  }, [ready, prefilled, reports]);

  const censusNum = Number(form.census) || 0;
  const pct = occupancyPct({ census: censusNum, bedCapacity: base.bedCapacity });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSavedAt(null);
  }

  function submit() {
    const report: UnitReport = {
      unitId: UNIT_ID,
      census: Number(form.census) || 0,
      expectedDischarges: Number(form.discharges) || 0,
      expectedAdmissions: Number(form.admissions) || 0,
      note: form.note.trim(),
      updatedAt: Date.now(),
      reportedBy: "Priya Nair",
    };
    saveReport(report);
    setSavedAt(report.updatedAt);
  }

  return (
    <AppShell breadcrumbs={[{ label: "Unit Report" }]}>
      <PageHeader
        title="Unit Report"
        subtitle="Submit a quick structured update for Orthopedics 7W so the staffing office sees your numbers in real time."
      />

      <div className="mx-auto grid w-full max-w-4xl gap-6 lg:grid-cols-[1fr_300px] lg:items-start">
        {/* Form */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
            <ClipboardCheck className="h-4 w-4 text-primary" /> Current status,
            Orthopedics 7W
          </h2>
          <p className="mb-5 text-xs text-muted-foreground">
            Bed capacity {base.bedCapacity}. Nurses staffed {base.nursesStaffed}.
            Update the fields below and submit.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field
              label="Current census"
              value={form.census}
              onChange={(v) => update("census", v)}
            />
            <Field
              label="Expected discharges today"
              value={form.discharges}
              onChange={(v) => update("discharges", v)}
            />
            <Field
              label="Expected admissions today"
              value={form.admissions}
              onChange={(v) => update("admissions", v)}
            />
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Flagged staffing concerns or notes
            </label>
            <textarea
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              rows={3}
              placeholder="e.g. Two night RNs called out, high post-op acuity, may need a float RN by 7PM."
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              Occupancy at submit:{" "}
              <span className="font-medium text-foreground">
                {pct === null ? "N/A" : `${pct}%`}
              </span>
            </span>
          </div>

          <Button className="mt-4 w-full sm:w-auto" onClick={submit}>
            <CheckCircle2 className="h-4 w-4" /> Submit update to staffing office
          </Button>

          {savedAt && (
            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-good/30 bg-good-bg px-3 py-2.5 text-sm text-good">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">
                  Update submitted, {formatUpdatedAgo(savedAt)}.
                </p>
                <p className="mt-0.5 text-xs">
                  Sarah Mitchell now sees Orthopedics 7W reflected on the Unit
                  Metrics dashboard. No huddle call needed.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Case study framing */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary">
              <Clock className="h-3.5 w-3.5" /> Why this exists
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              Unit managers typically relay these numbers through a twice-daily
              verbal bed-huddle call that runs 30 to 40 minutes each.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This structured update takes about 2 minutes and reaches the
              staffing office instantly, freeing up both manager and staffing
              office time.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-good" /> Time saved
            </div>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              ~60 min/day
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Two 30 to 40 minute huddle calls replaced by two 2 minute updates.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            render={<Link href="/requests/ortho-7w" />}
            nativeButton={false}
          >
            Back to my unit <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </aside>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
