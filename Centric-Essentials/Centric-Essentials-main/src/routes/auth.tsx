import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign in — Centric Essentials Consulting" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: search.redirect ?? "/admin", replace: true });
    });
  }, [navigate, search.redirect]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created — check your email to confirm.");
      }
      navigate({ to: search.redirect ?? "/admin", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  async function signInGoogle() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      navigate({ to: search.redirect ?? "/admin", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-md mx-auto">
        <div className="inline-block h-px w-12 bg-primary mb-8" />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
          Account access
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
          {mode === "signin" ? "Sign in." : "Create account."}
        </h1>

        <div className="border border-border p-8 space-y-6">
          <button
            onClick={signInGoogle}
            disabled={busy}
            className="w-full px-6 py-3 border border-border font-bold uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          >
            Continue with Google
          </button>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              or
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                className="w-full border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                maxLength={100}
                className="w-full border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full px-6 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:-translate-y-[2px] transition-transform disabled:opacity-50"
            >
              {busy ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-[11px] font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary"
          >
            {mode === "signin" ? "Need an account? Sign up →" : "Already have an account? Sign in →"}
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary">
            ← Back to site
          </Link>
        </div>
      </div>
    </section>
  );
}
