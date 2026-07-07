import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MatchScorePill } from "@/components/match-score-card";
import { EligibilityVerdictLine } from "@/components/eligibility-verdict";
import { computeEligibility } from "@/lib/eligibility";
import { getNurseById } from "@/data/nurses";
import type { MatchRow } from "@/data/types";

export function NurseEligibilityList({ matches }: { matches: MatchRow[] }) {
  return (
    <div className="space-y-3">
      {matches.map((m) => {
        const nurse = getNurseById(m.nurseId);
        const verdict = nurse ? computeEligibility(nurse) : null;

        return (
          <div
            key={m.nurseId}
            className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div>
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
