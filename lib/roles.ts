export type RoleId = "sarah" | "priya" | "alex";

export interface RoleMeta {
  id: RoleId;
  name: string;
  title: string;
  initials: string;
  /** Where this role lands after "logging in" from the landing page. */
  homeHref: string;
}

export const ROLES: Record<RoleId, RoleMeta> = {
  sarah: {
    id: "sarah",
    name: "Sarah Mitchell",
    title: "Staffing Office Lead",
    initials: "SM",
    homeHref: "/command-center",
  },
  priya: {
    id: "priya",
    name: "Priya Nair",
    title: "Unit Manager, Orthopedics 7W",
    initials: "PN",
    homeHref: "/requests/ortho-7w",
  },
  alex: {
    id: "alex",
    name: "Alex Chen",
    title: "Float Pool RN",
    initials: "AC",
    homeHref: "/nurse/home",
  },
};

/** Priya only has first-person ownership framing over this unit. */
export const PRIYA_HOME_UNIT_ID = "ortho-7w";
export const ALEX_NURSE_ID = "alex-chen";
