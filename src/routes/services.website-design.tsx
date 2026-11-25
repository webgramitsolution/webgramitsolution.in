import { serviceHeroImage } from "@/components/service-hero";
import { servicePageSchema } from "@/lib/schema";
import { getSubpage } from "@/lib/menu-pages";
import { ServicePlanning } from "@/components/service-planning";
import { servicePlans } from "@/lib/service-planning";
import { createFileRoute } from "@tanstack/react-router";

import { LatestBlogPosts } from "@/components/latest-blog-posts";
import { WebsiteDesignDevelopmentPage } from "@/components/website-design-development-page";

const heroImage = "https://webgramitsolution.in" + serviceHeroImage("website-design");
const title = "Website Design Company in Delhi NCR | Webgram";
const description =
  "Webgram designs responsive business websites, corporate sites and landing pages in Delhi NCR. Explore website redesigns and request a consultation.";

export const Route = createFileRoute("/services/website-design")({
  head: () => ({
    scripts: servicePageSchema(
      "services",
      "Services",
      "website-design",
      getSubpage("services", "website-design"),
    ),
    links: [{ rel: "canonical", href: "https://webgramitsolution.in/services/website-design" }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: WebsiteDesignPage,
});

function WebsiteDesignPage() {
  return (
    <>
      <WebsiteDesignDevelopmentPage designOnly />
      <ServicePlanning plan={servicePlans.design} whiteIntro />
      <LatestBlogPosts />
    </>
  );
}
