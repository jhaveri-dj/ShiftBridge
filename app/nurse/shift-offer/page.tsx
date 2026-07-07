"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Building2,
  CalendarClock,
  UserCog,
  Headset,
  MessageCircleQuestion,
  Moon,
  Bed,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MatchScoreRing } from "@/components/match-score-card";
import { StatusBadge, statusLevelFromRisk } from "@/components/status-badge";
import { CompetencyStatusBadge } from "@/components/competency-status-badge";
import { Button } from "@/components/ui/button";
import { getNurseById } from "@/data/nurses";
import { getRequestByUnitId } from "@/data/requests";
import {
  sortRequiredCompetencies,
  REQUIRED_FOR_ORTHO,
} from "@/lib/eligibility";

type OfferState = "pending" | "accepted" | "declined";

/** Synthetic, illustrative offer facts — not wired to any live system. */
const OFFER = {
  expiresIn: "22 min",
  unit: "Orthopedics 7W",
  shift: "Tonight, 7PM–7AM",
  careContext: "Post-operative orthopedic, high fall risk",
  requestingManager: "Priya Nair",
  staffingContact: "Sarah Mitchell",
};

/** Framed as a premium/differential estimate, never guaranteed take-home pay. */
const PREMIUM = [
  { label: "Base shift", value: "12 hours" },
  { label: "Night premium", value: "Eligible" },
  { label: "Weekend premium", value: "Not applicable" },
  { label: "Overtime premium", value: "Not triggered" },
];

const FATIGUE = [
  { label: "Last shift ended", value: "36 hours ago" },
  { label: "Consecutive shifts", value: "0" },
  { label: "Hours this pay period", value: "48 / 75" },
  { label: "Rest window", value: "Clear" },
  { label: "Overtime risk", value: "Low" },
];

