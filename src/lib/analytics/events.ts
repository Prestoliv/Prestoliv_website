/**
 * Prestoliv analytics event catalog.
 * Use these exact `event` names as GTM Custom Event triggers.
 * @see https://support.google.com/analytics/answer/9267735 (GA4 recommended events)
 */

export const EVENT_CATEGORY = {
  page: "page",
  engagement: "engagement",
  navigation: "navigation",
  conversion: "conversion",
  calculator: "calculator",
  authentication: "authentication",
  contact: "contact",
  social: "social",
} as const;

export type EventCategory = (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];

/** dataLayer `event` names — stable contract for GTM */
export const ANALYTICS_EVENTS = {
  // Page & session
  virtualPageView: "virtual_page_view",
  scrollDepth: "scroll_depth",
  sectionView: "section_view",

  // Navigation
  navigationClick: "navigation_click",
  outboundLinkClick: "outbound_link_click",

  // Consultation funnel
  consultationModalOpen: "consultation_modal_open",
  consultationModalClose: "consultation_modal_close",
  consultationFormStart: "consultation_form_start",
  consultationFormSubmit: "consultation_form_submit",
  consultationFormError: "consultation_form_error",

  // Calculator
  calculatorStarted: "calculator_started",
  calculatorAreaUpdated: "calculator_area_updated",
  calculatorUnitChanged: "calculator_unit_changed",
  calculatorPackageSelected: "calculator_package_selected",
  calculatorEstimateViewed: "calculator_estimate_viewed",
  calculatorReset: "calculator_reset",
  calculatorCtaClick: "calculator_cta_click",

  // CTAs & content
  ctaClick: "cta_click",
  viewServiceInterest: "view_service_interest",
  faqExpand: "faq_expand",

  // Auth
  signInStart: "sign_in_start",
  signInComplete: "sign_in_complete",
  dashboardOpen: "dashboard_open",

  // Contact & social
  contactClick: "contact_click",
  socialClick: "social_click",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/** GA4 recommended event names sent via gtag when applicable */
export const GA4_EVENTS = {
  pageView: "page_view",
  generateLead: "generate_lead",
  selectItem: "select_item",
  viewItem: "view_item",
  login: "login",
  click: "click",
} as const;

/** Meta Pixel standard + custom event names */
export const META_EVENTS = {
  pageView: "PageView",
  lead: "Lead",
  viewContent: "ViewContent",
  initiateCheckout: "InitiateCheckout",
  contact: "Contact",
  custom: {
    signInStart: "SignInStart",
    signInComplete: "SignInComplete",
    consultationOpen: "ConsultationOpen",
    calculatorEngagement: "CalculatorEngagement",
    ctaClick: "CtaClick",
    socialClick: "SocialClick",
    scrollDepth: "ScrollDepth",
    faqExpand: "FaqExpand",
  },
} as const;

/** Where the consultation modal was opened — for attribution */
export type ConsultationSource =
  | "hero"
  | "navbar_desktop"
  | "navbar_mobile"
  | "navbar_services_menu"
  | "footer_cta"
  | "calculator_sidebar"
  | "calculator_bottom"
  | "calculator_empty_state"
  | "calculator_page_hero"
  | "service_residential"
  | "service_commercial"
  | "service_interiors"
  | "process_page"
  | "about_page";

export type SocialPlatform = "instagram" | "linkedin" | "facebook";

export type ServiceSlug = "residential" | "commercial" | "interiors";

/** Human-readable catalog for stakeholders & GTM setup */
export const ANALYTICS_EVENT_CATALOG: ReadonlyArray<{
  event: AnalyticsEventName;
  category: EventCategory;
  description: string;
  ga4?: string;
  meta?: string;
}> = [
  { event: ANALYTICS_EVENTS.virtualPageView, category: EVENT_CATEGORY.page, description: "SPA route change", ga4: "page_view", meta: "PageView" },
  { event: ANALYTICS_EVENTS.scrollDepth, category: EVENT_CATEGORY.engagement, description: "User scrolled 25/50/75/100% of page", meta: META_EVENTS.custom.scrollDepth },
  { event: ANALYTICS_EVENTS.sectionView, category: EVENT_CATEGORY.engagement, description: "Key page section entered viewport" },
  { event: ANALYTICS_EVENTS.navigationClick, category: EVENT_CATEGORY.navigation, description: "Internal nav or footer link click", ga4: "click" },
  { event: ANALYTICS_EVENTS.outboundLinkClick, category: EVENT_CATEGORY.navigation, description: "External link opened", ga4: "click" },
  { event: ANALYTICS_EVENTS.consultationModalOpen, category: EVENT_CATEGORY.conversion, description: "Book consultation dialog opened", meta: META_EVENTS.initiateCheckout },
  { event: ANALYTICS_EVENTS.consultationModalClose, category: EVENT_CATEGORY.conversion, description: "Dialog closed without submit" },
  { event: ANALYTICS_EVENTS.consultationFormStart, category: EVENT_CATEGORY.conversion, description: "User focused first form field" },
  { event: ANALYTICS_EVENTS.consultationFormSubmit, category: EVENT_CATEGORY.conversion, description: "Lead form successfully submitted", ga4: "generate_lead", meta: "Lead" },
  { event: ANALYTICS_EVENTS.consultationFormError, category: EVENT_CATEGORY.conversion, description: "Form submission failed" },
  { event: ANALYTICS_EVENTS.calculatorStarted, category: EVENT_CATEGORY.calculator, description: "Calculator loaded with packages", ga4: "view_item" },
  { event: ANALYTICS_EVENTS.calculatorAreaUpdated, category: EVENT_CATEGORY.calculator, description: "Built-up area changed", meta: META_EVENTS.custom.calculatorEngagement },
  { event: ANALYTICS_EVENTS.calculatorUnitChanged, category: EVENT_CATEGORY.calculator, description: "Sq ft / Sq m toggle" },
  { event: ANALYTICS_EVENTS.calculatorPackageSelected, category: EVENT_CATEGORY.calculator, description: "Construction package selected", ga4: "select_item", meta: "ViewContent" },
  { event: ANALYTICS_EVENTS.calculatorEstimateViewed, category: EVENT_CATEGORY.calculator, description: "Estimate total displayed" },
  { event: ANALYTICS_EVENTS.calculatorReset, category: EVENT_CATEGORY.calculator, description: "Calculator reset to defaults" },
  { event: ANALYTICS_EVENTS.calculatorCtaClick, category: EVENT_CATEGORY.calculator, description: "Calculator page secondary CTA" },
  { event: ANALYTICS_EVENTS.ctaClick, category: EVENT_CATEGORY.engagement, description: "Primary CTA (e.g. Get Quote, Calculate Cost)", meta: META_EVENTS.custom.ctaClick },
  { event: ANALYTICS_EVENTS.viewServiceInterest, category: EVENT_CATEGORY.engagement, description: "Service pillar card or page interest", ga4: "view_item" },
  { event: ANALYTICS_EVENTS.faqExpand, category: EVENT_CATEGORY.engagement, description: "FAQ accordion opened", meta: META_EVENTS.custom.faqExpand },
  { event: ANALYTICS_EVENTS.signInStart, category: EVENT_CATEGORY.authentication, description: "Google login initiated", ga4: "login" },
  { event: ANALYTICS_EVENTS.signInComplete, category: EVENT_CATEGORY.authentication, description: "OAuth returned with session" },
  { event: ANALYTICS_EVENTS.dashboardOpen, category: EVENT_CATEGORY.authentication, description: "Logged-in user opened dashboard" },
  { event: ANALYTICS_EVENTS.contactClick, category: EVENT_CATEGORY.contact, description: "Phone or email link clicked", meta: "Contact" },
  { event: ANALYTICS_EVENTS.socialClick, category: EVENT_CATEGORY.social, description: "Social profile link clicked", meta: META_EVENTS.custom.socialClick },
];

/** GA4 content groups by route prefix */
export const PAGE_CONTENT_GROUPS: Record<string, string> = {
  "/": "home",
  "/process": "process",
  "/about": "about",
  "/calculator": "calculator",
  "/services": "services_hub",
  "/services/residential": "service_residential",
  "/services/commercial": "service_commercial",
  "/services/interiors": "service_interiors",
};

export function getContentGroup(pathname: string): string {
  if (PAGE_CONTENT_GROUPS[pathname]) return PAGE_CONTENT_GROUPS[pathname];
  if (pathname.startsWith("/services/")) return "service_detail";
  return "other";
}
