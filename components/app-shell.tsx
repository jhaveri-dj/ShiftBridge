"use client";

import { useRole } from "@/lib/role-context";
import { NavRail } from "@/components/nav-rail";
import { Sidebar } from "@/components/sidebar";
import { TopNav, type Breadcrumb } from "@/components/top-nav";
import { UnitOutlookStrip } from "@/components/unit-outlook-strip";
import { NurseAppShell } from "@/components/nurse-app-shell";

export function AppShell({
  breadcrumbs,
  children,
}: {
  breadcrumbs: Breadcrumb[];
  children: React.ReactNode;
}) {
  const { roleId } = useRole();

  if (roleId === "alex") {
    return <NurseAppShell>{children}</NurseAppShell>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <NavRail />
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav breadcrumbs={breadcrumbs} />
        <main className="flex-1 px-6 py-6">
          {roleId === "priya" && <UnitOutlookStrip />}
          {children}
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
