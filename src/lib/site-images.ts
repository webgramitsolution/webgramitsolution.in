/**
 * Homepage imagery, served from the ImageKit library.
 *
 * Every picture used on the homepage lives here so a file can be swapped in one
 * place (or the URL updated when a new version is uploaded) without touching the
 * page markup.
 */
const lib = "https://ik.imagekit.io/home1/home%20page";

/** Ask ImageKit for a right-sized, modern-format copy of the same original file. */
export function ikResize(url: string, width: number) {
  return `${url}${url.includes("?") ? "&" : "?"}tr=w-${width},q-80,f-auto`;
}

export const IMAGES = {
  /** Wide navy hero banner: laptop + phone storefronts, callouts on the right. */
  hero: `${lib}/home%20page%20slider%201.png`,
  /** Row of review / certification seals on white. */
  reviewBadges: ikResize(`${lib}/Media-2.webp`, 1200),
  /** Hub-and-spoke commerce ecosystem diagram on white. */
  ecosystem: ikResize(`${lib}/From%20Storefront%20to%20Back%20Office.png`, 1200),
  /** Storefront, admin dashboard and mobile app on three devices, transparent. */
  platforms: ikResize(`${lib}/wesite%20devolopment.png?updatedAt=1790573582047`, 1200),
  /** Solution card artwork — each is a white-background photo. */
  ecommerce: ikResize(`${lib}/Ecommerce%20Development.png`, 800),
  b2b: ikResize(`${lib}/B2B%20Commerce.png`, 800),
  marketplace: ikResize(`${lib}/Marketplace%20Development.png`, 800),
  custom: ikResize(`${lib}/Custom%20Commerce%20Platforms.png`, 800),
  /** Case-study card artwork — wide device shots, one per case study. */
  caseManufacturing: ikResize(
    `${lib}/From%20Traditional%20Sales%20to%20a%20Scalable%20Digital%20Platform.png`,
    1400,
  ),
  caseLifestyle: ikResize(
    `${lib}/Modern%20Ecommerce%20Experience%20for%20a%20Lifestyle%20Brand.png`,
    1400,
  ),
  caseDistribution: ikResize(
    `${lib}/Business%20Management%20Portal%20for%20a%20Distribution%20Company.png`,
    1400,
  ),
} as const;

/** Brand logos shown under "Trusted by Businesses Building Their Digital Future". */
export const clientLogos = [
  { name: "GoKwik", src: ikResize(`${lib}/1.png`, 320) },
  { name: "Hostinger", src: ikResize(`${lib}/2.png`, 320) },
  { name: "Trustpilot", src: ikResize(`${lib}/3.png`, 320) },
  { name: "interakt", src: ikResize(`${lib}/4.png`, 320) },
  { name: "Judge.me", src: ikResize(`${lib}/5.png`, 320) },
  { name: "WATI", src: ikResize(`${lib}/6.png`, 320) },
  { name: "Shiprocket", src: ikResize(`${lib}/7.png`, 320) },
];

/**
 * About-page content shown on the homepage (About banner hero, mission section
 * and workspace gallery), served from the ImageKit library.
 */
export const aboutImages = {
  /** Wide navy banner: Webgram reception wall photo, plain navy on the left for copy. */
  banner: `https://ik.imagekit.io/home1/About%20us%20page/About%20us%20-%20banner.png`,
  /** Office photo with the "Ideas. Technology. Growth." wall, for the mission section. */
  mission: ikResize(`https://ik.imagekit.io/home1/ArchFacing.png`, 1200),
  /** Workspace gallery, in display order. */
  workspace: [
    {
      label: "Modern Office Space",
      src: ikResize(
        `https://ik.imagekit.io/home1/About%20us%20page/A%20createive%20and%20collaborative%20Environment%20ka%20image%20ye%20abhi%20add%20karo%20(1).png`,
        900,
      ),
    },
    {
      label: "Team Collaboration",
      src: ikResize(
        `https://ik.imagekit.io/home1/About%20us%20page/A%20createive%20and%20collaborative%20Environment%20ka%20image%20ye%20abhi%20add%20karo%20(3).png`,
        900,
      ),
    },
    {
      label: "Focused Development",
      src: ikResize(
        `https://ik.imagekit.io/home1/About%20us%20page/A%20createive%20and%20collaborative%20Environment%20ka%20image%20ye%20abhi%20add%20karo%20(2).png`,
        900,
      ),
    },
  ],
} as const;

