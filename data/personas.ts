import type { RoleId } from "@/lib/roles";

export interface Persona {
  id: RoleId;
  name: string;
  role: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export const personas: Persona[] = [
  {
    id: "sarah",
    name: "Sarah Mitchell",
    role: "Staffing Office Lead",
    description:
      "See open staffing gaps across every unit, ranked matches, and fill-rate performance in one command center.",
    href: "/command-center",
    ctaLabel: "Enter Command Center",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Unit Manager, Orthopedics 7W",
    description:
      "Review recommended nurse matches for your unit's open request and approve or decline based on fit.",
    href: "/requests/ortho-7w",
    ctaLabel: "View My Unit's Request",
  },
  {
    id: "alex",
    name: "Alex Chen",
    role: "Float Pool RN",
    description:
      "See tonight's shift offer, your match reasons, and your own competency readiness.",
    href: "/nurse/home",
    ctaLabel: "Enter My Portal",
  },
];
