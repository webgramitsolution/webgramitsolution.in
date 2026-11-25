import { HeroHeading } from "@/components/hero-heading";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Layers3,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
  Zap,
  Star,
  ClipboardCheck,
  MapPin,
  PackageCheck,
  ReceiptText,
  Warehouse,
} from "lucide-react";
import { useState, type ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { IMAGES, aboutImages, clientLogos, technologyStack } from "@/lib/site-images";
import { SiteHeader } from "@/components/site-header";
import { ScrollingFrame } from "@/components/portfolio-showcase";
import { editorialArticles } from "@/lib/editorial-articles";
import { portfolio } from "@/lib/portfolio";
import { getPublishedHomepageReviews } from "@/lib/reviews.functions";
import { publicPageSchema } from "@/lib/site-identity";

const HOME_TITLE = "Ecommerce Website Development Company in Delhi NCR | Webgram IT Solution";
const HOME_DESCRIPTION =
  "Delhi NCR ecommerce development partner for Indian manufacturers, wholesalers and D2C brands. Build and maintain Shopify, WooCommerce and custom commerce platforms.";
const HERO_DESKTOP = "/images/delhi-commerce-hero.webp";
const HERO_PHONE = "/images/delhi-commerce-hero-mobile.webp?v=2";
const SOCIAL_IMAGE = "https://webgramitsolution.in/images/commerce-social.jpg";

export const Route = createFileRoute("/")({
  // Reviews are optional: if the backend is unreachable, still render the homepage.
  loader: async () => {
    try {
      return await getPublishedHomepageReviews();
    } catch (error) {
      console.error(error);
      return [] as Awaited<ReturnType<typeof getPublishedHomepageReviews>>;
    }
  },
  head: () => ({
    links: [
      { rel: "canonical", href: "https://webgramitsolution.in/" },
      {
        rel: "preload",
        as: "image",
        href: HERO_DESKTOP,
        media: "(min-width: 768px)",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        href: HERO_PHONE,
        media: "(max-width: 767px)",
        fetchPriority: "high",
      },
      { rel: "alternate", hrefLang: "en-in", href: "https://webgramitsolution.in/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://webgramitsolution.in/" },
    ],
    meta: [
      { title: HOME_TITLE },
      { name: "author", content: "Vikas Kumar, Webgram IT Solution" },
      // The host-specific X-Robots-Tag still excludes the Lovable copy from indexing.
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content: HOME_DESCRIPTION,
      },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:url", content: "https://webgramitsolution.in/" },
      {
        property: "og:description",
        content: HOME_DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SOCIAL_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SOCIAL_IMAGE },
    ],
    scripts: publicPageSchema("/", HOME_TITLE, HOME_DESCRIPTION),
  }),
  component: HomePage,
});

type Icon = ComponentType<{ className?: string }>;

const HOME_ART = "/images/home-commerce";

const services: Array<{
  icon: Icon;
  title: string;
  text: string;
  link: string;
  to: "/solutions/$slug" | "/services/$slug";
  slug: string;
  image: string;
  alt: string;
}> = [
  {
    icon: ShoppingCart,
    title: "Ecommerce Development",
    text: "High-converting B2C ecommerce websites designed for performance and scalability.",
    link: "Explore Ecommerce",
    to: "/solutions/$slug",
    slug: "ecommerce-development",
    image: `${HOME_ART}/ecommerce.webp`,
    alt: "Laptop and phone showing an Indian apparel storefront",
  },
  {
    icon: BriefcaseBusiness,
    title: "B2B Commerce",
    text: "Wholesale pricing, MOQ, RFQ, customer groups, credit terms and bulk ordering.",
    link: "Explore B2B",
    to: "/solutions/$slug",
    slug: "b2b-commerce",
    image: `${HOME_ART}/b2b.webp`,
    alt: "Tablet with a wholesale dashboard in a distribution warehouse",
  },

  {
    icon: Code2,
    title: "Custom Commerce Platforms",
    text: "Custom-built commerce applications designed around your unique business model.",
    link: "Explore Custom Solutions",
    to: "/services/$slug",
    slug: "web-portal-development",
    image: `${HOME_ART}/custom.webp`,
    alt: "Custom commerce workflow displayed on a laptop",
  },
  {
    icon: Store,
    title: "Marketplace Development",
    text: "Multi-vendor marketplaces with seller tools, commissions, payouts and order management.",
    link: "Explore Marketplace",
    to: "/solutions/$slug",
    slug: "marketplace-development",
    image: `${HOME_ART}/marketplace.webp`,
    alt: "Seller dashboard alongside parcels for a multi-vendor marketplace",
  },
];

