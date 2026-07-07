import Link from "next/link";
import { Users, MessageSquare, ArrowRight, CircleDashed } from "lucide-react";
import type { Unit } from "@/data/types";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";

const UNIT_STATUS_LEVEL: Record<Unit["status"], "good" | "warning" | "critical"> = {
  "critical-shortage": "critical",
  "at-risk": "warning",
  stable: "good",
  "available-capacity": "good",
};

export function UnitCard({ unit }: { unit: Unit }) {
  const hasOpenGaps = unit.gapCount > 0;
  const hasSurplusCapacity = !hasOpenGaps && unit.status === "available-capacity";

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">{unit.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{unit.shiftNeed}</p>
        </div>
        <StatusBadge label={unit.statusLabel} level={UNIT_STATUS_LEVEL[unit.status]} />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {unit.requiredCompetencies.slice(0, 4).map((c) => (
          <span
            key={c}
            className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
          >
            {c}
          </span>
        ))}
        {unit.requiredCompetencies.length > 4 && (
          <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            +{unit.requiredCompetencies.length - 4} more
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-muted/60 p-3 text-center">
        <div>
          <p className="text-sm font-semibold text-foreground">{unit.qualifiedMatches}</p>
          <p className="text-[11px] text-muted-foreground">Matches</p>
        </div>
        <div>
          <p className="text-sm font-semibold capitalize text-foreground">
            {unit.fillRisk}
          </p>
          <p className="text-[11px] text-muted-foreground">Fill risk</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{unit.gapCount}</p>
          <p className="text-[11px] text-muted-foreground">Open gaps</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">Manager: {unit.manager}</p>

      {hasOpenGaps ? (
        <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
          <Button
            size="sm"
            className="flex-1"
            render={<Link href={`/requests/${unit.id}`} />}
            nativeButton={false}
          >
            View request <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            render={<Link href="/nurses" />}
            nativeButton={false}
          >
            <Users className="h-3.5 w-3.5" /> Match nurses
          </Button>
          <Button
            size="sm"
            variant="outline"
            render={<Link href="/messages" aria-label="Message" />}
            nativeButton={false}
          >
            <MessageSquare className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : hasSurplusCapacity ? (
        <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
          <Button
            size="sm"
            className="flex-1"
            render={<Link href="/nurses" />}
            nativeButton={false}
          >
            <Users className="h-3.5 w-3.5" /> Offer capacity
          </Button>
          <Button
            size="sm"
            variant="outline"
            render={<Link href="/messages" aria-label="Message" />}
            nativeButton={false}
          >
            <MessageSquare className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
          <span className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
            <CircleDashed className="h-3.5 w-3.5" /> No open needs
          </span>
        </div>
      )}
    </div>
  );
}
