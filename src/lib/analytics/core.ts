import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
  type EventCategory,
  getContentGroup,
  GA4_EVENTS,
  META_EVENTS,
} from "./events";

type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: GtagFn;
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

export const analyticsConfig = {
  gtmId: import.meta.env.VITE_GTM_ID?.trim() || "",
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "",
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID?.trim() || "",
  clarityProjectId: import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() || "",
} as const;

/** When GTM is set, GA4 runs via GTM only. Meta Pixel loads direct when VITE_META_PIXEL_ID is set. */
export const useGtmHub = !!analyticsConfig.gtmId;

export const hasAnalytics =
  useGtmHub ||
  !!analyticsConfig.gaMeasurementId ||
  !!analyticsConfig.metaPixelId ||
  !!analyticsConfig.clarityProjectId;

let scriptsLoaded = false;

export type TrackParams = Record<string, string | number | boolean | undefined>;

type TrackOptions = {
  event: AnalyticsEventName;
  category: EventCategory;
  action: string;
  label?: string;
  params?: TrackParams;
  ga4Event?: string;
  ga4Params?: TrackParams;
  metaEvent?: string;
  metaParams?: TrackParams;
  metaStandard?: boolean;
};

function currentPath() {
  return `${window.location.pathname}${window.location.search}`;
}

function pushDataLayer(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    ...payload,
    page_path: payload.page_path ?? currentPath(),
    content_group: payload.content_group ?? getContentGroup(window.location.pathname),
  });
}

function sendGa4(event: string, params?: TrackParams) {
  if (!window.gtag) return;
  window.gtag("event", event, params);
}

function sendMeta(event: string, params?: TrackParams, standard = false) {
  if (!window.fbq) return;
  if (standard) {
    window.fbq("track", event, params);
  } else {
    window.fbq("trackCustom", event, params);
  }
}

/** Central dispatcher — consistent schema for GTM, GA4, and Meta */
export function track(options: TrackOptions) {
  if (!hasAnalytics) return;

  const {
    event,
    category,
    action,
    label,
    params = {},
    ga4Event,
    ga4Params,
    metaEvent,
    metaParams,
    metaStandard = false,
  } = options;

  const buttonId =
    (typeof params.lead_source === "string" && params.lead_source) ||
    (typeof params.cta_id === "string" && params.cta_id) ||
    undefined;

  pushDataLayer({
    event,
    event_category: category,
    event_action: action,
    event_label: label,
    ...params,
    ...(buttonId ? { button_id: buttonId } : {}),
  });

  if (ga4Event && !useGtmHub) sendGa4(ga4Event, { ...params, ...ga4Params });
  if (metaEvent && analyticsConfig.metaPixelId) sendMeta(metaEvent, { ...params, ...metaParams }, metaStandard);
}

function loadScript(src: string, id?: string) {
  if (id && document.getElementById(id)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  if (id) script.id = id;
  document.head.appendChild(script);
}

function loadGoogleTagManager(gtmId: string) {
  pushDataLayer({ "gtm.start": Date.now(), event: "gtm.js" });
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`, "gtm-script");

  if (!document.getElementById("gtm-noscript")) {
    const noscript = document.createElement("noscript");
    noscript.id = "gtm-noscript";
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);
    document.body.prepend(noscript);
  }
}

function loadGoogleAnalytics(measurementId: string) {
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`, "ga-gtag-script");
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments as unknown as Record<string, unknown>);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
}

function loadMetaPixel(pixelId: string) {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue = fbq.queue ?? [];
      fbq.queue.push(args);
    }
  } as FbqFn;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  loadScript("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel-script");
  window.fbq("init", pixelId);

  if (!document.getElementById("meta-pixel-noscript")) {
    const noscript = document.createElement("noscript");
    noscript.id = "meta-pixel-noscript";
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.prepend(noscript);
  }
}

function loadMicrosoftClarity(projectId: string) {
  if (document.getElementById("clarity-script")) return;

  const clarityStub = function (...args: unknown[]) {
    (clarityStub as { q?: unknown[] }).q = (clarityStub as { q?: unknown[] }).q ?? [];
    (clarityStub as { q: unknown[] }).q.push(args);
  };
  (window as Window & { clarity?: typeof clarityStub }).clarity = clarityStub;

  const script = document.createElement("script");
  script.id = "clarity-script";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);
}

export function initAnalyticsScripts() {
  if (scriptsLoaded || !hasAnalytics) return;
  scriptsLoaded = true;

  const { gtmId, gaMeasurementId, metaPixelId, clarityProjectId } = analyticsConfig;
  if (gtmId) loadGoogleTagManager(gtmId);
  if (gaMeasurementId && !useGtmHub) loadGoogleAnalytics(gaMeasurementId);
  if (metaPixelId) loadMetaPixel(metaPixelId);
  if (clarityProjectId) loadMicrosoftClarity(clarityProjectId);
}

