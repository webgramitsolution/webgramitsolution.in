import { ServiceHero } from "@/components/service-hero";
import { HeroHeading } from "@/components/hero-heading";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Code2,
  FileCode2,
  FolderOpen,
  Gauge,
  Headphones,
  Image as ImageIcon,
  LayoutTemplate,
  MonitorSmartphone,
  Palette,
  PenTool,
  Rocket,
  School,
  Search,
  ShieldCheck,
  ShoppingCart,
  Target,
  Users,
} from "lucide-react";
import { useRef, type ReactNode } from "react";

import businessWebsites from "@/assets/business-websites.jpg";
import corporateWebsites from "@/assets/corporate-websites.jpg";
import educationalWebsite from "@/assets/educational-website.jpg";
import portfolioWebsites from "@/assets/portfolio-websites.jpg";
import productServiceWebsites from "@/assets/product-service-websites.jpg";
import professionalWebsites from "@/assets/professional-websites.jpg";
import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { Button } from "@/components/ui/button";
import { deliveredProjects, industryImages, technologyStack } from "@/lib/site-images";

const PHP_LOGO = "https://ik.imagekit.io/cf1bg2bnu/php.svg?updatedAt=1791030389514";
const LARAVEL_LOGO = "https://ik.imagekit.io/cf1bg2bnu/Laravel.svg?updatedAt=1791030350339";
const MYSQL_LOGO = "https://ik.imagekit.io/cf1bg2bnu/MySQL.svg?updatedAt=1791030316642";

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

const solutions = [
  [corporateWebsites, Building2, "Corporate Websites", "Professional websites that build your brand and credibility.", "bg-violet-soft text-violet"],
  [businessWebsites, BriefcaseBusiness, "Business Websites", "Modern websites for growing businesses and service providers.", "bg-orange-soft text-orange"],
  [professionalWebsites, Users, "Professional Websites", "Personal websites for consultants, freelancers and experts.", "bg-primary-soft text-primary"],
  [productServiceWebsites, ShoppingCart, "Product & Service Websites", "Showcase products and services with conversion-focused design.", "bg-success-soft text-success"],
  [portfolioWebsites, FolderOpen, "Portfolio Websites", "Creative portfolios for agencies, designers and artists.", "bg-cyan-soft text-cyan"],
  [educationalWebsite, School, "Educational Websites", "Schools, colleges, coaching and online learning platforms.", "bg-primary-soft text-primary"],
] as const;

const process = [
  [Search, "01", "Discovery", "Understand your goals, brand and requirements."],
  [FileCode2, "02", "Strategy", "Plan the design, structure and technology."],
  [Palette, "03", "Design", "Create stunning and user-focused designs."],
  [Code2, "04", "Development", "Build with clean, scalable and secure code."],
  [Gauge, "05", "Testing", "Ensure performance, security and functionality."],
  [Rocket, "06", "Launch", "Go live and provide ongoing support."],
] as const;

const industries = [
  [industryImages.manufacturing, "Manufacturing", "manufacturing"],
  [industryImages.architecture, "Architecture & Interior"],
  [industryImages.realEstate, "Real Estate"],
  [industryImages.retail, "Retail & Lifestyle", "retail"],
  [industryImages.education, "Education"],
  [industryImages.healthcare, "Healthcare"],
  [industryImages.finance, "Finance & Consulting"],
] as const;

const technologies = [
  technologyStack[3],
  technologyStack[4],
  technologyStack[0],
  technologyStack[1],
  { name: "PHP", src: PHP_LOGO },
  { name: "Laravel", src: LARAVEL_LOGO },
  technologyStack[2],
  { name: "MySQL", src: MYSQL_LOGO },
  technologyStack[9],
  technologyStack[10],
].filter((technology): technology is { name: string; src: string } => Boolean(technology));

