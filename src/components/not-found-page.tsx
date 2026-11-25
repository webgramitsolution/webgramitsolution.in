import { HeroHeading } from "@/components/hero-heading";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  FileText,
  Home,
  Phone,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import artwork from "@/assets/webgram-404.png.asset.json";

export function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="bg-card text-navy">
      <SiteHeader />
      <main>
        <section className="not-found-hero" aria-labelledby="not-found-heading">
          <img
            className="not-found-art"
            src="https://ik.imagekit.io/webgramitsolution/webgram%20it%20solution%20404%20page.png?updatedAt=1791851293263"
            onError={(event) => {
              if (!event.currentTarget.src.includes("/__l5e/"))
                event.currentTarget.src = artwork.url;
            }}
            alt="Webgram guide beside Home, Services and Contact Us signposts"
            width={2157}
            height={729}
            fetchPriority="high"
          />
          <div className="not-found-inner">
            <div className="not-found-copy">
              <p className="text-[13px] font-medium uppercase text-primary">Oops! Page not found</p>
              <div className="not-found-number" aria-hidden="true">
                404
                <Search className="not-found-lens" />
              </div>
              <HeroHeading
                id="not-found-heading"
                className="not-found-title"
                lines={["Looks Like You’ve", "Taken a Wrong Turn!"]}
                accent="text-primary"
              />
              <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
                The page you’re looking for doesn’t exist or may have been moved.
                <br className="hidden lg:block" /> Don’t worry, let’s get you back on track.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-11 bg-navy px-5 text-[14px] text-on-dark hover:bg-navy/90"
                >
                  <Link to="/">
                    <Home />
                    Go to Home Page
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 border-navy px-5 text-[14px]"
                  onClick={() => {
                    if (router.history.canGoBack()) router.history.back();
                    else void router.navigate({ to: "/" });
                  }}
                >
                  <ArrowLeft />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </section>
        <nav className="not-found-links" aria-label="Helpful links">
          <Link to="/">
            <Home />
            <span>
              Home<small>Back to homepage</small>
            </span>
          </Link>
          <Link to="/services/website-design">
            <Settings />
            <span>
              Our Services<small>Explore what we do</small>
            </span>
          </Link>
          <Link to="/work/portfolio">
            <BriefcaseBusiness />
            <span>
              Our Portfolio<small>See our work</small>
            </span>
          </Link>
          <Link to="/blog">
            <FileText />
            <span>
              Latest Blog<small>Read helpful tips</small>
            </span>
          </Link>
          <Link to="/contact">
            <Phone />
            <span>
              Contact Us<small>Let’s talk</small>
            </span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
