import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Nurse } from "@/data/types";
import { StatusBadge, statusLevelFromRisk } from "@/components/status-badge";
import { MatchScorePill } from "@/components/match-score-card";
import { Button } from "@/components/ui/button";

export function NurseCard({ nurse }: { nurse: Nurse }) {
  const initials = nurse.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold leading-tight text-foreground">
              {nurse.name}
            </h3>
            <p className="text-sm leading-snug text-muted-foreground">{nurse.role}</p>
          </div>
        </div>
        {nurse.matchScore && <MatchScorePill score={nurse.matchScore} />}
      </div>

      <div className="mt-4 space-y-1.5 text-sm">
        <p className="text-muted-foreground">
          Home unit: <span className="text-foreground">{nurse.homeUnit}</span>
        </p>
        <p className="text-muted-foreground">
          Availability: <span className="text-foreground">{nurse.availability}</span>
        </p>
      </div>

      <div className="mt-3 flex min-h-7 flex-wrap items-center gap-2">
        <StatusBadge
          label={`Overtime risk: ${nurse.overtimeRisk}`}
          level={statusLevelFromRisk(nurse.overtimeRisk)}
        />
        {nurse.floatEligible ? (
          <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium leading-none text-muted-foreground">
            Float eligible
          </span>
        ) : (
          <span className="invisible rounded-full border border-transparent px-2.5 py-1 text-xs leading-none">
            Float eligible
          </span>
        )}
      </div>

      {nurse.matchReasons.length > 0 && (
        <div className="mt-3 flex min-h-[5.5rem] flex-1 gap-2 rounded-lg bg-muted/60 px-3 py-2.5">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            {nurse.matchReasons[0]}
          </p>
        </div>
      )}

      <div className="mt-auto border-t border-border pt-4">
        <Button
          size="sm"
          className="w-full"
          render={<Link href={`/nurses/${nurse.id}`} />}
          nativeButton={false}
        >
          View profile <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