const strengths: Array<{ icon: Icon; title: string; text: string; tone: string }> = [
  {
    icon: Blocks,
    title: "Business-First Development",
    text: "Technology aligned with your business goals.",
    tone: "text-warning bg-warning-soft",
  },
  {
    icon: Layers3,
    title: "Custom Architecture",
    text: "Built around your unique requirements.",
    tone: "text-cyan bg-cyan-soft",
  },
  {
    icon: Users,
    title: "B2B + B2C Expertise",
    text: "Retail and wholesale commerce solutions.",
    tone: "text-primary bg-primary-soft",
  },
  {
    icon: BarChart3,
    title: "Scalable Technology",
    text: "From startup to enterprise growth.",
    tone: "text-success bg-success-soft",
  },
  {
    icon: Zap,
    title: "Performance Focused",
    text: "Speed, SEO and best practices.",
    tone: "text-orange bg-orange-soft",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Partnership",
    text: "Development, maintenance and ongoing support.",
    tone: "text-violet bg-violet-soft",
  },
];

const industries = ["Manufacturing", "Retail", "Wholesale", "Furniture", "Fashion", "Electronics"];

const b2bFeatures = [
  [ReceiptText, "Customer-specific pricing"],
  [BriefcaseBusiness, "Wholesale pricing"],
  [ShieldCheck, "MOQ controls"],
  [BarChart3, "RFQ / Request for Quotation"],
  [PackageCheck, "Bulk ordering"],
  [Layers3, "Tier pricing"],
  [Users, "Dealer / Distributor login"],
  [Zap, "Credit purchase"],
  [ClipboardCheck, "GST invoice"],
  [Users, "Customer groups"],
  [BriefcaseBusiness, "Sales representative"],
  [ShieldCheck, "Approval workflows"],
  [MapPin, "Location-based pricing"],
  [Warehouse, "Multi-warehouse"],
  [Store, "Inventory management"],
] as const;

