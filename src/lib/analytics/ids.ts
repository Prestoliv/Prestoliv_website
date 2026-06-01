import type { ConsultationSource } from "./events";

/** Stable HTML id for consultation triggers (visible in DevTools + GTM click triggers). */
export function consultationTriggerId(source: ConsultationSource) {
  return `btn-consult-${source}`;
}

/** Stable HTML id for CTA buttons/links. */
export function ctaTriggerId(ctaId: string) {
  return `btn-${ctaId}`;
}

/** data-analytics-id mirrors dataLayer button_id / lead_source / cta_id. */
export const analyticsDataAttributes = (buttonId: string) => ({
  "data-analytics-id": buttonId,
  "data-button-id": buttonId,
});

export function navLinkId(navLocation: string, destination: string) {
  const pathSlug = destination.replace(/^\//, "").replace(/\//g, "-") || "home";
  return `nav-${navLocation}-${pathSlug}`;
}
