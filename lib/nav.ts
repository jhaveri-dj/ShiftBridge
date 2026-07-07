import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BookOpenCheck,
  MessageSquare,
  FileBarChart,
  Home,
  CalendarCheck,
  History,
  NotebookPen,
  Building2,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import type { RoleId } from "@/lib/roles";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_BY_ROLE: Record<RoleId, NavItem[]> = {
  sarah: [
    { label: "Command Center", href: "/command-center", icon: LayoutDashboard },
    { label: "Staffing Requests", href: "/requests", icon: ClipboardList },
    { label: "Nurse Matches", href: "/nurses", icon: Users },
    { label: "Unit Metrics", href: "/unit-metrics", icon: Building2 },
    { label: "Skills Repository", href: "/skills", icon: BookOpenCheck },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Reports", href: "/reports", icon: FileBarChart },
  ],
  priya: [
    { label: "My Unit", href: "/requests/ortho-7w", icon: ClipboardList },
    { label: "Unit Report", href: "/unit-report", icon: ClipboardCheck },
    { label: "Nurse Matches", href: "/nurses", icon: Users },
    { label: "Skills Repository", href: "/skills", icon: BookOpenCheck },
    { label: "Messages", href: "/messages", icon: MessageSquare },
  ],
  alex: [
    { label: "Home", href: "/nurse/home", icon: Home },
    { label: "Shift Offer", href: "/nurse/shift-offer", icon: CalendarCheck },
    { label: "My Shifts", href: "/nurse/my-shifts", icon: History },
    { label: "Competencies", href: "/nurse/competencies", icon: BookOpenCheck },
    { label: "Handoff Notes", href: "/nurse/log-patients", icon: NotebookPen },
    { label: "Messages", href: "/nurse/messages", icon: MessageSquare },
  ],
};
