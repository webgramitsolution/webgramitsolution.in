import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Code2,
  FileText,
  Headphones,
  LayoutDashboard,
  Lock,
  PenTool,
  Plug,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Store,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { useRef, type ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { Button } from "@/components/ui/button";
import { deliveredProjects, nextjsLogo, portalImages, technologyStack } from "@/lib/site-images";

const PORTAL_TECH_LOGOS = {
  Laravel: "https://ik.imagekit.io/cf1bg2bnu/Laravel.svg?updatedAt=1791030350339",
  PHP: "https://ik.imagekit.io/cf1bg2bnu/php.svg?updatedAt=1791030389514",
  MySQL: "https://ik.imagekit.io/cf1bg2bnu/MySQL.svg?updatedAt=1791030316642",
  Redux: "https://ik.imagekit.io/cf1bg2bnu/redux.svg?updatedAt=1791030288711",
  "Tailwind CSS": "https://ik.imagekit.io/cf1bg2bnu/Tailwind%20CSS.webp?updatedAt=1791030246669",
} as const;

const heroBenefits = [
  [Users, "Role-Based", "Access"],
  [ShieldCheck, "Secure &", "Scalable"],
  [Workflow, "Custom", "Workflows"],
  [BarChart3, "Real-Time", "Data"],
  [LayoutDashboard, "Multi-User", "Dashboards"],
] as const;

const strengths = [
  [Target, "Business-Centric Solutions", "Tailored portals to solve real business challenges."],
  [Settings, "Modern & Scalable Technology", "Built with latest frameworks for performance and future growth."],
  [Users, "User-Friendly Interface", "Clean, intuitive and easy-to-use dashboards for all user types."],
  [Headphones, "Ongoing Support", "Continuous maintenance, feature upgrades and dedicated support."],
] as const;

const portalTypes = [
  [Users, portalImages.customer, "Customer Portal", "Self-service portals for orders, support, downloads and account management.", "bg-violet-soft text-violet"],
  [Store, portalImages.vendor, "Vendor Portal", "Vendor registration, product management, order tracking, payments and reports.", "bg-success-soft text-success"],
  [Users, portalImages.employee, "Employee Portal", "Internal tools for HR, tasks, leaves, announcements, knowledge base and more.", "bg-primary-soft text-primary"],
  [Settings, portalImages.admin, "Admin Portal", "Complete control over users, content, orders, reports, permissions and settings.", "bg-warning-soft text-warning"],
] as const;

const features = [
  [ShieldCheck, "Role-Based Access Control", "Different dashboards for different user roles."],
  [Workflow, "Custom Workflows", "Automate approvals, notifications and business processes."],
  [BarChart3, "Advanced Dashboards", "Real-time reports, analytics and insights."],
  [Users, "Multi-User Management", "Customers, vendors, employees and admins."],
  [Plug, "Third-Party Integrations", "Connect with CRM, ERP, payment gateways and other systems."],
  [Lock, "Secure & Scalable", "Enterprise-grade security with scalable architecture."],
] as const;

const process = [
  [Search, "01", "Discovery", "Understand your goals, users and requirements."],
  [FileText, "02", "Planning", "Create structure, architecture and feature list."],
  [PenTool, "03", "UI/UX Design", "Design modern and user-friendly interfaces."],
  [Code2, "04", "Development", "Build with clean, scalable and secure code."],
  [Settings, "05", "Testing", "Ensure performance, security and usability."],
  [Rocket, "06", "Deployment", "Go live and provide ongoing support."],
] as const;

const pickTech = (name: string) => technologyStack.find((tech) => tech.name === name)?.src ?? "";

const technologies = [
  { name: "React.js", src: pickTech("React.js") },
  { name: "Next.js", src: nextjsLogo },
  { name: "Node.js", src: pickTech("Node.js") },
  { name: "Laravel", src: PORTAL_TECH_LOGOS.Laravel },
  { name: "PHP", src: PORTAL_TECH_LOGOS.PHP },
  { name: "MySQL", src: PORTAL_TECH_LOGOS.MySQL },
  { name: "PostgreSQL", src: pickTech("PostgreSQL") },
  { name: "AWS", src: pickTech("AWS") },
  { name: "Google Cloud", src: pickTech("Google Cloud") },
  { name: "Supabase", src: pickTech("Supabase") },
  { name: "Redux", src: PORTAL_TECH_LOGOS.Redux },
  { name: "Tailwind CSS", src: PORTAL_TECH_LOGOS["Tailwind CSS"] },
] as const;

const projects = [
  [deliveredProjects.corporate, "B2B Vendor Portal", "Manufacturing Industry"],
  [deliveredProjects.business, "Customer Portal", "Retail & Lifestyle"],
  [deliveredProjects.professional, "Employee Portal", "Corporate Organization"],
  [deliveredProjects.realEstate, "Admin Dashboard", "Multi-Vendor Marketplace"],
  [deliveredProjects.healthcare, "Service Portal", "Healthcare Industry"],
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-0.5 w-8 bg-gold" />{children}</p>;
}

function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  return <div className="relative mt-3">
    <div ref={track} className="ecom-scroll grid snap-x grid-flow-col auto-cols-[245px] gap-2 overflow-x-auto md:grid-cols-5 md:overflow-visible">
      {projects.map(([image, title, industry]) => <article key={title} className="snap-start overflow-hidden rounded-md border border-border bg-card">
        <img src={image} alt={title} width={640} height={360} loading="lazy" className="h-[118px] w-full object-cover" />
        <div className="px-3 py-2"><h3 className="text-[15px] font-extrabold text-navy">{title}</h3><p className="mt-0.5 text-[13px] font-semibold text-primary">{industry}</p></div>
      </article>)}
    </div>
    <Button type="button" variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous projects" className="absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowLeft /></Button>
    <Button type="button" variant="outline" size="icon" onClick={() => move(1)} aria-label="Next projects" className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowRight /></Button>
  </div>;
}