const projects = [
  [deliveredProjects.corporate, "Corporate Website", "Manufacturing Company"],
  [deliveredProjects.business, "Business Website", "Interior & Furniture Brand"],
  [deliveredProjects.professional, "Professional Website", "Consultant & Coach"],
  [deliveredProjects.realEstate, "Real Estate Website", "Property Developer"],
  [deliveredProjects.healthcare, "Healthcare Website", "Hospital & Clinic"],
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-primary">
      <span className="h-0.5 w-8 bg-gold" /> {children}
    </p>
  );
}

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
            <nav className="sr-only" aria-label="Breadcrumb"><Link to="/">Home</Link> › Solutions › Website Design &amp; Development</nav>
            <HeroHeading className="text-[30px] font-medium leading-[1.08] sm:text-[34px] md:text-[37px] lg:text-[40px]" lines={designOnly ? ["Website Design", "in Delhi NCR"] : ["Business Website Development", "in Delhi NCR"]} accent="text-gold" />
            <p className="mt-3 max-w-[500px] text-[14px] leading-[1.45] text-on-dark/90 md:text-[14px]">{designOnly ? "Responsive corporate websites, landing pages and redesigns that help customers find relevant information and enquire." : "From content planning and CMS development to integrations, testing and launch, we build business websites your team can maintain."}</p>
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

      <section className="bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell"><Eyebrow>Types of Websites We Develop</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Website Solutions for Every Need</h2>
          <div className="ecom-scroll mt-4 grid grid-flow-col auto-cols-[235px] gap-3 overflow-x-auto md:grid-cols-6 md:overflow-visible">
            {solutions.map(([image, Icon, title, text, tone]) => <article key={title} className="overflow-hidden rounded-md border border-border bg-card shadow-card"><div className="aspect-[1.55/1] overflow-hidden"><img src={image} alt={title} width={640} height={420} loading="lazy" className="h-full w-full object-cover object-center" /></div><div className="grid min-h-[98px] grid-cols-[32px_1fr] gap-2.5 p-3"><span className={`grid h-8 w-8 place-items-center rounded-md ${tone}`}><Icon className="h-5 w-5" /></span><div><h3 className="text-[14px] font-extrabold leading-[1.2] text-navy">{title}</h3><p className="mt-1.5 text-[13px] leading-[1.45] text-muted-foreground">{text}</p></div></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-card py-6 md:py-7">
        <div className="ecom-shell"><Eyebrow>Our Development Process</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[26px]">From Idea to a Successful Website</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-5">{process.map(([Icon, number, title, text], index) => <article key={title} className="relative grid grid-cols-[50px_1fr] gap-3 md:block">{index < process.length - 1 && <span aria-hidden="true" className="absolute left-[50px] right-[-20px] top-[23px] hidden h-px bg-primary/40 md:block"><ArrowRight className="absolute -right-1 -top-[6px] h-3 w-3 text-primary" /></span>}<span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-6 w-6" /></span><div className="md:mt-2.5"><strong className="text-[13px] text-navy">{number}</strong><h3 className="text-[14px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[13px] leading-[1.4] text-muted-foreground">{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell"><Eyebrow>Industries We Serve</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[26px]">Websites for Every Industry</h2>
          <div className="ecom-scroll mt-4 grid grid-flow-col auto-cols-[185px] gap-3 overflow-x-auto md:grid-cols-7 md:overflow-visible">
            {industries.map(([image, title, slug]) => (
              <Link
                key={title}
                {...(slug
                  ? { to: "/industries/$slug", params: { slug } }
                  : { to: "/industries", "aria-label": `${title} — browse all industries` })}
                className="group overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              >
                <div className="h-[94px] overflow-hidden">
                  <img src={image} alt="" width={500} height={300} loading="lazy" className="h-full w-full object-cover object-center" />
                </div>
                <h3 className="flex items-center justify-between gap-1 px-2.5 py-2 text-[13px] font-extrabold text-navy group-hover:text-primary">
                  {title}
                  <ArrowRight className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-5 md:py-6">
        <div className="ecom-shell grid gap-5 md:grid-cols-[320px_1fr] md:items-center"><div><Eyebrow>Modern Technology Stack</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-[1.08] text-navy md:text-[27px]">Modern Technology for<br />Better Performance</h2></div><div className="grid grid-cols-5 gap-2 lg:grid-cols-10">{technologies.map(({ name, src }) => <div key={name} className="min-w-0 text-center"><span className="grid h-[62px] place-items-center rounded-md border border-border bg-card p-3"><img src={src} alt={`${name} logo`} width={56} height={56} loading="lazy" className="h-full min-h-0 w-full object-contain" /></span><span className="mt-1.5 block text-[12px] text-muted-foreground">{name}</span></div>)}</div></div>
      </section>

      <section className="bg-sky-soft py-6 md:py-7"><div className="ecom-shell"><div className="flex items-end justify-between gap-4"><div><Eyebrow>Our Recent Work</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Websites We Have Delivered</h2><p className="mt-2 max-w-[540px] text-[13px] leading-[1.45] text-muted-foreground">Explore modern, responsive websites created for businesses across industries.</p></div><Button asChild variant="outline" className="hidden h-9 border-navy bg-card px-4 text-[12px] font-bold text-navy md:inline-flex"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View All Projects <ArrowRight /></Link></Button></div><ProjectCarousel /></div></section>

      <section className="relative overflow-hidden bg-navy py-7 text-on-dark"><div className="ecom-waves absolute inset-0" aria-hidden="true" /><div className="ecom-shell relative grid items-center gap-8 md:grid-cols-[.9fr_1.1fr]"><div><p className="ecom-eyebrow">Ready to Build Your Website?</p><h2 className="mt-2 text-[26px] font-bold leading-[1.08] md:text-[30px]">Let’s Create a Website<br />That Works for You.</h2><p className="mt-2 max-w-[490px] text-[13px] leading-[1.45] text-on-dark/85 md:text-[14px]">Get a free consultation and let our experts design and develop a website that helps you grow your business.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/60 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button></div></div><TrustFacts /></div></section>
    </main>
  );
}