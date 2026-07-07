"use client";

import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  LayoutDashboard,
  ClipboardList,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { personas } from "@/data/personas";
import { Button } from "@/components/ui/button";
import { useRole } from "@/lib/role-context";
import { MatchAnimation } from "@/components/match-animation";
import { cn } from "@/lib/utils";
import type { RoleId } from "@/lib/roles";

interface PersonaStyle {
  icon: LucideIcon;
  iconWrap: string;
  border: string;
  link: string;
}

const PERSONA_STYLE: Record<RoleId, PersonaStyle> = {
  sarah: {
    icon: LayoutDashboard,
    iconWrap: "bg-indigo-50 text-indigo-600",
    border: "hover:border-indigo-300/70",
    link: "text-indigo-600",
  },
  priya: {
    icon: ClipboardList,
    iconWrap: "bg-teal-50 text-teal-600",
    border: "hover:border-teal-300/70",
    link: "text-teal-600",
  },
  alex: {
    icon: BadgeCheck,
    iconWrap: "bg-amber-50 text-amber-600",
    border: "hover:border-amber-300/70",
    link: "text-amber-600",
  },
};

export default function Home() {
  const { setRoleId } = useRole();

  return (
    <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/40">
      <div className="landing-grid-backdrop pointer-events-none absolute inset-0" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="mb-14 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            CareMatch
          </span>
        </div>

        <MatchAnimation />

        <div className="mt-6 max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Match the right nurse to the right unit, faster.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg font-normal leading-relaxed text-muted-foreground">
            Real-time hospital staffing and competency matching for nursing
            leaders, staffing offices, and professional practice teams.
          </p>
        </div>

        <div className="mt-16 grid w-full max-w-4xl gap-5 sm:grid-cols-3">
          {personas.map((persona) => {
            const style = PERSONA_STYLE[persona.id];
            const Icon = style.icon;
            return (
              <Link
                key={persona.id}
                href={persona.href}
                onClick={() => setRoleId(persona.id)}
                className={cn(
                  "group flex flex-col rounded-2xl border border-border bg-card/90 p-7 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                  style.border,
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    style.iconWrap,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {persona.name}
                </h3>
                <p className={cn("text-sm font-medium", style.link)}>{persona.role}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {persona.description}
                </p>
                <div
                  className={cn(
                    "mt-6 flex items-center gap-1.5 text-sm font-medium",
                    style.link,
                  )}
                >
                  {persona.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

        <Button
          variant="ghost"
          className="mt-12 text-muted-foreground"
          render={<Link href="/command-center" onClick={() => setRoleId("sarah")} />}
          nativeButton={false}
        >
          Or explore the full app <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      <footer className="relative border-t border-border/60 py-5 text-center text-[11px] text-muted-foreground/50">
        Synthetic data only · Portfolio prototype · Built for workflow exploration
      </footer>
    </div>
  );
}
