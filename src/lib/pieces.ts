import { createServerSupabase, supabaseConfigured } from "./supabase";

export type Piece = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  size: string;
  status: string;
  nonprofit: string;
  featured: boolean;
  images: string[];
  created_at: string;
};

// Shown until Supabase is connected, so the layout can be previewed.
const samplePieces: Piece[] = [
  {
    id: "sample-1",
    slug: "sample-us-shotgun-shell-flag",
    title: "American Flag in Spent Shells",
    category: "shotgun-shell-flags",
    description:
      "Red and brass shotgun shells set in rows to form the stripes, with a field of stars on a wood backer.",
    size: "",
    status: "available",
    nonprofit: "",
    featured: true,
    images: ["/sample/us-shell-flag.svg"],
    created_at: "2026-10-01",
  },
  {
    id: "sample-2",
    slug: "sample-maryland-tile-table",
    title: "Maryland Flag Tile Table",
    category: "tile-tables",
    description: "The Calvert and Crossland arms laid in hand-cut tile on a solid wood table.",
    size: "",
    status: "given",
    nonprofit: "NPLB Outdoors",
    featured: true,
    images: ["/sample/md-tile-table.svg"],
    created_at: "2026-09-01",
  },
  {
    id: "sample-3",
    slug: "sample-us-tile-table",
    title: "Stars and Stripes Tile Table",
    category: "tile-tables",
    description: "A U.S. flag in tile, sealed and set in a wood frame.",
    size: "",
    status: "in-progress",
    nonprofit: "",
    featured: true,
    images: ["/sample/us-tile-table.svg"],
    created_at: "2026-08-01",
  },
];

export async function getPieces(opts: { category?: string; featuredOnly?: boolean } = {}) {
  if (!supabaseConfigured) {
    return samplePieces.filter(
      (p) => (!opts.category || p.category === opts.category) && (!opts.featuredOnly || p.featured),
    );
  }
  const supabase = await createServerSupabase();
  let query = supabase.from("pieces").select("*").order("created_at", { ascending: false });
  if (opts.category) query = query.eq("category", opts.category);
  if (opts.featuredOnly) query = query.eq("featured", true);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Piece[];
}

export async function getPiece(slug: string) {
  if (!supabaseConfigured) return samplePieces.find((p) => p.slug === slug) ?? null;
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("pieces").select("*").eq("slug", slug).maybeSingle();
  return (data as Piece) ?? null;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
