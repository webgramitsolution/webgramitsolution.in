import { ServiceHero } from "@/components/service-hero";
import { HeroHeading } from "@/components/hero-heading";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ClipboardList,
  CloudUpload,
  Gauge,
  Headphones,
  Search,
  Settings,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import {
  siCloudflare,
  siCpanel,
  siGooglecloud,
  siHtml5,
  siLaravel,
  siPhp,
  siShopify,
  siWordpress,
} from "simple-icons";

import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { Button } from "@/components/ui/button";
import { deliveredProjects, maintenanceImages } from "@/lib/site-images";

const heroBenefits = [
  [Settings, "Regular", "Updates"],
  [ShieldCheck, "Security", "Monitoring"],
  [Gauge, "Speed", "Optimization"],
  [CloudUpload, "Daily", "Backups"],
  [Headphones, "Expert", "Support"],
] as const;

const strengths = [
  [Wrench, "Proactive Maintenance", "Prevent issues before they impact your business."],
  [ShieldCheck, "Enhanced Security", "Protect against threats and malware."],
  [Zap, "Faster Performance", "Improve loading speed and user experience."],
  [Activity, "Zero Downtime", "Ensure maximum uptime and reliability."],
  [Headphones, "Dedicated Support", "Get expert help whenever you need."],
] as const;

const services = [
  [Settings, maintenanceImages.updates, "Website Updates", "Regular updates for CMS, plugins, themes and code."],
  [ShieldCheck, maintenanceImages.security, "Security & Malware Removal", "Continuous monitoring, threat protection and malware cleanup."],
  [Gauge, maintenanceImages.speed, "Speed Optimization", "Optimize images, code and server for faster loading pages."],
  [CloudUpload, maintenanceImages.backups, "Daily Backups", "Automated backups with easy restore options."],
  [BarChart3, maintenanceImages.uptime, "Uptime Monitoring", "24/7 monitoring to ensure your website is always online."],
  [Headphones, maintenanceImages.support, "Technical Support", "Get expert support for any technical issues."],
] as const;

const process = [
  [Search, "01", "Audit & Analysis", "Check current health, performance and security."],
  [ClipboardList, "02", "Plan & Strategy", "Create a tailored maintenance plan."],
  [Settings, "03", "Implementation", "Apply updates, optimizations and security measures."],
  [BarChart3, "04", "Monitoring", "Continuous monitoring and regular reports."],
  [Headphones, "05", "Support & Improvement", "Ongoing support and performance enhancements."],
] as const;

type BrandMark = { path: string };

type Platform =
  | { name: string; icon: BrandMark; color: string; image?: never }
  | { name: string; image: string; icon?: never };

/** Simplified Magento mark (diamond "M") — no brand icon exists in our icon set. */
const magentoMark: BrandMark = { path: "M12 1.6 2.6 7v10l3.5 2V9.1L12 5.6l5.9 3.5v9.9l3.5-2V7L12 1.6zM10.3 22.4h3.4V10.8h-3.4v11.6z" };

const platforms: Platform[] = [
  { name: "WordPress", icon: siWordpress, color: "text-[#21759B]" },
  { name: "WooCommerce", image: "https://ik.imagekit.io/cf1bg2bnu/WooCommerce.png?updatedAt=1791030824171" },
  { name: "Shopify", icon: siShopify, color: "text-[#7AB55C]" },
  { name: "Magento", icon: magentoMark, color: "text-[#EE672F]" },
  { name: "Laravel", icon: siLaravel, color: "text-[#FF2D20]" },
  { name: "PHP", icon: siPhp, color: "text-[#777BB4]" },
  { name: "HTML5", icon: siHtml5, color: "text-[#E34F26]" },
  { name: "CSS3", image: "https://ik.imagekit.io/cf1bg2bnu/CSS3.webp?updatedAt=1791030904874" },
  { name: "Cloudflare", icon: siCloudflare, color: "text-[#F38020]" },
  { name: "cPanel", icon: siCpanel, color: "text-[#FF6C2C]" },
  { name: "AWS", image: "https://ik.imagekit.io/home1/home%20page/10_AWS.png" },
  { name: "Google Cloud", icon: siGooglecloud, color: "text-[#4285F4]" },
];

