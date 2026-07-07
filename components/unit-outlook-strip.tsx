import {
  Bed,
  Users,
  ClipboardCheck,
  AlertTriangle,
  Activity,
  UserPlus,
  UserMinus,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUnitById } from "@/data/units";

/** Synthetic unit-level staffing snapshot — census/RN counts aren't tracked
 * elsewhere in the data model, so these are kept internally consistent with
 * the unit's existing gapCount (required - scheduled = gap). */
const UNIT_OUTLOOK = {
  census: 22,
  requiredRNs: 8,
  scheduledRNs: 6,
  fallsRiskCount: 8,
  expectedAdmissions: 3,
  expectedDischarges: 2,
  postOpDay01Count: 6,
};

export function UnitOutlookStrip() {
  const unit = getUnitById("ortho-7w")!;

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-border shadow-sm">
      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        <OutlookStat icon={Bed} label="Census" value={String(UNIT_OUTLOOK.census)} />
        <OutlookStat
          icon={Users}
          label="Required RNs"
          value={String(UNIT_OUTLOOK.requiredRNs)}
        />
        <OutlookStat
          icon={ClipboardCheck}
          label="Scheduled RNs"
          value={String(UNIT_OUTLOOK.scheduledRNs)}
        />
        <OutlookStat
          icon={AlertTriangle}
          label="Current gap"
          value={String(unit.gapCount)}
          critical
        />
      </div>

      <div className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-5">
        <OutlookStat icon={Activity} label="Acuity" value={unit.acuity} />
        <OutlookStat
          icon={AlertTriangle}
          label="Falls-risk patients"
          value={String(UNIT_OUTLOOK.fallsRiskCount)}
        />
        <OutlookStat
          icon={UserPlus}
          label="Expected admissions"
          value={String(UNIT_OUTLOOK.expectedAdmissions)}
        />
        <OutlookStat
          icon={UserMinus}
          label="Expected discharges"
          value={String(UNIT_OUTLOOK.expectedDischarges)}
        />
        <OutlookStat
          icon={Stethoscope}
          label="Post-op day 0–1"
          value={String(UNIT_OUTLOOK.postOpDay01Count)}
        />
      </div>
    </div>
  );
}

function OutlookStat({
  icon: Icon,
  label,
  value,
  critical,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  critical?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 bg-card px-6 py-3">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          critical ? "bg-critical-bg text-critical" : "bg-accent text-accent-foreground",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