function Hero() {
  return (
    <section id="top" className="hero-shell">
      <div className="hero-media">
        <picture>
          <source media="(max-width: 767px)" srcSet={HERO_PHONE} width={660} height={383} />
          <img
            src={HERO_DESKTOP}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            alt="Ecommerce storefront on laptop and phone with India Gate in the background"
            width={2172}
            height={724}
          />
        </picture>
      </div>
      <div
        className="bg-hero-overlay pointer-events-none absolute inset-y-0 start-0"
        aria-hidden="true"
      />
      <div className="page-shell hero-copy">
        <div className="max-w-[510px]">
          <HeroHeading
            className="max-w-[510px] text-[36px] font-extrabold leading-[1.08] tracking-tight lg:text-[54px]"
            lines={["Ecommerce websites", "built in Delhi NCR."]}
            accent="text-[#f4c657]"
          />
          <p className="mt-4 max-w-[500px] text-[14px] font-normal leading-5 text-on-dark/90 sm:text-[15px]">
            Build a Shopify or WooCommerce store, a wholesale ordering portal, or a custom commerce
            platform. Our Delhi NCR team supports Indian manufacturers, distributors and D2C brands
            from planning through launch and ongoing maintenance.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              asChild
              size="lg"
              className="h-10 bg-[#f4c657] px-5 text-[14px] font-extrabold text-navy hover:bg-[#ffe29c]"
            >
              <Link to="/contact">
                Request a Project Quote <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-10 border-on-dark/60 bg-transparent px-5 text-[14px] font-semibold text-on-dark shadow-none hover:bg-on-dark/10 hover:text-on-dark"
            >
              <Link to="/work/portfolio">View Our Work</Link>
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-on-dark/90">
            {["Shopify", "WooCommerce", "B2B Portals"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-sky" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="bg-background py-5">
      <div className="page-shell">
        <h2 className="text-sm font-extrabold text-navy">
          Technologies &amp; Ecommerce Integrations We Power for Your Store
        </h2>
        <div
          className="logo-scroll mt-4 grid grid-flow-col auto-cols-[150px] items-center gap-3 overflow-x-auto pb-2 md:grid-flow-row md:auto-cols-auto md:grid-cols-7 md:overflow-visible md:pb-0"
          aria-label="Trusted business logos"
        >
          {clientLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-14 items-center justify-center rounded-md border border-border/70 bg-card px-3 shadow-card"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                width={2475}
                height={875}
                loading="lazy"
                className="max-h-8 w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="solutions" className="bg-sky-soft py-6 md:py-8">
      <div className="page-shell">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Our Digital Commerce Solutions</h2>
            <p className="section-subtitle">
              End-to-end solutions to build, sell and scale your business online.
            </p>
          </div>
          <Link
            to="/solutions/$slug"
            params={{ slug: "ecommerce-development" }}
            className="hidden text-[13px] font-bold text-primary underline sm:block"
          >
            View All Solutions →
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3">
          {services.map(
            ({ icon: IconComponent, title, text, link, to, slug, image, alt }, index) => (
              <article
                key={title}
                className={`relative min-h-[320px] overflow-hidden rounded-md border border-border bg-card p-3 shadow-card md:min-h-[210px] md:p-4 md:pr-[46%] ${index === 3 ? "md:hidden" : ""}`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground">
                  <IconComponent className="h-6 w-6" />
                </span>
                <h3 className="mt-3 text-[13px] font-extrabold leading-tight text-navy">{title}</h3>
                <p className="mt-2 text-[13px] font-medium leading-4 text-muted-foreground">
                  {text}
                </p>
                <Link
                  to={to}
                  params={{ slug }}
                  className="mt-3 inline-block text-[13px] font-extrabold text-primary"
                >
                  {link} →
                </Link>
                <div className="service-visual max-md:!bottom-0 max-md:!left-0 max-md:!right-0 max-md:!top-auto max-md:!h-[112px] max-md:!w-full">
                  <img src={image} alt={alt} width={640} height={640} loading="lazy" />
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="services" className="border-b border-border/60 bg-card py-5 md:py-3">
      <div className="page-shell grid items-center gap-5 md:min-h-[180px] md:grid-cols-[1.08fr_1.45fr_1.4fr] md:gap-3 lg:grid-cols-[1.05fr_1.5fr_1.35fr]">
        <div className="md:pr-2">
          <h2 className="max-w-[360px] text-[20px] font-bold leading-[1.08] text-navy md:text-[17px] lg:text-[20px]">
            From Storefront to Back Office —<br className="hidden lg:block" /> One Technology
            Partner.
          </h2>
          <p className="mt-2 max-w-[390px] text-[13px] font-normal leading-[1.55] text-muted-foreground md:text-[12px] lg:text-[13px]">
            We connect your entire commerce ecosystem — website, mobile app, inventory, payments,
            CRM and analytics.
          </p>
          <Button
            asChild
            size="sm"
            className="mt-3 h-9 bg-primary px-5 text-[13px] font-medium text-primary-foreground md:h-8 md:px-4 md:text-[13px] lg:h-9 lg:px-5 lg:text-[13px]"
          >
            <Link to="/services/$slug" params={{ slug: "api-integration" }}>
              Learn More <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="min-w-0">
          <img
            src={`${HOME_ART}/ecosystem.webp`}
            alt="Webgram commerce ecosystem linking storefront, commerce, operations, payments, analytics and integrations"
            width={1120}
            height={244}
            loading="lazy"
            className="h-auto w-full object-contain"
          />
        </div>
        <div className="hidden min-w-0 md:block">
          <img
            src={`${HOME_ART}/platforms.webp`}
            alt="Webgram ecommerce website, B2B portal and mobile app"
            width={1120}
            height={331}
            loading="lazy"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="company" className="border-y border-border bg-sky-soft py-6">
      <div className="page-shell">
        <h2 className="section-title">Why Businesses Choose Webgram</h2>
        <p className="section-subtitle">
          More than just development — we are your long-term digital commerce partner.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6">
          {strengths.map(({ icon: IconComponent, title, text, tone }) => (
            <article key={title} className="grid grid-cols-[auto_1fr] gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${tone}`}>
                <IconComponent className="h-5 w-5" />
              </span>
              <span>
                <h3 className="text-[13px] font-extrabold leading-tight text-navy">{title}</h3>
                <p className="mt-1 text-[12px] leading-3 text-muted-foreground">{text}</p>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="bg-navy py-7 text-on-dark">
      <div className="page-shell grid gap-5 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
        <div>
          <p className="eyebrow">
            <Link to="/industries" className="hover:underline">
              Industries
            </Link>
          </p>
          <h2 className="mt-2 text-[27px] font-extrabold leading-[0.95]">
            Built Around
            <br />
            Your Industry
          </h2>
          <p className="mt-3 text-[13px] leading-4 text-on-dark/75">
            We develop customized commerce solutions for diverse industries.
          </p>
          <Button
            asChild
            size="sm"
            className="mt-4 bg-primary px-5 text-[13px] font-bold text-primary-foreground hover:bg-primary/90 md:bg-gold md:text-navy md:hover:bg-gold/90"
          >
            <Link to="/industries">
              Explore All Industries <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {industries.map((industry) => (
            <Link
              key={industry}
              to="/industries/$slug"
              params={{ slug: industry.toLowerCase() }}
              className="industry-card focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
            >
              <img
                src={`${HOME_ART}/${industry.toLowerCase()}.webp`}
                alt=""
                loading="lazy"
                width={512}
                height={512}
                className="industry-image"
              />
              <div className="industry-shade" />
              <strong>
                {industry} <span aria-hidden="true">→</span>
              </strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function B2BFeatures() {
  return (
    <section className="bg-background py-7 md:py-8">
      <div className="page-shell">
        <p className="eyebrow text-primary">B2B Commerce</p>
        <h2 className="section-title mt-2">Powering Modern B2B Commerce</h2>
        <p className="section-subtitle max-w-xl">
          Advanced B2B features that digitize wholesale and distribution businesses.
        </p>
        <div className="b2b-feature-grid mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {b2bFeatures.map(([IconComponent, label]) => (
            <div
              key={label}
              className="grid min-h-16 grid-cols-[32px_1fr] items-center gap-2 rounded-md border border-border bg-card p-2.5 shadow-card"
            >
              <span className="grid h-8 w-8 place-items-center rounded bg-primary-soft text-primary">
                <IconComponent className="h-4 w-4" />
              </span>
              <strong className="text-[13px] leading-tight text-navy md:text-[12px]">
                {label}
              </strong>
            </div>
          ))}
        </div>
        <Button asChild className="mt-4 h-10 w-full font-bold">
          <Link to="/solutions/$slug" params={{ slug: "b2b-commerce" }}>
            Build Your B2B Platform <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function MobileCommerceExperience() {
  const experiences = [
    {
      id: "b2c",
      label: "B2C Ecommerce",
      image: IMAGES.caseLifestyle,
      alt: "Modern furniture and lifestyle ecommerce storefront",
      features: ["Fashion", "Beauty", "Electronics", "Furniture", "D2C", "Lifestyle"],
      linkLabel: "Explore B2C Solutions",
      slug: "ecommerce-development",
    },
    {
      id: "b2b",
      label: "B2B Ecommerce",
      image: IMAGES.caseManufacturing,
      alt: "Scalable B2B commerce platform for wholesale businesses",
      features: [
        "Wholesale Pricing",
        "Bulk Orders",
        "RFQ",
        "MOQ Controls",
        "Dealer Login",
        "Credit Terms",
      ],
      linkLabel: "Explore B2B Solutions",
      slug: "b2b-commerce",
    },
    {
      id: "marketplace",
      label: "Marketplace",
      image: IMAGES.caseDistribution,
      alt: "Multi-vendor marketplace and operations dashboard",
      features: [
        "Multi-Vendor",
        "Seller Portal",
        "Commissions",
        "Order Routing",
        "Payouts",
        "Analytics",
      ],
      linkLabel: "Explore Marketplace Solutions",
      slug: "marketplace-development",
    },
  ] as const;
  const [activeId, setActiveId] = useState<(typeof experiences)[number]["id"]>("b2c");
  const active = experiences.find((experience) => experience.id === activeId) ?? experiences[0];

  return (
    <section className="bg-sky-soft py-7 md:hidden">
      <div className="page-shell">
        <h2 className="section-title">Ecommerce Experiences That Convert</h2>
        <p className="section-subtitle">
          We create high-converting commerce experiences for every business model.
        </p>
        <div
          className="mt-4 grid grid-cols-3 gap-2"
          role="tablist"
          aria-label="Commerce experience types"
        >
          {experiences.map((experience) => (
            <Button
              key={experience.id}
              type="button"
              size="sm"
              variant={activeId === experience.id ? "default" : "outline"}
              role="tab"
              aria-selected={activeId === experience.id}
              aria-controls="commerce-experience-panel"
              onClick={() => setActiveId(experience.id)}
              className="h-8 min-w-0 px-1 text-[12px]"
            >
              {experience.label}
            </Button>
          ))}
        </div>
        <article
          id="commerce-experience-panel"
          role="tabpanel"
          className="mt-3 grid grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-3 rounded-md border border-border bg-card p-3 shadow-card"
        >
          <img
            key={active.id}
            src={active.image}
            alt={active.alt}
            width={1934}
            height={813}
            loading="lazy"
            className="h-full min-h-36 w-full rounded object-cover"
          />
          <div className="flex flex-col justify-center">
            {active.features.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 py-1 text-[13px] font-semibold text-navy"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                {item}
              </span>
            ))}
            <Link
              to="/solutions/$slug"
              params={{ slug: active.slug }}
              className="mt-2 text-[13px] font-extrabold text-primary"
            >
              {active.linkLabel} →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="resources" aria-label="Technology that works together" className="bg-card py-8">
      <div className="page-shell grid gap-6 md:grid-cols-[170px_minmax(0,1fr)] md:items-center lg:grid-cols-[205px_minmax(0,1fr)]">
        <div className="min-w-0">
          <h2 className="text-[19px] font-bold leading-[1.15] text-navy lg:text-[21px]">
            Technology That
            <br />
            Works Together
          </h2>
          <p className="mt-3 text-[15px] font-medium leading-relaxed text-muted-foreground md:max-w-[178px] lg:max-w-[205px]">
            We use modern, reliable and scalable technologies to build high-performance commerce
            solutions.
          </p>
        </div>
        <div className="min-w-0 md:border-l md:border-border md:pl-5 lg:pl-7">
          <div className="technology-row home-technology-row grid grid-cols-3 gap-2 md:grid-flow-col md:grid-cols-none md:overflow-x-auto lg:grid-flow-row lg:grid-cols-12">
            {technologyStack.map(({ name, src }) => (
              <div key={name} className="flex min-w-0 flex-col items-center gap-2">
                <span className="flex h-[72px] w-full shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/80 bg-card shadow-card">
                  <img
                    src={src}
                    alt={`${name} logo`}
                    width={48}
                    height={40}
                    loading="lazy"
                    className="block h-10 w-12 max-w-full shrink-0 object-contain"
                  />
                </span>
                <span className="block min-h-9 w-full text-center text-[13px] leading-[18px] text-muted-foreground md:whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileServices() {
  return (
    <section className="bg-sky-soft px-4 py-6 md:hidden">
      <div className="mx-auto max-w-md">
        <p className="page-eyebrow text-primary">Our Services</p>
        <h2 className="mt-2 text-[22px] font-extrabold text-navy">
          Everything your digital business needs.
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {services.map(({ icon: IconComponent, title }, index) => (
            <Link
              key={title}
              to="/solutions/$slug"
              params={{
                slug:
                  ["ecommerce-development", "b2b-commerce", "website-design-development"][index] ??
                  "ecommerce-development",
              }}
              className="flex min-h-24 flex-col justify-between rounded-md border border-border bg-card p-4 shadow-card"
            >
              <IconComponent className="h-6 w-6 text-primary" />
              <strong className="mt-3 text-[14px] leading-4 text-navy">{title}</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

type Review = Awaited<ReturnType<typeof getPublishedHomepageReviews>>[number];

function MobileReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  return (
    <section className="bg-background py-7" aria-labelledby="home-reviews-title">
      <div className="page-shell">
        <p className="page-eyebrow text-primary">Client reviews</p>
        <h2 id="home-reviews-title" className="mt-2 text-[23px] font-extrabold text-navy">
          Trusted by growing businesses.
        </h2>
        <div className="case-scroll -mx-4 mt-4 grid snap-x snap-mandatory grid-flow-col auto-cols-[88%] gap-3 overflow-x-auto px-4 pb-2 md:auto-cols-[45%] lg:auto-cols-[32%]">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="snap-start rounded-md border border-border bg-card p-5 shadow-card"
            >
              <div className="flex gap-1 text-gold" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }, (_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-[15px] leading-6 text-foreground">“{review.review_text}”</p>
              <div className="mt-5 border-t border-border pt-4">
                <strong className="block text-sm text-navy">{review.customer_name}</strong>
                <span className="text-[14px] text-muted-foreground">
                  {[review.customer_role, review.company_name].filter(Boolean).join(" · ")}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const reviews = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background font-sans">
      <SiteHeader />
      <Hero />
      <TrustStrip />
      <Services />
      <Ecosystem />
      <WhyUs />
      <Industries />
      <B2BFeatures />
      <MobileCommerceExperience />
      <HomePortfolio />
      <HomeGuides />
      <Technology />
      <MobileReviews reviews={reviews} />
    </main>
  );
}

function HomePortfolio() {
  return (
    <section id="portfolio" className="bg-background py-10">
      <div className="page-shell">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div>
            <p className="eyebrow text-primary">Portfolio</p>
            <h2 className="section-title mt-1 text-[26px] leading-[1.08] md:whitespace-nowrap">
              Websites We Have Built
            </h2>
            <p className="mt-1.5 max-w-[500px] text-[16px] leading-6 text-muted-foreground">
              Explore live ecommerce stores, wholesale platforms and business websites we’ve
              delivered.
            </p>
          </div>
          <Button
            asChild
            className="hidden h-10 w-fit bg-gold px-5 text-[14px] font-semibold text-navy hover:bg-gold/90 sm:inline-flex"
          >
            <Link to="/work/$slug" params={{ slug: "portfolio" }}>
              View Full Portfolio <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-3 lg:gap-4">
          {portfolio.slice(0, 4).map((item) => (
            <div key={item.domain}>
              <ScrollingFrame item={item} height={270} />
              <h3 className="mt-3 text-[17px] text-navy">{item.name}</h3>
              <p className="text-[14px] text-muted-foreground">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeGuides() {
  return (
    <section className="border-t border-border bg-background py-9" aria-labelledby="home-guides">
      <div className="page-shell">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="home-guides" className="text-2xl text-navy">
            Guides for planning your online store
          </h2>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Browse the journal <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {editorialArticles.slice(0, 3).map(([slug, title, excerpt]) => (
            <article key={slug} className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-base font-semibold text-navy">
                <Link
                  to="/blog/$slug"
                  params={{ slug }}
                  className="hover:text-primary hover:underline"
                >
                  {title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
