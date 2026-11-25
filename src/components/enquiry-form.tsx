import { FormEvent, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitEnquiry } from "@/lib/enquiry.functions";

const services = [
  "Ecommerce Development",
  "B2B Commerce",
  "Website Design & Development",
  "Web Portal Development",
  "WooCommerce",
  "Shopify",
  "API Integration",
  "Website Maintenance",
  "Other",
];

export function HomeEnquiry() {
  const send = useServerFn(submitEnquiry);
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    website: "",
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await send({ data: f });
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message.length < 120
          ? err.message
          : "Please check your details and try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section id="enquiry" className="bg-sky-soft py-8 md:py-10">
      <div className="page-shell grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="page-eyebrow text-primary">Get in touch</p>
          <h2 className="mt-2 text-[24px] font-extrabold leading-tight text-navy md:text-[28px]">
            Tell us about your project
          </h2>
          <p className="mt-3 max-w-[420px] text-[13px] leading-6 text-muted-foreground">
            Share a few details and our team will get back to you within one business day with ideas
            and a free estimate.
          </p>
        </div>
        <div className="rounded-md border border-border bg-card p-5 shadow-card">
          {done ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
              <h3 className="mt-3 text-lg font-extrabold text-navy">Thank you!</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your enquiry has been received. We'll contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
              <Input
                required
                minLength={2}
                maxLength={100}
                placeholder="Your name *"
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
                className="h-10"
              />
              <Input
                required
                type="email"
                maxLength={255}
                placeholder="Email address *"
                value={f.email}
                onChange={(e) => setF({ ...f, email: e.target.value })}
                className="h-10"
              />
              <Input
                type="tel"
                maxLength={30}
                placeholder="Phone number"
                value={f.phone}
                onChange={(e) => setF({ ...f, phone: e.target.value })}
                className="h-10"
              />
              <select
                value={f.service}
                onChange={(e) => setF({ ...f, service: e.target.value })}
                className="h-10 rounded-md border border-input bg-card px-3 text-sm text-navy"
              >
                <option value="">Service needed</option>
                {services.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <Textarea
                required
                minLength={5}
                maxLength={3000}
                placeholder="Project details *"
                value={f.message}
                onChange={(e) => setF({ ...f, message: e.target.value })}
                className="min-h-24 sm:col-span-2"
              />
              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={f.website}
                onChange={(e) => setF({ ...f, website: e.target.value })}
                className="hidden"
              />
              {error ? (
                <p role="alert" className="text-xs font-semibold text-destructive sm:col-span-2">
                  {error}
                </p>
              ) : null}
              <Button
                disabled={busy}
                className="h-10 bg-gold font-bold text-navy hover:bg-gold/90 sm:col-span-2"
              >
                <Send />
                {busy ? "Sending..." : "Send Enquiry"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