const projects = [
  [deliveredProjects.corporate, "Corporate Website", "Security & Maintenance"],
  [deliveredProjects.business, "Business Website", "Complete Maintenance"],
  [deliveredProjects.realEstate, "Real Estate Website", "Performance Boost"],
  [deliveredProjects.healthcare, "Healthcare Website", "24/7 Support"],
  [deliveredProjects.professional, "Ecommerce Website", "Speed Optimization"],
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-0.5 w-8 bg-gold" />{children}</p>;
}

function PlatformIcon({ platform }: { platform: Platform }) {
  if ("image" in platform) return <img src={platform.image} alt={`${platform.name} logo`} loading="lazy" className="max-h-[38px] max-w-[80%] object-contain" />;
  return <svg role="img" aria-label={`${platform.name} logo`} viewBox="0 0 24 24" className={`h-8 w-8 ${platform.color}`} fill="currentColor"><path d={platform.icon.path} /></svg>;
}

function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  return <div className="relative mt-3"><div ref={track} className="ecom-scroll grid snap-x grid-flow-col auto-cols-[225px] gap-2 overflow-x-auto md:grid-cols-5 md:overflow-visible">{projects.map(([image, title, text]) => <article key={title} className="snap-start overflow-hidden rounded-md border border-border bg-card"><img src={image} alt={title} width={640} height={360} loading="lazy" className="h-[112px] w-full object-cover" /><div className="px-3 py-2"><h3 className="text-[14px] font-extrabold text-navy">{title}</h3><p className="mt-0.5 text-[13px] font-semibold text-primary">{text}</p></div></article>)}</div><Button type="button" variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous projects" className="absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowLeft /></Button><Button type="button" variant="outline" size="icon" onClick={() => move(1)} aria-label="Next projects" className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowRight /></Button></div>;
}

