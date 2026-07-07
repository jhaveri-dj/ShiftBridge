"use client";

import { useState } from "react";
import { CalendarClock, CheckCircle2, Circle, TrendingUp, Heart } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { StatusBadge, statusLevelFromRisk } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getNurseById } from "@/data/nurses";
import { units } from "@/data/units";

const SHIFT_TYPES = ["Night (7PM–7AM)", "Day (7AM–7PM)", "Overtime shifts"];

export default function NurseAvailabilityPage() {
  const alex = getNurseById("alex-chen")!;
  const [available, setAvailable] = useState(true);
  const [preferredUnits, setPreferredUnits] = useState<string[]>(["Orthopedics 7W"]);
  const [preferredShifts, setPreferredShifts] = useState<string[]>(["Night (7PM–7AM)"]);

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  }

  return (
    <AppShell breadcrumbs={[{ label: "Availability" }]}>
      <PageHeader
        title="Your availability"
        subtitle="Control whether you're visible to the staffing office for tonight's matching pool."
      />

      <div className="mx-auto w-full max-w-3xl space-y-5">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5" /> Current status
          </div>
          <div className="mt-2 flex items-center gap-2">
            {available ? (
              <CheckCircle2 className="h-5 w-5 text-good" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
            <p className="text-lg font-semibold text-foreground">
              {available ? alex.availability : "Marked unavailable"}
            </p>
          </div>

          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => setAvailable((v) => !v)}
          >
            {available ? "Mark unavailable" : "Mark available again"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Overtime this pay period</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              0 hours · Overtime risk: {alex.overtimeRisk}
            </p>
            <StatusBadge
              className="mt-2"
              label={`Overtime risk: ${alex.overtimeRisk}`}
              level={statusLevelFromRisk(alex.overtimeRisk)}
            />
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Float pool status</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {alex.floatEligible ? "Float eligible" : "Not float eligible"}
            </p>
            <StatusBadge
              className="mt-2"
              label={alex.floatEligible ? "Float eligible" : "Not float eligible"}
              level={alex.floatEligible ? "good" : "warning"}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Heart className="h-4 w-4 text-primary" /> Preferred units
          </h3>
          <p className="mb-3 text-xs text-muted-foreground">
            Tell the staffing office where you&rsquo;d like to be offered shifts more
            often. This doesn&rsquo;t restrict what you&rsquo;re shown, it just helps
            prioritize your matches.
          </p>
          <div className="flex flex-wrap gap-2">
            {units.map((u) => {
              const selected = preferredUnits.includes(u.name);
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => toggle(preferredUnits, setPreferredUnits, u.name)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    selected
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  {u.name}
                </button>
              );
            })}
          </div>

          <h3 className="mb-1 mt-5 text-sm font-semibold text-foreground">
            Preferred shift types
          </h3>
          <div className="flex flex-wrap gap-2">
            {SHIFT_TYPES.map((s) => {
              const selected = preferredShifts.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggle(preferredShifts, setPreferredShifts, s)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    selected
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" /> Why availability matters for
            your match score
          </h3>
          <ul className="space-y-2">
            {alex.matchReasons.slice(0, 2).map((reason, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
