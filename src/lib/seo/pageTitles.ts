export type PageSeo = {
  title: string;
  description: string;
};

const DEFAULT_DESCRIPTION =
  "Build your home in Hyderabad with Prestoliv. Transparent construction with 3D/VR walkthroughs, live site tracking & on-time delivery. Book a free consult.";

/** Per-route document title and meta description for the SPA */
export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Home Construction + 3D Walkthrough | Prestoliv",
    description: DEFAULT_DESCRIPTION,
  },
  "/process": {
    title: "Our Construction Process & 3D Walkthroughs | Prestoliv",
    description:
      "See how Prestoliv builds in Hyderabad: virtual-first 3D/VR walkthroughs, transparent milestones, live site tracking and guaranteed on-time delivery.",
  },
  "/services": {
    title: "Construction & Interior Design Services | Prestoliv",
    description:
      "Explore Prestoliv's home construction & interior design with 3D walkthroughs, project management, vastu & partner financing support.",
  },
  "/services/residential": {
    title: "Residential Home Construction | Prestoliv Hyderabad",
    description:
      "Build your villa or home in Hyderabad with Prestoliv. Fixed-price contracts, VR walkthroughs, approvals handled & on-time handover.",
  },
  "/services/commercial": {
    title: "Commercial Construction | Prestoliv Hyderabad",
    description:
      "Offices, retail & clinic builds in Hyderabad with Prestoliv. Fast-track approvals, MEP execution & live project dashboard.",
  },
  "/services/interiors": {
    title: "Interior Design Services | Prestoliv Hyderabad",
    description:
      "Full-home interiors in Hyderabad — 3D visualization, modular kitchens, procurement & renovation with committed handover dates.",
  },
  "/calculator": {
    title: "Home Construction Cost Calculator | Prestoliv",
    description:
      "Estimate your home construction cost in Hyderabad with Prestoliv's transparent ₹/sq ft calculator. Book a free consultation for a fixed quote.",
  },
  "/about": {
    title: "About Prestoliv | Home Builders in Hyderabad",
    description:
      "Meet Prestoliv — Hyderabad home builders delivering transparent, on-time construction with 3D walkthroughs, live tracking & a 10-yr structural warranty.",
  },
  "/auth/callback": {
    title: "Signing In | Prestoliv",
    description: DEFAULT_DESCRIPTION,
  },
};

const NOT_FOUND_SEO: PageSeo = {
  title: "Page Not Found | Prestoliv",
  description: "The page you're looking for doesn't exist. Return to Prestoliv's home construction services in Hyderabad.",
};

export function getPageSeo(pathname: string): PageSeo {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  return PAGE_SEO[path] ?? NOT_FOUND_SEO;
}
