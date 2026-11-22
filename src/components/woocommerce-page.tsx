import { ServiceHero } from "@/components/service-hero";
import { HeroHeading } from "@/components/hero-heading";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Box,
  Code2,
  CreditCard,
  FileQuestion,
  Headphones,
  Layers3,
  Megaphone,
  PackageCheck,
  Palette,
  Percent,
  Plug,
  Rocket,
  Search,
  Settings,
  Shirt,
  ShoppingCart,
  Smartphone,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { useRef, type ReactNode } from "react";

import wooHero from "@/assets/woocommerce-hero.jpg";
import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { Button } from "@/components/ui/button";
import { deliveredProjects, wooIntegrations } from "@/lib/site-images";

const heroBenefits = [
  [ShoppingCart, "Custom", "Store Design"],
  [Settings, "Advanced", "Features"],
  [Users, "Third-Party", "Integrations"],
  [BarChart3, "SEO", "Optimized"],
] as const;

const strengths = [
  [ShoppingCart, "Tailored Store Design", "Unique designs that reflect your brand and drive sales."],
  [Settings, "Custom Functionality", "Build features that match your specific business needs."],
  [Plug, "Seamless Integrations", "Connect payment gateways, shipping, CRM and other tools."],
  [Headphones, "Ongoing Support", "Continuous maintenance, updates and technical support."],
] as const;

const solutions = [
  [Store, "WooCommerce Store Setup", "Complete installation and configuration with essential settings.", "text-primary"],
  [Palette, "Custom Theme Development", "Unique, conversion-focused designs tailored to your brand.", "text-primary"],
  [Layers3, "Plugin Development", "Custom plugins to add advanced features and functionality.", "text-primary"],
  [CreditCard, "Payment Gateway Integration", "Razorpay, PayU, Stripe, COD and multiple payment options.", "text-primary"],
  [Truck, "Shipping & Logistics Setup", "Integrate shipping partners and configure shipping rules.", "text-orange"],
  [Box, "Product & Catalog Management", "Bulk product upload, variations, attributes and custom filters.", "text-orange"],
  [Users, "Membership & B2B Features", "Wholesale pricing, user roles, MOQ, RFQ and private stores.", "text-orange"],
  [BarChart3, "Store Optimization", "Speed optimization, SEO and performance tuning.", "text-violet"],
] as const;

const features = [
  [Shirt, "Product Variations", "Multiple options like size, color and style"],
  [Users, "User Roles & Tier Pricing", "Wholesale, retailer and guest pricing"],
  [Box, "Minimum Order Quantity (MOQ)", "Set MOQ for products and categories"],
  [FileQuestion, "Request for Quotation (RFQ)", "Get bulk inquiries and custom quotes"],
  [Percent, "Coupon & Discount System", "Dynamic coupons and special offers"],
  [BarChart3, "Order Tracking & Notifications", "Real-time customer updates"],
  [Smartphone, "Mobile Responsive", "Perfect shopping experience on every device"],
] as const;


const projects = [
  [deliveredProjects.corporate, "Home Decor Store", "Custom WooCommerce Store"],
  [deliveredProjects.business, "Organic Food Store", "Product Variations & Subscriptions"],
  [deliveredProjects.professional, "Fashion & Lifestyle", "Custom Design & Filters"],
  [deliveredProjects.realEstate, "B2B Industrial Store", "MOQ, RFQ & Tier Pricing"],
  [deliveredProjects.healthcare, "Electronics Store", "Multi-Vendor & Advanced Filters"],
] as const;

const process = [
  [Search, "01", "Discovery", "Understand your business goals and requirements."],
  [PackageCheck, "02", "Strategy", "Plan store structure, design and integrations."],
  [Palette, "03", "Design", "Create custom, user-friendly designs."],
  [Code2, "04", "Development", "Build with clean code and required features."],
  [Settings, "05", "Testing", "Ensure smooth functionality, security and performance."],
  [Rocket, "06", "Launch", "Go live and provide ongoing support."],
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-0.5 w-8 bg-gold" />{children}</p>;
}

function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  return <div className="relative mt-3">
    <div ref={track} className="ecom-scroll grid snap-x grid-flow-col auto-cols-[245px] gap-2 overflow-x-auto md:grid-cols-5 md:overflow-visible">
      {projects.map(([image, title, text]) => <article key={title} className="snap-start overflow-hidden rounded-md border border-border bg-card">
        <img src={image} alt={title} width={640} height={360} loading="lazy" className="h-[112px] w-full object-cover" />
        <div className="px-3 py-2"><h3 className="text-[13px] font-extrabold text-navy">{title}</h3><p className="mt-0.5 text-[12px] text-primary">{text}</p></div>
      </article>)}
    </div>
    <Button type="button" variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous projects" className="absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowLeft /></Button>
    <Button type="button" variant="outline" size="icon" onClick={() => move(1)} aria-label="Next projects" className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowRight /></Button>
  </div>;
}

