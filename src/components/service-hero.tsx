import type { ReactNode } from "react";

const descriptions = {
  "case-studies": "Illustrative ecommerce storefront, wholesale dashboard and business website on three devices",
  "website-guides": "Website planning checklists and a guides library on a studio desk",
  "project-pricing": "Project planning meeting with a website wireframe and printed scope on the desk",
  "portfolio-studio": "Illustration of ecommerce, wholesale and service websites on three devices in a design studio",
  "website-faq": "Help centre and project planning materials on a studio desk",
  "contact-team": "Two professionals discussing a website project at a studio table",
  "ecommerce-development": "Online storefront on laptop and phone in a retail showroom",
  "b2b-commerce": "Wholesale ordering dashboard in a distribution warehouse",
  "website-design-development": "Responsive business website displayed in an architecture studio",
  "marketplace-development": "Multi-vendor marketplace catalogue and seller workspace",
  "web-portal-development": "Customer and vendor portal dashboards in an operations office",
  "website-design": "Responsive website mockups in a brand design studio",
  wordpress: "WordPress content editor and business website in an editorial studio",
  woocommerce: "Furniture storefront on laptop and phone in a showroom",
  shopify: "Indian fashion storefront on laptop and phone in a textile showroom",
  "api-integration": "Connected order and inventory dashboards in a commerce operations centre",
  "website-maintenance": "Website uptime and backup monitoring in a technical support workspace",
} as const;

export type ServiceHeroSlug = keyof typeof descriptions;

export function serviceHeroImage(slug: string) {
  return Object.hasOwn(descriptions, slug) ? `/images/service-heroes/${slug}.webp` : undefined;
}

export function ServiceHero({ slug, id, children }: { slug: ServiceHeroSlug; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="ecom-hero service-hero relative overflow-hidden bg-navy text-on-dark">
      <picture className="service-hero-art pointer-events-none absolute">
        <source media="(max-width: 767px)" srcSet={`/images/service-heroes/${slug}-mobile.webp`} width={840} height={504} />
        <img src={serviceHeroImage(slug)} alt={descriptions[slug]} width={2160} height={720} fetchPriority="high" className="block h-full w-full object-cover object-center md:max-xl:object-right" />
      </picture>
      <div className="service-hero-shade pointer-events-none absolute inset-y-0 start-0 hidden md:block" aria-hidden="true" />
      {children}
    </section>
  );
}
