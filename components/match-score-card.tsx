import { cn } from "@/lib/utils";

function scoreLevel(score: number): "good" | "warning" | "critical" {
  if (score >= 85) return "good";
  if (score >= 70) return "warning";
  return "critical";
}

const RING_COLOR = {
  good: "text-good",
  warning: "text-warning",
  critical: "text-critical",
};

export function MatchScorePill({ score }: { score: number }) {
  const level = scoreLevel(score);
  return (
    <span
      className={cn(
        "inline-flex h-7 shrink-0 items-center justify-center rounded-full border px-2.5 text-xs font-semibold leading-none",
        level === "good" && "border-good/20 bg-good-bg text-good",
        level === "warning" && "border-warning/20 bg-warning-bg text-warning",
        level === "critical" && "border-critical/20 bg-critical-bg text-critical",
      )}
    >
      {score}% match
    </span>
  );
}

export function MatchScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const level = scoreLevel(score);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={7}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={7}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("fill-none", RING_COLOR[level])}
          style={{ stroke: "currentColor" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-foreground">{score}%</span>
      </div>
    </div>
  );
}
