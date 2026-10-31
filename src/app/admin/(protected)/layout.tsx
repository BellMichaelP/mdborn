import { redirect } from "next/navigation";
import { createServerSupabase, supabaseConfigured } from "@/lib/supabase";
import { signOut } from "../actions";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured) redirect("/admin/login");
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");

  return (
    <>
      <div className="flex justify-end mb-6 text-sm text-ink/70 gap-4 items-center">
        <span>Signed in as {data.user.email}</span>
        <form action={signOut}>
          <button className="underline hover:text-flag">Sign out</button>
        </form>
      </div>
      {children}
    </>
  );
}
