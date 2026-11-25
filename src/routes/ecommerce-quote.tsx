import { useRef, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, ArrowUpRight, CheckCircle2, Phone, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { businessIdentity, publicPageSchema, SITE_URL } from "@/lib/site-identity";

const path = "/ecommerce-quote";
const title = "Get an Ecommerce Website Quote | Webgram IT Solution";
const description =
  "Request an itemised quote for a Shopify store, WooCommerce website or B2B ordering portal. Built in Delhi NCR for businesses across India.";
const heroImage = "/images/ecommerce-quote.webp";

const projectTypes = [
  ["Shopify", "A hosted store your team can manage day to day."],
  ["WooCommerce", "A WordPress store with control over hosting and checkout."],
  ["B2B Commerce", "Dealer accounts, bulk orders and customer-specific pricing."],
] as const;

export const Route = createFileRoute("/ecommerce-quote")({
  head: () => ({
    links: [{ rel: "canonical", href: SITE_URL + path }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: SITE_URL + path },
      { property: "og:image", content: SITE_URL + heroImage },
      { name: "twitter:image", content: SITE_URL + heroImage },
    ],
    scripts: publicPageSchema(path, title, description),
  }),
  staticData: { compactFooter: true },
  component: QuotePage,
});

function QuotePage() {
  return (
    <>
      <header className="border-b border-border bg-white">
        <div className="page-shell flex min-h-16 max-w-[1200px] items-center justify-between gap-4">
          <Link to="/" aria-label="Webgram IT Solution home">
            <img
              src="https://ik.imagekit.io/x3cipokny/webgram%20it%20solution?updatedAt=1790815003792"
              alt="Webgram IT Solution"
              width={720}
              height={177}
              className="h-8 w-auto brightness-0"
            />
          </Link>
          <a
            href={`tel:${businessIdentity.telephone}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy hover:underline"
          >
            <Phone className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">+91 75511 20242</span>
            <span className="sm:hidden">Call us</span>
          </a>
        </div>
      </header>
      <main>
        <section
          className="bg-navy bg-linear-to-br from-navy to-[#102754] py-8 text-on-dark lg:py-14"
          aria-labelledby="quote-title"
        >
          <div className="page-shell grid max-w-[1200px] items-center gap-7 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
            <div>
              <p className="text-xs font-semibold tracking-[.12em] text-[#f4c657] uppercase">
                Ecommerce development in Delhi NCR
              </p>
              <h1
                id="quote-title"
                className="mt-4 max-w-[560px] text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[1.08] tracking-tight"
              >
                Build an online store <span className="text-[#f4c657]">you can run.</span>
              </h1>
              <p className="mt-4 max-w-[450px] text-base leading-7 text-on-dark/90">
                Get an itemised quote for a Shopify store, WooCommerce website or B2B ordering
                portal. We’ll scope your catalogue, checkout and launch around how you sell.
              </p>
              <a
                href="#quote-form"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-[#f4c657] px-5 text-sm font-bold text-navy hover:bg-[#ffe29c] lg:hidden"
              >
                Request a quote <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <Link
                to="/work/portfolio"
                className="mt-5 hidden w-fit items-center gap-2 text-sm font-semibold text-on-dark underline underline-offset-4 lg:inline-flex"
              >
                See websites we’ve built <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
              <div
                className="mt-6 hidden aspect-[2.25] max-w-[520px] rounded-xl border border-white/15 bg-cover bg-center lg:block lg:bg-[url('/images/ecommerce-quote.webp')]"
                aria-hidden="true"
              />
            </div>
            <QuoteForm />
          </div>
        </section>
        <section className="bg-background py-10 md:py-14" aria-labelledby="store-types">
          <div className="page-shell max-w-[1200px]">
            <h2 id="store-types" className="text-2xl font-semibold text-navy md:text-3xl">
              Which store fits your business?
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {projectTypes.map(([name, copy]) => (
                <article key={name} className="rounded-lg border border-border bg-card p-5">
                  <Store className="size-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-semibold text-navy">
                    {name === "B2B Commerce" ? "B2B ordering portal" : name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-primary">
              <Link
                to="/work/portfolio"
                className="inline-flex items-center gap-1.5 underline underline-offset-4"
              >
                See our portfolio <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1.5 underline underline-offset-4"
              >
                What goes into a quote <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border bg-white py-5">
        <div className="page-shell flex max-w-[1200px] flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>Webgram IT Solution · New Delhi, India</span>
          <Link to="/privacy-policy" className="underline underline-offset-4">
            Privacy policy
          </Link>
        </div>
      </footer>
    </>
  );
}

function QuoteForm() {
  const send = useServerFn(submitEnquiry);
  const sending = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "received">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const fields = new FormData(event.currentTarget);
    const read = (name: string) => String(fields.get(name) ?? "").trim();
    sending.current = true;
    setStatus("sending");
    setError("");
    try {
      const result = await send({
        data: {
          name: read("name"),
          email: read("email"),
          phone: read("phone"),
          service: read("service"),
          message: read("message"),
          website: read("website"),
        },
      });
      if (!result.ok) throw new Error("The enquiry was not accepted");
      setStatus("received");
      (window as Window & { dataLayer?: unknown[] }).dataLayer?.push({
        event: "ecommerce_quote_submitted",
      });
    } catch (caught) {
      setError(
        caught instanceof Error && /too many|limit/i.test(caught.message)
          ? "An enquiry was already sent recently. Please call us if you need to add details."
          : "We couldn’t send your request just now. Try again or call us.",
      );
      setStatus("idle");
    } finally {
      sending.current = false;
    }
  }

  return (
    <div
      id="quote-form"
      className="scroll-mt-4 rounded-2xl border border-border bg-card p-5 text-foreground shadow-xl sm:p-7"
    >
      {status === "received" ? (
        <div role="status" className="py-8">
          <CheckCircle2 className="size-8 text-success" aria-hidden="true" />
          <h2 className="mt-3 text-2xl text-navy">Request received</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We’ll review your project and reply to the email you provided.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-navy">Request a project quote</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Tell us what you sell and what you want your store to do.
          </p>
          <form
            method="post"
            onSubmit={submit}
            className="mt-4 grid gap-3 sm:grid-cols-2"
            aria-busy={status === "sending"}
          >
            <label className="grid gap-1.5 text-sm font-medium text-navy">
              Name
              <Input
                name="name"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                className="h-11"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-navy">
              Email
              <Input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={255}
                required
                className="h-11"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-navy">
              Project type
              <select
                name="service"
                required
                defaultValue=""
                className="h-11 min-w-0 rounded-md border border-input bg-card px-3 text-base md:text-sm"
              >
                <option value="" disabled>
                  Select a project
                </option>
                {projectTypes.map(([name]) => (
                  <option key={name}>{name}</option>
                ))}
                <option value="Ecommerce Development">Help me choose</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-navy">
              Phone (optional)
              <Input name="phone" type="tel" autoComplete="tel" maxLength={30} className="h-11" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-navy sm:col-span-2">
              Project details
              <Textarea
                name="message"
                minLength={5}
                maxLength={2200}
                required
                className="min-h-20"
                placeholder="Products, features or launch timing"
              />
            </label>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
            {error && (
              <p role="alert" className="text-sm font-medium text-destructive sm:col-span-2">
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={status === "sending"}
              className="h-11 w-full font-semibold sm:col-span-2"
            >
              {status === "sending" ? "Sending…" : "Send quote request"}{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <p className="text-xs leading-5 text-muted-foreground sm:col-span-2">
              We use your details to respond to this enquiry.{" "}
              <Link to="/privacy-policy" className="underline underline-offset-4">
                Privacy policy
              </Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
}
