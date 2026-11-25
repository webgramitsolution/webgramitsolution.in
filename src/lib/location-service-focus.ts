// The numbers match the service links used on location pages.
type ServiceFocus = readonly [service: number, label: string];

export const locationServiceFocus: Record<string, readonly ServiceFocus[]> = {
  delhi: [
    [0, "Online store development for Delhi retailers"],
    [3, "WooCommerce catalogue and checkout"],
    [1, "Wholesale ecommerce for Delhi traders"],
  ],
  noida: [
    [2, "Corporate website design for Noida companies"],
    [4, "Customer and CRM portals for Noida teams"],
    [7, "Mobile website redesign for Noida businesses"],
  ],
  faridabad: [
    [1, "B2B ordering for Faridabad manufacturers"],
    [4, "Industrial catalogue and enquiry portals"],
    [3, "WooCommerce stores for Faridabad suppliers"],
  ],
  gurugram: [
    [2, "Corporate website development in Gurgaon"],
    [7, "Lead-generation website redesigns in Gurugram"],
    [1, "Wholesale ecommerce for Gurgaon distributors"],
  ],
  "delhi-ncr": [
    [1, "Dealer and distributor portals in Delhi NCR"],
    [4, "ERP-ready wholesale catalogue development"],
    [0, "Ecommerce storefronts for Delhi NCR brands"],
  ],
  "south-delhi": [
    [2, "Business websites for South Delhi shops and clinics"],
    [7, "Mobile website redesign in South Delhi"],
    [0, "Online stores for South Delhi boutiques"],
  ],
  "greater-kailash": [
    [6, "Shopify storefronts for Greater Kailash boutiques"],
    [2, "Portfolio sites for interior studios"],
    [7, "Mobile redesigns for local professional practices"],
  ],
  "hauz-khas": [
    [2, "Portfolio websites for Hauz Khas design studios"],
    [7, "Restaurant and venue enquiry redesigns"],
    [0, "Online catalogues for local design brands"],
  ],
  saket: [
    [0, "Ecommerce development for Saket retailers"],
    [6, "Shopify catalogues for lifestyle shops"],
    [2, "Hospitality and service websites in Saket"],
  ],
  "vasant-kunj": [
    [0, "Online retail websites in Vasant Kunj"],
    [2, "Consultancy and education websites"],
    [7, "Mobile-first local business redesigns"],
  ],
  "defence-colony": [
    [2, "Consultancy website design in Defence Colony"],
    [7, "Enquiry-focused redesigns for professional services"],
    [4, "Client portals for design and advisory teams"],
  ],
  "green-park": [
    [2, "Clinic and training websites in Green Park"],
    [4, "Appointment request and booking portals"],
    [7, "Mobile redesigns for local service businesses"],
  ],
  "new-friends-colony": [
    [2, "Hospitality and consultancy sites in New Friends Colony"],
    [4, "Training registration and enquiry portals"],
    [7, "Lead-generation redesigns for local services"],
  ],
  "panchsheel-park": [
    [2, "Website design for Panchsheel Park architecture studios"],
    [7, "Project portfolio redesigns for interior designers"],
    [4, "Project enquiry portals for advisory teams"],
  ],
  "connaught-place": [
    [2, "Corporate website development in Connaught Place"],
    [7, "Consultancy website and enquiry redesigns"],
    [0, "Retail catalogue development in central Delhi"],
  ],
  "vasant-vihar": [
    [2, "Professional services websites in Vasant Vihar"],
    [6, "Shopify development for local boutiques"],
    [7, "Portfolio redesigns for design practices"],
  ],
  chanakyapuri: [
    [2, "Institutional and corporate websites in Chanakyapuri"],
    [7, "Hospitality website and enquiry redesigns"],
    [4, "Document and enquiry portals for business teams"],
  ],
  "jor-bagh": [
    [2, "Design studio websites in Jor Bagh"],
    [7, "Portfolio and consultation website redesigns"],
    [6, "Shopify stores for Jor Bagh boutiques"],
  ],
  "lajpat-nagar": [
    [0, "Ecommerce development for Lajpat Nagar apparel retailers"],
    [3, "WooCommerce product variant catalogues"],
    [6, "Shopify storefronts for fashion and accessories"],
  ],
  "nehru-place": [
    [0, "Electronics ecommerce websites in Nehru Place"],
    [4, "IT reseller catalogue and enquiry portals"],
    [1, "B2B ordering for technology distributors"],
  ],
  janakpuri: [
    [2, "Website design for Janakpuri clinics and service firms"],
    [4, "Appointment and enquiry portals"],
    [0, "Online retail catalogues in Janakpuri"],
  ],
  "west-delhi": [
    [7, "Website redesign for West Delhi showrooms"],
    [6, "Shopify store development in West Delhi"],
    [1, "Dealer catalogues for local distributors"],
  ],
  shahdara: [
    [1, "Wholesale ecommerce and quote forms in Shahdara"],
    [4, "Product catalogue portals for Shahdara traders"],
    [2, "Mobile websites for local service teams"],
  ],
  dwarka: [
    [2, "Business and education websites in Dwarka"],
    [0, "Ecommerce stores with local pickup and delivery"],
    [7, "Mobile enquiry page redesigns in Dwarka"],
  ],
  "geetanjali-enclave": [
    [2, "Portfolio websites for Geetanjali Enclave practices"],
    [7, "Consultation form and mobile redesigns"],
    [4, "Appointment enquiry portals for local teams"],
  ],
  chhatarpur: [
    [2, "Event venue websites in Chhatarpur"],
    [4, "Availability and quote enquiry portals"],
    [0, "Product catalogues for Chhatarpur showrooms"],
  ],
  "rajouri-garden": [
    [0, "Retail ecommerce website design in Rajouri Garden"],
    [6, "Shopify development for local lifestyle brands"],
    [7, "Showroom website and appointment redesigns"],
  ],
  "malviya-nagar": [
    [2, "Business website development in Malviya Nagar"],
    [0, "Local pickup and online ordering websites"],
    [7, "Mobile redesigns for cafés and service practices"],
  ],
  "okhla-industrial-area": [
    [1, "B2B ecommerce for Okhla Industrial Area suppliers"],
    [4, "Electronics and packaging catalogue portals"],
    [3, "WooCommerce for standard industrial products"],
  ],
  "naraina-industrial-area": [
    [1, "Wholesale ordering websites in Naraina Industrial Area"],
    [4, "Fabrication quote and catalogue portals"],
    [2, "Engineering company website development"],
  ],
  "mayapuri-industrial-area": [
    [4, "Auto parts catalogue portals in Mayapuri"],
    [1, "Dealer ordering for industrial and auto parts"],
    [3, "WooCommerce stores for stocked components"],
  ],
  "wazirpur-industrial-area": [
    [1, "B2B ecommerce for Wazirpur metal suppliers"],
    [4, "Equipment catalogue and RFQ portals"],
    [2, "Industrial wholesale website development"],
  ],
  "bawana-industrial-area": [
    [1, "Wholesale ordering websites in Bawana"],
    [4, "Manufacturing catalogue and distributor portals"],
    [3, "WooCommerce for repeatable consumer-goods orders"],
  ],
  "narela-industrial-area": [
    [1, "B2B ecommerce and bulk orders in Narela"],
    [4, "Packaging catalogue and stock enquiry portals"],
    [2, "Website development for Narela manufacturers"],
  ],
  "patparganj-industrial-area": [
    [4, "Electrical product catalogue portals in Patparganj"],
    [1, "B2B ordering for industrial distributors"],
    [3, "WooCommerce catalogues for packaged inventory"],
  ],
  "kirti-nagar-industrial-area": [
    [0, "Furniture ecommerce website development in Kirti Nagar"],
    [4, "Custom furniture catalogue and quote portals"],
    [2, "Interiors and fabrication business websites"],
  ],
  "jhilmil-industrial-area": [
    [4, "Electrical product portals in Jhilmil Industrial Area"],
    [1, "Wholesale ecommerce for electrical distributors"],
    [2, "Websites for local machinery service firms"],
  ],
  "mangolpuri-industrial-area": [
    [1, "Wholesale ecommerce for Mangolpuri suppliers"],
    [4, "Engineering product and packaging quote portals"],
    [2, "Business websites for industrial workshops"],
  ],
  "badli-industrial-area": [
    [4, "Engineering catalogue portals in Badli Industrial Area"],
    [1, "B2B ordering for equipment suppliers"],
    [2, "Business websites for Badli manufacturers"],
  ],
  "udyog-nagar": [
    [1, "B2B ecommerce for Udyog Nagar trade suppliers"],
    [4, "Distributor enquiry and catalogue portals"],
    [2, "Manufacturing website design in Udyog Nagar"],
  ],
  gujarat: [
    [1, "B2B ecommerce for Gujarat wholesalers and exporters"],
    [4, "Trade catalogue and distributor portal development"],
    [6, "Shopify stores for Gujarat D2C brands"],
  ],
  ahmedabad: [
    [2, "Business website development in Ahmedabad"],
    [1, "Textile wholesale ecommerce and ordering"],
    [4, "Manufacturer catalogue and enquiry portals"],
  ],
  surat: [
    [0, "Textile and fashion ecommerce development in Surat"],
    [6, "Shopify stores for Surat apparel brands"],
    [1, "Wholesale product ordering for textile suppliers"],
  ],
  vadodara: [
    [4, "Industrial equipment catalogue portals in Vadodara"],
    [1, "B2B ordering websites for process equipment"],
    [2, "Engineering and industrial service websites"],
  ],
  rajkot: [
    [4, "Engineering and auto parts portals in Rajkot"],
    [1, "B2B catalogue and repeat ordering for machine tools"],
    [3, "WooCommerce for standard Rajkot workshop products"],
  ],
  ludhiana: [
    [1, "B2B ecommerce for Ludhiana hosiery and parts suppliers"],
    [4, "Industrial catalogue and distributor portals"],
    [3, "WooCommerce development for Ludhiana catalogues"],
  ],
  india: [
    [0, "Ecommerce website development across India"],
    [1, "Wholesale and distributor portals for Indian businesses"],
    [7, "Mobile ecommerce redesigns across India"],
  ],
};
