import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Braces,
  ClipboardList,
  CloudCog,
  Code2,
  CreditCard,
  FileText,
  Headphones,
  Link2,
  MapPin,
  Megaphone,
  MessageCircle,
  PackageCheck,
  Rocket,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import { useRef, type ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { Button } from "@/components/ui/button";
import { apiIntegrationImages, apiPlatformLogos, deliveredProjects } from "@/lib/site-images";

const heroBenefits = [
  [Share2, "Seamless", "Integration"],
  [ShieldCheck, "Secure &", "Reliable"],
  [Workflow, "Custom", "Solutions"],
  [Rocket, "Faster", "Operations"],
  [Headphones, "Expert", "Support"],
] as const;

const strengths = [
  [Link2, "Wide Range of Integrations", "Connect with leading tools and platforms."],
  [Settings, "Custom Integration Solutions", "Tailored to your business needs."],
  [ShieldCheck, "Secure & Reliable", "Industry best practices for data security and stability."],
  [Headphones, "Ongoing Support", "Continuous monitoring, updates and technical assistance."],
] as const;

const categories = [
  [CreditCard, "Payment Gateways", "Razorpay, PayU, Stripe, PayPal, Cashfree, Instamojo", "bg-primary-soft text-primary"],
  [Truck, "Shipping & Logistics", "ShipRocket, Delhivery, BlueDart, Ecom Express, India Post", "bg-orange-soft text-orange"],
  [Megaphone, "CRM & Marketing", "Zoho CRM, HubSpot, Salesforce, Mailchimp, Meta Ads", "bg-violet-soft text-violet"],
  [MessageCircle, "Communication", "WhatsApp API, SMS Gateway, Email (SMTP), IVR & Voice APIs", "bg-primary-soft text-primary"],
  [FileText, "Accounting & ERP", "Tally, Zoho Books, SAP, Odoo, QuickBooks", "bg-warning-soft text-warning"],
  [Share2, "Social Media & Analytics", "Facebook, Instagram, LinkedIn, Google Analytics, Google Tag Manager", "bg-primary-soft text-primary"],
  [MapPin, "Maps & Location", "Google Maps, Geolocation, Address Validation, Location APIs", "bg-success-soft text-success"],
  [Braces, "Custom API Integration", "Third-party tools, custom platforms and proprietary business systems", "bg-primary-soft text-primary"],
] as const;

const process = [
  [Search, "01", "Consultation", "Understand your business goals and integration requirements."],
  [ClipboardList, "02", "Planning", "Choose the right APIs and define the workflow."],
  [Link2, "03", "Development", "Build and configure secure integrations."],
  [PackageCheck, "04", "Testing", "Ensure smooth functionality and data accuracy."],
  [Settings, "05", "Deployment", "Go live with complete support."],
  [Rocket, "06", "Ongoing Support", "Monitor, maintain and update integrations."],
] as const;


const projects = [
  [deliveredProjects.corporate, "Razorpay Payment Integration", "Ecommerce Store"],
  [deliveredProjects.business, "ShipRocket Shipping Integration", "B2B Marketplace"],
  [deliveredProjects.professional, "Zoho CRM Integration", "Business Portal"],
  [deliveredProjects.realEstate, "WhatsApp API Integration", "Customer Notifications"],
  [deliveredProjects.healthcare, "Tally Integration", "Accounting Automation"],
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-0.5 w-8 bg-gold" />{children}</p>;
}


function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  return <div className="relative mt-3"><div ref={track} className="ecom-scroll grid snap-x grid-flow-col auto-cols-[245px] gap-2 overflow-x-auto md:grid-cols-5 md:overflow-visible">{projects.map(([image, title, text]) => <article key={title} className="snap-start overflow-hidden rounded-md border border-border bg-card"><img src={image} alt={title} width={640} height={360} loading="lazy" className="h-[112px] w-full object-cover" /><div className="px-3 py-2"><h3 className="text-[14px] font-extrabold text-navy">{title}</h3><p className="mt-0.5 text-[13px] font-semibold text-primary">{text}</p></div></article>)}</div><Button type="button" variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous projects" className="absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowLeft /></Button><Button type="button" variant="outline" size="icon" onClick={() => move(1)} aria-label="Next projects" className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowRight /></Button></div>;
}