/** Contact-page artwork supplied for the single-page contact experience. */
export const contactImages = {
  banner: `https://ik.imagekit.io/home1/About%20us%20page/cotact%20banner.png`,
  advisor: ikResize(
    `https://ik.imagekit.io/home1/About%20us%20page/about%20us%20page%20-%20coantact%20us%20image.png?updatedAt=1790588444335`,
    900,
  ),
} as const;

/** Technology grid — transparent square logos, listed in reference order. */
export const technologyStack = [
  { name: "React.js", src: ikResize(`${lib}/01_React.js.png`, 160) },
  { name: "Next.js", src: ikResize(`${lib}/nextjs.svg`, 160) },
  { name: "Node.js", src: ikResize(`${lib}/03_Node.js.png`, 160) },
  { name: "WordPress", src: ikResize(`${lib}/04_WordPress.png`, 160) },
  { name: "WooCommerce", src: ikResize(`${lib}/05_WooCommerce.png`, 160) },
  { name: "Supabase", src: ikResize(`${lib}/06_Supabase.png`, 160) },
  { name: "PostgreSQL", src: ikResize(`${lib}/07_PostgreSQL.png`, 160) },
  { name: "Razorpay", src: ikResize(`${lib}/08_Razorpay.png`, 160) },
  { name: "WhatsApp API", src: ikResize(`${lib}/09_WhatsApp_API.png`, 160) },
  { name: "AWS", src: ikResize(`${lib}/10_AWS.png`, 160) },
  { name: "Google Cloud", src: ikResize(`${lib}/11_Google_Cloud.png`, 160) },
  { name: "More", src: ikResize(`${lib}/12_More.png`, 160) },
];

/**
 * Replacement Next.js mark supplied for the technology rows. The file name ends
 * in ".svg" but ImageKit serves a 180×180 PNG — an <img> tag renders either.
 */
export const nextjsLogo = ikResize(`${lib}/nextjs.svg`, 160);

/**
 * Industry cards — one photo per sector. The object key and the label used on
 * the card match the ImageKit file name, so the same text doubles as alt text.
 * URLs stay exactly as supplied: ImageKit serves them with a literal "&" and
 * "(2)", which 404 once percent-encoded.
 */
export const industryImages = {
  manufacturing: ikResize("https://ik.imagekit.io/home1/Manufacturing.png", 700),
  architecture: ikResize("https://ik.imagekit.io/home1/Architecture%20&%20Interior.png", 700),
  realEstate: ikResize("https://ik.imagekit.io/home1/Real%20Estate.png", 700),
  retail: ikResize("https://ik.imagekit.io/home1/Retail%20&%20Lifestyle.png", 700),
  education: ikResize("https://ik.imagekit.io/home1/Education.png", 700),
  healthcare: ikResize("https://ik.imagekit.io/home1/Healthcare%20(2).png", 700),
  finance: ikResize("https://ik.imagekit.io/home1/Finance%20&%20Consulting.png", 700),
} as const;

/**
 * "Websites We Have Delivered" project cards — one delivered-site photo per card.
 * URLs stay exactly as supplied (percent-encoded spaces only).
 */
export const deliveredProjects = {
  corporate: ikResize("https://ik.imagekit.io/home1/Corporate%20Website.png", 900),
  business: ikResize("https://ik.imagekit.io/home1/Business%20Website.png", 900),
  professional: ikResize("https://ik.imagekit.io/home1/Professional%20Website.png", 900),
  realEstate: ikResize("https://ik.imagekit.io/home1/Real%20Estate%20Website.png", 900),
  healthcare: ikResize("https://ik.imagekit.io/home1/Healthcare%20Website.png", 900),
} as const;

