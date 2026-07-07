"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRole } from "@/lib/role-context";
import { UserMenu } from "@/components/user-menu";

export interface Breadcrumb {
  label: string;
  href?: string;
}

export function TopNav({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  const { role } = useRole();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/60 px-6 backdrop-blur">
      <nav className="flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium leading-none text-foreground">
            {role.name}
          </p>
          <p className="mt-1 text-xs leading-none text-muted-foreground">
            {role.title}
          </p>
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
