import { HeroHeading } from "@/components/hero-heading";
import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
const WEBGRAM_LOGO =
  "https://ik.imagekit.io/x3cipokny/webgram%20it%20solution?updatedAt=1790815003792";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Administrator Sign In | Webgram IT Solution" },
      {
        name: "description",
        content: "Secure administrator sign in for the Webgram publishing panel.",
      },
      { property: "og:title", content: "Administrator Sign In | Webgram IT Solution" },
      { property: "og:description", content: "Secure administrator access to Webgram publishing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: "/admin/blog", replace: true });
    });
  }, [navigate]);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError("Email or password is incorrect.");
      setBusy(false);
      return;
    }
    await navigate({ to: "/admin/blog", replace: true });
  }
  return (
    <main className="grid min-h-screen place-items-center bg-sky-soft px-4 py-10">
      <div className="grid w-full max-w-[920px] overflow-hidden rounded-md border border-border bg-card shadow-card md:grid-cols-[.85fr_1.15fr]">
        <section className="bg-navy p-7 text-on-dark md:p-10">
          <img
            src={WEBGRAM_LOGO}
            alt="Webgram IT Solution"
            className="h-11 w-auto object-contain brightness-0 invert"
          />
          <div className="mt-14 grid h-14 w-14 place-items-center rounded-md bg-on-dark/10">
            <ShieldCheck className="h-7 w-7 text-gold" />
          </div>
          <HeroHeading
            className="mt-5 text-3xl font-extrabold"
            lines={["Publishing", "Control Centre"]}
          />
          <p className="mt-3 text-sm leading-6 text-on-dark/75">
            Securely manage articles, categories, enquiries and publishing reviews.
          </p>
        </section>
        <section className="p-7 md:p-10">
          <p className="page-eyebrow text-primary">Secure administrator panel</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy">Sign in to your account</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Use your approved administrator credentials.
          </p>
          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block text-xs font-bold text-navy">
              Email Address
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="h-11 pl-10"
                />
              </div>
            </label>
            <label className="block text-xs font-bold text-navy">
              Password
              <div className="relative mt-2">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="h-11 pl-10"
                />
              </div>
            </label>
            {error ? (
              <p role="alert" className="text-xs font-semibold text-destructive">
                {error}
              </p>
            ) : null}
            <Button
              type="submit"
              disabled={busy}
              className="h-11 w-full bg-gold font-bold text-navy hover:bg-gold/90"
            >
              {busy ? "Signing in..." : "Sign in securely"}
              <ArrowRight />
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
