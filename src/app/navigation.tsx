import { type ProofKitRoute } from "@proofgeist/kit";

export const primaryRoutes: ProofKitRoute[] = [
  {
    label: "Dashboard",
    type: "link",
    href: "/",
    exactMatch: true,
  },
  {
    label: "approve",
    type: "link",
    href: "/approve",
  },
];

export const secondaryRoutes: ProofKitRoute[] = [];
