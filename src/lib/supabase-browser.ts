import { createBrowserClient } from "@supabase/ssr";

export const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

export const BUCKET = "art";

export function publicImageUrl(path: string) {
  if (path.startsWith("/") || path.startsWith("http")) return path;
  return `${url}/storage/v1/object/public/${BUCKET}/${path}`;
}

export function createBrowserSupabase() {
  return createBrowserClient(url!, anonKey!);
}
