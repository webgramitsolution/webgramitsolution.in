import { Link, useLocation } from "@tanstack/react-router";
import { AreasWeServe } from "@/components/areas-we-serve";
import { ArrowRight, Facebook, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react";

const LOGO_URL = "https://ik.imagekit.io/x3cipokny/webgram%20it%20solution?updatedAt=1790815003792";

const columns = [
  ["Solutions", [{ label: "Ecommerce", to: "/solutions/ecommerce-development" }, { label: "B2B Commerce", to: "/solutions/b2b-commerce" }, { label: "Website Design & Development", to: "/solutions/website-design-development" }]],
  ["Services", [{ label: "Web Portal Development", to: "/services/web-portal-development" }, { label: "Website Design", to: "/services/website-design" }, { label: "WooCommerce", to: "/services/woocommerce" }, { label: "API Integration", to: "/services/api-integration" }]],
  ["Resources", [{ label: "Guides", to: "/resources/guides" }, { label: "FAQs", to: "/resources/faqs" }]],
  ["Company", [{ label: "Blog", to: "/blog" }, { label: "About Us", to: "/about" }, { label: "Contact", to: "/contact" }, { label: "Privacy Policy", to: "/privacy-policy" }, { label: "Sitemap", to: "/sitemap" }]],
  ["Legal", [{ label: "DPDP Policy", to: "/dpdp-policy" }, { label: "Terms & Conditions", to: "/terms-and-conditions" }, { label: "Cookie Policy", to: "/cookie-policy" }, { label: "Disclaimer", to: "/disclaimer" }]],
] as const;

const WHATSAPP_ICON_URL = "https://ik.imagekit.io/x3cipokny/icon/whatsapp.png";

function PinterestIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-1.7-.02-3.74.43-5.67l1.29-5.45s-.32-.65-.32-1.61c0-1.51.87-2.64 1.96-2.64.93 0 1.38.7 1.38 1.53 0 .93-.59 2.32-.9 3.61-.26 1.08.54 1.96 1.6 1.96 1.92 0 3.39-2.02 3.39-4.94 0-2.58-1.86-4.39-4.51-4.39-3.07 0-4.87 2.3-4.87 4.68 0 .93.36 1.92.8 2.46.09.11.1.2.08.31l-.3 1.22c-.05.2-.16.25-.37.15-1.39-.65-2.26-2.68-2.26-4.31 0-3.51 2.55-6.73 7.36-6.73 3.86 0 6.86 2.75 6.86 6.43 0 3.84-2.42 6.92-5.77 6.92-1.13 0-2.19-.59-2.55-1.28l-.69 2.64c-.25.97-.93 2.18-1.38 2.92.91.28 1.85.42 2.82.42A10 10 0 0 0 12 2Z" /></svg>;
}

const socials: Array<[LucideIcon | typeof PinterestIcon | null, string]> = [
  [Linkedin, "LinkedIn"],
  [Instagram, "Instagram"],
  [Facebook, "Facebook"],
  [null, "WhatsApp"],
  [Youtube, "YouTube"],
  [PinterestIcon, "Pinterest"],
];
const socialUrls: Record<string, string> = { LinkedIn: "https://www.linkedin.com/company/webgramitsolution", Instagram: "https://www.instagram.com/webgramitsolution/", Facebook: "https://www.facebook.com/webgramitsolution/", WhatsApp: "https://wa.me/917551120242", YouTube: "https://www.youtube.com/@webgramitsolution", Pinterest: "https://www.pinterest.com/webgramitsolution/" };

export function SiteFooter() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const showQuote = !["/", "/contact", "/auth"].includes(pathname) && !pathname.startsWith("/admin");
  return (
    <footer className="bg-navy text-on-dark">
      {showQuote && (
        <div className="ecom-waves border-b border-on-dark/15">
          <div className="page-shell flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <h2 className="text-xl font-extrabold">Ready to discuss your project?</h2>
              <p className="mt-1 text-sm text-on-dark/75">Share what you need with our team in Delhi NCR.</p>
            </div>
            <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#f4c657] px-4 text-sm font-extrabold text-navy hover:bg-[#ffe29c]">
              Request a Project Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
      <AreasWeServe />
      <div className="page-shell grid gap-y-4 py-5 md:grid-cols-[1.3fr_repeat(5,1fr)] md:gap-0 lg:grid-cols-[1.6fr_repeat(5,1fr)]">
        <div className="md:pr-3 lg:pr-5">
          <img src={LOGO_URL} alt="Webgram IT Solution" width={720} height={177} loading="lazy" className="h-9 w-auto object-contain brightness-0 invert" />
          <p className="mt-2 max-w-[250px] text-sm leading-relaxed text-on-dark/85">
            Custom websites and ecommerce solutions built for measurable business growth.
          </p>
        </div>
        <div className="divide-y divide-on-dark/15 border-y border-on-dark/15 sm:hidden">
          {columns.map(([title, items]) => (
            <details key={title} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-on-dark [&::-webkit-details-marker]:hidden">
                <span className="font-semibold">{title}</span>
                <span aria-hidden className="text-lg transition-transform group-open:rotate-45">+</span>
              </summary>
              <ul className="space-y-1 pb-3">
                {items.map((item) => (
                  <li key={item.label}><a href={item.to} className="text-[13px] text-on-dark/75 hover:text-on-dark">{item.label}</a></li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        <div className="hidden grid-cols-3 gap-x-3 gap-y-4 sm:grid md:contents">
          {columns.map(([title, items]) => (
            <nav key={title} aria-label={`${title} links`} className="min-w-0 border-l border-on-dark/15 pl-3">
              <h3 className="text-base text-on-dark">{title}</h3>
              <ul className="mt-2 space-y-1">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.to}
                      className="inline-block text-[13px] leading-5 text-on-dark/75 transition-colors hover:text-on-dark focus-visible:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="page-shell flex flex-col items-center justify-between gap-2 border-t border-on-dark/15 py-[10px] sm:flex-row">
        <div className="text-center text-[14px] text-on-dark/90 sm:text-left">
          <span>© 2026 Webgram IT Solution. All rights reserved.</span>
        </div>
        <div className="flex shrink-0 gap-2" aria-label="Webgram IT Solution social media">
          {socials.map(([Icon, label]) => (
            <a key={label} href={socialUrls[label]} target="_blank" rel="noopener noreferrer" aria-label={`Follow Webgram IT Solution on ${label}`} title={label} className="grid h-8 w-8 place-items-center rounded bg-on-dark/20 transition-colors hover:bg-on-dark/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark">
              {label === "WhatsApp" ? <img src={WHATSAPP_ICON_URL} alt="" className="h-4 w-4 object-contain" /> : Icon ? <Icon className="h-4 w-4" /> : null}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
