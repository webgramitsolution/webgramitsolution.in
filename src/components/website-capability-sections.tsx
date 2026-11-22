import { Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, Building2, FolderOpen, School, ShoppingCart, Users } from "lucide-react";
import type { ReactNode } from "react";
import { industryImages, technologyStack } from "@/lib/site-images";
import businessWebsites from "@/assets/business-websites.jpg";
import corporateWebsites from "@/assets/corporate-websites.jpg";
import educationalWebsite from "@/assets/educational-website.jpg";
import portfolioWebsites from "@/assets/portfolio-websites.jpg";
import productServiceWebsites from "@/assets/product-service-websites.jpg";
import professionalWebsites from "@/assets/professional-websites.jpg";

const PHP_LOGO = "https://ik.imagekit.io/cf1bg2bnu/php.svg?updatedAt=1791030389514";
const LARAVEL_LOGO = "https://ik.imagekit.io/cf1bg2bnu/Laravel.svg?updatedAt=1791030350339";
const MYSQL_LOGO = "https://ik.imagekit.io/cf1bg2bnu/MySQL.svg?updatedAt=1791030316642";

const solutions = [
  [corporateWebsites, Building2, "Corporate Websites", "Professional websites that build your brand and credibility.", "bg-violet-soft text-violet"],
  [businessWebsites, BriefcaseBusiness, "Business Websites", "Modern websites for growing businesses and service providers.", "bg-orange-soft text-orange"],
  [professionalWebsites, Users, "Professional Websites", "Personal websites for consultants, freelancers and experts.", "bg-primary-soft text-primary"],
  [productServiceWebsites, ShoppingCart, "Product & Service Websites", "Showcase products and services with conversion-focused design.", "bg-success-soft text-success"],
  [portfolioWebsites, FolderOpen, "Portfolio Websites", "Creative portfolios for agencies, designers and artists.", "bg-cyan-soft text-cyan"],
  [educationalWebsite, School, "Educational Websites", "Schools, colleges, coaching and online learning platforms.", "bg-primary-soft text-primary"],
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

const wordpressDescriptions = [
  "Service pages, case studies and enquiry forms your marketing team can update.",
  "Editable landing pages, location pages and lead forms for growing businesses.",
  "Author profiles, article categories and publishing permissions for editorial teams.",
  "WooCommerce storefronts with product catalogues, shipping and checkout.",
  "Project galleries and reusable case study layouts for creative teams.",
  "Course listings, admissions pages and enquiry forms for schools and training providers.",
];

const wordpressTitles = [
  "Corporate websites", "Business websites", "Editorial websites",
  "WooCommerce stores", "Portfolio websites", "Education websites",
];

const wordpressTechnologies = [
  technologyStack[3],
  technologyStack[4],
  { name: "PHP", src: PHP_LOGO },
  { name: "MySQL", src: MYSQL_LOGO },
  technologyStack[9],
  technologyStack[10],
].filter((technology): technology is { name: string; src: string } => Boolean(technology));

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-primary">
      <span className="h-0.5 w-8 bg-gold" /> {children}
    </p>
  );
}

export function WebsiteTypesSection({ wordpress = false }: { wordpress?: boolean }) {
  const cards = wordpress
    ? solutions.map(([image, Icon, title, description, tone], index) =>
        [image, Icon, wordpressTitles[index] ?? title, wordpressDescriptions[index] ?? description, tone] as const)
    : solutions;
  return (
    <section className="bg-sky-soft py-6 md:py-7">
      <div className="ecom-shell"><Eyebrow>Types of Websites We Develop</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">{wordpress ? "WordPress Websites for Every Need" : "Website Solutions for Every Need"}</h2>
        <div className="ecom-scroll mt-4 grid grid-flow-col auto-cols-[235px] gap-3 overflow-x-auto md:grid-cols-6 md:overflow-visible">
          {cards.map(([image, Icon, title, text, tone]) => <article key={title} className="overflow-hidden rounded-md border border-border bg-card shadow-card"><div className="aspect-[1.55/1] overflow-hidden"><img src={image} alt={title} width={640} height={420} loading="lazy" className="h-full w-full object-cover object-center" /></div><div className="grid min-h-[98px] grid-cols-[32px_1fr] gap-2.5 p-3"><span className={`grid h-8 w-8 place-items-center rounded-md ${tone}`}><Icon className="h-5 w-5" /></span><div><h3 className="text-[14px] font-extrabold leading-[1.2] text-navy">{title}</h3><p className="mt-1.5 text-[13px] leading-[1.45] text-muted-foreground">{text}</p></div></div></article>)}
        </div>
      </div>
    </section>
  );
}

export function WebsiteIndustriesSection() {
  return (
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
  );
}

export function WebsiteTechnologySection({ wordpress = false }: { wordpress?: boolean }) {
  const items = wordpress ? wordpressTechnologies : technologies;
  return (
    <section className="bg-card py-5 md:py-6">
      <div className="ecom-shell grid gap-5 md:grid-cols-[320px_1fr] md:items-center"><div><Eyebrow>Modern Technology Stack</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-[1.08] text-navy md:text-[27px]">Modern Technology for<br />Better Performance</h2></div><div className={`grid gap-2 ${wordpress ? "grid-cols-3 lg:grid-cols-6" : "grid-cols-5 lg:grid-cols-10"}`}>{items.map(({ name, src }) => <div key={name} className="min-w-0 text-center"><span className="grid h-[62px] place-items-center rounded-md border border-border bg-card p-3"><img src={src} alt={`${name} logo`} width={56} height={56} loading="lazy" className="h-full min-h-0 w-full object-contain" /></span><span className="mt-1.5 block text-[12px] text-muted-foreground">{name}</span></div>)}</div></div>
    </section>
  );
}
