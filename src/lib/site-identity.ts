/** Public facts already displayed on the site's Contact and service pages. */
export const SITE_URL = "https://webgramitsolution.in";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const businessIdentity = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": BUSINESS_ID,
  name: "Webgram IT Solution",
  legalName: "Webgram IT Solution",
  url: `${SITE_URL}/`,
  logo: "https://ik.imagekit.io/e1owsmcrg/webgramitsolution.com.jpg",
  image: "https://ik.imagekit.io/2kynz1ge7/Webgram%20It%20Solution.jfif",
  description: "Webgram IT Solution is a Delhi NCR based web development company specializing in ecommerce websites, B2B commerce platforms, WooCommerce development, Shopify development and custom web portals for businesses across India.",
  foundingDate: "2022",
  founder: { "@type": "Person", name: "Vikas Kumar", sameAs: "https://www.linkedin.com/in/digivikas/" },
  telephone: "+917551120242",
  email: "info@webgramitsolution.in",
  vatID: "07CUHPK2017G1ZW",
  address: {
    "@type": "PostalAddress",
    streetAddress: "F3/780, Block C, Devli, Sangam Vihar",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110062",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  serviceType: [
    "Ecommerce Website Development", "WooCommerce Development", "Shopify Development",
    "B2B Commerce Platform", "Marketplace Development", "Web Portal Development",
    "Website Design", "API Integration", "Website Maintenance",
    "B2B Marketplace Website Development", "IndiaMART Style B2B Portal Development",
  ],
  sameAs: [
    "https://www.facebook.com/webgramitsolution/",
    "https://www.instagram.com/webgramitsolution/",
    "https://www.youtube.com/@webgramitsolution",
    "https://www.linkedin.com/company/webgramitsolution",
    "https://www.pinterest.com/webgramitsolution/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+917551120242",
    email: "info@webgramitsolution.in",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  knowsAbout: ["Ecommerce Website Design", "Shopify", "WooCommerce", "Custom Ecommerce Development", "B2B Ecommerce", "Marketplace Development"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
};

export function publicPageSchema(path: string, name: string, description: string, type = "WebPage") {
  const url = `${SITE_URL}${path}`;
  return [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": type,
      "@id": `${url}#webpage`,
      url, name, description,
      about: { "@id": BUSINESS_ID },
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
    }),
  }];
}