export function WooCommercePage() {
  return <main className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <ServiceHero slug="woocommerce">
      <div className="ecom-shell relative flex h-full items-center py-5">
        <div className="relative max-w-[540px]">
          <nav className="sr-only" aria-label="Breadcrumb"><Link to="/">Home</Link> › Services › WooCommerce Development</nav>
          <HeroHeading className="text-[29px] font-medium leading-[1.08] sm:text-[33px] md:text-[36px] lg:text-[39px]" lines={["WooCommerce Stores", "Built on WordPress"]} accent="text-gold" />
          <p className="mt-3 max-w-[470px] text-[13px] leading-[1.45] text-on-dark/90 md:text-[14px]">We build scalable WooCommerce stores with custom features, secure payment integrations and seamless user experiences to help you sell more online.</p>
          <div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Get a Free Consultation <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View Our Work <ArrowRight /></Link></Button></div>
          <div className="mt-4 grid max-w-[410px] grid-cols-4 gap-3">{heroBenefits.map(([Icon, first, second]) => <div key={first} className="text-center text-[12px] font-semibold leading-[1.25]"><span className="mx-auto mb-1.5 grid h-9 w-9 place-items-center rounded-full border border-on-dark/50"><Icon className="h-4 w-4" /></span>{first}<br />{second}</div>)}</div>
        </div>
      </div>
    </ServiceHero>

    <section className="bg-card py-6 md:py-7"><div className="ecom-shell grid gap-5 md:grid-cols-[1.05fr_1.95fr] md:items-center">
      <div><Eyebrow>Why Choose Webgram</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-[1.05] text-navy md:text-[27px]">Your WooCommerce<br />Development Partner</h2><p className="mt-2 max-w-[470px] text-[14px] leading-[1.5] text-muted-foreground md:text-[14px]">We create high-performance WooCommerce stores tailored to your business goals, with custom designs, advanced functionality and smooth integrations to deliver a complete eCommerce solution.</p></div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{strengths.map(([Icon, title, text]) => <article key={title} className="min-h-[150px] rounded-md border border-border bg-card p-4 shadow-card"><Icon className="h-9 w-9 text-primary" /><h3 className="mt-3 text-[14px] font-extrabold leading-[1.2] text-navy">{title}</h3><p className="mt-1.5 text-[14px] leading-[1.5] text-muted-foreground">{text}</p></article>)}</div>
    </div></section>

    <section className="bg-sky-soft py-6 md:py-7"><div className="ecom-shell"><Eyebrow>Our WooCommerce Services</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Complete WooCommerce Solutions</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">{solutions.map(([Icon, title, text, tone]) => <article key={title} className="grid min-h-[92px] grid-cols-[52px_1fr] items-center gap-3 rounded-md bg-card p-3.5"><span className={`grid h-12 w-12 place-items-center rounded-md bg-primary-soft ${tone}`}><Icon className="h-7 w-7" /></span><div><h3 className="text-[13px] font-extrabold leading-[1.25] text-navy">{title}</h3><p className="mt-1 text-[14px] leading-[1.45] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-card py-6"><div className="ecom-shell"><Eyebrow>Built for Growth</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Key WooCommerce Features</h2><div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-7">{features.map(([Icon, title, text]) => <article key={title} className="grid grid-cols-[40px_1fr] gap-2.5"><Icon className="h-8 w-8 text-primary" /><div><h3 className="text-[15px] font-extrabold leading-[1.25] text-navy">{title}</h3><p className="mt-1 text-[14px] leading-[1.45] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-card pb-6"><div className="ecom-shell"><Eyebrow>Connected Commerce</Eyebrow><h2 className="mt-2 text-[21px] font-extrabold leading-none text-navy md:text-[24px]">Integrations We Support</h2><div className="ecom-scroll mt-4 grid grid-flow-col auto-cols-[calc((100%_-_18px)/4)] gap-1.5 overflow-x-auto md:auto-cols-[calc((100%_-_54px)/10)] lg:auto-cols-[calc((100%_-_72px)/13)]">{wooIntegrations.map(({ name, src }) => <span key={name} className="grid aspect-square min-w-0 place-items-center rounded-md border border-border bg-card p-1 shadow-card"><img src={src} alt={`${name} logo`} loading="lazy" className="max-h-full w-full object-contain" /></span>)}</div></div></section>

    <section className="bg-sky-soft py-6"><div className="ecom-shell"><div className="flex items-end justify-between gap-4"><div><Eyebrow>Our Recent Work</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Featured WooCommerce Projects</h2></div><Button asChild variant="outline" className="hidden h-9 border-navy bg-card px-4 text-[12px] font-bold text-navy md:inline-flex"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View All Projects <ArrowRight /></Link></Button></div><Projects /></div></section>

    <section className="bg-card py-6"><div className="ecom-shell"><Eyebrow>How We Build</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Our Development Process</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-3">{process.map(([Icon, number, title, text], index) => <article key={title} className="relative grid grid-cols-[45px_1fr] gap-2">{index < process.length - 1 && <span aria-hidden="true" className="absolute left-[40px] right-[-14px] top-[20px] hidden h-px bg-primary/40 md:block"><ArrowRight className="absolute -right-1 -top-[6px] h-3 w-3 text-primary" /></span>}<span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span><div className="relative z-10"><strong className="text-[12px] text-navy">{number}</strong><h3 className="mt-0.5 text-[13px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[12px] leading-[1.35] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="relative overflow-hidden bg-navy py-7 text-on-dark"><img src={wooHero} alt="" width={1536} height={768} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-25" /><div className="bg-cta-overlay absolute inset-0" /><div className="ecom-shell relative grid items-center gap-7 md:grid-cols-[.9fr_1.1fr]"><div><p className="ecom-eyebrow">Ready to Build Your Online Store?</p><h2 className="mt-2 text-[25px] font-bold leading-[1.08] md:text-[29px]">Let’s Create a Powerful<br />WooCommerce Store Together.</h2><p className="mt-2 max-w-[500px] text-[13px] leading-[1.45] text-on-dark/85">Get a free consultation and let our experts build a WooCommerce store that helps you grow your business.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/60 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button></div></div><TrustFacts /></div></section>
  </main>;
}