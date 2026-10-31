export const site = {
  name: "MD Born",
  domain: "mdborn.com",
  artist: "Michael Bell",
  tagline: "Handmade flags and tables, given in thanks for gifts to veterans.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "bellmichaelp@pm.me",
};

export const categories = [
  { slug: "shotgun-shell-flags", label: "Shotgun Shell Flags" },
  { slug: "tile-tables", label: "Tile Flag Tables" },
  { slug: "other", label: "Other Work" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function categoryLabel(slug: string) {
  return categories.find((c) => c.slug === slug)?.label ?? "Other Work";
}

export const statuses = [
  { value: "available", label: "Available for a donation" },
  { value: "given", label: "Given to a donor" },
  { value: "in-progress", label: "In the workshop" },
  { value: "display", label: "Display piece" },
] as const;

export function statusLabel(value: string) {
  return statuses.find((s) => s.value === value)?.label ?? value;
}

// TODO(Michael): confirm each link goes to the right donation page.
export const nonprofits = [
  {
    name: "NPLB Outdoors",
    blurb:
      "Operation No Person Left Behind Outdoors takes veterans on outdoor adventures that build friendship and healing.",
    url: "https://www.nplboutdoors.org",
  },
  {
    name: "Wounded Warriors Abilities Ranch",
    blurb:
      "A Florida ranch where wounded veterans stay active through adaptive recreation, fishing, and time outdoors.",
    url: "https://www.woundedwarriorsabilitiesranch.org",
  },
  {
    name: "The Ranch Ministries",
    blurb:
      "A South Dakota ranch that shares faith and hope with veterans through retreats and hands-on ranch life.",
    url: "https://www.theranchministries.com",
  },
  {
    name: "Veterans Airlift Command",
    blurb:
      "Volunteer pilots fly wounded veterans and their families to medical care and reunions at no cost.",
    url: "https://www.veteransairlift.org",
  },
];