export function WebsiteMaintenancePage() {
  return <main className="min-h-screen bg-background text-foreground"><SiteHeader />
    <ServiceHero slug="website-maintenance"><div className="ecom-shell relative flex h-full items-center py-5"><div className="max-w-[560px]"><nav className="sr-only" aria-label="Breadcrumb"><Link to="/">Home</Link> › Services › Website Maintenance & Optimization</nav><HeroHeading className="text-[27px] font-medium leading-[1.08] sm:text-[33px] md:text-[36px] lg:text-[39px]" lines={["Website Maintenance", "and Ongoing Support"]} accent="text-gold" /><p className="mt-3 max-w-[470px] text-[13px] leading-[1.45] text-on-dark/90 md:text-[14px]">Keep releases manageable with scheduled updates, backups, uptime checks and a clear process for content and support requests.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Get a Free Consultation <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="#maintenance-services">View Maintenance Plans <ArrowRight /></a></Button></div><div className="mt-4 grid max-w-[500px] grid-cols-5 gap-2">{heroBenefits.map(([Icon, first, second]) => <div key={first} className="text-center text-[12px] font-semibold leading-[1.25]"><span className="mx-auto mb-1.5 grid h-9 w-9 place-items-center rounded-full border border-on-dark/50"><Icon className="h-4 w-4" /></span>{first}<br />{second}</div>)}</div></div></div></ServiceHero>

    <section className="bg-card py-6 md:py-7"><div className="ecom-shell grid gap-5 md:grid-cols-[1.05fr_1.95fr] md:items-center"><div><Eyebrow>Why Choose Webgram</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-[1.05] text-navy md:text-[27px]">Your Website in Safe Hands</h2><p className="mt-2 max-w-[470px] text-[14px] leading-[1.5] text-muted-foreground md:text-[14px]">We ensure your website stays updated, secure, fast and always online so you can focus on growing your business while we take care of the technical work.</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">{strengths.map(([Icon, title, text]) => <article key={title} className="min-h-[145px] rounded-md border border-border bg-card p-3.5 shadow-card"><Icon className="h-8 w-8 text-primary" /><h3 className="mt-2.5 text-[15px] font-extrabold leading-[1.2] text-navy">{title}</h3><p className="mt-1.5 text-[14px] leading-[1.45] text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section className="bg-navy"><img src={maintenanceImages.beforeAfter} alt="Before: slow, outdated and vulnerable website — after: fast, secure and high performing" width={1672} height={941} loading="lazy" className="block h-auto w-full object-cover object-center md:h-[340px]" /></section>

    <section id="maintenance-services" className="bg-sky-soft py-6 md:py-7"><div className="ecom-shell"><Eyebrow>Our Maintenance Services</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Complete Website Care, All in One Place</h2><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">{services.map(([Icon, image, title, text]) => <article key={title} className="overflow-hidden rounded-md border border-border bg-card shadow-card"><div className="relative"><img src={image} alt={title} width={640} height={360} loading="lazy" className="h-[86px] w-full object-cover" /><span className="absolute -bottom-4 left-3 grid h-9 w-9 place-items-center rounded-full border border-border bg-card shadow-card"><Icon className="h-5 w-5 text-primary" /></span></div><div className="p-3 pt-6"><h3 className="text-[14px] font-extrabold leading-[1.25] text-navy">{title}</h3><p className="mt-1 text-[13px] leading-[1.45] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-card py-6"><div className="ecom-shell"><Eyebrow>Our Maintenance Process</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">A Proactive Approach to a Better Website</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-5 md:gap-3">{process.map(([Icon, number, title, text], index) => <article key={title} className="relative grid grid-cols-[45px_1fr] gap-2">{index < process.length - 1 && <span aria-hidden="true" className="absolute left-[40px] right-[-14px] top-[20px] hidden h-px bg-primary/40 md:block"><ArrowRight className="absolute -right-1 -top-[6px] h-3 w-3 text-primary" /></span>}<span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span><div className="relative z-10"><strong className="text-[12px] text-navy">{number}</strong><h3 className="mt-0.5 text-[14px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[14px] leading-[1.4] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-sky-soft py-6"><div className="ecom-shell"><Eyebrow>Technologies & Platforms We Support</Eyebrow><div className="ecom-scroll mt-4 grid snap-x grid-flow-col auto-cols-[78px] gap-2 overflow-x-auto sm:grid-cols-12 sm:overflow-visible">{platforms.map((platform) => <figure key={platform.name} className="snap-start rounded-md border border-border bg-card px-2 py-2.5 shadow-card"><span className="grid h-[46px] place-items-center"><PlatformIcon platform={platform} /></span><figcaption className="mt-1 text-center text-[13px] font-bold text-navy">{platform.name}</figcaption></figure>)}</div></div></section>

    <section className="bg-card py-6"><div className="ecom-shell"><div className="flex items-end justify-between gap-4"><div><Eyebrow>Success Stories</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Websites We Keep Running at Their Best</h2></div><Button asChild variant="outline" className="hidden h-9 border-navy bg-card px-4 text-[12px] font-bold text-navy md:inline-flex"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View All Projects <ArrowRight /></Link></Button></div><Projects /></div></section>

    <section className="relative overflow-hidden bg-navy py-7 text-on-dark"><div className="ecom-waves absolute inset-0" /><div className="ecom-shell relative grid items-center gap-7 md:grid-cols-[.9fr_1.1fr]"><div><p className="ecom-eyebrow">Ready to Keep Your Website Fast, Secure & Always Online?</p><h2 className="mt-2 text-[25px] font-bold leading-[1.08] md:text-[29px]">Let’s Maintain and Grow Your Website Together.</h2><p className="mt-2 max-w-[500px] text-[13px] leading-[1.45] text-on-dark/85">Get a free consultation and let our experts take care of your website maintenance, security and optimization needs.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/60 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button></div></div><TrustFacts /></div></section>
  </main>;
}