export function WebPortalDevelopmentPage() {
  return <main className="min-h-screen bg-background text-foreground">
    <SiteHeader />

    <section className="ecom-hero relative overflow-hidden bg-navy text-on-dark">
      <img src={portalImages.hero} alt="Webgram admin dashboard, vendor portal and customer portal on laptop, tablet and phone" width={2170} height={725} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="ecom-hero-shade absolute inset-0" />
      <div className="ecom-shell relative flex h-full items-center py-5">
        <div className="max-w-[520px]">
          <nav className="sr-only" aria-label="Breadcrumb"><Link to="/">Home</Link> › Services › Web Portal Development</nav>
          <h1 className="text-[27px] font-medium leading-[1.08] sm:text-[33px] md:text-[36px] lg:text-[39px]"><span className="block whitespace-nowrap">Custom Web Portals</span><span className="block whitespace-nowrap">That <span className="text-gold">Accelerate Growth.</span></span></h1>
          <p className="mt-3 max-w-[470px] text-[13px] leading-[1.45] text-on-dark/90 md:text-[14px]">We design and develop powerful web portals tailored to your business needs — including customer portals, vendor portals, employee portals and advanced dashboards.</p>
          <div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Get a Free Consultation <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View Our Work <ArrowRight /></Link></Button></div>
          <div className="mt-4 grid max-w-[500px] grid-cols-3 gap-3 sm:grid-cols-5">{heroBenefits.map(([Icon, first, second]) => <div key={first} className="text-center text-[12px] font-semibold leading-[1.25]"><span className="mx-auto mb-1.5 grid h-9 w-9 place-items-center rounded-full border border-on-dark/50"><Icon className="h-4 w-4" /></span>{first}<br />{second}</div>)}</div>
        </div>
      </div>
    </section>

    <section className="bg-card py-6 md:py-7"><div className="ecom-shell grid gap-5 md:grid-cols-[1.05fr_1.95fr] md:items-center">
      <div><Eyebrow>Why Choose Webgram</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-[1.05] text-navy md:text-[27px]">Your Web Portal<br />Development Partner</h2><p className="mt-2 max-w-[470px] text-[14px] leading-[1.5] text-muted-foreground md:text-[14px]">We build secure, scalable and feature-rich web portals that streamline operations, improve collaboration and enhance user experiences for your customers, vendors, employees and business partners.</p></div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{strengths.map(([Icon, title, text]) => <article key={title} className="min-h-[150px] rounded-md border border-border bg-card p-4 shadow-card"><Icon className="h-9 w-9 text-primary" /><h3 className="mt-3 text-[14px] font-extrabold leading-[1.2] text-navy">{title}</h3><p className="mt-1.5 text-[14px] leading-[1.5] text-muted-foreground">{text}</p></article>)}</div>
    </div></section>

    <section className="bg-sky-soft py-6 md:py-7"><div className="ecom-shell"><Eyebrow>Types of Web Portals We Develop</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Portals Built Around Your Users</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">{portalTypes.map(([Icon, image, title, text, tone]) => <article key={title} className="overflow-hidden rounded-md border border-border bg-card shadow-card"><img src={image} alt={title} width={640} height={400} loading="lazy" className="h-[132px] w-full object-cover" /><div className="p-3.5"><div className="flex items-center gap-2.5"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${tone}`}><Icon className="h-5 w-5" /></span><h3 className="text-[13px] font-extrabold leading-[1.2] text-primary">{title}</h3></div><p className="mt-2 text-[14px] leading-[1.45] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-card py-6"><div className="ecom-shell"><Eyebrow>Key Features</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Everything Your Portal Needs</h2><div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">{features.map(([Icon, title, text]) => <article key={title}><Icon className="h-8 w-8 text-primary" /><h3 className="mt-2.5 text-[15px] font-extrabold leading-[1.25] text-navy">{title}</h3><p className="mt-1 text-[14px] leading-[1.45] text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section className="bg-sky-soft py-6"><div className="ecom-shell"><Eyebrow>Our Development Process</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">How We Build Your Portal</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-3">{process.map(([Icon, number, title, text], index) => <article key={title} className="relative grid grid-cols-[45px_1fr] gap-2">{index < process.length - 1 && <span aria-hidden="true" className="absolute left-[40px] right-[-14px] top-[20px] hidden h-px bg-primary/40 md:block"><ArrowRight className="absolute -right-1 -top-[6px] h-3 w-3 text-primary" /></span>}<span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span><div className="relative z-10"><strong className="text-[12px] text-navy">{number}</strong><h3 className="mt-0.5 text-[15px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[14px] leading-[1.4] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-card py-6 md:py-7"><div className="ecom-shell"><Eyebrow>Technologies We Use</Eyebrow><div className="ecom-scroll mt-5 grid grid-flow-col auto-cols-[calc((100%_-_30px)/4)] gap-2.5 overflow-x-auto pb-1 md:auto-cols-[calc((100%_-_110px)/12)] md:overflow-visible">{technologies.map(({ name, src }) => <figure key={name} className="min-w-0"><span className="grid aspect-square place-items-center rounded-lg border border-border bg-card p-3 shadow-card"><img src={src} alt={`${name} logo`} loading="lazy" className="max-h-full w-full object-contain" /></span><figcaption className="mt-2 text-center text-[14px] font-semibold leading-tight text-navy">{name}</figcaption></figure>)}</div></div></section>

    <section className="bg-sky-soft py-6"><div className="ecom-shell"><div className="flex items-end justify-between gap-4"><div><Eyebrow>Our Recent Work</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Featured Web Portal Projects</h2></div><Button asChild variant="outline" className="hidden h-9 border-navy bg-card px-4 text-[12px] font-bold text-navy md:inline-flex"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View All Projects <ArrowRight /></Link></Button></div><Projects /></div></section>

    <section className="relative overflow-hidden bg-navy py-7 text-on-dark"><img src={portalImages.hero} alt="" width={2170} height={725} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-25" /><div className="bg-cta-overlay absolute inset-0" /><div className="ecom-shell relative grid items-center gap-7 md:grid-cols-[.9fr_1.1fr]"><div><p className="ecom-eyebrow">Ready to Build Your Web Portal?</p><h2 className="mt-2 text-[25px] font-bold leading-[1.08] md:text-[29px]">Let’s Build a Smarter<br />Digital Experience Together.</h2><p className="mt-2 max-w-[500px] text-[13px] leading-[1.45] text-on-dark/85">Get a free consultation and let our experts design and develop a web portal that simplifies your operations and drives growth.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/60 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button></div></div><TrustFacts /></div></section>
  </main>;
}
