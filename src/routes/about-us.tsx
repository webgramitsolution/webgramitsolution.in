import { HeroHeading } from "@/components/hero-heading";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronDown,
  Clock,
  Code2,
  Eye,
  Facebook,
  FileText,
  Gem,
  Handshake,
  Headphones,
  HeartHandshake,
  Linkedin,
  MessageSquare,
  PenTool,
  Play,
  Rocket,
  Send,
  Settings,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { aboutImages, ikResize } from "@/lib/site-images";
import { businessIdentity, publicPageSchema } from "@/lib/site-identity";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us | Webgram IT Solution, Delhi NCR" },
      {
        name: "description",
        content:
          "Meet the New Delhi team behind Webgram IT Solution. Learn how we plan, build and support ecommerce websites and B2B commerce platforms for Indian businesses.",
      },
      { property: "og:title", content: "About Webgram IT Solution" },
      {
        property: "og:description",
        content:
          "Driven by purpose and focused on helping businesses grow through thoughtful digital solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://webgramitsolution.in/about-us" },
      { property: "og:image", content: `${aboutImages.banner}?tr=w-1200,h-630,c-at_max` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${aboutImages.banner}?tr=w-1200,h-630,c-at_max` },
    ],
    links: [{ rel: "canonical", href: "https://webgramitsolution.in/about-us" }],
    scripts: publicPageSchema("/about-us", "About Webgram IT Solution", "Webgram IT Solution builds business websites, ecommerce stores and B2B commerce platforms in Delhi NCR.", "AboutPage"),
  }),
  component: AboutPage,
});

const menu: Array<[string, string[]]> = [
  ["Home", []],
  ["Solutions", ["Ecommerce Development", "B2B Commerce", "Website Design & Development"]],
  ["Services", ["Website Development", "SEO", "Google Ads", "Social Media Ads"]],
  ["Industries", ["Manufacturing", "Retail", "Wholesale", "Furniture"]],
  ["Case Studies", []],
  ["Resources", ["Blog", "Guides", "FAQs", "Insights"]],
  ["Company", ["About Us", "Careers", "Contact Us"]],
];

function AboutHero() {
  const stats = [
    ["2022", "Client Work Since"],
    ["2022", "GST Registered"],

    ["Delhi NCR", "Based in India"],
  ];
  return (
    <section className="site-hero relative min-h-[520px] overflow-hidden bg-navy md:h-[348px] md:min-h-[348px]">
      <picture className="pointer-events-none absolute inset-0">
        <img
          src={ikResize(aboutImages.banner, 1920)}
          srcSet={`${ikResize(aboutImages.banner, 768)} 768w, ${ikResize(aboutImages.banner, 1280)} 1280w, ${ikResize(aboutImages.banner, 1920)} 1920w`}
          sizes="100vw"
          alt="Webgram IT Solution office reception"
          width={2170}
          height={725}
          className="block h-full w-full object-cover object-right max-md:opacity-65"
          fetchPriority="high"
        />
      </picture>
      <div className="service-hero-shade pointer-events-none absolute inset-y-0 start-0 hidden md:block" aria-hidden="true" />
      <div className="page-shell relative z-10 flex h-full items-center py-6 md:absolute md:inset-0">
        <div className="max-w-[440px] text-on-dark">
          <HeroHeading className="mt-2 text-[32px] font-extrabold leading-[1.05] sm:text-[38px] lg:text-[42px]" lines={["About Us", "Webgram IT Solution"]} accent="text-[#f4c657]" />
          <p className="mt-4 max-w-[400px] text-[14px] leading-[1.6] text-on-dark/90">
            We are a technology-driven company focused on building high-performance eCommerce, B2B,
            B2C and custom digital solutions that help businesses grow, scale and succeed.
          </p>
          <div className="mt-5 flex items-center gap-5">
            <Button
              asChild
              className="h-10 rounded-sm bg-gold px-7 text-[13px] font-bold text-navy hover:bg-gold/90"
            >
              <a href="#story">
                Our Story <ArrowRight />
              </a>
            </Button>
            <a
              href="https://www.youtube.com/watch?v=w7cH1imJB40"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-card text-navy">
                <Play aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
              </span>
              <span className="text-[13px] font-semibold leading-tight">
                Watch Video
              </span>
            </a>
          </div>
          <div className="mt-6 grid grid-cols-4 divide-x divide-on-dark/25">
            {stats.map(([n, l]) => (
              <div key={l} className="px-3 first:pl-0">
                <strong className="block text-[20px] font-extrabold leading-none">{n}</strong>
                <span className="mt-1 block text-[12px] leading-tight text-on-dark/80">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  const cards = [
    [
      Target,
      "Business-Focused Approach",
      "We understand your business goals and build solutions that deliver real results.",
    ],
    [
      Code2,
      "End-to-End Development",
      "From strategy and design to development and deployment, we handle everything.",
    ],
    [
      Settings,
      "Latest Technology",
      "We use modern, scalable and secure technologies for high-performance solutions.",
    ],
    [
      Users,
      "Long-Term Partnership",
      "We believe in long-term relationships and continue to support your growth journey.",
    ],
  ] as const;
  return (
    <section id="story" className="bg-sky-soft py-7">
      <div className="page-shell grid items-center gap-6 md:grid-cols-[1fr_1.25fr]">
        <div>
          <p className="eyebrow flex items-center gap-3 text-muted-foreground">
            <span className="h-px w-7 bg-gold" />
            Who We Are
          </p>
          <h2 className="mt-2 text-[24px] font-extrabold leading-[1.15] text-navy lg:text-[27px]">
            Your Digital Commerce
            <br />
            <span className="text-primary">Technology Partner</span>
          </h2>
          <p className="mt-3 max-w-[400px] text-[14px] leading-[1.6] text-muted-foreground">
            Webgram IT Solution is a leading web development and digital commerce company in Delhi
            NCR, helping businesses transform their ideas into powerful online platforms. We
            specialize in eCommerce, B2B portals, marketplace development, custom web applications
            and complete digital transformation solutions.
          </p>
          <Button
            asChild
            className="mt-4 h-9 rounded-sm bg-gold px-5 text-[13px] font-bold text-navy hover:bg-gold/90"
          >
            <Link to="/contact">
              More About Us <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {cards.map(([Icon, t, d]) => (
            <article
              key={t}
              className="flex gap-4 rounded-md border border-border bg-card p-4 shadow-card"
            >
              <Icon className="h-7 w-7 shrink-0 text-primary" />
              <div>
                <h3 className="text-[14px] font-bold leading-tight text-navy">{t}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">{d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Purpose() {
  const pillars = [
    [
      Target,
      "Our Mission",
      "To empower businesses with innovative digital commerce solutions that drive growth, efficiency and long-term success.",
    ],
    [
      Eye,
      "Our Vision",
      "To be a trusted global technology partner known for building scalable, future-ready digital commerce ecosystems.",
    ],
    [
      Gem,
      "Our Values",
      "Innovation, integrity, quality, transparency and a commitment to client success.",
    ],
  ] as const;
  return (
    <section className="border-t border-border bg-card">
      <div className="grid md:grid-cols-[38%_1fr]">
        <div className="relative min-h-[220px]">
          <img
            src={aboutImages.mission}
            alt="Webgram team working in the office"
            width={1716}
            height={917}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="px-5 py-7 sm:px-8 lg:px-10">
          <p className="eyebrow flex items-center gap-3 text-muted-foreground">
            <span className="h-px w-7 bg-gold" />
            Our Mission, Vision &amp; Values
          </p>
          <h2 className="mt-2 text-[22px] font-extrabold text-navy lg:text-[24px]">
            Driven by Purpose, Focused on Your Growth
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-border">
            {pillars.map(([Icon, title, text], i) => (
              <article key={title} className="sm:px-4 sm:first:pl-0">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border ${i === 2 ? "border-gold/50 text-gold" : "border-primary/40 text-primary"}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-[13px] font-bold text-navy">{title}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    [
      Rocket,
      "2022",
      "The Beginning",
      "Webgram IT Solution was GST registered and started building websites for businesses.",
    ],
    [
      BarChart3,
      "2023",
      "Growing Expertise",
      "Expanded services in eCommerce, WordPress and custom web development.",
    ],
    [
      Users,
      "2023",
      "Scaling Solutions",
      "Started delivering B2B, B2C and marketplace platforms for diverse industries.",
    ],
    [
      Handshake,
      "2024",
      "Stronger Partnerships",
      "Built long-term relationships with clients across India.",
    ],
    [
      Trophy,
      "2025+",
      "A Bigger Tomorrow",
      "Continuing to innovate and help businesses scale globally.",
    ],
  ] as const;
  return (
    <section className="border-t border-border bg-card py-7">
      <div className="page-shell grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr]">
        <div>
          <p className="eyebrow flex items-center gap-3 text-muted-foreground">
            <span className="h-px w-7 bg-gold" />
            Our Journey
          </p>
          <h2 className="mt-2 text-[22px] font-extrabold text-navy">From Ideas to Impact</h2>
          <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">
            A journey of continuous learning, innovation and delivering value to businesses across
            industries.
          </p>
          <Button
            asChild
            className="mt-4 h-8 rounded-sm bg-gold px-4 text-[13px] font-bold text-navy hover:bg-gold/90"
          >
            <a href="#story">
              View Our Journey <ArrowRight />
            </a>
          </Button>
        </div>
        <div className="journey-scroll grid grid-flow-col auto-cols-[150px] gap-3 overflow-x-auto pb-2 md:grid-flow-row md:grid-cols-5 md:overflow-visible">
          {steps.map(([Icon, y, t, d], i) => (
            <article key={y} className="relative">
              <div className="flex items-center">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-sky-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                {i < steps.length - 1 && <span className="ml-2 h-px flex-1 bg-gold/70" />}
              </div>
              <strong className="mt-3 block text-[13px] text-navy">{y}</strong>
              <h3 className="text-[13px] font-bold text-navy">{t}</h3>
              <p className="mt-1 text-[13px] leading-[1.5] text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workspace() {
  return (
    <section className="border-t border-border bg-sky-soft py-3">
      <div className="page-shell grid gap-5 md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="self-center">
          <p className="eyebrow flex items-center gap-3 text-muted-foreground">
            <span className="h-px w-7 bg-gold" />
            Our Workspace
          </p>
          <h2 className="mt-2 text-[21px] font-extrabold leading-tight text-navy">
            A Creative &amp; Collaborative Environment
          </h2>
          <p className="mt-2 text-[13px] leading-[1.5] text-muted-foreground">
            Our team works in a modern, collaborative and innovative environment, combining
            creativity with technology to deliver exceptional results for our clients.
          </p>
          <Button
            asChild
            className="mt-4 h-8 rounded-sm bg-gold px-4 text-[13px] font-bold text-navy hover:bg-gold/90"
          >
            <Link to="/contact">
              Join Our Team <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="grid items-center gap-2 self-center sm:grid-cols-[1.55fr_1.4fr_1fr]">
          {aboutImages.workspace.map((image) => (
            <figure key={image.label} className="group relative overflow-hidden rounded-sm">
              <img
                src={image.src}
                alt={image.label}
                width={1672}
                height={941}
                loading="lazy"
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-[160px]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-3 pb-2 pt-6 text-[13px] font-semibold text-on-dark">
                {image.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    [BadgeCheck, "Proven Expertise", "Published examples of our ecommerce and web development work."],
    [HeartHandshake, "Client-Centric Approach", "Solutions tailored to your business goals."],
    [Clock, "Quality & Timely Delivery", "On-time project delivery with best practices."],
    [MessageSquare, "Transparent Communication", "Clear updates at every stage of development."],
    [Headphones, "Dedicated Support", "Continuous support for long-term success."],
  ] as const;
  return (
    <section className="bg-navy py-5 text-on-dark">
      <div className="page-shell">
        <h2 className="text-[17px] font-bold">Why Businesses Choose Webgram</h2>
        <p className="mt-1 text-[13px] text-on-dark/80">
          More than just development — we are your long-term digital commerce partner.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:divide-x md:divide-on-dark/20">
          {items.map(([Icon, t, d]) => (
            <div key={t} className="flex items-center gap-3 md:px-3 md:first:pl-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-on-dark/40">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <strong className="block text-[13px]">{t}</strong>
                <small className="block text-[12px] leading-tight text-on-dark/75">{d}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <SiteHeader />
      <AboutHero />
      <WhoWeAre />
      <Purpose />
      <Journey />
      <Workspace />
      <WhyChoose />
      <section id="editorial" className="border-t border-border bg-card py-10">
        <div className="page-shell max-w-3xl">
          <h2 className="text-2xl font-extrabold text-navy">Who is behind Webgram’s guides?</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Webgram IT Solution was founded by <a className="font-semibold text-primary underline" href={businessIdentity.founder.sameAs}>Vikas Kumar</a> in New Delhi. Our team publishes guides on ecommerce, web development and B2B portals. Article bylines and dates identify the author and when the guidance was published or updated.
          </p>
          <p className="mt-3 leading-7 text-muted-foreground">
            Explore our <Link to="/work/portfolio" className="font-semibold text-primary underline">published client work</Link> to see examples of what we build. If you spot an error in a guide, <Link to="/contact" className="font-semibold text-primary underline">send us the page link and the correction</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
