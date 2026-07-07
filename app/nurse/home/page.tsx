import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MatchScorePill } from "@/components/match-score-card";
import { Button } from "@/components/ui/button";
import { getNurseById } from "@/data/nurses";
import { getRequestByUnitId } from "@/data/requests";

export default function NurseHomePage() {
  const alex = getNurseById("alex-chen")!;
  const request = getRequestByUnitId("ortho-7w")!;
  const myMatch = request.matches.find((m) => m.nurseId === alex.id)!;

  return (
    <AppShell breadcrumbs={[{ label: "Home" }]}>
      <PageHeader
        title="Good evening, Alex"
        subtitle="You're available tonight, 7PM–7AM. Here's what CareMatch has lined up for you."
      />

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-medium text-primary">
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

        <Button
          className="mt-5"
          render={<Link href="/nurse/shift-offer" />}
          nativeButton={false}
        >
          Review shift offer <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs text-muted-foreground">Your availability</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {alex.availability}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs text-muted-foreground">Overtime this pay period</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            0 hours · Overtime risk: {alex.overtimeRisk}
          </p>
        </div>
      </div>
    </AppShell>
  );
}
