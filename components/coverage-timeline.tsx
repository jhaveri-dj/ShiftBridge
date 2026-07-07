import { Check, Clock, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckpointState = "confirmed" | "pending" | "open";

interface Checkpoint {
  time: string;
  state: CheckpointState;
  note: string;
}

const CHECKPOINTS: Checkpoint[] = [
  { time: "7PM", state: "confirmed", note: "Alex Chen confirmed for RN1" },
  { time: "9PM", state: "pending", note: "Jordan Patel pending sending-unit approval for RN2" },
  { time: "11PM", state: "pending", note: "RN2 still awaiting approval" },
  { time: "3AM", state: "open", note: "RN2 slot still open if approval doesn't land" },
  { time: "7AM", state: "open", note: "Shift end — RN2 coverage unresolved" },
];

const STATE_META: Record<
  CheckpointState,
  { label: string; icon: typeof Check; dot: string; text: string }
> = {
  confirmed: { label: "Confirmed slot", icon: Check, dot: "bg-good", text: "text-good" },
  pending: { label: "Pending slot", icon: Clock, dot: "bg-warning", text: "text-warning" },
  open: { label: "Open slot", icon: Circle, dot: "bg-critical", text: "text-critical" },
};

export function CoverageTimeline() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-1 text-sm font-semibold text-foreground">Coverage timeline</h2>
      <p className="mb-5 text-xs text-muted-foreground">
        Projected RN2 coverage status across tonight&rsquo;s shift, based on the current
        staffing request.
      </p>
      <div className="flex items-start">
        {CHECKPOINTS.map((cp, i) => {
          const meta = STATE_META[cp.state];
          const Icon = meta.icon;
          const isLast = i === CHECKPOINTS.length - 1;
          return (
            <div key={cp.time} className={cn("flex items-center", !isLast && "flex-1")}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-white",
                    meta.dot,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="mt-2 text-xs font-semibold text-foreground">{cp.time}</span>
                <span className={cn("mt-0.5 text-[11px] font-medium", meta.text)}>
                  {meta.label}
                </span>
                <span className="mt-1 w-24 text-center text-[11px] leading-tight text-muted-foreground">
                  {cp.note}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mx-1 mb-10 h-0.5 flex-1",
                    cp.state === "confirmed" ? "bg-good" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