export default function ShiftOfferPage() {
  const alex = getNurseById("alex-chen")!;
  const request = getRequestByUnitId("ortho-7w")!;
  const myMatch = request.matches.find((m) => m.nurseId === alex.id)!;
  const [state, setState] = useState<OfferState>("pending");

  const requiredComps = sortRequiredCompetencies(alex.competencies);
  const otherComps = alex.competencies.filter(
    (c) => !REQUIRED_FOR_ORTHO.includes(c.name),
  );

  return (
    <AppShell breadcrumbs={[{ label: "Shift Offer" }]}>
      <PageHeader
        title="Your shift offer"
        subtitle="Review the details, then accept or decline before the offer expires."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* LEFT — offer detail */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {OFFER.unit}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {request.shiftNeed} · Acuity: {request.acuity}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-warning/30 bg-warning-bg px-2.5 py-1 text-xs font-semibold text-warning lg:hidden">
                <Clock className="h-3.5 w-3.5" /> Expires in {OFFER.expiresIn}
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <DetailRow icon={CalendarClock} label="Shift" value={OFFER.shift} />
              <DetailRow icon={Building2} label="Unit" value={OFFER.unit} />
              <DetailRow
                icon={UserCog}
                label="Requesting manager"
                value={OFFER.requestingManager}
              />
              <DetailRow
                icon={Headset}
                label="Staffing contact"
                value={OFFER.staffingContact}
              />
            </dl>

            <div className="mt-4 rounded-lg bg-muted/60 px-3 py-2.5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Care context
              </p>
              <p className="mt-0.5 text-sm text-foreground">{OFFER.careContext}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge label={`${myMatch.matchScore}% match`} level="good" />
              <StatusBadge
                label={`Overtime risk: ${alex.overtimeRisk}`}
                level={statusLevelFromRisk(alex.overtimeRisk)}
              />
              <StatusBadge label="Float eligible" level="good" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Why you matched
            </h3>
            <ul className="space-y-2.5">
              {alex.matchReasons.map((reason, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-good" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-1 text-sm font-semibold text-foreground">
              Competency checklist
            </h3>
            <p className="mb-4 text-xs text-muted-foreground">
              Required for {OFFER.unit}. Anything marked{" "}
              <span className="font-medium text-critical">Blocks assignment</span>{" "}
              would stop this match; refreshers won&rsquo;t.
            </p>
            <ul className="divide-y divide-border">
              {requiredComps.map((c) => (
                <CompetencyRow key={c.name} name={c.name} status={c.status} />
              ))}
              {otherComps.map((c) => (
                <CompetencyRow
                  key={c.name}
                  name={c.name}
                  status={c.status}
                  optional
                />
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT — sticky decision + guardrails */}
        <aside className="space-y-4 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="hidden items-center justify-between rounded-lg border border-warning/30 bg-warning-bg px-3 py-2 text-xs font-semibold text-warning lg:flex">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Offer expires in
              </span>
              <span>{OFFER.expiresIn}</span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <MatchScoreRing score={myMatch.matchScore} size={72} />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Strong match
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {OFFER.unit} · {OFFER.shift}
                </p>
              </div>
            </div>

            {/* Desktop actions (mobile uses the sticky bottom bar) */}
            <div className="mt-5 hidden flex-col gap-2.5 lg:flex">
              <DecisionButtons state={state} onChange={setState} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck className="h-4 w-4 text-good" /> Safety &amp; pay
            </h3>
            <div className="rounded-lg bg-good-bg px-3 py-2.5 text-sm text-good">
              Rest window clear · overtime risk {alex.overtimeRisk.toLowerCase()}.
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">
                Estimated premium impact
              </span>
              <span className="text-lg font-semibold text-foreground">$35.76</span>
            </div>
            <dl className="mt-2 space-y-1.5">
              {PREMIUM.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between text-xs"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-medium text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/80">
              Synthetic estimate. Final pay subject to hospital agreement and
              payroll rules.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Bed className="h-4 w-4 text-primary" /> Fatigue &amp; rest
              guardrails
            </h3>
            <dl className="space-y-1.5">
              {FATIGUE.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between text-xs"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-medium text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Moon className="h-3 w-3" /> Night shift eligible — within safe rest
              limits.
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background via-background/95 to-transparent px-5 pb-5 pt-6 lg:hidden">
        <div className="mx-auto w-full max-w-md sm:max-w-lg">
          {state === "pending" && (
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="self-center text-muted-foreground"
                render={<Link href="/nurse/messages" />}
                nativeButton={false}
              >
                <MessageCircleQuestion className="h-3.5 w-3.5" /> Ask a question
              </Button>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => setState("accepted")}>
                  <Check className="h-4 w-4" /> Accept Shift
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setState("declined")}
                >
                  <X className="h-4 w-4" /> Decline
                </Button>
              </div>
            </div>
          )}
          {state === "accepted" && (
            <Button disabled className="w-full opacity-100">
              <CheckCircle2 className="h-4 w-4" /> Accepted
            </Button>
          )}
          {state === "declined" && (
            <Button disabled variant="outline" className="w-full opacity-100">
              <X className="h-4 w-4" /> Declined
            </Button>
          )}
        </div>
      </div>

      {/* Spacer so mobile content isn't hidden behind the sticky bar */}
      <div className="h-24 lg:hidden" />
    </AppShell>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="text-sm font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}

function CompetencyRow({
  name,
  status,
  optional = false,
}: {
  name: string;
  status: "current" | "refresher" | "not-eligible";
  optional?: boolean;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-sm text-foreground">{name}</span>
      <CompetencyStatusBadge status={status} optional={optional} />
    </li>
  );
}

function DecisionButtons({
  state,
  onChange,
}: {
  state: OfferState;
  onChange: (s: OfferState) => void;
}) {
  if (state === "accepted") {
    return (
      <>
        <Button disabled className="w-full opacity-100">
          <CheckCircle2 className="h-4 w-4" /> Accepted
        </Button>
        <p className="rounded-lg border border-good/30 bg-good-bg px-3 py-2 text-xs text-good">
          You&rsquo;re confirmed for {OFFER.unit}, {OFFER.shift}.{" "}
          {OFFER.requestingManager} has been notified.
        </p>
      </>
    );
  }
  if (state === "declined") {
    return (
      <>
        <Button disabled variant="outline" className="w-full opacity-100">
          <X className="h-4 w-4" /> Declined
        </Button>
        <p className="rounded-lg border border-border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
          You&rsquo;ve declined. The staffing office will route to the next match.
        </p>
      </>
    );
  }
  return (
    <>
      <Button className="w-full" onClick={() => onChange("accepted")}>
        <Check className="h-4 w-4" /> Accept Shift
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onChange("declined")}
      >
        <X className="h-4 w-4" /> Decline
      </Button>
      <Button
        variant="ghost"
        className="w-full text-muted-foreground"
        render={<Link href="/nurse/messages" />}
        nativeButton={false}
      >
        <MessageCircleQuestion className="h-4 w-4" /> Ask a question
      </Button>
    </>
  );
}
