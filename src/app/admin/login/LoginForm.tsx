"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await createBrowserSupabase().auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setError("That email and password didn't work. Please try again.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-sm ring-1 ring-black/5 space-y-5">
      <h1 className="text-3xl text-navy">Sign in</h1>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input id="password" type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
      </div>
      {error && <p className="text-flag font-semibold">{error}</p>}
      <button className="btn btn-red w-full" disabled={busy}>{busy ? "Signing in…" : "Sign In"}</button>
    </form>
  );
}
