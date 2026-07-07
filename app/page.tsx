"use client";

import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  LayoutDashboard,
  ClipboardList,
  BadgeCheck,
  AlertTriangle,
  Sparkles,
  ClipboardCheck,
  UserCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { personas } from "@/data/personas";
import { useRole } from "@/lib/role-context";
import { MatchAnimation } from "@/components/match-animation";
import { cn } from "@/lib/utils";
import type { RoleId } from "@/lib/roles";

interface PersonaStyle {
  icon: LucideIcon;
  iconWrap: string;
}

const PERSONA_STYLE: Record<RoleId, PersonaStyle> = {
  sarah: { icon: LayoutDashboard, iconWrap: "bg-primary/10 text-primary" },
  priya: { icon: ClipboardList, iconWrap: "bg-chart-3/15 text-chart-3" },
  alex: { icon: BadgeCheck, iconWrap: "bg-highlight/15 text-highlight" },
};

const WORKFLOW = [
  { label: "Hospital gap", icon: AlertTriangle },
  { label: "AI match", icon: Sparkles },
  { label: "Unit manager review", icon: ClipboardCheck },
  { label: "Nurse accepts", icon: UserCheck },
  { label: "Coverage confirmed", icon: CheckCircle2 },
];

export default function Home() {
  const { setRoleId } = useRole();

  return (
    <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-gradient-to-b from-background via-muted/30 to-primary/5">
      <div className="landing-aurora" aria-hidden="true" />
      <div className="landing-grid-backdrop pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8">
        {/* Brand row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Stethoscope className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              ShiftBridge
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
            Portfolio demo · synthetic data
          </span>
        </div>

        {/* Hero */}
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Match the right nurse to the right unit, faster.
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Hospital staffing gaps are not just a scheduling problem.
              <span className="block text-primary">
                They are a safety, competency, approval, and coverage problem.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              ShiftBridge helps staffing offices, unit managers, and float pool
              nurses coordinate urgent coverage using availability, competencies,
              acuity, fatigue risk, overtime exposure, and approval workflows.
            </p>
          </div>

          <div className="relative hidden justify-center lg:flex">
            <div className="w-full max-w-sm rounded-3xl border border-border bg-card/80 p-8 shadow-lg backdrop-blur-sm">
              <MatchAnimation />
              <p className="mt-6 text-center text-sm font-medium text-foreground">
                Real-time competency-aware matching
              </p>
              <p className="mt-1 text-center text-xs leading-relaxed text-muted-foreground">
                Every match weighs safety, fit, fatigue, and approval — not just
                who is free.
              </p>
            </div>
          </div>
        </div>

        {/* Workflow strip */}
        <div className="mt-12 rounded-2xl border border-border bg-card/70 px-4 py-4 shadow-sm backdrop-blur-sm sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:justify-between">
            {WORKFLOW.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center gap-2">
                  <span className="flex items-center gap-2 rounded-full bg-muted/70 px-3 py-1.5 text-xs font-medium text-foreground">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {step.label}
                  </span>
                  {i < WORKFLOW.length - 1 && (
                    <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 text-muted-foreground/60 sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Role cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {personas.map((persona) => {
            const style = PERSONA_STYLE[persona.id];
            const Icon = style.icon;
            return (
              <Link
                key={persona.id}
                href={persona.href}
                onClick={() => setRoleId(persona.id)}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110",
                    style.iconWrap,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                  {persona.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {persona.role}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {persona.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {persona.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground/70">
          Portfolio demo using synthetic data only. Not connected to a live
          clinical, payroll, or scheduling system.
        </p>
      </div>
    </div>
  );
}