export function ApiIntegrationPage() {
  return <main className="min-h-screen bg-background text-foreground"><SiteHeader />
    <section className="ecom-hero relative overflow-hidden bg-navy text-on-dark"><img src={apiIntegrationImages.hero} alt="Connected business applications and integration dashboard on laptop and phone" width={2092} height={752} className="absolute inset-0 h-full w-full object-cover object-center" /><div className="ecom-hero-shade absolute inset-0" /><div className="ecom-shell relative flex h-full items-center py-5"><div className="max-w-[530px]"><nav className="sr-only" aria-label="Breadcrumb"><Link to="/">Home</Link> › Services › API & Third-Party Integration</nav><h1 className="text-[29px] font-medium leading-[1.08] sm:text-[33px] md:text-[36px] lg:text-[39px]">API Integration<br />for <span className="text-gold">Commerce Operations</span></h1><p className="mt-3 max-w-[480px] text-[13px] leading-[1.45] text-on-dark/90 md:text-[14px]">Connect storefronts and apps to inventory, payments, CRM and analytics. We scope data ownership, sync timing and how your team handles failed updates.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Get a Free Consultation <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="#integration-solutions">View Integration Solutions <ArrowRight /></a></Button></div><div className="mt-4 grid max-w-[500px] grid-cols-5 gap-2">{heroBenefits.map(([Icon, first, second]) => <div key={first} className="text-center text-[12px] font-semibold leading-[1.25]"><span className="mx-auto mb-1.5 grid h-9 w-9 place-items-center rounded-full border border-on-dark/50"><Icon className="h-4 w-4" /></span>{first}<br />{second}</div>)}</div></div></div></section>

    <section className="bg-card py-6 md:py-7"><div className="ecom-shell grid gap-5 md:grid-cols-[1.05fr_1.95fr] md:items-center"><div><Eyebrow>Why Choose Webgram</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-[1.05] text-navy md:text-[27px]">Your Integration Partner</h2><p className="mt-2 max-w-[470px] text-[14px] leading-[1.5] text-muted-foreground md:text-[14px]">We help businesses connect their websites, applications and software with trusted third-party services through robust and secure API integrations.</p></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{strengths.map(([Icon, title, text]) => <article key={title} className="min-h-[145px] rounded-md border border-border bg-card p-4 shadow-card"><Icon className="h-9 w-9 text-primary" /><h3 className="mt-3 text-[13px] font-extrabold leading-[1.2] text-navy">{title}</h3><p className="mt-1.5 text-[14px] leading-[1.45] text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section id="integration-solutions" className="bg-sky-soft py-6 md:py-7"><div className="ecom-shell"><Eyebrow>Popular Integration Categories</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Powerful Integrations for Your Business</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">{categories.map(([Icon, title, text, tone]) => <article key={title} className="grid min-h-[104px] grid-cols-[52px_1fr] items-start gap-3 rounded-md border border-border/60 bg-card p-3.5"><span className={`grid h-12 w-12 place-items-center rounded-md ${tone}`}><Icon className="h-7 w-7" /></span><div><h3 className="text-[13px] font-extrabold leading-[1.25] text-navy">{title}</h3><p className="mt-1 text-[14px] leading-[1.45] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-card py-6"><div className="ecom-shell"><Eyebrow>Our Integration Process</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">From Strategy to Seamless Integration</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-3">{process.map(([Icon, number, title, text], index) => <article key={title} className="relative grid grid-cols-[45px_1fr] gap-2">{index < process.length - 1 && <span aria-hidden="true" className="absolute left-[40px] right-[-14px] top-[20px] hidden h-px bg-primary/40 md:block"><ArrowRight className="absolute -right-1 -top-[6px] h-3 w-3 text-primary" /></span>}<span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span><div className="relative z-10"><strong className="text-[12px] text-navy">{number}</strong><h3 className="mt-0.5 text-[14px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[14px] leading-[1.4] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-card pb-7"><div className="ecom-shell"><Eyebrow>Technologies & Platforms We Work With</Eyebrow><div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-10">{apiPlatformLogos.map((platform) => <figure key={platform.name} className="grid h-[72px] place-items-center overflow-hidden rounded-md border border-border bg-card shadow-card md:h-[78px]"><img src={platform.src} alt={`${platform.name} logo`} width={400} height={160} loading="lazy" className="h-auto w-full max-w-none scale-[1.55] object-contain" /><figcaption className="sr-only">{platform.name}</figcaption></figure>)}</div></div></section>

    <section className="bg-sky-soft py-6"><div className="ecom-shell"><div className="flex items-end justify-between gap-4"><div><Eyebrow>Success Stories</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Integration Projects We Have Delivered</h2></div><Button asChild variant="outline" className="hidden h-9 border-navy bg-card px-4 text-[12px] font-bold text-navy md:inline-flex"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View All Projects <ArrowRight /></Link></Button></div><Projects /></div></section>

    <section className="relative overflow-hidden bg-navy py-7 text-on-dark"><img src={apiIntegrationImages.hero} alt="" width={2092} height={752} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-30" /><div className="bg-cta-overlay absolute inset-0" /><div className="ecom-shell relative grid items-center gap-7 md:grid-cols-[.9fr_1.1fr]"><div><p className="ecom-eyebrow">Ready to Connect Your Business?</p><h2 className="mt-2 text-[25px] font-bold leading-[1.08] md:text-[29px]">Let’s Integrate Your<br />Systems For Greater Growth.</h2><p className="mt-2 max-w-[500px] text-[13px] leading-[1.45] text-on-dark/85">Get a free consultation and let our experts help you integrate the right tools for a smarter, more efficient business.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/60 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button></div></div><TrustFacts /></div></section>
  </main>;
}