import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { anonKey, url } from "./supabase-browser";

export { BUCKET, publicImageUrl, supabaseConfigured } from "./supabase-browser";

export async function createServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(url!, anonKey!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only.
        }
      },
    },
  });
}