/** Web Portal Development service page imagery, served from the ImageKit library. */
export const portalImages = {
  /** Wide navy hero banner: dashboard, vendor portal and customer portal mockups, "Multiple Portals One Solution" script on the right. */
  hero: "https://ik.imagekit.io/home1/custome%20wesite%20banner.png",
  customer: ikResize("https://ik.imagekit.io/home1/Customer%20Portal.png", 900),
  vendor: ikResize("https://ik.imagekit.io/home1/Verndor%20portal.png", 900),
  employee: ikResize("https://ik.imagekit.io/home1/Employee%20portal.png", 900),
  admin: ikResize("https://ik.imagekit.io/home1/Admin%20Portal.png", 900),
} as const;

/** API & Third-Party Integration service page artwork supplied through ImageKit. */
export const apiIntegrationImages = {
  hero: "https://ik.imagekit.io/home1/home%20page/Api%20integration%20page.png",
} as const;

/**
 * "Technologies & Platforms We Work With" logos on the API Integration page, in
 * the supplied order. URLs stay exactly as given (percent-encoded spaces only);
 * the display name doubles as the alt text.
 */
export const apiPlatformLogos = [
  { name: "Delhivery", src: "https://ik.imagekit.io/x3cipokny/Logo/Delhivery%20Logo.png" },
  { name: "Tally", src: "https://ik.imagekit.io/x3cipokny/Logo/Tally%20Logo.png" },
  { name: "Shiprocket", src: "https://ik.imagekit.io/x3cipokny/Logo/Shiprocket%20Logo.png" },
  { name: "PayPal", src: "https://ik.imagekit.io/x3cipokny/Logo/PayPal%20Logo.png" },
  { name: "PayU", src: "https://ik.imagekit.io/x3cipokny/Logo/PayU%20Logo.png" },
  { name: "Stripe", src: "https://ik.imagekit.io/x3cipokny/Logo/Stripe%20Logo.png" },
  { name: "Razorpay", src: "https://ik.imagekit.io/x3cipokny/Logo/Razorpay%20Logo.png" },
  { name: "SAP", src: "https://ik.imagekit.io/x3cipokny/Logo/SAP%20Logo.png" },
  { name: "Google Ads", src: "https://ik.imagekit.io/x3cipokny/Logo/Google%20Ads%20Logo.png" },
  {
    name: "Google Analytics",
    src: "https://ik.imagekit.io/x3cipokny/Logo/Google%20Analytics%20Logo.png",
  },
  { name: "AWS", src: "https://ik.imagekit.io/x3cipokny/Logo/AWS%20Logo.png" },
  { name: "SendGrid", src: "https://ik.imagekit.io/x3cipokny/Logo/SendGrid%20Logo.png" },
  { name: "Google Maps", src: "https://ik.imagekit.io/x3cipokny/Logo/Google%20Maps%20Logo.png" },
  { name: "Zoho", src: "https://ik.imagekit.io/x3cipokny/Logo/Zoho%20Logo.png" },
  {
    name: "Meta WhatsApp",
    src: "https://ik.imagekit.io/x3cipokny/Logo/Meta%20WhatsApp%20Logo.png",
  },
  { name: "HubSpot", src: "https://ik.imagekit.io/x3cipokny/Logo/HubSpot%20Logo.png" },
  { name: "Twilio", src: "https://ik.imagekit.io/x3cipokny/Logo/Twilio%20Logo.png" },
  { name: "Mailchimp", src: "https://ik.imagekit.io/x3cipokny/Logo/Mailchimp%20Logo.png" },
  { name: "Salesforce", src: "https://ik.imagekit.io/x3cipokny/Logo/Salesforce%20Logo.png" },
  { name: "Odoo", src: "https://ik.imagekit.io/x3cipokny/Logo/Odoo%20Logo.png" },
] as const;

/**
 * Website Maintenance & Optimization service page artwork supplied through
 * ImageKit (x3cipokny library). URLs stay exactly as given — the "icon/*"
 * files are wide photo illustrations used as the service-card tops.
 */
export const maintenanceImages = {
  /** Wide blue hero banner: maintenance benefit tiles around a laptop mockup. */
  hero: "https://ik.imagekit.io/x3cipokny/maintence%20banner.png",
  /** Before/after strip: slow and vulnerable versus fast, secure, high performing. */
  beforeAfter: "https://ik.imagekit.io/x3cipokny/mantence.png",
  updates: "https://ik.imagekit.io/x3cipokny/icon/Website%20update.png",
  security: "https://ik.imagekit.io/x3cipokny/icon/Security%20and%20Malware%20removal.png",
  speed: "https://ik.imagekit.io/x3cipokny/icon/Speed%20Optimization.png",
  backups: "https://ik.imagekit.io/x3cipokny/icon/Daily%20Backups.png",
  uptime: "https://ik.imagekit.io/x3cipokny/icon/Uptime%20Monitoring.png",
  support: "https://ik.imagekit.io/x3cipokny/icon/Technical%20Support.png",
} as const;

