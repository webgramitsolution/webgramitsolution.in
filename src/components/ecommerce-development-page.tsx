import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  BarChart3,
  Boxes,
  Brush,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleUserRound,
  Cloud,
  Code2,
  CreditCard,
  Globe2,
  Headphones,
  Languages,
  LayoutDashboard,
  MonitorSmartphone,
  PackageSearch,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
  TestTubeDiagonal,
  Wrench,
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import { ComparisonTable, DirectAnswer } from "@/components/direct-answer";

import electronicsCaseImage from "@/assets/ecommerce-electronics-case.jpg";
import fashionCaseImage from "@/assets/ecommerce-fashion-case.jpg";
import furnitureCaseImage from "@/assets/ecommerce-furniture-case.jpg";
import industriesStrip from "@/assets/ecommerce-industries.jpg";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const heroImage = "https://ik.imagekit.io/home1/About%20us%20page/ecommer.png";

const benefits = [
  [Store, "24/7", "Sales Channel"],
  [BarChart3, "Higher", "Brand Visibility"],
  [ChartNoAxesCombined, "Increased", "Revenue"],
  [CircleUserRound, "Better", "Customer Experience"],
] as const;

const features = [
  [Brush, "Custom Design", "Unique, brand-focused designs", "bg-warning-soft text-warning"],
  [
    ShoppingBag,
    "Product Management",
    "Easy product & inventory management",
    "bg-primary-soft text-primary",
  ],
  [ShieldCheck, "Secure Checkout", "Multiple payment gateways", "bg-violet-soft text-violet"],
  [
    MonitorSmartphone,
    "Mobile Responsive",
    "Perfect on all devices",
    "bg-success-soft text-success",
  ],
  [Search, "SEO Friendly", "Built for higher visibility", "bg-cyan-soft text-cyan"],
  [Languages, "Multi-Currency & Multi-Language", "Sell globally", "bg-cyan-soft text-cyan"],
  [BadgePercent, "Coupons & Offers", "Drive more sales", "bg-orange-soft text-orange"],
  [
    CircleUserRound,
    "Customer Accounts",
    "Wishlist, orders, reviews",
    "bg-primary-soft text-primary",
  ],
  [
    Boxes,
    "Third-Party Integrations",
    "Shipping, CRM, WhatsApp etc.",
    "bg-warning-soft text-warning",
  ],
  [BarChart3, "Analytics & Reports", "Track performance", "bg-success-soft text-success"],
] as const;

const industries = [
  "Fashion & Apparel",
  "Beauty & Cosmetics",
  "Electronics & Gadgets",
  "Furniture & Home Decor",
  "Food & Grocery",
] as const;

const process = [
  [PackageSearch, "01", "Discovery", "Understand your business goals and requirements"],
  [Wrench, "02", "Strategy", "Plan the right solution and technology"],
  [Brush, "03", "Design", "Create stunning and user-friendly UI/UX"],
  [Code2, "04", "Development", "Build with modern and scalable technology"],
  [TestTubeDiagonal, "05", "Testing", "Ensure performance, security and functionality"],
  [Rocket, "06", "Launch", "Deployment and ongoing support"],
] as const;

const technologies = [
  { name: "WooCommerce", src: "https://ik.imagekit.io/cf1bg2bnu/WooCommerce.png?updatedAt=1791030824171" },
  { name: "WordPress", src: "https://ik.imagekit.io/cf1bg2bnu/wordpress.webp" },
  { name: "React.js", src: "https://ik.imagekit.io/cf1bg2bnu/React.js.webp" },
  { name: "Node.js", src: "https://ik.imagekit.io/cf1bg2bnu/Node.js.webp" },
  { name: "PHP", src: "https://ik.imagekit.io/cf1bg2bnu/php.svg?updatedAt=1791030389514" },
  { name: "MySQL", src: "https://ik.imagekit.io/cf1bg2bnu/MySQL.svg?updatedAt=1791030316642" },
  { name: "Razorpay", src: "https://ik.imagekit.io/cf1bg2bnu/Razorpay.png" },
  { name: "AWS", src: "https://ik.imagekit.io/cf1bg2bnu/AWS.webp" },
  { name: "Google Cloud", src: "https://ik.imagekit.io/cf1bg2bnu/Google%20Cloud.svg" },
  { name: "Laravel", src: "https://ik.imagekit.io/cf1bg2bnu/Laravel.svg?updatedAt=1791030350339" },
] as const;

