import { createBrowserClient } from "@supabase/ssr";

// Trim in case a space or line break was pasted into Vercel with the value;
// a stray character in the key makes every request fail.
export const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, "");
export const anonKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)?.replace(/\s+/g, "");

export const supabaseConfigured = Boolean(url && anonKey);

export const BUCKET = "art";

export function publicImageUrl(path: string) {
  if (path.startsWith("/") || path.startsWith("http")) return path;
  return `${url}/storage/v1/object/public/${BUCKET}/${path}`;
}

export function createBrowserSupabase() {
  return createBrowserClient(url!, anonKey!);
}
