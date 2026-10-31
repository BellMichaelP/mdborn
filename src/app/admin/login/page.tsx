import { supabaseConfigured } from "@/lib/supabase";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  if (!supabaseConfigured) {
    return (
      <p className="text-lg">
        The admin isn&apos;t connected to its database yet. Once Supabase is set up in Vercel, you can sign in here.
      </p>
    );
  }
  return <LoginForm />;
}
