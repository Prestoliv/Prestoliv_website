import type { ConsultationSource } from "./events";

/** Stable HTML id for consultation triggers (visible in DevTools + GTM click triggers). */
export function consultationTriggerId(source: ConsultationSource) {
  return `btn-consult-${source}`;
}

export function consultationSubmitId(source: ConsultationSource) {
  return `btn-consult-submit-${source}`;
}

/** Stable HTML id for CTA buttons/links. */
export function ctaTriggerId(ctaId: string) {
  return ctaId.startsWith("btn-") ? ctaId : `btn-${ctaId}`;
}

export function navLinkId(navLocation: string, destination: string) {
  const pathSlug = destination.replace(/^\//, "").replace(/\//g, "-") || "home";
  return `nav-${navLocation}-${pathSlug}`;
}

export function inputAnalyticsId(name: string) {
  return `input-${name}`;
}

/** data-analytics-id mirrors dataLayer button_id / lead_source / cta_id. */
export const analyticsDataAttributes = (buttonId: string) => ({
  "data-analytics-id": buttonId,
  "data-button-id": buttonId,
});

/** HTML id + data attributes for any clickable (buttons, links, cards). */
export function analyticsProps(
  analyticsId: string,
  options?: { elementPrefix?: "btn" | "nav" | "input" | "toggle" },
) {
  const prefix = options?.elementPrefix ?? "btn";
  const id =
    analyticsId.startsWith("btn-") ||
    analyticsId.startsWith("nav-") ||
    analyticsId.startsWith("input-") ||
    analyticsId.startsWith("toggle-")
      ? analyticsId
      : `${prefix}-${analyticsId}`;
  return { id, ...analyticsDataAttributes(analyticsId) };
}