const projects = [
  {
    title: "Fashion Ecommerce",
    description: "From a local store to a national brand",
    image: fashionCaseImage,
    tags: ["Design", "Development", "Marketing"],
    metrics: [
      ["3x", "Sales Growth"],
      ["200+", "Daily Orders"],
      ["50%", "Higher Conversion"],
    ],
  },
  {
    title: "Furniture Store",
    description: "Modern ecommerce experience",
    image: furnitureCaseImage,
    tags: ["WooCommerce", "Custom Design"],
    metrics: [
      ["2.5x", "Revenue Growth"],
      ["60%", "Repeat Customers"],
      ["40%", "Higher AOV"],
    ],
  },
  {
    title: "Electronics Store",
    description: "Multi-category ecommerce platform",
    image: electronicsCaseImage,
    tags: ["Custom Development", "API Integration"],
    metrics: [
      ["70%", "Faster Orders"],
      ["100+", "Product Categories"],
      ["3x", "Customer Base"],
    ],
  },
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="ecom-eyebrow">{children}</p>;
}

function IndustryCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) =>
    track.current?.scrollBy({ left: direction * 260, behavior: "smooth" });

  return (
    <div className="relative min-w-0">
      <div
        ref={track}
        className="ecom-scroll flex snap-x gap-2 overflow-x-auto scroll-smooth"
        aria-label="Ecommerce industries"
      >
        {industries.map((industry, index) => (
          <article
            key={industry}
            className="relative h-[150px] min-w-[190px] flex-1 snap-start overflow-hidden rounded-md md:min-w-0"
          >
            <img
              src={industriesStrip}
              alt={industry}
              width={1920}
              height={512}
              loading="lazy"
              className="absolute top-0 h-full w-[500%] max-w-none object-cover"
              style={{ left: `${index * -100}%` }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-navy/90 px-3 py-2 text-[13px] font-bold text-on-dark">
              {industry} <ArrowRight className="ml-1 inline h-3 w-3" />
            </div>
          </article>
        ))}
      </div>
      <Button
        aria-label="Previous industries"
        variant="outline"
        size="icon"
        onClick={() => move(-1)}
        className="absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-navy shadow-card"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        aria-label="Next industries"
        variant="outline"
        size="icon"
        onClick={() => move(1)}
        className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-navy shadow-card"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function EcommerceDevelopmentPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="ecom-hero relative overflow-hidden bg-navy text-on-dark">
        <img
          src={heroImage}
          alt="Laptop and phone displaying a responsive furniture ecommerce store"
          width={2112}
          height={745}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="ecom-hero-shade absolute inset-0" />
        <div className="ecom-shell relative flex h-full items-center py-6">
          <div className="max-w-[520px]">
            <nav className="sr-only" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <span className="px-1.5">›</span> Solutions{" "}
              <span className="px-1.5">›</span> Ecommerce Development
            </nav>
            <h1 className="text-[30px] font-medium leading-[1.08] sm:text-[34px] md:text-[36px] lg:text-[39px]">
              High-Converting Ecommerce Websites
              <br />
              for <span className="text-gold">Growing Businesses.</span>
            </h1>
            <p className="mt-3 max-w-[500px] text-[14px] leading-[1.5] text-on-dark/90 sm:text-[14px]">
              We design and develop powerful, scalable and conversion-focused ecommerce websites
              that help you attract customers, increase sales and build a strong online brand.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"
              >
                <Link to="/contact">
                  Get a Free Consultation <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-10 border-on-dark/70 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"
              >
                <Link to="/work/$slug" params={{ slug: "case-studies" }}>
                  View Our Work <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="mt-6 grid max-w-[500px] grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [ShoppingBag, "Custom Store Design"],
                [ShieldCheck, "Secure & Scalable"],
                [BarChart3, "Conversion Focused"],
                [Headphones, "Ongoing Support"],
              ].map(([Icon, title]) => {
                const FeatureIcon = Icon as typeof ShoppingBag;
                return (
                  <div
                    key={title as string}
                    className="flex items-center gap-2 text-[12px] font-semibold leading-3"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-on-dark/60">
                      <FeatureIcon className="h-4 w-4" />
                    </span>
                    {title as string}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <DirectAnswer
        id="what-is-ecommerce-development"
        question="What is ecommerce website development?"
        answer="Ecommerce website development is the process of planning, designing and building an online store where customers browse products, pay securely and track orders. Webgram IT Solution builds B2C and B2B ecommerce websites on WooCommerce, Shopify and custom stacks, with Razorpay payments, GST-ready invoicing, mobile-first design and SEO foundations included."
      />

      <ComparisonTable
        id="woocommerce-vs-shopify"
        title="WooCommerce vs Shopify for Indian B2B & Retail"
        intro="Both platforms run successful Indian stores. The right choice depends on how much control, B2B logic and monthly cost your business needs."
        columns={["Feature", "WooCommerce", "Shopify", "Best Suited For"]}
        rows={[
          { feature: "Ownership & hosting", a: "Open-source on your own hosting; full code and data control.", b: "Hosted SaaS; Shopify manages servers and updates.", best: "WooCommerce for control, Shopify for hands-off hosting." },
          { feature: "Running cost", a: "No platform subscription; pay for hosting, plugins and maintenance.", b: "Monthly plan plus paid apps and theme costs.", best: "WooCommerce for lower long-term cost at scale." },
          { feature: "B2B features (tiered pricing, MOQ, RFQ)", a: "Flexible through B2B plugins and custom development.", b: "Advanced B2B tools mainly on higher plans or apps.", best: "WooCommerce for wholesalers and manufacturers." },
          { feature: "Indian payments & GST", a: "Razorpay, Cashfree, PayU and GST invoice plugins.", b: "Razorpay and other Indian gateways; GST via apps.", best: "Both work; WooCommerce offers deeper invoice customisation." },
          { feature: "Speed to launch", a: "Needs setup, hosting and configuration.", b: "Quick to launch with ready themes.", best: "Shopify for fast retail launches." },
          { feature: "Customisation", a: "Unlimited custom features, ERP and CRM integrations.", b: "Limited to theme code, apps and APIs.", best: "WooCommerce for custom workflows." },
          { feature: "Maintenance", a: "Updates, security and backups are your responsibility.", b: "Platform handles security and core updates.", best: "Shopify for small teams without technical staff." },
        ]}
      />



      <section className="bg-card py-6">
        <div className="ecom-shell grid items-center gap-5 md:grid-cols-[1.05fr_1.55fr]">
          <div>
            <Eyebrow>Why Invest in Ecommerce</Eyebrow>
            <h2 className="ecom-title mt-2">
              Take Your Business Online
              <br />
              with a Powerful Ecommerce Store
            </h2>
            <p className="ecom-copy mt-2 max-w-[470px]">
              A professional ecommerce website helps you reach more customers, sell 24/7, automate
              your business and create a stronger brand presence in the digital world.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {benefits.map(([Icon, stat, label]) => (
              <article
                key={label}
                className="grid min-h-[110px] place-items-center rounded-md border border-border bg-card p-3 text-center"
              >
                <Icon className="h-7 w-7 text-primary" />
                <div>
                  <strong className="block text-[13px] text-navy">{stat}</strong>
                  <span className="text-[13px] text-muted-foreground">{label}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-6">
        <div className="ecom-shell">
          <div className="grid items-end gap-3 md:grid-cols-[1fr_1.1fr_auto]">
            <div>
              <Eyebrow>Key Features</Eyebrow>
              <h2 className="ecom-title mt-2">
                Everything You Need for a Successful
                <br className="hidden md:block" /> Ecommerce Business
              </h2>
            </div>
            <p className="ecom-copy">
              From product showcase to secure checkout, we build ecommerce websites with all the
              essential features to help you sell smarter and scale faster.
            </p>
            <a href="#features" className="text-[13px] font-bold text-primary underline">
              View All Features <ArrowRight className="inline h-3 w-3" />
            </a>
          </div>
          <div id="features" className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">
            {features.map(([Icon, title, text, tone]) => (
              <article
                key={title}
                className="grid min-h-[68px] grid-cols-[38px_1fr] items-center gap-2 rounded-md border border-border/70 bg-card p-2.5"
              >
                <span className={`grid h-9 w-9 place-items-center rounded-md ${tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[13px] font-extrabold leading-tight text-navy">{title}</h3>
                  <p className="mt-1 text-[12px] leading-[1.25] text-muted-foreground">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-6">
        <div className="ecom-shell grid items-center gap-6 md:grid-cols-[285px_minmax(0,1fr)]">
          <div>
            <Eyebrow>Industries We Serve</Eyebrow>
            <h2 className="ecom-title mt-2">
              Ecommerce for
              <br />
              Every Industry
            </h2>
            <p className="ecom-copy mt-2">
              We build ecommerce solutions for businesses across multiple industries, tailored to
              their unique requirements.
            </p>
            <Button
              asChild
              className="mt-4 h-9 bg-gold px-5 text-[13px] font-bold text-navy hover:bg-gold/90"
            >
              <Link to="/contact">
                Discuss Your Industry <ArrowRight />
              </Link>
            </Button>
          </div>
          <IndustryCarousel />
        </div>
      </section>

      <section aria-label="Ecommerce development process" className="bg-sky-soft py-6 md:py-6">
        <div className="ecom-shell">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase text-primary md:text-[13px]"><span className="h-0.5 w-6 shrink-0 bg-gold md:w-8" />Our Development Process</p>
          <h2 className="mt-2 text-[20px] font-medium leading-[1.4] text-navy md:mt-3 md:text-[27px] md:leading-[1.3]">
            From Idea to Launch — A Clear &amp; Proven Process
          </h2>
          <ol className="mt-5 grid list-none gap-0 p-0 md:grid-cols-6 md:gap-3">
            {process.map(([Icon, number, title, text], index) => (
              <li key={title} className="relative grid min-w-0 grid-cols-[38px_minmax(0,1fr)] items-start gap-3 pb-5 last:pb-0 md:grid-cols-[45px_minmax(0,1fr)] md:gap-2 md:pb-0">
                {index < process.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[18px] top-[38px] w-px bg-primary/20 md:hidden" />}
                {index < process.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[40px] right-[-14px] top-[20px] hidden h-px bg-primary/40 md:block"
                  >
                    <ArrowRight className="absolute -right-1 -top-[6px] h-3 w-3 text-primary" />
                  </span>
                )}
                <span className="relative z-10 grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full border border-primary/15 bg-primary-soft text-primary md:h-10 md:w-10 md:border-0">
                  <Icon className="h-[18px] w-[18px] md:h-5 md:w-5" />
                </span>
                <div className="relative z-10 min-w-0">
                  <div className="flex min-h-[22px] items-center gap-2 pt-0.5 md:block md:pt-0">
                    <strong aria-hidden="true" className="block text-[12px] font-medium leading-5 text-primary md:text-[13px] md:font-bold md:text-navy">{number}</strong>
                    <h3 className="text-[16px] font-medium leading-[22px] text-navy md:mt-1 md:text-[15px] md:leading-5">{title}</h3>
                  </div>
                  <p className="mt-1 text-[15px] leading-[22px] text-muted-foreground md:text-[14px] md:leading-[1.4]">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-card py-6">
        <div className="ecom-shell grid items-center gap-5 md:grid-cols-[280px_1fr]">
          <div>
            <Eyebrow>Technology We Use</Eyebrow>
            <h2 className="ecom-title mt-2">
              Modern Technology
              <br />
              for Better Performance
            </h2>
            <p className="ecom-copy mt-2">
              We use industry-leading technologies to build fast, secure and scalable ecommerce
              websites.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-x-2 gap-y-3 lg:grid-cols-10">
            {technologies.map(
              (tech) =>
                tech && (
                  <article key={tech.name} className="min-w-0 text-center">
                    <span className="grid h-[62px] place-items-center rounded-md border border-border bg-card p-2.5 lg:h-[68px] lg:p-3">
                      <img
                        src={tech.src}
                        alt={`${tech.name} logo`}
                        width={80}
                        height={80}
                        loading="lazy"
                        className="h-full min-h-0 w-full min-w-0 object-contain"
                      />
                    </span>
                    <span className="mt-2 block text-[12px] text-muted-foreground">
                      {tech.name}
                    </span>
                  </article>
                ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-6" aria-label="Ecommerce success stories">
        <div className="ecom-shell grid min-w-0 gap-4 md:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <div className="self-center">
            <Eyebrow>Success Stories</Eyebrow>
            <h2 className="ecom-title mt-2">
              Ecommerce Projects
              <br />
              We Have Delivered
            </h2>
            <p className="ecom-copy mt-2">
              Explore some of our recent ecommerce projects and see how we helped businesses grow
              online.
            </p>
            <Button
              asChild
              className="mt-4 h-9 bg-gold px-5 text-[13px] font-bold text-navy hover:bg-gold/90"
            >
              <Link to="/work/$slug" params={{ slug: "case-studies" }}>
                View All Case Studies <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="ecom-scroll grid min-w-0 grid-flow-col auto-cols-[280px] gap-3 overflow-x-auto pb-1 md:auto-cols-auto md:grid-flow-row md:grid-cols-3 md:overflow-visible md:pb-0">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-card shadow-card"
              >
                <div className="relative min-h-[132px] flex-1 overflow-hidden">
                  <div className="relative z-10 w-[65%] p-3 pr-1">
                    <h3 className="text-[15px] font-medium leading-5 text-navy">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-5 text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="absolute inset-y-0 right-0 w-[35%] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} project`}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                    <span className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-card to-transparent" />
                  </div>
                </div>
                <div className="flex min-h-16 flex-wrap content-start gap-1.5 px-3 pb-3 pt-2 md:min-h-20 lg:min-h-16">
                  {project.tags.map((tag) => <span key={tag} className="max-w-full rounded-sm bg-primary-soft px-1.5 py-1 text-[13px] font-medium leading-4 text-navy">{tag}</span>)}
                </div>
                <div className="grid min-h-[88px] grid-cols-3 border-t border-border md:grid-cols-1 lg:grid-cols-3">
                  {project.metrics.map(([value, label], index) => (
                    <div
                      key={label}
                      className={`flex min-w-0 flex-col px-2 py-3 md:flex-row md:items-start md:gap-2 md:py-2 lg:flex-col lg:gap-0 lg:py-3 ${index ? "border-l border-border md:border-l-0 md:border-t lg:border-l lg:border-t-0" : ""}`}
                    >
                      <strong className="block shrink-0 text-[15px] font-semibold leading-5 text-navy md:w-11 lg:w-auto">
                        {value}
                      </strong>
                      <span className="mt-1 block text-[13px] leading-4 text-muted-foreground md:mt-0 md:leading-5 lg:mt-1 lg:leading-4">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ecom-final relative overflow-hidden bg-navy py-7 text-on-dark">
        <div className="ecom-waves absolute inset-0" />
        <div className="ecom-shell relative grid items-center gap-8 md:grid-cols-[1fr_1.15fr]">
          <div>
            <Eyebrow>Ready to Build Your Ecommerce Store?</Eyebrow>
            <h2 className="mt-2 text-[27px] font-bold leading-[1.08] md:text-[25px] lg:text-[30px]">
              <span className="block whitespace-nowrap">Let’s Turn Your Ecommerce</span>
              <span className="block">Idea into Reality.</span>
            </h2>
            <p className="mt-2.5 max-w-[500px] text-[13px] leading-[1.45] text-on-dark/85">
              <span className="block sm:whitespace-nowrap">
                Get a free consultation and let our experts help you build a high-performing
              </span>
              <span className="block">ecommerce website for your business.</span>
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-10 bg-gold px-6 text-[13px] font-bold text-navy hover:bg-gold/90"
              >
                <Link to="/contact">
                  Start Your Project <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-10 border-on-dark/60 bg-transparent px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"
              >
                <a href="tel:+917551120242">Talk to an Expert</a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[
              [Headphones, "Free Consultation", "Discuss your idea"],
              [Brush, "Custom Solution", "Tailored to your needs"],
              [TestTubeDiagonal, "On-Time Delivery", "With best practices"],
              [Rocket, "Long-Term Support", "We grow with you"],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof Headphones;
              return (
                <div key={title as string} className="text-center">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-on-dark/60">
                    <ItemIcon className="h-5 w-5" />
                  </span>
                  <strong className="mt-2 block text-[12px]">{title as string}</strong>
                  <small className="mt-1 block text-[12px] text-on-dark/70">{text as string}</small>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
