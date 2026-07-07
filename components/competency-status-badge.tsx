import { CheckCircle2, AlertTriangle, XCircle, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CompetencyStatus } from "@/data/types";

type BadgeKind = CompetencyStatus | "optional";

const META: Record<
  BadgeKind,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  current: {
    label: "Current",
    className: "bg-good-bg text-good border-good/20",
    icon: CheckCircle2,
  },
  refresher: {
    label: "Refresher recommended",
    className: "bg-warning-bg text-warning border-warning/20",
    icon: AlertTriangle,
  },
  "not-eligible": {
    label: "Blocks assignment",
    className: "bg-critical-bg text-critical border-critical/20",
    icon: XCircle,
  },
  optional: {
    label: "Not required",
    className: "bg-muted text-muted-foreground border-border",
    icon: Minus,
  },
};

export function CompetencyStatusBadge({
  status,
  optional = false,
  className,
}: {
  status: CompetencyStatus;
  optional?: boolean;
  className?: string;
}) {
  const kind: BadgeKind = optional && status === "current" ? "optional" : status;
  const meta = META[kind];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        meta.className,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}
