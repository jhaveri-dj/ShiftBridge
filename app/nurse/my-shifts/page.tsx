import Link from "next/link";
import { ArrowRight, CalendarClock, ShieldCheck } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { getNurseById } from "@/data/nurses";
import { getRequestByUnitId } from "@/data/requests";

const OUTCOME_CLASS: Record<string, string> = {
  Successful: "text-good",
  Partial: "text-warning",
  Cancelled: "text-critical",
};

/** A couple of past shifts carry an example handoff note, illustrating what
 * the Handoff Notes tool (see /nurse/log-patients) produces once a shift wraps. */
const LOGGED_NOTES: Record<string, string> = {
  "Orthopedics 7W-3 weeks ago": "No falls overnight. 2 wound dressing changes completed, both tolerated well.",
  "Medicine 4E-6 weeks ago": "One patient required PRN delirium precautions; resolved by 3AM.",
};

const REST_WEEK = [
  { label: "6 days ago", worked: false },
  { label: "5 days ago", worked: false },
  { label: "4 days ago", worked: false },
  { label: "3 days ago", worked: false },
  { label: "2 days ago", worked: true, unit: "Medicine 4E", hours: 12 },
  { label: "Yesterday", worked: false },
  { label: "Today", worked: false },
];

export default function MyShiftsPage() {
  const alex = getNurseById("alex-chen")!;
  const request = getRequestByUnitId("ortho-7w")!;
  const myMatch = request.matches.find((m) => m.nurseId === alex.id)!;
  const hoursThisWeek = REST_WEEK.reduce((sum, d) => sum + (d.hours ?? 0), 0);

  return (
    <AppShell breadcrumbs={[{ label: "My Shifts" }]}>
      <PageHeader
        title="My Shifts"
        subtitle="Your upcoming offer and completed shift history."
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* LEFT — upcoming + past shifts */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Upcoming
            </h2>
            <Link
              href="/nurse/shift-offer"
              className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm transition-colors hover:bg-primary/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarClock className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {request.unitName} · {request.shiftNeed}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {myMatch.matchScore}% match · Awaiting your response
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
            </Link>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Past shifts
            </h2>
            <div className="space-y-2.5">
              {alex.redeploymentHistory.map((h, i) => {
                const note = LOGGED_NOTES[`${h.unit}-${h.date}`];
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">{h.unit}</p>
                      <span className={`text-xs font-medium ${OUTCOME_CLASS[h.outcome]}`}>
                        {h.outcome} · {h.rating}/5
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{h.date}</p>
                    {note && (
                      <p className="mt-2 rounded-lg bg-muted/60 px-3 py-2 text-xs italic leading-relaxed text-foreground">
                        &ldquo;{note}&rdquo;
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Button variant="ghost" className="w-full" render={<Link href="/nurse/log-patients" />} nativeButton={false}>
            Add handoff notes for an active shift <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* RIGHT — rest/fatigue + availability summary */}
        <div className="space-y-4 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck className="h-4 w-4 text-good" /> Rest &amp; fatigue, last 7 days
            </h2>
            <p className="mb-4 text-xs text-muted-foreground">
              {hoursThisWeek} hours worked this week · Overtime risk:{" "}
              {alex.overtimeRisk.toLowerCase()}
            </p>
            <div className="grid grid-cols-7 gap-1.5">
              {REST_WEEK.map((day) => (
                <div key={day.label} className="flex flex-col items-center gap-1.5">
                  <div
                    className={
                      day.worked
                        ? "flex h-9 w-full items-center justify-center rounded-lg bg-primary text-[10px] font-semibold text-primary-foreground"
                        : "flex h-9 w-full items-center justify-center rounded-lg bg-muted text-[10px] text-muted-foreground"
                    }
                  >
                    {day.worked ? `${day.hours}h` : "Off"}
                  </div>
                  <span className="text-center text-[9px] leading-tight text-muted-foreground">
                    {day.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Your one shift this week ended 36 hours ago — rest window is clear heading
              into tonight&rsquo;s offer.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-foreground">
              Availability summary
            </h2>
            <dl className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-medium text-foreground">{alex.availability}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Overtime risk</dt>
                <dd className="font-medium text-foreground">{alex.overtimeRisk}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Float pool</dt>
                <dd className="font-medium text-foreground">
                  {alex.floatEligible ? "Eligible" : "Not eligible"}
                </dd>
              </div>
            </dl>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full"
              render={<Link href="/nurse/availability" />}
              nativeButton={false}
            >
              Manage availability
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
