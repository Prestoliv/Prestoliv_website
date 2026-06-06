export type PageSeo = {
  title: string;
  description: string;
  ogUrl: string;
};

export const SITE_URL = "https://www.prestoliv.com";

const DEFAULT_DESCRIPTION =
  "Build your home in Hyderabad with Prestoliv. Transparent construction with 3D/VR walkthroughs, live site tracking & on-time delivery. Book a free consult.";

function pageUrl(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/** Per-route document title, meta description, and og:url for the SPA */
export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Home Construction + 3D Walkthrough | Prestoliv",
    description: DEFAULT_DESCRIPTION,
    ogUrl: "https://www.prestoliv.com/",
  },
  "/process": {
    title: "Our Construction Process & 3D Walkthroughs | Prestoliv",
    description:
      "See how Prestoliv builds in Hyderabad: virtual-first 3D/VR walkthroughs, transparent milestones, live site tracking and guaranteed on-time delivery.",
    ogUrl: "https://www.prestoliv.com/process",
  },
  "/services": {
    title: "Construction & Interior Design Services | Prestoliv",
    description:
      "Explore Prestoliv's home construction & interior design with 3D walkthroughs, project management, vastu & partner financing support.",
    ogUrl: "https://www.prestoliv.com/services",
  },
  "/services/residential": {
    title: "Residential Home Construction | Prestoliv Hyderabad",
    description:
      "Build your villa or home in Hyderabad with Prestoliv. Fixed-price contracts, VR walkthroughs, approvals handled & on-time handover.",
    ogUrl: "https://www.prestoliv.com/services/residential",
  },
  "/services/commercial": {
    title: "Commercial Construction | Prestoliv Hyderabad",
    description:
      "Offices, retail & clinic builds in Hyderabad with Prestoliv. Fast-track approvals, MEP execution & live project dashboard.",
    ogUrl: "https://www.prestoliv.com/services/commercial",
  },
  "/services/interiors": {
    title: "Interior Design Services | Prestoliv Hyderabad",
    description:
      "Full-home interiors in Hyderabad — 3D visualization, modular kitchens, procurement & renovation with committed handover dates.",
    ogUrl: "https://www.prestoliv.com/services/interiors",
  },
  "/calculator": {
    title: "Home Construction Cost Calculator | Prestoliv",
    description:
      "Estimate your home construction cost in Hyderabad with Prestoliv's transparent ₹/sq ft calculator. Book a free consultation for a fixed quote.",
    ogUrl: "https://www.prestoliv.com/calculator",
  },
  "/about": {
    title: "About Prestoliv | Home Builders in Hyderabad",
    description:
      "Meet Prestoliv — Hyderabad home builders delivering transparent, on-time construction with 3D walkthroughs, live tracking & a 10-yr structural warranty.",
    ogUrl: "https://www.prestoliv.com/about",
  },
  "/auth/callback": {
    title: "Signing In | Prestoliv",
    description: DEFAULT_DESCRIPTION,
    ogUrl: "https://www.prestoliv.com/auth/callback",
  },
};

const NOT_FOUND_SEO: PageSeo = {
  title: "Page Not Found | Prestoliv",
  description:
    "The page you're looking for doesn't exist. Return to Prestoliv's home construction services in Hyderabad.",
  ogUrl: `${SITE_URL}/404`,
};

export function getPageSeo(pathname: string): PageSeo {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  if (PAGE_SEO[path]) return PAGE_SEO[path];
  return { ...NOT_FOUND_SEO, ogUrl: pageUrl(path) };
}
