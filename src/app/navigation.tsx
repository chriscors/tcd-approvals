import { type ProofKitRoute } from "@proofgeist/kit";

export const primaryRoutes: ProofKitRoute[] = [
  {
    label: "Dashboard",
    type: "link",
    href: "/",
    exactMatch: true,
  },
  {
    label: "undefined",
    type: "link",
    href: "/timecard",
  },
];

export const secondaryRoutes: ProofKitRoute[] = [];