export function trackPageView(path: string, title?: string) {
  const pageTitle = title ?? document.title;
  const pageLocation = `${window.location.origin}${path}`;
  const contentGroup = getContentGroup(path.split("?")[0]);

  track({
    event: ANALYTICS_EVENTS.virtualPageView,
    category: "page",
    action: "view",
    label: contentGroup,
    params: {
      page_path: path,
      page_title: pageTitle,
      page_location: pageLocation,
      content_group: contentGroup,
    },
    ga4Event: GA4_EVENTS.pageView,
    ga4Params: { page_path: path, page_title: pageTitle, page_location: pageLocation, content_group: contentGroup },
    metaEvent: META_EVENTS.pageView,
    metaParams: { content_name: contentGroup },
    metaStandard: true,
  });
}

export function trackScrollDepth(percent: 25 | 50 | 75 | 100) {
  track({
    event: ANALYTICS_EVENTS.scrollDepth,
    category: "engagement",
    action: "scroll",
    label: `${percent}%`,
    params: { scroll_percent: percent },
    metaEvent: META_EVENTS.custom.scrollDepth,
    metaParams: { percent },
  });
}

export function trackNavigationClick(params: {
  linkText: string;
  destination: string;
  location: string;
}) {
  track({
    event: ANALYTICS_EVENTS.navigationClick,
    category: "navigation",
    action: "click",
    label: params.linkText,
    params: {
      link_text: params.linkText,
      link_destination: params.destination,
      nav_location: params.location,
    },
    ga4Event: GA4_EVENTS.click,
    ga4Params: {
      link_url: params.destination,
      link_text: params.linkText,
      outbound: false,
    },
  });
}

export function trackCtaClick(params: {
  ctaId: string;
  ctaText: string;
  location: string;
  destination?: string;
}) {
  track({
    event: ANALYTICS_EVENTS.ctaClick,
    category: "engagement",
    action: "click",
    label: params.ctaId,
    params: {
      cta_id: params.ctaId,
      cta_text: params.ctaText,
      cta_location: params.location,
      cta_destination: params.destination,
    },
    metaEvent: META_EVENTS.custom.ctaClick,
    metaParams: params as unknown as TrackParams,
  });
}

export function trackConsultationModalOpen(source: string) {
  track({
    event: ANALYTICS_EVENTS.consultationModalOpen,
    category: "conversion",
    action: "open",
    label: source,
    params: { lead_source: source },
    metaEvent: META_EVENTS.initiateCheckout,
    metaParams: { content_name: "consultation_form", lead_source: source },
    metaStandard: true,
  });
}

export function trackConsultationModalClose(source: string) {
  track({
    event: ANALYTICS_EVENTS.consultationModalClose,
    category: "conversion",
    action: "close",
    label: source,
    params: { lead_source: source },
  });
}

export function trackConsultationFormStart(source: string) {
  track({
    event: ANALYTICS_EVENTS.consultationFormStart,
    category: "conversion",
    action: "start",
    label: source,
    params: { lead_source: source },
  });
}

export function trackConsultationLead(params: { service: string; city: string; source: string; hasEmail: boolean }) {
  track({
    event: ANALYTICS_EVENTS.consultationFormSubmit,
    category: "conversion",
    action: "submit",
    label: "consultation_form",
    params: {
      lead_source: params.source,
      service_type: params.service,
      city: params.city,
      has_email: params.hasEmail,
    },
    ga4Event: GA4_EVENTS.generateLead,
    ga4Params: {
      currency: "INR",
      lead_source: params.source,
      service_type: params.service,
      city: params.city,
    },
    metaEvent: META_EVENTS.lead,
    metaParams: {
      content_name: "consultation_form",
      content_category: params.service,
      city: params.city,
    },
    metaStandard: true,
  });
}

export function trackConsultationFormError(params: { source: string; errorMessage: string }) {
  track({
    event: ANALYTICS_EVENTS.consultationFormError,
    category: "conversion",
    action: "error",
    label: params.source,
    params: { lead_source: params.source, error_message: params.errorMessage },
  });
}

export function trackCalculatorStarted(params: { packageCount: number }) {
  track({
    event: ANALYTICS_EVENTS.calculatorStarted,
    category: "calculator",
    action: "start",
    params: { package_count: params.packageCount },
    ga4Event: GA4_EVENTS.viewItem,
    ga4Params: { item_list_name: "construction_calculator" },
    metaEvent: META_EVENTS.viewContent,
    metaParams: { content_type: "calculator", content_name: "cost_calculator" },
    metaStandard: true,
  });
}

