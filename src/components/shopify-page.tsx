import { HeroHeading } from "@/components/hero-heading";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Code2,
  CreditCard,
  MessageCircle,
  PackageCheck,
  Palette,
  Rocket,
  Search,
  Settings,
  ShoppingBag,
  Smartphone,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import shopifyHero from "@/assets/shopify-hero.jpg";
import { ComparisonTable, DirectAnswer } from "@/components/direct-answer";
import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { Button } from "@/components/ui/button";
import { clientLogos, wooIntegrations } from "@/lib/site-images";
import { shopifyComparison, shopifyDirectAnswer, shopifyFaqs, shopifyServices } from "@/lib/shopify-content";

const heroBenefits = [
  [Palette, "Custom", "Theme Design"],
  [CreditCard, "GoKwik &", "Razorpay"],
  [Truck, "Shiprocket", "Shipping"],
  [Smartphone, "Mobile", "First"],
] as const;

const serviceIcons: LucideIcon[] = [Store, Palette, ShoppingBag, CreditCard, Truck, MessageCircle, PackageCheck, BarChart3];

const integrationNames = ["Razorpay", "GoKwik", "Shiprocket", "WATI", "Judge.me", "interakt", "Delhivery", "BlueDart", "WhatsApp Business", "Google Analytics", "Meta Pixel", "Mailchimp"];
const allLogos = [...clientLogos, ...wooIntegrations];
const integrations = integrationNames
  .map((name) => allLogos.find((logo) => logo.name === name))
  .filter((logo): logo is (typeof allLogos)[number] => Boolean(logo));

const process = [
  [Search, "Discovery", "Understand your products, buyers and goals."],
  [PackageCheck, "Store Plan", "Plan collections, pages, apps and checkout."],
  [Palette, "Theme Design", "Customise the theme around your brand."],
  [Code2, "Build & Integrate", "Add products, payments, shipping and WhatsApp."],
  [Settings, "Testing", "Check orders, payments and phone layouts."],
  [Rocket, "Launch & Support", "Go live and support you after launch."],
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-0.5 w-8 bg-gold" />{children}</p>;
}

