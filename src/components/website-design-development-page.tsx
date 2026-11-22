import { Eyebrow, WebsiteIndustriesSection, WebsiteTechnologySection, WebsiteTypesSection } from "@/components/website-capability-sections";
import { ServiceHero } from "@/components/service-hero";
import { HeroHeading } from "@/components/hero-heading";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  FileCode2,
  Gauge,
  Headphones,
  Image as ImageIcon,
  LayoutTemplate,
  MonitorSmartphone,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";
import { useRef } from "react";

import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { Button } from "@/components/ui/button";
import { deliveredProjects } from "@/lib/site-images";

const heroBenefits = [
  [PenTool, "Modern &", "Unique Design"],
  [Target, "SEO", "Optimized"],
  [MonitorSmartphone, "Mobile", "Responsive"],
  [ShieldCheck, "Fast &", "Secure"],
] as const;

const strengths = [
  [Target, "Business-Focused Approach", "Websites designed to achieve your business goals.", "bg-violet-soft text-violet"],
  [PenTool, "Creative & Modern Designs", "Unique, user-friendly designs that reflect your brand.", "bg-warning-soft text-warning"],
  [ShieldCheck, "Scalable & Secure Development", "Built with clean code, security and future growth in mind.", "bg-success-soft text-success"],
  [Headphones, "Ongoing Support", "Continuous maintenance, updates and technical support.", "bg-primary-soft text-primary"],
] as const;

const process = [
  [Search, "01", "Discovery", "Understand your goals, brand and requirements."],
  [FileCode2, "02", "Strategy", "Plan the design, structure and technology."],
  [Palette, "03", "Design", "Create stunning and user-focused designs."],
  [Code2, "04", "Development", "Build with clean, scalable and secure code."],
  [Gauge, "05", "Testing", "Ensure performance, security and functionality."],
  [Rocket, "06", "Launch", "Go live and provide ongoing support."],
] as const;

const projects = [
  [deliveredProjects.corporate, "Corporate Website", "Manufacturing Company"],
  [deliveredProjects.business, "Business Website", "Interior & Furniture Brand"],
  [deliveredProjects.professional, "Professional Website", "Consultant & Coach"],
  [deliveredProjects.realEstate, "Real Estate Website", "Property Developer"],
  [deliveredProjects.healthcare, "Healthcare Website", "Hospital & Clinic"],
] as const;

function ProjectCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 263, behavior: "smooth" });

  return (
    <div className="relative mt-3">
      <div ref={track} className="ecom-scroll grid snap-x grid-flow-col auto-cols-[250px] gap-3 overflow-x-auto scroll-smooth md:grid-cols-5 md:overflow-visible">
        {projects.map(([image, title, category]) => (
          <article key={title} className="snap-start overflow-hidden rounded-md border border-border bg-card shadow-card">
            <div className="h-[145px] overflow-hidden bg-muted md:h-[132px]">
              <img src={image} alt={`${title} project`} width={640} height={360} loading="lazy" className="h-full w-full object-cover object-center" />
            </div>
            <div className="px-3 py-3">
              <h3 className="text-[14px] font-extrabold text-navy">{title}</h3>
              <p className="mt-1 text-[13px] text-muted-foreground">{category}</p>
            </div>
          </article>
        ))}
      </div>
      <Button type="button" variant="outline" size="icon" aria-label="Previous projects" onClick={() => move(-1)} className="absolute -left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-navy shadow-card md:hidden"><ArrowLeft /></Button>
      <Button type="button" variant="outline" size="icon" aria-label="Next projects" onClick={() => move(1)} className="absolute -right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-navy shadow-card md:hidden"><ArrowRight /></Button>
    </div>
  );
}

