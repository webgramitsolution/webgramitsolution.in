import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import manropeLatin from "@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter } from "@/components/site-footer";
import { TestimonialStrip } from "@/components/testimonial-strip";
import { Toaster } from "@/components/ui/sonner";
import { NotFoundPage } from "@/components/not-found-page";
import { SiteWebMCPTools } from "@/components/site-webmcp-tools";
import { businessIdentity, BUSINESS_ID, WEBSITE_ID } from "@/lib/site-identity";
import { GTM_ID, GTM_INITIALIZATION } from "@/lib/third-party-loader";

function NotFoundComponent() {
  return <NotFoundPage />;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { property: "og:locale", content: "en_IN" },
      { charSet: "utf-8" },
      { name: "google-site-verification", content: "ZT7ALIlXMzk-9XGJCx9XMUHIIQhWXlrYJe7GmvOXD9Y" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Webgram IT Solution" },
      { name: "description", content: "Digital commerce solutions built to sell and scale." },
      { name: "author", content: "Webgram IT Solution" },
      { property: "og:title", content: "Webgram IT Solution" },
      {
        property: "og:description",
        content: "Digital commerce solutions built to sell and scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      // Manrope is served from this website, so text no longer waits for Google Fonts.
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: manropeLatin,
        crossOrigin: "anonymous",
      },
      { rel: "preconnect", href: "https://ik.imagekit.io" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png?v=20261022", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(businessIdentity),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          name: "Webgram IT Solution",
          url: "https://webgramitsolution.in/",
          description:
            "Custom ecommerce websites, B2B platforms and WooCommerce development in Delhi NCR.",
          inLanguage: "en-IN",
          publisher: { "@id": BUSINESS_ID },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Main pages",
          itemListElement: [
            ["Website Design & Development", "/solutions/website-design-development"],
            ["Ecommerce Development", "/solutions/ecommerce-development"],
            ["B2B Commerce", "/solutions/b2b-commerce"],
            ["Website Design", "/services/website-design"],
            ["Blog", "/blog"],
            ["About Us", "/about-us"],
            ["Contact", "/contact"],
          ].map(([name, path], i) => ({
            "@type": "SiteNavigationElement",
            position: i + 1,
            name,
            url: `https://webgramitsolution.in${path}`,
          })),
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <script dangerouslySetInnerHTML={{ __html: GTM_INITIALIZATION }} />
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SiteWebMCPTools />
      <Toaster richColors position="top-center" />
      <TestimonialStrip />
      <SiteFooter />
    </QueryClientProvider>
  );
}
