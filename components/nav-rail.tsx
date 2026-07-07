"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRole } from "@/lib/role-context";
import { NAV_BY_ROLE } from "@/lib/nav";

export function NavRail() {
  const pathname = usePathname();
  const { role, roleId } = useRole();
  const items = NAV_BY_ROLE[roleId];

  return (
    <aside className="hidden w-14 shrink-0 flex-col items-center bg-sidebar/95 py-4 md:flex">
      <Link
        href={role.homeHref}
        className="mb-6 flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
        title="CareMatch"
      >
        <Stethoscope className="h-4.5 w-4.5" />
      </Link>

      <nav className="flex flex-1 flex-col items-center gap-1.5">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              aria-label={item.label}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4.5 w-4.5" />
            </Link>
          );
        })}
      </nav>

      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-[11px] font-semibold text-sidebar-accent-foreground">
        {role.initials}
      </div>
    </aside>
  );
}
