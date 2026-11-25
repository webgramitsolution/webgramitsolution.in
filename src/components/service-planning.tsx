import {
  ArrowRight,
  CreditCard,
  LayoutGrid,
  RefreshCw,
  Settings,
  ShieldCheck,
  Store,
} from "lucide-react";
import type { ServicePlan } from "@/lib/service-planning";

const storefrontIcons = [Store, RefreshCw, CreditCard];

const storefrontBenefits = [
  [ShieldCheck, "Secure checkout"],
  [LayoutGrid, "Responsive design"],
  [Settings, "Easy store management"],
] as const;

function WooCommerceSpotlight() {
  return (
    <div className="relative isolate grid overflow-hidden rounded-2xl border border-border bg-[#f2f8fd] shadow-card lg:min-h-[330px] lg:grid-cols-[52%_1fr] xl:min-h-[clamp(365px,29vw,425px)]">
      <picture className="block max-lg:-mt-2 max-lg:[mask-image:linear-gradient(to_bottom,transparent,#000_10%)] lg:pointer-events-none lg:absolute lg:inset-0 lg:z-0">
        <source media="(min-width: 1024px)" srcSet="/images/woocommerce-storefront-banner.webp" />
        <img
          src="/images/woocommerce-storefront-showcase.webp"
          width={1280}
          height={960}
          alt="Furniture storefront preview on a laptop and phone"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full lg:h-full lg:object-cover lg:object-right"
        />
      </picture>
      <div className="relative z-10 row-start-1 flex min-w-0 flex-col justify-center gap-3 px-5 py-5 sm:px-8 lg:py-6 xl:px-10">
        <h2 className="text-balance text-[clamp(1.8rem,3.25vw,3.55rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
          Custom WooCommerce{" "}
          <span className="lg:block">
            <span className="text-[#0058c9]">Website</span> Development
          </span>
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-navy xl:text-lg">
          Get tailored WordPress ecommerce solutions with product catalogues, checkout and easy
          store management.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-4 xl:flex-nowrap xl:gap-3">
          <a
            href="#woocommerce-services"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-bold text-on-dark shadow-card hover:bg-[#004fb9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Explore Services <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
          </a>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 xl:flex-nowrap xl:border-l xl:border-primary/30 xl:pl-3">
            {storefrontBenefits.map(([Icon, label]) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-semibold leading-tight text-navy"
              >
                <Icon aria-hidden="true" className="size-5 shrink-0 text-[#0058c9]" />
                <span className="xl:w-[4.5rem]">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ServicePlanning({
  plan,
  whiteIntro = false,
  storefront = false,
}: {
  plan: ServicePlan;
  whiteIntro?: boolean;
  storefront?: boolean;
}) {
  const headingClass = "max-w-2xl text-3xl font-extrabold leading-tight text-navy md:text-4xl";

  return (
    <section
      className={`border-y border-border bg-sky-soft ${storefront ? "py-7 md:py-9" : "py-12 md:py-16"}`}
    >
      <div className="page-shell">
        {storefront ? (
          <WooCommerceSpotlight />
        ) : (
          <div
            className={`grid items-center gap-7 md:grid-cols-[1.05fr_0.95fr] ${whiteIntro ? "rounded-2xl bg-white p-5 md:p-7" : ""}`}
          >
            <div>
              <h2 className={`${headingClass} text-balance`}>{plan.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                {plan.summary}
              </p>
            </div>
            <img
              src={plan.image}
              alt={plan.alt}
              loading="lazy"
              width={plan.imageSize?.width ?? 800}
              height={plan.imageSize?.height ?? 450}
              className={`w-full ${plan.imageSize ? "h-auto object-contain" : "aspect-[16/9] rounded-2xl bg-card object-cover shadow-card"}`}
            />
          </div>
        )}
        <div
          id={storefront ? "woocommerce-services" : undefined}
          className={`grid scroll-mt-32 gap-4 md:grid-cols-3 ${storefront ? "mt-5" : "mt-8"}`}
        >
          {plan.choices.map(({ title, text }, index) => {
            const Icon = storefront ? storefrontIcons[index] : undefined;
            return (
              <article
                key={title}
                className={`border bg-card p-6 shadow-card ${storefront ? "rounded-2xl border-border" : "rounded-xl border-border"}`}
              >
                {Icon && (
                  <span className="mb-4 inline-grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                )}
                <h3 className="text-lg font-extrabold text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            );
          })}
        </div>
        <nav
          aria-label="Related services and locations"
          className="mt-7 flex flex-wrap gap-x-6 gap-y-4"
        >
          {plan.links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              {label} <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
