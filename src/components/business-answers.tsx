import { Link } from "@tanstack/react-router";

export function BusinessAnswers() {
  return (
    <section
      className="border-t border-border bg-sky-soft py-10 md:py-12"
      aria-labelledby="business-answers-title"
    >
      <div className="page-shell">
        <h2 id="business-answers-title" className="text-[26px] font-medium text-navy">
          Website development: your questions answered
        </h2>
        <div className="mt-6 grid gap-x-10 gap-y-7 md:grid-cols-2">
          <div>
            <h3 className="text-[18px] font-medium text-navy">
              What does Webgram IT Solution build?
            </h3>
            <p className="mt-2 text-[16px] leading-7 text-muted-foreground">
              We build business websites, B2B and B2C ecommerce stores, WooCommerce and Shopify
              stores, custom web portals and API integrations for retailers, wholesalers and
              manufacturers.
            </p>
            <Link
              to="/solutions/$slug"
              params={{ slug: "ecommerce-development" }}
              className="mt-2 inline-block text-[15px] text-primary underline underline-offset-4"
            >
              Explore ecommerce development
            </Link>
          </div>
          <div>
            <h3 className="text-[18px] font-medium text-navy">
              How is B2B ecommerce different from a retail store?
            </h3>
            <p className="mt-2 text-[16px] leading-7 text-muted-foreground">
              B2C stores sell directly to consumers. B2B stores support wholesale buying with
              customer-specific prices, minimum order quantities, bulk ordering and quotation
              workflows.
            </p>
            <Link
              to="/solutions/$slug"
              params={{ slug: "b2b-commerce" }}
              className="mt-2 inline-block text-[15px] text-primary underline underline-offset-4"
            >
              See B2B commerce features
            </Link>
          </div>
          <div>
            <h3 className="text-[18px] font-medium text-navy">How much will my website cost?</h3>
            <p className="mt-2 text-[16px] leading-7 text-muted-foreground">
              The quote depends on your pages, features, integrations and content. Share your
              requirements so we can discuss the scope and provide an itemised quote.
            </p>
            <Link
              to="/contact"
              className="mt-2 inline-block text-[15px] text-primary underline underline-offset-4"
            >
              Discuss your project
            </Link>
          </div>
          <div>
            <h3 className="text-[18px] font-medium text-navy">
              Where is Webgram based, and can I see its work?
            </h3>
            <p className="mt-2 text-[16px] leading-7 text-muted-foreground">
              Our office is in Sangam Vihar, New Delhi. We work with businesses across India; our
              portfolio includes live projects for clients in India and Canada.
            </p>
            <div className="mt-2 flex flex-wrap gap-5 text-[15px] text-primary">
              <Link to="/work/portfolio" className="underline underline-offset-4">
                View completed websites
              </Link>
              <Link to="/resources/faqs" className="underline underline-offset-4">
                More questions and answers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
