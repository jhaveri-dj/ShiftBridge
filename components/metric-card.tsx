import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { StatusLevel } from "@/data/types";

const ACCENT: Record<StatusLevel, string> = {
  good: "text-good bg-good-bg",
  warning: "text-warning bg-warning-bg",
  critical: "text-critical bg-critical-bg",
};

export function MetricCard({
  label,
  value,
  sublabel,
  icon: Icon,
  level,
}: {
  label: string;
  value: string;
  sublabel?: string;
  icon: LucideIcon;
  level?: StatusLevel;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            level ? ACCENT[level] : "bg-accent text-accent-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      {sublabel && (
        <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p>
      )}
    </div>
  );
}