export function WebsiteDesignDevelopmentPage({ designOnly = false }: { designOnly?: boolean }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <ServiceHero slug={designOnly ? "website-design" : "website-design-development"}>
        <div className="ecom-shell relative flex h-full items-center py-5">
          <div className="max-w-[525px]">
            <nav className="sr-only" aria-label="Breadcrumb"><Link to="/">Home</Link> › {designOnly ? "Services › Website Design" : "Solutions › Website Design & Development"}</nav>
            <HeroHeading className="text-[30px] font-medium leading-[1.08] sm:text-[34px] md:text-[37px] lg:text-[40px]" lines={designOnly ? ["Custom Website Design", "for Delhi NCR Businesses"] : ["Business Website Development", "in Delhi NCR"]} accent={designOnly ? "text-[#f4c657]" : "text-gold"} />
            <p className="mt-3 max-w-[500px] text-[14px] leading-[1.45] text-on-dark/90 md:text-[14px]">{designOnly ? "Webgram designs responsive corporate websites, landing pages and redesigns for businesses in Delhi NCR. Help visitors understand what you offer and make it easy to get in touch." : "From content planning and CMS development to integrations, testing and launch, we build business websites your team can maintain."}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Get a Free Consultation <ArrowRight /></Link></Button>
              <Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View Our Work <ArrowRight /></Link></Button>
            </div>
            <div className="mt-5 grid max-w-[460px] grid-cols-4 gap-3">
              {heroBenefits.map(([Icon, first, second]) => <div key={first} className="text-center text-[12px] font-semibold leading-[1.3]"><span className="mx-auto mb-1.5 grid h-9 w-9 place-items-center rounded-full border border-on-dark/50"><Icon className="h-4 w-4" /></span>{first}<br />{second}</div>)}
            </div>
          </div>
        </div>
      </ServiceHero>

      <section className="bg-card py-6 md:py-7">
        <div className="ecom-shell grid gap-5 md:grid-cols-[1.1fr_1.9fr] md:items-center">
          <div><Eyebrow>Why Choose Webgram</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-[1.05] text-navy md:text-[27px]">Your Trusted Website<br />Development Partner</h2><p className="mt-2 max-w-[460px] text-[14px] leading-[1.5] text-muted-foreground md:text-[14px]">We combine strategy, creative design and cutting-edge technology to build websites that not only look great but also deliver measurable business results.</p></div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {strengths.map(([Icon, title, text, tone]) => <article key={title} className="min-h-[126px] rounded-md border border-border bg-card p-4 shadow-card"><span className={`grid h-9 w-9 place-items-center rounded-md ${tone}`}><Icon className="h-5 w-5" /></span><h3 className="mt-3 text-[14px] font-extrabold leading-[1.2] text-navy">{title}</h3><p className="mt-1.5 text-[13px] leading-[1.45] text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <WebsiteTypesSection />

      <section className="bg-card py-6 md:py-7">
        <div className="ecom-shell"><Eyebrow>Our Development Process</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[26px]">From Idea to a Successful Website</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-5">{process.map(([Icon, number, title, text], index) => <article key={title} className="relative grid grid-cols-[50px_1fr] gap-3 md:block">{index < process.length - 1 && <span aria-hidden="true" className="absolute left-[50px] right-[-20px] top-[23px] hidden h-px bg-primary/40 md:block"><ArrowRight className="absolute -right-1 -top-[6px] h-3 w-3 text-primary" /></span>}<span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-6 w-6" /></span><div className="md:mt-2.5"><strong className="text-[13px] text-navy">{number}</strong><h3 className="text-[14px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[13px] leading-[1.4] text-muted-foreground">{text}</p></div></article>)}</div>
        </div>
      </section>

      <WebsiteIndustriesSection />

      <WebsiteTechnologySection />

      <section className="bg-sky-soft py-6 md:py-7"><div className="ecom-shell"><div className="flex items-end justify-between gap-4"><div><Eyebrow>Our Recent Work</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Websites We Have Delivered</h2><p className="mt-2 max-w-[540px] text-[13px] leading-[1.45] text-muted-foreground">Explore modern, responsive websites created for businesses across industries.</p></div><Button asChild variant="outline" className="hidden h-9 border-navy bg-card px-4 text-[12px] font-bold text-navy md:inline-flex"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View All Projects <ArrowRight /></Link></Button></div><ProjectCarousel /></div></section>

      <section className="relative overflow-hidden bg-navy py-7 text-on-dark"><div className="ecom-waves absolute inset-0" aria-hidden="true" /><div className="ecom-shell relative grid items-center gap-8 md:grid-cols-[.9fr_1.1fr]"><div><p className="ecom-eyebrow">Ready to Build Your Website?</p><h2 className="mt-2 text-[26px] font-bold leading-[1.08] md:text-[30px]">Let’s Create a Website<br />That Works for You.</h2><p className="mt-2 max-w-[490px] text-[13px] leading-[1.45] text-on-dark/85 md:text-[14px]">Get a free consultation and let our experts design and develop a website that helps you grow your business.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/60 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button></div></div><TrustFacts /></div></section>
    </main>
  );
}