export function trackCalculatorAreaUpdated(params: {
  area: number;
  unit: string;
  sqft: number;
  estimateInr?: number;
}) {
  track({
    event: ANALYTICS_EVENTS.calculatorAreaUpdated,
    category: "calculator",
    action: "update_area",
    params: {
      area_value: params.area,
      area_unit: params.unit,
      built_up_sqft: Math.round(params.sqft),
      estimate_inr: params.estimateInr,
    },
    metaEvent: META_EVENTS.custom.calculatorEngagement,
    metaParams: { engagement_type: "area_update", ...params } as unknown as TrackParams,
  });
}

export function trackCalculatorUnitChanged(unit: "sqft" | "sqm") {
  track({
    event: ANALYTICS_EVENTS.calculatorUnitChanged,
    category: "calculator",
    action: "change_unit",
    label: unit,
    params: { area_unit: unit },
  });
}

export function trackCalculatorPackageSelect(params: {
  packageId: string;
  packageLabel: string;
  estimateInr?: number;
}) {
  track({
    event: ANALYTICS_EVENTS.calculatorPackageSelected,
    category: "calculator",
    action: "select_package",
    label: params.packageLabel,
    params: {
      package_id: params.packageId,
      package_label: params.packageLabel,
      estimate_inr: params.estimateInr,
    },
    ga4Event: GA4_EVENTS.selectItem,
    ga4Params: {
      item_list_name: "construction_packages",
      items: [
        {
          item_id: params.packageId,
          item_name: params.packageLabel,
          price: params.estimateInr,
        },
      ],
    },
    metaEvent: META_EVENTS.viewContent,
    metaParams: {
      content_name: params.packageLabel,
      content_ids: [params.packageId],
      content_type: "calculator_package",
      value: params.estimateInr,
      currency: "INR",
    },
    metaStandard: true,
  });
}

export function trackCalculatorEstimateViewed(params: { estimateInr: number; packageLabel: string }) {
  track({
    event: ANALYTICS_EVENTS.calculatorEstimateViewed,
    category: "calculator",
    action: "view_estimate",
    label: params.packageLabel,
    params: { estimate_inr: params.estimateInr, package_label: params.packageLabel },
  });
}

export function trackCalculatorReset() {
  track({
    event: ANALYTICS_EVENTS.calculatorReset,
    category: "calculator",
    action: "reset",
  });
}

export function trackSignInStart() {
  track({
    event: ANALYTICS_EVENTS.signInStart,
    category: "authentication",
    action: "start",
    label: "google",
    params: { method: "google" },
    ga4Event: GA4_EVENTS.login,
    ga4Params: { method: "google" },
    metaEvent: META_EVENTS.custom.signInStart,
    metaParams: { method: "google" },
  });
}

export function trackSignInComplete() {
  track({
    event: ANALYTICS_EVENTS.signInComplete,
    category: "authentication",
    action: "complete",
    label: "google",
    params: { method: "google", status: "success" },
    ga4Event: GA4_EVENTS.login,
    ga4Params: { method: "google", status: "success" },
    metaEvent: META_EVENTS.custom.signInComplete,
    metaParams: { method: "google" },
  });
}

export function trackDashboardOpen() {
  track({
    event: ANALYTICS_EVENTS.dashboardOpen,
    category: "authentication",
    action: "open_dashboard",
  });
}

export function trackOutboundContact(type: "phone" | "email", location: string) {
  track({
    event: ANALYTICS_EVENTS.contactClick,
    category: "contact",
    action: "click",
    label: type,
    params: { contact_type: type, contact_location: location },
    metaEvent: META_EVENTS.contact,
    metaParams: { contact_type: type },
    metaStandard: true,
  });
}

export function trackSocialClick(params: { platform: string; location: string }) {
  track({
    event: ANALYTICS_EVENTS.socialClick,
    category: "social",
    action: "click",
    label: params.platform,
    params: { social_platform: params.platform, social_location: params.location },
    metaEvent: META_EVENTS.custom.socialClick,
    metaParams: params as unknown as TrackParams,
  });
}

export function trackFaqExpand(params: { question: string; index: number }) {
  track({
    event: ANALYTICS_EVENTS.faqExpand,
    category: "engagement",
    action: "expand",
    label: params.question.slice(0, 80),
    params: { faq_index: params.index, faq_question: params.question },
    metaEvent: META_EVENTS.custom.faqExpand,
    metaParams: { faq_index: params.index },
  });
}

export function trackViewServiceInterest(params: { service: string; location: string }) {
  track({
    event: ANALYTICS_EVENTS.viewServiceInterest,
    category: "engagement",
    action: "view",
    label: params.service,
    params: { service_slug: params.service, interest_location: params.location },
    ga4Event: GA4_EVENTS.viewItem,
    ga4Params: { item_name: params.service },
  });
}
