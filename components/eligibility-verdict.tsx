import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EligibilityVerdict as Verdict } from "@/lib/eligibility";

const STYLES: Record<Verdict["level"], { wrap: string; icon: typeof CheckCircle2 }> = {
  eligible: { wrap: "bg-good-bg text-good border-good/20", icon: CheckCircle2 },
  conditional: { wrap: "bg-warning-bg text-warning border-warning/20", icon: AlertTriangle },
  blocked: { wrap: "bg-critical-bg text-critical border-critical/20", icon: XCircle },
};

export function EligibilityVerdictLine({
  verdict,
  className,
}: {
  verdict: Verdict;
  className?: string;
}) {
  const { wrap, icon: Icon } = STYLES[verdict.level];
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium",
        wrap,
        className,
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {verdict.label}
    </div>
  );
}
