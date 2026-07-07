"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRole } from "@/lib/role-context";
import { NAV_BY_ROLE } from "@/lib/nav";
import { UserMenu } from "@/components/user-menu";

export function NurseAppShell({ children }: { children: React.ReactNode }) {
  const { role } = useRole();
  const pathname = usePathname();
  const items = NAV_BY_ROLE.alex;
  const activeTabRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/40">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto w-full max-w-md px-5 sm:max-w-lg lg:max-w-[1120px] lg:px-8">
          <div className="flex items-center justify-between py-3.5">
            <Link href="/nurse/home" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Stethoscope className="h-4 w-4" />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                ShiftBridge
              </span>
            </Link>
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
          </div>

          <nav className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-2.5 lg:overflow-visible">
            {items.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={isActive ? activeTabRef : undefined}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md flex-1 px-5 py-6 sm:max-w-lg lg:max-w-[1120px] lg:px-8 lg:py-8">
        {children}
      </main>

      <footer className="mx-auto w-full max-w-md px-5 pb-8 sm:max-w-lg lg:max-w-[1120px] lg:px-8">
        <p className="border-t border-dashed border-border pt-4 text-center text-[11px] leading-relaxed text-muted-foreground/70">
          Portfolio demo using synthetic data only — not a live clinical, payroll,
          or scheduling system. Switch personas from the account menu, top-right.
        </p>
      </footer>
    </div>
  );
}
