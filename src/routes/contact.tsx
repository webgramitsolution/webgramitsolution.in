import { HeroHeading } from "@/components/hero-heading";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  Clock3,
  Facebook,
  FileText,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  Send,
  Users,
  Youtube,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactImages, ikResize } from "@/lib/site-images";
import { SiteHeader } from "@/components/site-header";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { publicPageSchema, SITE_URL } from "@/lib/site-identity";
import { contactFaqQuestions, pickFaqs } from "@/lib/faq-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://webgramitsolution.in/contact" }],
    scripts: [...publicPageSchema("/contact", "Contact Webgram IT Solution", "Contact the Webgram IT Solution team in Sangam Vihar, New Delhi for website and ecommerce development.", "ContactPage"), {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/contact#faq`,
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }),
    }],
    meta: [
      { title: "Request a Website Development Quote | Webgram India" },
      {
        name: "description",
        content:
          "Contact Webgram IT Solution for website, ecommerce and digital growth services in Delhi NCR.",
      },
      { property: "og:title", content: "Contact Webgram IT Solution" },
      {
        property: "og:description",
        content: "Let's build something great together. Speak with the Webgram team today.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://webgramitsolution.in/contact" },
      { property: "og:image", content: contactImages.banner },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: contactImages.banner },
    ],
  }),
  component: ContactPage,
});

