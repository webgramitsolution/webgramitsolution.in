import type { ServiceLocation } from "./locations";

type Profile = {
  slug: string;
  city: string;
  zone: NonNullable<ServiceLocation["zone"]>;
  place?: ServiceLocation["place"];
  heading: string;
  description: string;
  areas: string[];
  industries: string[];
  focus: [title: string, text: string];
  question: [question: string, answer: string];
};

const profiles: Profile[] = [
  {
    slug: "greater-kailash",
    city: "Greater Kailash",
    zone: "delhi-neighbourhoods",
    heading: "Website Design for Greater Kailash Businesses",
    description:
      "Design branded business sites for Greater Kailash boutiques, studios and professional practices with a clear mobile enquiry path.",
    areas: ["Greater Kailash I", "Greater Kailash II", "M Block Market"],
    industries: ["Boutiques", "Interior studios", "Professional practices"],
    focus: [
      "Turn a digital lookbook into useful enquiries",
      "Group portfolios by style or service and show what a first visit involves. Let customers ask about a specific collection or service without filling a long form.",
    ],
    question: [
      "Can a boutique show collections without taking online payments?",
      "Yes. Launch with a catalogue and item-specific enquiries, then add checkout later if pricing and fulfilment are ready.",
    ],
  },
  {
    slug: "hauz-khas",
    city: "Hauz Khas",
    zone: "delhi-neighbourhoods",
    heading: "Creative Studio and Hospitality Websites for Hauz Khas",
    description:
      "Build portfolio and hospitality websites for Hauz Khas studios, venues and dining businesses with galleries, directions and booking enquiries.",
    areas: ["Hauz Khas Village", "Deer Park area", "Aurobindo Market"],
    industries: ["Design studios", "Restaurants", "Event venues"],
    focus: [
      "Make portfolios and venue details easy to browse",
      "Use fast image galleries, clear information about the venue and a contact flow that collects event date and group size only when relevant.",
    ],
    question: [
      "Can you connect a venue's existing booking system?",
      "We can review whether it offers an embeddable booking page or API and choose the simplest workable integration.",
    ],
  },
  {
    slug: "saket",
    city: "Saket",
    zone: "delhi-neighbourhoods",
    heading: "Business and Ecommerce Website Development in Saket",
    description:
      "Build mobile business websites for Saket retailers and service companies with service pages, enquiries and optional online ordering.",
    areas: ["District Centre", "Saket neighbourhood", "Press Enclave Road"],
    industries: ["Retail", "Hospitality", "Local services"],
    focus: [
      "Help shoppers plan an in-person visit",
      "Publish current opening information, location details and product categories. Build online checkout only for products with defined inventory, shipping and returns.",
    ],
    question: [
      "Can customers enquire about products before we add checkout?",
      "Yes. A catalogue can send the item name and link with each enquiry so your team can respond without asking which product the customer meant.",
    ],
  },
  {
    slug: "vasant-kunj",
    city: "Vasant Kunj",
    zone: "delhi-neighbourhoods",
    heading: "Website Redesign and Development for Vasant Kunj",
    description:
      "Redesign professional and retail websites for Vasant Kunj, with mobile layouts, accessible forms and a plan for existing search URLs.",
    areas: ["Vasant Kunj sectors", "Nelson Mandela Marg", "Vasant Kunj retail district"],
    industries: ["Retail brands", "Consultants", "Education services"],
    focus: [
      "Preserve the pages customers already use",
      "Review high-value service pages and old enquiry forms first. Keep important URLs where possible and prepare redirects for pages that move.",
    ],
    question: [
      "Can we redesign a live business website in stages?",
      "Yes. Agree the pages needed first, build and test them on staging, then switch once forms, redirects and analytics have been checked.",
    ],
  },
  {
    slug: "defence-colony",
    city: "Defence Colony",
    zone: "delhi-neighbourhoods",
    heading: "Websites for Defence Colony Professional Firms",
    description:
      "Develop websites for Defence Colony consultancies, studios and local practices with clear service information and appointment enquiries.",
    areas: ["Defence Colony Market", "Defence Colony residential blocks"],
    industries: ["Consulting", "Design", "Professional services"],
    focus: [
      "Show how appointments and enquiries work",
      "Give each practice area a dedicated page and explain what the visitor should prepare. Keep contact forms focused on scheduling and business enquiries.",
    ],
    question: [
      "Can staff edit services and opening hours themselves?",
      "A content management system can give designated editors access to approved fields and an editorial workflow for major updates.",
    ],
  },
  {
    slug: "green-park",
    city: "Green Park",
    zone: "delhi-neighbourhoods",
    heading: "WordPress Website Development for Green Park Businesses",
    description:
      "Plan editable WordPress websites for Green Park clinics, training providers and service businesses with mobile forms and clear location information.",
    areas: ["Green Park Main", "Green Park Extension", "Green Park Market"],
    industries: ["Clinics", "Training providers", "Local services"],
    focus: [
      "Make location and appointment information easy to maintain",
      "Use reusable pages for services and straightforward fields for hours and directions. Keep confidential appointment details out of general enquiry forms.",
    ],
    question: [
      "Can enquiries go to different teams by service?",
      "We can route a form by service or location and add booking integrations after reviewing the existing workflow.",
    ],
  },
  {
    slug: "new-friends-colony",
    city: "New Friends Colony",
    zone: "delhi-neighbourhoods",
    heading: "Responsive Websites for New Friends Colony Businesses",
    description:
      "Develop responsive websites for New Friends Colony training teams, consultancies and hospitality businesses with clear mobile enquiry paths.",
    areas: ["New Friends Colony", "Community Centre"],
    industries: ["Training", "Consulting", "Hospitality"],
    focus: [
      "Separate programme details from registration",
      "Show course or service requirements and timing before asking for an enquiry. Give the person reviewing requests enough context to provide a useful response.",
    ],
    question: [
      "Can you add course or session listings?",
      "Yes. We can scope an editable programme catalogue with separate calls to action for questions, registration and payment if needed.",
    ],
  },
  {
    slug: "panchsheel-park",
    city: "Panchsheel Park",
    zone: "delhi-neighbourhoods",
    heading: "Business and Portfolio Website Design for Panchsheel Park",
    description:
      "Create service and portfolio websites for Panchsheel Park architects, interior studios and consulting practices.",
    areas: ["Panchsheel Park North", "Panchsheel Park South"],
    industries: ["Architecture", "Interior design", "Advisory"],
    focus: [
      "Present a project as a story a buyer can use",
      "Show the scope, design constraints and completed visual work where permission exists. Give visitors a way to enquire about a similar brief.",
    ],
    question: [
      "Can project images stay sharp without slowing mobile pages?",
      "Yes. Use appropriately sized image variants, stable layouts and lazy loading below the first screen.",
    ],
  },
  {
    slug: "connaught-place",
    city: "Connaught Place",
    zone: "delhi-neighbourhoods",
    heading: "Corporate Website Development for Connaught Place Firms",
    description:
      "Create corporate websites for Connaught Place firms, with capability pages, editorial approval and enquiry routing.",
    areas: ["Inner Circle", "Outer Circle", "Janpath"],
    industries: ["Corporate services", "Consulting", "Retail"],
    focus: [
      "Help decision-makers compare capabilities",
      "Publish service scope and approved project examples, then route new business enquiries to the appropriate team. Keep employer and client requirements distinct.",
    ],
    question: [
      "Can multiple departments manage their own content?",
      "Yes. We can scope role-based editing and approvals so departments can draft updates with a central publishing owner.",
    ],
  },
  {
    slug: "okhla-industrial-area",
    city: "Okhla Industrial Area",
    zone: "delhi-industrial",
    heading: "B2B Catalogue Websites for Okhla Industrial Area",
    description:
      "Develop specification-led B2B websites for Okhla manufacturers, packaging companies and industrial suppliers.",
    areas: ["Okhla Phase I", "Okhla Phase II", "Okhla Phase III"],
    industries: ["Packaging", "Electronics", "Fabrication"],
    focus: [
      "Make product comparison useful for procurement",
      "Publish model numbers, materials and downloadable specifications. Include those details in quote requests so the sales team can confirm availability quickly.",
    ],
    question: [
      "Can we keep industrial prices private?",
      "Yes. We can scope public specifications with quote requests, or require approved customer accounts before showing contracted prices.",
    ],
  },
  {
    slug: "naraina-industrial-area",
    city: "Naraina Industrial Area",
    zone: "delhi-industrial",
    heading: "Industrial Product Websites for Naraina Suppliers",
    description:
      "Build industrial websites for Naraina engineering, print and fabrication suppliers with clear product ranges and enquiry routing.",
    areas: ["Naraina Industrial Area Phase I", "Naraina Industrial Area Phase II"],
    industries: ["Engineering", "Print and packaging", "Fabrication"],
    focus: [
      "Collect enough detail to scope custom manufacturing",
      "Ask about material, quantity and production schedule at enquiry stage. Give technical requests a separate path from orders for standard stock.",
    ],
    question: [
      "Can customers submit a part number with an enquiry?",
      "Yes. A product enquiry can include the current item or a typed reference so staff can match it to the correct catalogue entry.",
    ],
  },
  {
    slug: "mayapuri-industrial-area",
    city: "Mayapuri Industrial Area",
    zone: "delhi-industrial",
    heading: "Equipment and Parts Catalogue Websites for Mayapuri",
    description:
      "Develop searchable parts and equipment catalogues for Mayapuri industrial sellers, with condition, compatibility and quote details.",
    areas: ["Mayapuri Phase I", "Mayapuri Phase II"],
    industries: ["Auto parts", "Industrial equipment", "Metalwork"],
    focus: [
      "Describe parts and equipment so buyers can shortlist them",
      "Include model compatibility, condition and visible identifiers. Separate stock items from one-off equipment that requires availability checks.",
    ],
    question: [
      "Can the website work for variable inventory?",
      "Yes. It can show enquiry-only items or use stock sync where your inventory system has dependable records.",
    ],
  },
  {
    slug: "wazirpur-industrial-area",
    city: "Wazirpur Industrial Area",
    zone: "delhi-industrial",
    heading: "B2B Product and Quote Websites for Wazirpur",
    description:
      "Create B2B product websites for Wazirpur metal and equipment suppliers with materials, grades, sizes and bulk RFQs.",
    areas: ["Wazirpur Industrial Area", "Wazirpur commercial area"],
    industries: ["Metal supplies", "Equipment", "Industrial wholesale"],
    focus: [
      "Collect grade and size requirements in each RFQ",
      "Use structured inputs for dimensions, quantity and delivery location so staff can match an enquiry to the right grade or product range.",
    ],
    question: [
      "Can enquiry options depend on the product category?",
      "Yes. Product-specific forms can request dimensions for one category and material grade or pack size for another.",
    ],
  },
  {
    slug: "bawana-industrial-area",
    city: "Bawana Industrial Area",
    zone: "delhi-industrial",
    heading: "Manufacturer Websites and Dealer Portals for Bawana",
    description:
      "Scope product websites and dealer ordering for Bawana manufacturers with pack sizes, minimum quantities and delivery rules.",
    areas: ["Bawana Industrial Area", "Bawana industrial sectors"],
    industries: ["Manufacturing", "Consumer goods", "Wholesale"],
    focus: [
      "Separate dealer packs from consumer product units",
      "Show approved pack quantities, order minimums and availability rules. Keep public product specifications separate from contract pricing when necessary.",
    ],
    question: [
      "Can we accept bulk orders without selling to retail buyers?",
      "Yes. You can make the catalogue public and restrict ordering and pricing to approved dealer accounts.",
    ],
  },
  {
    slug: "narela-industrial-area",
    city: "Narela Industrial Area",
    zone: "delhi-industrial",
    heading: "Wholesale Ordering Websites for Narela Industrial Area",
    description:
      "Develop wholesale websites for Narela manufacturers and suppliers, with price tiers, repeat orders and approval workflows.",
    areas: ["Narela Industrial Area", "Narela industrial blocks"],
    industries: ["Manufacturing", "Packaging", "Distribution"],
    focus: [
      "Give trade buyers a repeatable ordering process",
      "Start with repeat order lists and approved account terms. Define when staff must review a credit order, unusual freight requirement or changed delivery schedule.",
    ],
    question: [
      "Can the sales team place orders for dealers?",
      "A dealer portal can support staff-assisted orders with appropriate roles, account selection and a record of who placed the order.",
    ],
  },
  {
    slug: "patparganj-industrial-area",
    city: "Patparganj Industrial Area",
    zone: "delhi-industrial",
    heading: "Product Catalogue and RFQ Websites for Patparganj",
    description:
      "Build searchable catalogues and quote workflows for Patparganj industrial and electrical suppliers.",
    areas: ["Patparganj Industrial Area", "Patparganj commercial district"],
    industries: ["Industrial supplies", "Electrical products", "Packaging"],
    focus: [
      "Make technical product data easy to maintain",
      "Give catalogue editors consistent fields for model, dimensions and applications. Set a review process for specification changes before they go live.",
    ],
    question: [
      "Can we import the catalogue from a spreadsheet?",
      "Yes, after mapping product fields and checking identifiers, image links and categories. We can scope future updates separately.",
    ],
  },
  {
    slug: "vasant-vihar",
    city: "Vasant Vihar",
    zone: "delhi-neighbourhoods",
    heading: "Website Design for Vasant Vihar Practices and Brands",
    description:
      "Plan an editable business website for Vasant Vihar practices, boutiques and service brands with clear appointment or project enquiries.",
    areas: ["Vasant Vihar blocks", "Basant Lok"],
    industries: ["Professional practices", "Boutiques", "Design services"],
    focus: [
      "Create a useful first contact journey",
      "Put service scope and meeting expectations on the page. Ask for a preferred date or project type and route the message to the right team.",
    ],
    question: [
      "Can visitors request a time without booking automatically?",
      "Yes. A form can collect time preferences and let your team confirm availability before making an appointment.",
    ],
  },
  {
    slug: "chanakyapuri",
    city: "Chanakyapuri",
    zone: "delhi-neighbourhoods",
    heading: "Corporate and Institutional Websites for Chanakyapuri",
    description:
      "Develop corporate and institutional websites serving Chanakyapuri with structured information, accessibility and controlled publishing.",
    areas: ["Diplomatic Enclave", "Malcha Marg"],
    industries: ["Institutional services", "Hospitality", "Corporate offices"],
    focus: [
      "Separate public information from internal document access",
      "Set clear public navigation for service requirements, notices and contacts. Scope authenticated document areas only when you have defined roles and approvals.",
    ],
    question: [
      "Can teams publish updates without editing the whole site?",
      "Yes. A CMS can separate news, public notices and service information so approved editors update the relevant section.",
    ],
  },
  {
    slug: "jor-bagh",
    city: "Jor Bagh",
    zone: "delhi-neighbourhoods",
    heading: "Portfolio Website Design for Jor Bagh Businesses",
    description:
      "Create portfolio and enquiry websites for Jor Bagh design firms, boutique businesses and consultants.",
    areas: ["Jor Bagh neighbourhood", "Jor Bagh Market"],
    industries: ["Design studios", "Consultants", "Boutiques"],
    focus: [
      "Show the people and work behind the business",
      "Organise portfolios by project goal and scope. Add team details, clear contact information and project photos with permission.",
    ],
    question: [
      "Can we start with a small portfolio site and expand later?",
      "Yes. Use reusable project and service templates so your team can add approved work and new services over time.",
    ],
  },
  {
    slug: "lajpat-nagar",
    city: "Lajpat Nagar",
    zone: "delhi-neighbourhoods",
    heading: "Retail and Fashion Ecommerce Websites in Lajpat Nagar",
    description:
      "Build online catalogues and storefronts for Lajpat Nagar retailers, apparel shops and accessory brands.",
    areas: ["Central Market", "Lajpat Nagar II", "Amar Colony"],
    industries: ["Apparel", "Accessories", "Retail"],
    focus: [
      "Make the catalogue work for frequent product changes",
      "Create consistent variant options for sizes and colours. Define what goes live immediately, what is enquiry-only and how sold-out items are handled.",
    ],
    question: [
      "How do we track availability for products sold in-store and online?",
      "Start with a source for stock and a process for reconciling orders. An integration is useful when the existing inventory system supports it.",
    ],
  },
  {
    slug: "nehru-place",
    city: "Nehru Place",
    zone: "delhi-neighbourhoods",
    heading: "IT and Electronics Catalogue Websites for Nehru Place",
    description:
      "Build product catalogue and enquiry websites for Nehru Place technology retailers, resellers and repair businesses.",
    areas: ["Nehru Place Market", "Nehru Place business district"],
    industries: ["IT resellers", "Electronics retail", "Repair services"],
    focus: [
      "Help visitors identify compatible products",
      "Sort items by model and specification, make availability clear and publish relevant warranty details. Give repair enquiries their own path.",
    ],
    question: [
      "Can an electronics catalogue offer quote requests for high-value products?",
      "Yes. Combine checkout for standard stock with item-specific enquiries for specialist products or negotiated pricing.",
    ],
  },
  {
    slug: "kirti-nagar-industrial-area",
    city: "Kirti Nagar Industrial Area",
    zone: "delhi-industrial",
    heading: "Furniture Catalogue Websites for Kirti Nagar",
    description:
      "Build furniture catalogue websites for Kirti Nagar showrooms and workshops with dimensions, finish options and quote enquiries.",
    areas: ["Kirti Nagar Industrial Area", "Kirti Nagar furniture market"],
    industries: ["Furniture", "Interiors", "Fabrication"],
    focus: [
      "Explain furniture finishes and made-to-order details",
      "Show material, finish, dimensions and custom lead times alongside approved photographs. Collect delivery location and product interest in an enquiry.",
    ],
    question: [
      "Can furniture shoppers compare options without online checkout?",
      "Yes. They can browse products, compare available finishes and send item-specific enquiries about pricing and delivery.",
    ],
  },
  {
    slug: "jhilmil-industrial-area",
    city: "Jhilmil Industrial Area",
    zone: "delhi-industrial",
    heading: "Industrial Website Development for Jhilmil Suppliers",
    description:
      "Create product and service websites for Jhilmil manufacturers, electrical suppliers and machinery service teams.",
    areas: ["Jhilmil Industrial Area", "Jhilmil Colony"],
    industries: ["Electrical supplies", "Manufacturing", "Machinery services"],
    focus: [
      "Separate product supply and maintenance enquiries",
      "Catalogues need specifications and availability, while maintenance requests may need model numbers and issue details. Use different forms for each workflow.",
    ],
    question: [
      "Can support staff receive maintenance enquiries separately?",
      "Yes. Enquiry routing can send each type to the relevant inbox or CRM queue.",
    ],
  },
  {
    slug: "mangolpuri-industrial-area",
    city: "Mangolpuri Industrial Area",
    zone: "delhi-industrial",
    heading: "Manufacturer and Wholesale Websites for Mangolpuri",
    description:
      "Plan editable manufacturer websites and B2B catalogues for Mangolpuri suppliers and workshops.",
    areas: ["Mangolpuri Industrial Area Phase I", "Mangolpuri Industrial Area Phase II"],
    industries: ["Packaging", "Engineering workshops", "Wholesale"],
    focus: [
      "Make smaller catalogues searchable from the start",
      "Use consistent product names, pack sizes and categories before importing listings. Prepare quote forms for buyers who need different quantities or materials.",
    ],
    question: [
      "Can we launch with a catalogue and add dealer ordering later?",
      "Yes. Keep stable product identifiers and structured catalogue data so dealer pricing and ordering can be added when ready.",
    ],
  },
  {
    slug: "badli-industrial-area",
    city: "Badli Industrial Area",
    zone: "delhi-industrial",
    heading: "Industrial Procurement and Quote Websites for Badli",
    description:
      "Build specification-led websites for Badli engineering suppliers, wholesalers and manufacturing units.",
    areas: ["Badli Industrial Area", "Samaypur Badli industrial area"],
    industries: ["Engineering", "Industrial supply", "Manufacturing"],
    focus: [
      "Help buyers compare lead times and materials",
      "Show common configurations and materials along with availability or lead-time notes. Collect project delivery details in the RFQ when necessary.",
    ],
    question: [
      "Can we keep an online record of quote requests?",
      "Yes. A quote form can log the product and enquiry details for follow-up, with CRM integration scoped separately.",
    ],
  },
  {
    slug: "udyog-nagar",
    city: "Udyog Nagar",
    zone: "delhi-industrial",
    heading: "B2B Catalogue and Trade Websites for Udyog Nagar",
    description:
      "Develop catalogues, trade enquiries and account ordering websites for Udyog Nagar suppliers and manufacturers.",
    areas: ["Udyog Nagar Industrial Area", "Udyog Nagar commercial belt"],
    industries: ["Manufacturing", "Distribution", "Trade supply"],
    focus: [
      "Set a consistent trade-order process",
      "Define account approval, order quantities and who can see stock or pricing. Keep staff-assisted ordering available for unusual requirements.",
    ],
    question: [
      "Can we share different product ranges with different dealers?",
      "Yes. Role and account rules can control which catalogues, price lists and ordering options each trade buyer sees.",
    ],
  },
  {
    slug: "janakpuri",
    city: "Janakpuri",
    zone: "delhi-neighbourhoods",
    heading: "Business Website Design for Janakpuri",
    description:
      "Plan business websites, appointment forms and ecommerce catalogues for Janakpuri clinics, retailers and professional services.",
    areas: ["District Centre", "Janakpuri East", "Janakpuri West"],
    industries: ["Healthcare practices", "Retail", "Professional services"],
    focus: [
      "Make enquiries easy to route",
      "Use separate forms for bookings, product requests and service enquiries. Route each to the person who can respond and give customers an expected response window.",
    ],
    question: [
      "Can a Janakpuri clinic offer appointment requests through its website?",
      "Yes. We can scope appointment request forms, reminders and routing. Agree which details to collect and how your team confirms bookings.",
    ],
  },
  {
    slug: "west-delhi",
    city: "West Delhi",
    zone: "delhi-neighbourhoods",
    heading: "Ecommerce and Website Development in West Delhi",
    description:
      "Scope website redesigns, Shopify stores and dealer catalogues for businesses across West Delhi, from Rajouri Garden to Janakpuri.",
    areas: ["Rajouri Garden", "Janakpuri", "Tilak Nagar", "Paschim Vihar"],
    industries: ["Retail", "Showrooms", "Distribution"],
    focus: [
      "Match the site to how customers buy",
      "A showroom can qualify enquiries by product line or store location, while a retailer may need PIN code delivery, stock checks and online payment. Decide the paths before choosing a platform.",
    ],
    question: [
      "Can a West Delhi business use one site for enquiries and online sales?",
      "Yes. Identify which products can be purchased directly and which need a quote. Keep checkout and quote requests distinct so buyers know what happens next.",
    ],
  },
  {
    slug: "shahdara",
    city: "Shahdara",
    zone: "delhi-neighbourhoods",
    heading: "Website Development for Shahdara Businesses",
    description:
      "Build product catalogues, dealer enquiries and mobile business websites for Shahdara suppliers, traders and local service teams.",
    areas: ["Shahdara", "Vishwas Nagar", "Gandhi Nagar market"],
    industries: ["Trading", "Apparel wholesale", "Home services"],
    focus: [
      "Publish a catalogue your team can maintain",
      "Define item codes, pack sizes and minimum quantities before importing products. Put trade enquiries next to the relevant specifications and give staff a way to update availability.",
    ],
    question: [
      "Can a Shahdara wholesaler publish a catalogue without public pricing?",
      "Yes. A public catalogue can show specifications while approved buyers log in for pricing or request a quote with quantities.",
    ],
  },
  {
    slug: "dwarka",
    city: "Dwarka",
    zone: "delhi-neighbourhoods",
    heading: "Website Design and Ecommerce Development in Dwarka",
    description:
      "Plan mobile-friendly business websites, enquiry pages and online stores for teams serving Dwarka and nearby Delhi neighbourhoods.",
    areas: ["Dwarka Sector 6", "Dwarka Sector 12", "Dwarka Sector 21"],
    industries: ["Professional services", "Education", "Local retailers"],
    focus: [
      "Support visitors searching by sector",
      "Provide genuine service coverage, opening hours and pickup instructions where relevant. Ask for the sector or PIN code in the booking flow if location affects availability.",
    ],
    question: [
      "Can a Dwarka store show different pickup or delivery options by PIN code?",
      "Yes. The project can cover delivery rules, pickup instructions and clear messages for addresses outside your service area.",
    ],
  },
  {
    slug: "geetanjali-enclave",
    city: "Geetanjali Enclave",
    zone: "delhi-neighbourhoods",
    heading: "Website Design for Geetanjali Enclave Businesses",
    description:
      "Plan portfolio websites, consultation forms and mobile redesigns for professional services serving Geetanjali Enclave in South Delhi.",
    areas: ["Geetanjali Enclave", "Malviya Nagar", "Saket"],
    industries: ["Architecture", "Wellness", "Consulting"],
    focus: [
      "Give visitors enough detail to book a consultation",
      "Present work by project type and show the consultation process and expected preparation. Keep forms short and make follow-up ownership clear.",
    ],
    question: [
      "Can a business serving Geetanjali Enclave show projects and consultation options on the same site?",
      "Yes. We can organise approved project examples alongside service pages and a short consultation form, while keeping sensitive client information private.",
    ],
  },
  {
    slug: "chhatarpur",
    city: "Chhatarpur",
    zone: "delhi-neighbourhoods",
    heading: "Website Development Services in Chhatarpur",
    description:
      "Plan venue websites, product catalogues and enquiry journeys for businesses serving Chhatarpur and adjoining South Delhi areas.",
    areas: ["Chhatarpur Enclave", "Chhatarpur Extension", "Satbari"],
    industries: ["Event venues", "Interiors", "Home and garden retail"],
    focus: [
      "Qualify venue and project enquiries",
      "For venues, collect event dates, guest counts and setup requirements. For showrooms, ask for product dimensions or a reference before assigning an enquiry.",
    ],
    question: [
      "Can a Chhatarpur venue take availability enquiries online?",
      "Yes. We can scope a structured enquiry form or a calendar integration, depending on who maintains availability and how bookings are confirmed.",
    ],
  },
  {
    slug: "rajouri-garden",
    city: "Rajouri Garden",
    zone: "delhi-neighbourhoods",
    heading: "Ecommerce Website Design in Rajouri Garden",
    description:
      "Build mobile storefronts, showroom websites and redesigns for Rajouri Garden fashion, interiors and lifestyle retailers.",
    areas: ["Rajouri Garden Main Market", "Tagore Garden", "Subhash Nagar"],
    industries: ["Fashion", "Lifestyle retail", "Furniture"],
    focus: [
      "Connect product discovery with store visits",
      "Use category filters, product dimensions and real pickup information. If staff verify stock manually, offer a stock enquiry rather than promising availability.",
    ],
    question: [
      "Can a Rajouri Garden showroom combine browsing with store appointments?",
      "Yes. The site can show products and collect appointment requests, with inventory or appointment confirmation handled by your team or an agreed integration.",
    ],
  },
  {
    slug: "malviya-nagar",
    city: "Malviya Nagar",
    zone: "delhi-neighbourhoods",
    heading: "Business Website Development in Malviya Nagar",
    description:
      "Plan service websites, local ordering and mobile redesigns for Malviya Nagar cafés, tutors and professional practices.",
    areas: ["Malviya Nagar Market", "Khirki Extension", "Shivalik"],
    industries: ["Food and hospitality", "Education", "Professional practices"],
    focus: [
      "Make local enquiries specific",
      "List the services, products or sessions you actually offer and show how to book, collect or request a quote. Give staff a clear view of incoming requests by service type.",
    ],
    question: [
      "Can a Malviya Nagar business accept online orders for local pickup?",
      "Yes. Confirm pickup hours, lead times, payment options and the person responsible for order notifications before development.",
    ],
  },
  {
    slug: "gujarat",
    city: "Gujarat",
    zone: "india",
    place: "State",
    heading: "Website Development Services for Gujarat Businesses",
    description:
      "Plan ecommerce websites, dealer portals and product catalogues for Gujarat brands, textile suppliers and manufacturers with remote project delivery.",
    areas: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    industries: ["Textiles", "Engineering", "Wholesale", "D2C"],
    focus: [
      "Choose a storefront or wholesale portal based on who orders",
      "Map direct shoppers, retailers and approved distributors separately. Define public prices, supplier quantities and shipping rules before choosing a platform.",
    ],
    question: [
      "How does Webgram deliver website projects in Gujarat?",
      "Our team works from New Delhi. Discovery, design reviews, testing and handover can be done remotely with your team.",
    ],
  },
  {
    slug: "ahmedabad",
    city: "Ahmedabad",
    zone: "india",
    place: "City",
    heading: "Corporate and B2B Website Development for Ahmedabad",
    description:
      "Develop mobile corporate websites and trade portals for Ahmedabad service firms, textile businesses and industrial suppliers.",
    areas: ["SG Highway", "Prahlad Nagar", "Vatva"],
    industries: ["Professional services", "Textile trade", "Manufacturing"],
    focus: [
      "Support corporate enquiries and trade ordering separately",
      "Show capability pages and approved examples for new buyers. Give verified trade buyers a separate login and the ordering options relevant to their account.",
    ],
    question: [
      "Can Webgram build a site with English and Gujarati content?",
      "We can scope multilingual navigation and editable page content. Your team can supply or approve translations before publication.",
    ],
  },
  {
    slug: "surat",
    city: "Surat",
    zone: "india",
    place: "City",
    heading: "Textile Catalogue and Ecommerce Websites for Surat",
    description:
      "Build textile and fashion websites for Surat with fabric specifications, colour variants, wholesale packs and online ordering.",
    areas: ["Ring Road textile markets", "Pandesara", "Sachin"],
    industries: ["Textiles", "Fashion", "Wholesale"],
    focus: [
      "Organise variants without losing fabric-level details",
      "Group by material, pattern, colour and availability. Use buyer-specific terms when retail and wholesale orders use different quantities or pricing.",
    ],
    question: [
      "Can the same catalogue support retail and wholesale?",
      "Yes, when the product data is shared. We can scope separate minimums, pricing and account rules for each buyer type.",
    ],
  },
  {
    slug: "vadodara",
    city: "Vadodara",
    zone: "india",
    place: "City",
    heading: "Industrial Website Development for Vadodara Suppliers",
    description:
      "Create industrial websites for Vadodara engineering and process suppliers with clear applications, technical documents and quote enquiries.",
    areas: ["Makarpura", "Waghodia", "Savli"],
    industries: ["Engineering", "Process equipment", "Industrial services"],
    focus: [
      "Present specifications alongside their industrial uses",
      "Attach approved datasheets and show how products fit typical applications. Ask for operating conditions or service requirements when relevant to the enquiry.",
    ],
    question: [
      "Can buyers download technical PDFs online?",
      "Yes. Publish approved documents with clear revision labels and use account access where your team needs to limit distribution.",
    ],
  },
  {
    slug: "rajkot",
    city: "Rajkot",
    zone: "india",
    place: "City",
    heading: "Engineering and Auto Parts Websites for Rajkot",
    description:
      "Develop product websites and distributor portals for Rajkot engineering, machine tool and auto parts businesses.",
    areas: ["Aji Industrial Estate", "Metoda", "Shapar-Veraval"],
    industries: ["Engineering", "Machine tools", "Auto parts"],
    focus: [
      "Make part and application matching practical",
      "Use model numbers, drawings and compatibility information to support discovery. Give buyers a way to send part references with an enquiry.",
    ],
    question: [
      "Can a portal handle account-based pricing for distributors?",
      "Yes. Define account approval, the source of contract prices and who can approve exceptions before development.",
    ],
  },
  {
    slug: "ludhiana",
    city: "Ludhiana",
    zone: "india",
    place: "City",
    heading: "Website Development Company Serving Ludhiana",
    description:
      "Build manufacturing websites, WooCommerce catalogues and distributor portals for Ludhiana hosiery, bicycle and engineering businesses.",
    areas: ["Focal Point", "Industrial Area A", "Gill Road"],
    industries: ["Hosiery", "Bicycles and parts", "Light engineering"],
    focus: [
      "Make specification and repeat ordering work for trade buyers",
      "Show material, size and pack rules for hosiery or item compatibility for industrial products. Define lead times and bulk quote needs before adding checkout.",
    ],
    question: [
      "Can a Ludhiana exporter show one catalogue to different buyers?",
      "Yes. A public catalogue can show approved specifications while enquiry forms collect market, quantity and shipment requirements separately.",
    ],
  },
  {
    slug: "india",
    city: "India",
    zone: "india",
    place: "Country",
    heading: "Website Development Services Across India",
    description:
      "Work with a New Delhi web development agency on business websites, ecommerce redesigns and B2B portals for Indian buyers.",
    areas: ["Delhi NCR", "Punjab", "Gujarat", "Remote project delivery across India"],
    industries: ["Manufacturing", "Wholesale", "Retail", "Professional services"],
    focus: [
      "Plan for India-specific project requirements",
      "Scope mobile shopping, UPI and COD where supported, GST invoicing and delivery coverage around your operations. Define how your team will update the site after handover.",
    ],
    question: [
      "Can I hire Webgram if I am searching for website development services near me?",
      "Our office is in Sangam Vihar, New Delhi. We offer remote consultations and delivery across India, and can arrange an in-person meeting at our Delhi office.",
    ],
  },
];

export const expandedLocations: ServiceLocation[] = profiles.map((profile) => ({
  slug: profile.slug,
  city: profile.city,
  zone: profile.zone,
  place: profile.place ?? "Place",
  keyword: profile.heading,
  title: `${profile.heading} | Webgram`,
  description: profile.description,
  intro: profile.description,
  areas: profile.areas,
  industries: profile.industries,
  projectFocus: [{ title: profile.focus[0], text: profile.focus[1] }],
  faq: profile.question,
}));