/**
 * "Tools & Technologies We Use" logos on the Website Development service page,
 * in the supplied order. URLs stay exactly as given (percent-encoded spaces
 * only); the logo file name doubles as the alt text.
 */
/**
 * "Integrations We Support" logos on the WooCommerce service page, in the
 * supplied order. URLs stay exactly as given (percent-encoded spaces only);
 * the display name doubles as the alt text.
 */
export const wooIntegrations = [
  { name: "Google Ads", src: "https://ik.imagekit.io/home1/Google%20Ads.png" },
  { name: "Meta Pixel", src: "https://ik.imagekit.io/home1/MetaPixel.png" },
  { name: "WhatsApp Business", src: "https://ik.imagekit.io/home1/WhatsApp%20Business.png" },
  { name: "Google Analytics", src: "https://ik.imagekit.io/home1/google%20anaylytics.png" },
  { name: "Delhivery", src: "https://ik.imagekit.io/home1/Delhivery.png" },
  { name: "BlueDart", src: "https://ik.imagekit.io/home1/BlueDart.png" },
  { name: "Mailchimp", src: "https://ik.imagekit.io/home1/MailChimp.png" },
  { name: "Razorpay", src: "https://ik.imagekit.io/home1/Razorpay.png" },
  { name: "Shiprocket", src: "https://ik.imagekit.io/home1/Shiprocket.png" },
  { name: "Instamojo", src: "https://ik.imagekit.io/home1/Instamojo.png" },
  { name: "PayU", src: "https://ik.imagekit.io/home1/payu.png" },
  { name: "Stripe", src: "https://ik.imagekit.io/home1/stripe.png" },
  { name: "Tally", src: "https://ik.imagekit.io/home1/Telly.png" },
] as const;

export const webDevelopmentTechnologies = [
  {
    name: "CloudFlare",
    src: "https://ik.imagekit.io/home1/CloudFlare",
    viewBox: "130 302 993 516",
  },
  {
    name: "JavaScript",
    src: "https://ik.imagekit.io/home1/JavaScript.png",
    viewBox: "286 205 681 723",
  },
  { name: "Python", src: "https://ik.imagekit.io/home1/Python.png", viewBox: "275 173 704 678" },
  { name: "MongoDB", src: "https://ik.imagekit.io/home1/MongoDB.png", viewBox: "468 253 314 585" },
  {
    name: "Yoast SEO",
    src: "https://ik.imagekit.io/home1/Yoast%20SEO.png",
    viewBox: "253 201 770 747",
  },
  {
    name: "RankMath",
    src: "https://ik.imagekit.io/home1/RankMath.png",
    viewBox: "176 256 908 636",
  },
  {
    name: "WP Bakery",
    src: "https://ik.imagekit.io/home1/WP%20Bakery.png",
    viewBox: "237 272 785 585",
  },
  {
    name: "Elementor",
    src: "https://ik.imagekit.io/home1/Elementor.png",
    viewBox: "253 217 747 697",
  },
  { name: "ACF", src: "https://ik.imagekit.io/home1/ACF%202.png", viewBox: "125 358 1017 502" },
  {
    name: "WooCommerce",
    src: "https://ik.imagekit.io/home1/WooCommerce.png",
    viewBox: "166 310 922 578",
  },
  { name: "Java", src: "https://ik.imagekit.io/home1/Java.png", viewBox: "414 144 484 535" },
  { name: "MySQL", src: "https://ik.imagekit.io/home1/MySQL.png", viewBox: "122 310 1026 701" },
  { name: "PHP", src: "https://ik.imagekit.io/home1/PHP.png", viewBox: "133 321 978 582" },
  {
    name: "WordPress",
    src: "https://ik.imagekit.io/home1/WordPress.png",
    viewBox: "273 187 706 695",
  },
] as const;
