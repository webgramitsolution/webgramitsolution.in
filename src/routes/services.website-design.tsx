import { servicePageSchema } from "@/lib/schema";
import { getSubpage } from "@/lib/menu-pages";
import { ServicePlanning } from "@/components/service-planning";
import { servicePlans } from "@/lib/service-planning";
import { createFileRoute } from "@tanstack/react-router";

import { LatestBlogPosts } from "@/components/latest-blog-posts";
import { WebsiteDesignDevelopmentPage } from "@/components/website-design-development-page";

const heroImage = "https://ik.imagekit.io/archfacingb2b/Modern%20E-Commerce%20Tech%20Hero%20Banner.png";
const title = "Website Design Company in Delhi NCR | Webgram";
const description = "Responsive website design, corporate sites, landing pages and redesigns for businesses in Delhi NCR.";

export const Route = createFileRoute("/services/website-design")({
  head: () => ({
    scripts: servicePageSchema("services", "Services", "website-design", getSubpage("services", "website-design")),
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
  return <><WebsiteDesignDevelopmentPage designOnly /><ServicePlanning plan={servicePlans.design} /><LatestBlogPosts /></>;
}