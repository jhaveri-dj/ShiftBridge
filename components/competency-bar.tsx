import { cn } from "@/lib/utils";
import type { CompetencyStatus } from "@/data/types";
import { competencyLabel } from "@/lib/eligibility";

const STATUS_META: Record<
  CompetencyStatus,
  { bar: string; text: string; defaultLevel: number }
> = {
  current: { bar: "bg-good", text: "text-good", defaultLevel: 90 },
  refresher: { bar: "bg-warning", text: "text-warning", defaultLevel: 55 },
  "not-eligible": { bar: "bg-critical", text: "text-critical", defaultLevel: 25 },
};

export function CompetencyBar({
  name,
  status,
  level,
  required = false,
  recency,
  source,
}: {
  name: string;
  status: CompetencyStatus;
  level?: number;
  required?: boolean;
  recency?: string | null;
  source?: string;
}) {
  const meta = STATUS_META[status];
  const pct = level ?? meta.defaultLevel;
  const label = competencyLabel({ name, status, category: "Clinical Care" }, required);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span className={cn("text-xs font-medium", meta.text)}>
          {label}
          {status === "current" && recency && (
            <span className="font-normal text-muted-foreground">
              {" "}
              — last verified {recency}
              {source && ` · Source: ${source}`}
            </span>
          )}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", meta.bar)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
