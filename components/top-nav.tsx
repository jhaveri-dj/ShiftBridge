"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";
import { useRole } from "@/lib/role-context";

export interface Breadcrumb {
  label: string;
  href?: string;
}

export function TopNav({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  const { role, clearRole } = useRole();
  const router = useRouter();

  function handleLogout() {
    clearRole();
    router.push("/");
  }

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
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {role.initials}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
          title="Switch persona"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
