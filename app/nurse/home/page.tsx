import Link from "next/link";
import { ArrowRight, Sparkles, Award, SlidersHorizontal, Clock } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MatchScorePill } from "@/components/match-score-card";
import { Button } from "@/components/ui/button";
import { getNurseById } from "@/data/nurses";
import { getRequestByUnitId, requests } from "@/data/requests";

export default function NurseHomePage() {
  const alex = getNurseById("alex-chen")!;
  const request = getRequestByUnitId("ortho-7w")!;
  const myMatch = request.matches.find((m) => m.nurseId === alex.id)!;

  const confirmedShifts = requests.flatMap((r) =>
    r.matches
      .filter((m) => m.nurseId === alex.id && m.approvalStatus === "Approved")
      .map((m) => ({ request: r, match: m })),
  );

  const completedShifts = alex.redeploymentHistory.filter(
    (h) => h.outcome !== "Cancelled",
  ).length;
  const declines = alex.redeploymentHistory.filter(
    (h) => h.outcome === "Cancelled",
  ).length;

  return (
    <AppShell breadcrumbs={[{ label: "Home" }]}>
      <PageHeader
        title="Good evening, Alex"
        subtitle="You're available tonight, 7PM–7AM. Here's what ShiftBridge has lined up for you."
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* LEFT — new shift offer hero */}
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> New shift offer
          </div>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {request.unitName} · {request.shiftNeed}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {request.patientPopulation}
              </p>
            </div>
            <MatchScorePill score={myMatch.matchScore} />
          </div>

          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            {alex.matchReasons.slice(0, 2).map((reason, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {reason}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-2 text-xs font-medium text-warning">
            <Clock className="h-3.5 w-3.5" /> Offer expires in 22 min
          </div>

          <Button
            className="mt-3"
            render={<Link href="/nurse/shift-offer" />}
            nativeButton={false}
          >
            Review shift offer <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* RIGHT — status snapshot */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Your availability</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {alex.availability}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">
              Overtime this pay period
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              0 hours · Overtime risk: {alex.overtimeRisk}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-good-bg text-good">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {completedShifts} shifts completed · {declines} declines this
                quarter
              </p>
              <p className="text-xs text-muted-foreground">
                Reliability record — a strong track record improves how often
                you&rsquo;re offered shifts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Below — upcoming shifts + manage availability */}
      <div className="mt-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Other upcoming confirmed shifts
        </h2>
        {confirmedShifts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            No other shifts confirmed right now — tonight&rsquo;s Orthopedics 7W offer above
            is your only pending match.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {confirmedShifts.map(({ request: r, match }) => (
              <div
                key={r.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-foreground">
                  {r.unitName} · {r.shiftNeed}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Confirmed · {match.availability}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        href="/nurse/availability"
        className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/60"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <SlidersHorizontal className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Manage availability &amp; preferences
            </p>
            <p className="text-xs text-muted-foreground">
              Set your preferred units and shift types
            </p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </Link>
    </AppShell>
  );
}
