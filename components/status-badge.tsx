import { cn } from "@/lib/utils";
import type { StatusLevel } from "@/data/types";

const STYLES: Record<StatusLevel, string> = {
  good: "bg-good-bg text-good border-good/20",
  warning: "bg-warning-bg text-warning border-warning/20",
  critical: "bg-critical-bg text-critical border-critical/20",
};

const DOT_STYLES: Record<StatusLevel, string> = {
  good: "bg-good",
  warning: "bg-warning",
  critical: "bg-critical",
};

export function StatusBadge({
  label,
  level,
  className,
}: {
  label: string;
  level: StatusLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        STYLES[level],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT_STYLES[level])} />
      {label}
    </span>
  );
}

export function statusLevelFromRisk(risk: "Low" | "Medium" | "High"): StatusLevel {
  if (risk === "Low") return "good";
  if (risk === "Medium") return "warning";
  return "critical";
}

export function statusLevelFromFillRisk(risk: "low" | "medium" | "high"): StatusLevel {
  if (risk === "low") return "good";
  if (risk === "medium") return "warning";
  return "critical";
}