export function ShopifyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="ecom-hero relative overflow-hidden bg-navy text-on-dark">
        <img src={shopifyHero} alt="Shopify fashion store shown on a laptop and phone" width={1536} height={768} className="absolute inset-0 h-full w-full object-cover object-center min-[1180px]:!hidden" />
        <div aria-hidden="true" className="ecom-hero-art hidden min-[1180px]:block"><img src={shopifyHero} alt="" width={1536} height={768} /></div>
        <div className="ecom-hero-shade absolute inset-0 min-[1180px]:hidden" />
        <div className="ecom-shell relative flex h-full items-center py-5">
          <div className="relative max-w-[540px]">
            <nav className="sr-only" aria-label="Breadcrumb"><Link to="/">Home</Link> › Services › Shopify Development</nav>
            <HeroHeading className="text-[29px] font-medium leading-[1.08] sm:text-[33px] md:text-[36px] lg:text-[39px]" lines={["Shopify Website Development", "for Indian Brands."]} accent="text-gold" />
            <p className="mt-3 max-w-[470px] text-[14px] leading-[1.5] text-on-dark/90">Delhi NCR based Shopify developers for store setup, custom themes, GoKwik and Razorpay checkout, Shiprocket shipping and WhatsApp order updates.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Get a Free Consultation <ArrowRight /></Link></Button>
              <Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View Our Work <ArrowRight /></Link></Button>
            </div>
            <div className="mt-4 grid max-w-[420px] grid-cols-4 gap-3">
              {heroBenefits.map(([Icon, first, second]) => <div key={second} className="text-center text-[12px] font-semibold leading-[1.25]"><span className="mx-auto mb-1.5 grid h-9 w-9 place-items-center rounded-full border border-on-dark/50"><Icon className="h-4 w-4" /></span>{first}<br />{second}</div>)}
            </div>
          </div>
        </div>
      </section>

      <DirectAnswer id="what-shopify-company-does" question={shopifyDirectAnswer.question} answer={shopifyDirectAnswer.answer} />

      <section className="bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell">
          <Eyebrow>Our Shopify Services</Eyebrow>
          <h2 className="mt-2 text-[23px] font-medium leading-tight text-navy md:text-[27px]">Complete Shopify Store Development</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {shopifyServices.map(([title, text], index) => {
              const Icon = serviceIcons[index] ?? Store;
              return <article key={title} className="grid min-h-[96px] grid-cols-[52px_1fr] items-start gap-3 rounded-md bg-card p-3.5 shadow-card"><span className="grid h-12 w-12 place-items-center rounded-md bg-primary-soft text-primary"><Icon className="h-7 w-7" /></span><div><h3 className="text-[15px] font-medium leading-[1.25] text-navy">{title}</h3><p className="mt-1 text-[14px] leading-[1.45] text-muted-foreground">{text}</p></div></article>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-card py-6" aria-labelledby="shopify-integrations">
        <div className="ecom-shell">
          <Eyebrow>Indian Ecommerce Stack</Eyebrow>
          <h2 id="shopify-integrations" className="mt-2 text-[22px] font-medium leading-tight text-navy md:text-[25px]">Apps & Integrations We Set Up on Shopify</h2>
          <p className="mt-2 max-w-[820px] text-[15px] leading-[1.6] text-muted-foreground">Checkout, payments, shipping, WhatsApp, reviews and analytics tools that Indian shoppers already trust.</p>
          <ul className="ecom-scroll mt-4 grid grid-flow-col auto-cols-[132px] gap-2 overflow-x-auto pb-1 md:grid-flow-row md:auto-cols-auto md:grid-cols-6 md:overflow-visible">
            {integrations.map(({ name, src }) => <li key={name} className="flex h-16 flex-col items-center justify-center gap-1 rounded-md border border-border bg-card px-2 py-1.5 shadow-card"><img src={src} alt={`${name} logo`} loading="lazy" className="max-h-8 w-full object-contain" /><span className="text-[12px] font-medium text-navy">{name}</span></li>)}
          </ul>
        </div>
      </section>

      <ComparisonTable
        id="shopify-vs-woocommerce"
        title="Shopify vs WooCommerce: Which Is Right for Your Store?"
        intro="Both platforms work well for Indian ecommerce. The right choice depends on how fast you want to launch, how much you want to customise and who will maintain the store."
        columns={["Feature", "Shopify", "WooCommerce", "Better choice"]}
        rows={shopifyComparison}
      />

      <section className="bg-sky-soft py-6" aria-labelledby="shopify-process">
        <div className="ecom-shell">
          <Eyebrow>How We Build</Eyebrow>
          <h2 id="shopify-process" className="mt-2 text-[23px] font-medium leading-tight text-navy md:text-[27px]">Our Shopify Development Process</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {process.map(([Icon, title, text], index) => <li key={title} className="rounded-md bg-card p-3.5 shadow-card"><span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span><strong className="mt-2 block text-[13px] text-primary">Step {String(index + 1).padStart(2, "0")}</strong><h3 className="mt-0.5 text-[15px] font-medium text-navy">{title}</h3><p className="mt-1 text-[14px] leading-[1.45] text-muted-foreground">{text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="bg-card py-6 md:py-8" aria-labelledby="shopify-faqs">
        <div className="ecom-shell">
          <Eyebrow>Shopify FAQs</Eyebrow>
          <h2 id="shopify-faqs" className="mt-2 text-[23px] font-medium leading-tight text-navy md:text-[27px]">Shopify Development Questions, Answered</h2>
          <div className="mt-4 grid items-start gap-3 md:grid-cols-2">
            {shopifyFaqs.map(([question, answer]) => (
              <details key={question} className="group rounded-lg border border-border bg-card px-5 py-4 shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium text-navy">{question}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" /></summary>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-4 text-[15px] text-muted-foreground">Comparing platforms? See our <Link to="/services/$slug" params={{ slug: "woocommerce" }} className="font-medium text-primary underline">WooCommerce development</Link> page or the full <Link to="/resources/faqs" className="font-medium text-primary underline">FAQs</Link>.</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-7 text-on-dark">
        <img src={shopifyHero} alt="" width={1536} height={768} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-25" />
        <div className="bg-cta-overlay absolute inset-0" />
        <div className="ecom-shell relative grid items-center gap-7 md:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="ecom-eyebrow">Ready to Sell on Shopify?</p>
            <h2 className="mt-2 text-[25px] font-medium leading-[1.08] md:text-[29px]">Let’s Build Your<br />Shopify Store Together.</h2>
            <p className="mt-2 max-w-[500px] text-[14px] leading-[1.5] text-on-dark/85">Share your products and goals. We will suggest the right theme, apps and checkout setup with a fixed itemised quote.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button>
              <Button asChild variant="outline" className="h-10 border-on-dark/60 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button>
            </div>
          </div>
          <TrustFacts />
        </div>
      </section>
    </main>
  );
}
