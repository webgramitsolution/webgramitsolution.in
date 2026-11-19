import kingsports from "@/assets/kingsportsmgt.jpg";
import houskase from "@/assets/houskase.jpg";
import regal from "@/assets/regalconsultinggroup.jpg";
import freshandbright from "@/assets/freshandbright.jpg";
import naval from "@/assets/navalmedical.jpg";
import party from "@/assets/mypartysuppliers.jpg";
import chaatewala from "@/assets/chaatewala.jpg";
import mukesh from "@/assets/mukeshmurtikar.jpg";
import adlite from "@/assets/adliteelectricals.jpg";


export type PortfolioItem = {
  name: string;
  url: string;
  domain: string;
  category: string;
  location: string;
  image: string;
  summary: string;
  delivered: string[];
};

export const portfolio: PortfolioItem[] = [
  {
    name: "King Sports Management",
    url: "https://kingsportsmgt.com/",
    domain: "kingsportsmgt.com",
    category: "Sports & Athlete Management",
    location: "Kolkata, India",
    image: kingsports,
    summary:
      "A premium corporate website for an Indian sports management company covering athlete management, brand partnerships, digital media and sports infrastructure across football, cricket and tennis.",
    delivered: ["Custom corporate design", "Service & athlete sections", "SEO-ready page structure", "Enquiry-focused layout"],
  },
  {
    name: "Houskase",
    url: "https://houskase.com/",
    domain: "houskase.com",
    category: "D2C Ecommerce Store",
    location: "Delhi NCR, India",
    image: houskase,
    summary:
      "A high-utility ecommerce experience for household essentials, office supplies, mobile accessories and stationery. Clear collections, combo offers and frictionless product discovery support Houskase’s growing customer base across Delhi and beyond.",
    delivered: ["WooCommerce storefront", "Combo & offer collections", "Mobile-first shopping", "Payment & shipping setup"],
  },
  {
    name: "Regal Consulting Group",
    url: "https://regalconsultinggroup.ca/",
    domain: "regalconsultinggroup.ca",
    category: "Staffing & Recruitment",
    location: "Ontario, Canada",
    image: regal,
    summary:
      "A professional website for an Ontario workforce solutions firm offering temporary staffing, permanent recruitment, executive search and payroll support for manufacturing and warehousing.",
    delivered: ["Employer & job-seeker journeys", "Industry pages", "Registration forms", "Clean corporate branding"],
  },
  {
    name: "Fresh & Bright Cleaners",
    url: "https://freshandbright.ca/",
    domain: "freshandbright.ca",
    category: "Local Service Business",
    location: "Mississauga, Canada",
    image: freshandbright,
    summary:
      "A conversion-focused website for a dry cleaning and laundry business with service listings, free pickup & delivery scheduling and a lead form that books customers directly.",
    delivered: ["Pickup booking form", "Service catalogue", "Local SEO setup", "Responsive design"],
  },
  {
    name: "Naval Medical",
    url: "https://navalmedical.com/",
    domain: "navalmedical.com",
    category: "Healthcare & Pharma Distribution",
    location: "Lucknow, India",
    image: naval,
    summary:
      "An institutional healthcare website for a Lucknow supplier established in 2005, presenting pharmaceuticals, surgical instruments, hospital furniture and GeM procurement support to government and private organisations.",
    delivered: ["Product & service pages", "Institutional sales focus", "Trust-building content", "Contact & enquiry flow"],
  },
  {
    name: "My Party Suppliers",
    url: "https://mypartysuppliers.com/",
    domain: "mypartysuppliers.com",
    category: "B2B Wholesale Ecommerce",
    location: "Gurgaon, India",
    image: party,
    summary:
      "A wholesale ecommerce website for party decorations and balloons, built for bulk buyers and resellers with category browsing and SEO-friendly product pages.",
    delivered: ["Wholesale catalogue", "Bulk enquiry flow", "Category structure", "Search-optimised pages"],
  },
  {
    name: "Chaatewala",
    url: "https://chaatewala.com/",
    domain: "chaatewala.com",
    category: "Importer & Wholesale Supplier",
    location: "Delhi, India",
    image: chaatewala,
    summary:
      "A B2B website for a Delhi umbrella importer and wholesale supplier, helping gift, bulk and resale buyers explore products and request factory-price orders.",
    delivered: ["Bulk order focus", "Product showcase", "Local SEO for Delhi", "WhatsApp & call leads"],
  },
  {
    name: "Mukesh Murtikar",
    url: "https://mukeshmurtikar.com/",
    domain: "mukeshmurtikar.com",
    category: "Handicraft Ecommerce",
    location: "India",
    image: mukesh,
    summary:
      "An elegant online store for sculptures, statues, idols and wall décor with rich category navigation, offers and a heritage-inspired visual identity.",
    delivered: ["Ecommerce store design", "Category navigation", "Offers & coupons", "Customer accounts"],
  },
  {
    name: "Adlite Electricals",
    url: "https://www.adliteelectricals.com/",
    domain: "adliteelectricals.com",
    category: "Electrical Engineering & Energy",
    location: "Faridabad, India",
    image: adlite,
    summary:
      "A focused industrial website for an electrical engineering company established in 2008, showcasing LT and HT VCB panels, breakers, transformers, EV chargers, renewable-energy EPC and consulting capabilities.",
    delivered: ["Industrial product catalogue", "Energy solution positioning", "Enquiry-focused journeys", "Responsive company profile"],
  },
];
