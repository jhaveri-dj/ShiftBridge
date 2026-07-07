import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MatchScorePill } from "@/components/match-score-card";
import { EligibilityVerdictLine } from "@/components/eligibility-verdict";
import { computeEligibility } from "@/lib/eligibility";
import { getNurseById } from "@/data/nurses";
import type { MatchRow } from "@/data/types";

export function NurseEligibilityList({ matches }: { matches: MatchRow[] }) {
  return (
    <div className="space-y-3">
      {matches.map((m, i) => {
        const nurse = getNurseById(m.nurseId);
        const verdict = nurse ? computeEligibility(nurse) : null;
        const isTop = i === 0;

        return (
          <div
            key={m.nurseId}
            className={cn(
              "flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between",
              isTop
                ? "border-primary/40 bg-primary/5 ring-1 ring-primary/30"
                : "border-border",
            )}
          >
            <div className="flex items-center gap-3">
              <div>
                {isTop && (
                  <p className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    <Sparkles className="h-3 w-3" /> Top recommendation
                  </p>
                )}
                <p className="text-sm font-semibold text-foreground">{m.nurseName}</p>
                <p className="text-xs text-muted-foreground">
                  {m.homeUnit} · {m.availability}
                </p>
              </div>
              <MatchScorePill score={m.matchScore} />
            </div>

            <div className="flex flex-1 items-center gap-3 sm:justify-end">
              {verdict && <EligibilityVerdictLine verdict={verdict} className="flex-1 sm:flex-none" />}
              <Button
                size="sm"
                variant="outline"
                render={<Link href={`/nurses/${m.nurseId}`} />}
                nativeButton={false}
              >
                View profile
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