function ContactHero() {
  const promises = [
    [MessageCircle, "Discuss", "Your Idea"],
    [FileText, "Get a", "Free Quote"],
    [Users, "Expert", "Consultation"],
    [Rocket, "Start", "Your Project"],
  ] as const;
  return (
    <section id="top" className="contact-hero">
      <img
        src={ikResize(contactImages.banner, 1920)}
        srcSet={`${ikResize(contactImages.banner, 768)} 768w, ${ikResize(contactImages.banner, 1280)} 1280w, ${ikResize(contactImages.banner, 1920)} 1920w`}
        sizes="100vw"
        alt="Webgram IT Solution reception"
        width={2170}
        height={725}
        className="absolute inset-0 h-full w-full object-cover object-right"
      />
      <div className="page-shell relative z-10 flex h-full items-center">
        <div className="max-w-[570px] py-6 text-on-dark">
          <nav className="sr-only" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="mx-2">›</span>Contact Us
          </nav>
          <p className="sr-only">Get in Touch</p>
          <HeroHeading className="text-[34px] font-extrabold leading-[1.03] sm:text-[41px] lg:text-[48px]" lines={["Request a Website", "Development Quote"]} accent="text-gold" />
          <p className="mt-4 text-[13px] leading-[1.55] text-on-dark/90 sm:text-[14px]">
            Have a project in mind? We’re here to help you turn your ideas
            <br className="hidden sm:block" /> into a powerful digital commerce experience.
          </p>
          <div className="mt-6 grid max-w-[520px] grid-cols-4 divide-x divide-on-dark/20">
            {promises.map(([Icon, first, second]) => (
              <div key={second} className="px-3 first:pl-0">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-on-dark/40">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-2 block text-[14px] leading-[1.3]">
                  {first}
                  <br />
                  {second}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const fieldClass = "h-9 bg-card text-[14px] shadow-none md:text-[14px] placeholder:text-muted-foreground/60";

function ContactForm() {
  const send = useServerFn(submitEnquiry);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      await send({ data: { name, email, phone: `+91${phone}`, service: projectType, message, business, budget, timeline, website } });
      setDone(true);
    } catch (caught) { setError(caught instanceof Error && caught.message.length < 120 ? caught.message : "Please check your details and try again."); }
    finally { setBusy(false); }
  }
  if (done) return <div className="rounded-md border border-success/30 bg-success-soft p-6 text-center"><h3 className="text-xl font-extrabold text-navy">Message received</h3><p className="mt-2 text-sm text-muted-foreground">Your enquiry is with our team. We’ll review your project and reply to the email address you provided.</p></div>;
  return (
    <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={submit}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} className="hidden" />
      <label className="contact-field">
        Your Name *<Input required minLength={2} maxLength={100} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name" className={fieldClass} />
      </label>
      <label className="contact-field">
        Email Address *
        <Input required type="email" maxLength={255} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" className={fieldClass} />
      </label>
      <label className="contact-field">
        Phone Number *
        <div className="flex items-stretch overflow-hidden rounded-md border border-input bg-card">
          <span
            className="flex shrink-0 items-center gap-1.5 border-r border-input px-2.5 text-[14px] font-semibold text-navy"
            aria-hidden="true"
          >
            <span
              className="h-3.5 w-5 rounded-[2px] shadow-[inset_0_0_0_1px_rgb(0_0_0/8%)]"
              style={{
                background:
                  "linear-gradient(180deg, #FF9933 0 33.4%, #FFFFFF 33.4% 66.7%, #138808 66.7% 100%)",
              }}
            />
            +91
          </span>
          <Input
            required
            type="tel"
            autoComplete="tel-national"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            aria-label="Indian mobile number, 10 digits"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="10-digit mobile number"
            className="h-9 min-w-0 rounded-none border-0 bg-card text-[14px] shadow-none focus-visible:ring-0 md:text-[14px]"
          />
        </div>
      </label>
      <label className="contact-field">
        Project Type
        <Select value={projectType} onValueChange={setProjectType}>
          <SelectTrigger className={fieldClass} aria-label="Project type">
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            {["Website Design", "Ecommerce Development", "Shopify Development", "WooCommerce Development", "B2B Commerce", "Web Portal Development", "API Integration", "Website Maintenance", "Other"].map((service) => (
              <SelectItem key={service} value={service}>{service}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label className="contact-field">
        Business Name
        <Input maxLength={120} autoComplete="organization" value={business} onChange={(event) => setBusiness(event.target.value)} placeholder="Enter your business name" className={fieldClass} />
      </label>
      <label className="contact-field">
        Project Budget
        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger className={fieldClass} aria-label="Project budget">
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Under ₹25,000">Under ₹25k</SelectItem>
            <SelectItem value="₹25,000–₹50,000">₹25k – ₹50k</SelectItem>
            <SelectItem value="₹50,000–₹1,00,000">₹50k – ₹1L</SelectItem>
            <SelectItem value="Above ₹1,00,000">₹1L+</SelectItem>
            <SelectItem value="Still deciding">Still deciding</SelectItem>
          </SelectContent>
        </Select>
      </label>
      <label className="contact-field">
        Target Launch
        <Select value={timeline} onValueChange={setTimeline}>
          <SelectTrigger className={fieldClass} aria-label="Target launch">
            <SelectValue placeholder="Select a timeline" />
          </SelectTrigger>
          <SelectContent>
            {["Within 1 month", "1–3 months", "3+ months", "Still planning"].map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label className="contact-field sm:col-span-2">
        Your Message *
        <Textarea
          required
          minLength={5}
          maxLength={2600}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us about your project requirements..."
          className="min-h-[60px] bg-card text-[14px] shadow-none md:text-[14px]"
        />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-1 sm:col-span-2">
        <label className="flex min-w-0 items-center gap-2 text-[14px] text-navy">
          <input required type="checkbox" className="h-4 w-4 shrink-0 accent-primary" />
          <span className="min-w-0">
            I agree to the{" "}
            <Link to="/terms-and-conditions" className="font-bold text-primary underline">Terms</Link>
            {" & "}
            <Link to="/privacy-policy" className="font-bold text-primary underline">Privacy Policy</Link>
          </span>
        </label>
        {error ? <p role="alert" className="w-full text-xs font-semibold text-destructive">{error}</p> : null}
        <Button disabled={busy} className="h-10 shrink-0 bg-gold px-7 text-[14px] font-bold text-navy hover:bg-gold/90">
          {busy ? "Sending…" : "Request a Quote"} <ArrowRight />
        </Button>
      </div>
    </form>
  );
}

function DirectContact() {
  const details = [
    [Phone, "Call Us", "+91 7551120242", "Mon - Sat, 10:00 AM - 7:00 PM", "text-primary"],
    [
      Mail,
      "Email Us",
      "info@webgramitsolution.in",
      "We usually reply within one business day",
      "text-primary",
    ],
    [
      MessageCircle,
      "Chat on WhatsApp",
      "+91 7551120242",
      "Quick support and project discussion",
      "text-success",
    ],
    [MapPin, "Our Location", "Delhi NCR, India", "Visit our office for a meeting", "text-primary"],
  ] as const;
  return (
    <div className="contact-direct overflow-hidden rounded-lg bg-navy text-on-dark shadow-card">
      <div className="min-w-0 p-5 sm:p-6">
        <h2 className="text-[21px] font-extrabold leading-tight lg:text-[22px]">
          Get in Touch Directly
        </h2>
        <p className="mt-1.5 text-[14px] text-on-dark/75">
          Prefer to speak with our team? Use the details below.
        </p>
        <div className="mt-6 space-y-6">
          {details.map(([Icon, title, value, note, color]) => (
            <div key={title} className="grid grid-cols-[46px_1fr] items-center gap-3.5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-card shadow-card">
                <Icon className={`h-5 w-5 ${color}`} />
              </span>
              <div className="min-w-0">
                <strong className="block text-[14px] font-semibold text-on-dark/85">{title}</strong>
                <span className="mt-0.5 block break-all text-[13px] font-bold lg:whitespace-nowrap lg:break-normal lg:text-[14px]">{value}</span>
                <small className="mt-0.5 block text-[13px] text-on-dark/60">{note}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative min-h-[360px] md:min-h-0">
        <img
          src={contactImages.advisor}
          alt="Webgram customer support specialist"
          width={928}
          height={1695}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-x-3 bottom-3 rounded-lg bg-card p-3.5 text-navy shadow-card sm:inset-x-4 sm:bottom-4">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft">
              <Headphones className="h-5 w-5 text-primary" />
            </span>
            <div className="min-w-0">
              <strong className="text-[14px] font-extrabold lg:whitespace-nowrap">Talk to Our Experts</strong>
              <p className="mt-1 text-[13px] leading-[1.45] text-muted-foreground">
                Get free consultation for your project requirements.
              </p>
            </div>
          </div>
          <Button
            asChild
            className="mt-3 h-10 w-full gap-1 bg-navy px-2 text-[14px] font-bold text-on-dark hover:bg-navy/90"
          >
            <a href="tel:+917551120242">
              Schedule a Call <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ContactMain() {
  return (
    <section id="contact" className="bg-background py-6 md:py-8">
      <div className="page-shell grid items-stretch gap-4 md:grid-cols-[.94fr_1.06fr]">
        <div className="rounded-lg border border-border/80 bg-card p-5 shadow-card sm:p-6">
          <p className="eyebrow flex items-center gap-3 text-muted-foreground">
            <span className="h-px w-8 bg-gold" />
            Contact Us
          </p>
          <h2 className="mt-2 text-[24px] font-extrabold leading-tight text-navy sm:text-[26px]">
            Request a Project Quote
          </h2>
          <p className="mb-4 mt-1.5 max-w-[360px] text-[14px] leading-5 text-muted-foreground">
            Tell us about your project, and our team will usually reply within one business day.
          </p>
          <ContactForm />
        </div>
        <DirectContact />
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="bg-card py-6 md:py-8">
      <div className="page-shell grid items-center gap-6 md:grid-cols-[.46fr_.54fr] md:gap-8">
        <div className="py-1">
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-gold" />
            Our Office Location
          </p>
          <h2 className="mt-2 text-[27px] font-extrabold leading-tight text-navy sm:text-[31px]">
            Delhi NCR, India
          </h2>
          <p className="mt-2 max-w-[460px] text-[14px] leading-5 text-muted-foreground">
            We’re located in the heart of Delhi NCR, easily accessible for in-person meetings and
            project discussions.
          </p>
          <div className="mt-5 flex gap-4 rounded-lg bg-sky-soft p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-primary shadow-card">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <strong className="text-[14px] text-navy">Head Office</strong>
              <p className="mt-1.5 text-[14px] leading-5 text-muted-foreground">
                F3/780, Block C, Devli, Sangam Vihar
                <br />
                New Delhi, Delhi 110062
                <br />
                <a href="tel:+917551120242" className="font-semibold text-navy">+91 7551120242</a>
                <br />
                <a href="mailto:info@webgramitsolution.in" className="font-semibold text-navy">info@webgramitsolution.in</a>
              </p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border/70">
          <iframe
            title="Webgram IT Solution location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.3773900406163!2d77.2399091!3d28.4982913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1d73c888e6f%3A0x679aac9b7129eb22!2sWebgram%20IT%20Solution%20%7C%20Website%20%26%20eCommerce%20Developer%20Delhi!5e0!3m2!1sen!2sin!4v1790644608245!5m2!1sen!2sin"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <Button
            asChild
            className="absolute bottom-4 left-4 z-10 h-10 bg-navy text-[14px] text-on-dark hover:bg-navy/90"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=Webgram+IT+Solution+Delhi"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-1.7-.02-3.74.43-5.67l1.29-5.45s-.32-.65-.32-1.61c0-1.51.87-2.64 1.96-2.64.93 0 1.38.7 1.38 1.53 0 .93-.59 2.32-.9 3.61-.26 1.08.54 1.96 1.6 1.96 1.92 0 3.39-2.02 3.39-4.94 0-2.58-1.86-4.39-4.51-4.39-3.07 0-4.87 2.3-4.87 4.68 0 .93.36 1.92.8 2.46.09.11.1.2.08.31l-.3 1.22c-.05.2-.16.25-.37.15-1.39-.65-2.26-2.68-2.26-4.31 0-3.51 2.55-6.73 7.36-6.73 3.86 0 6.86 2.75 6.86 6.43 0 3.84-2.42 6.92-5.77 6.92-1.13 0-2.19-.59-2.55-1.28l-.69 2.64c-.25.97-.93 2.18-1.38 2.92.91.28 1.85.42 2.82.42A10 10 0 0 0 12 2Z" /></svg>;
}

function ConnectHours() {
  const socials = [
    [Linkedin, "LinkedIn", "Follow Us", "bg-linkedin"],
    [Instagram, "Instagram", "Follow Us", "bg-instagram"],
    [Facebook, "Facebook", "Like Our Page", "bg-facebook"],
    [Youtube, "YouTube", "Subscribe", "bg-youtube"],
    [PinterestIcon, "Pinterest", "Follow Us", "bg-pinterest"],
  ] as const;
  const urls: Record<string, string> = {
    LinkedIn: "https://www.linkedin.com/company/webgramitsolution",
    Instagram: "https://www.instagram.com/webgramitsolution/",
    Facebook: "https://www.facebook.com/webgramitsolution/",
    YouTube: "https://www.youtube.com/@webgramitsolution",
    Pinterest: "https://www.pinterest.com/webgramitsolution/",
  };
  return (
    <section className="bg-background py-5">
      <div className="page-shell grid gap-6 md:grid-cols-[1.25fr_.75fr] md:divide-x md:divide-border">
        <div>
          <h2 className="text-[23px] font-extrabold text-navy sm:text-[26px]">
            Other Ways to Connect
          </h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Follow us on social media for latest updates, insights and project inspiration.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-5">
            {socials.map(([Icon, title, sub, tone]) => (
              <a
                href={urls[title]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Webgram IT Solution on ${title}`}
                key={title}
                className="flex items-center gap-2.5 text-navy hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-md text-primary-foreground ${tone}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <strong className="block whitespace-nowrap text-[14px]">{title}</strong>
                  <small className="block whitespace-nowrap text-[14px] text-muted-foreground">
                    {sub}
                  </small>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="md:pl-8">
          <h2 className="text-[23px] font-extrabold text-navy sm:text-[26px]">Business Hours</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            We’re available to support your business.
          </p>
          <div className="mt-4 flex gap-4">
            <Clock3 className="h-11 w-11 shrink-0 text-primary" />
            <dl className="grid flex-1 grid-cols-2 gap-y-2 text-[14px] text-muted-foreground">
              <dt>Monday - Saturday</dt>
              <dd className="text-right">10:00 AM - 7:00 PM</dd>
              <dt>Sunday</dt>
              <dd className="text-right">
                Closed
                <small className="block text-[13px]">(Available on appointment)</small>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = pickFaqs(contactFaqQuestions);

function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-card py-5">
      <div className="page-shell">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow flex items-center gap-3 text-muted-foreground">
              <span className="h-px w-8 bg-gold" />
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 text-[27px] font-extrabold text-navy sm:text-[29px]">
              Quick Answers
            </h2>
            <p className="text-[14px] text-muted-foreground">
              Find answers to common questions about working with Webgram.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden h-9 border-navy text-[13px] text-navy sm:flex"
          >
            <Link to="/resources/faqs">View All FAQs <ArrowRight /></Link>
          </Button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[faqs.slice(0, 4), faqs.slice(4)].map((column, index) => (
            <Accordion
              key={index}
              type="multiple"
              className="rounded-lg border border-border bg-card px-4 shadow-card"
            >
              {column.map(([question, answer]) => (
                <AccordionItem
                  key={question}
                  value={question}
                  className="border-border last:border-b-0"
                >
                  <AccordionTrigger className="py-3 text-[15px] font-semibold text-navy hover:no-underline">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] leading-5 text-muted-foreground">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <SiteHeader />
      <ContactHero />
      <ContactMain />
      <Location />
      <ConnectHours />
      <Faq />
    </main>
  );
}
