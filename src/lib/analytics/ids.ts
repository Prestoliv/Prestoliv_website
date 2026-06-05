import type { ConsultationSource } from "./events";

/** "Get started" → "get-started" */
export function slugifyButtonLabel(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

/** "Home Construction & Design" → "home_construction_design" */
export function slugifyServiceInterest(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 80);
}

/** HTML id from visible button/link text: "Get started" → id="btn-get-started" */
export function buttonIdFromLabel(label: string) {
  const slug = slugifyButtonLabel(label);
  return slug ? `btn-${slug}` : "btn-unknown";
}

/** @deprecated Use buttonIdFromLabel(label) with the button's visible text */
export function ctaTriggerId(label: string) {
  return buttonIdFromLabel(label);
}

export function consultationTriggerId(_source: ConsultationSource, buttonLabel: string) {
  return buttonIdFromLabel(buttonLabel);
}

export function consultationSubmitId(buttonLabel: string) {
  return buttonIdFromLabel(`submit ${buttonLabel}`);
}

export function navLinkId(_navLocation: string, linkText: string) {
  return buttonIdFromLabel(linkText);
}

export function inputAnalyticsId(label: string) {
  return `input-${slugifyButtonLabel(label)}`;
}

export const analyticsDataAttributes = (buttonId: string) => ({
  "data-analytics-id": buttonId,
  "data-button-id": buttonId,
});

export function analyticsProps(
  label: string,
  options?: { elementPrefix?: "btn" | "nav" | "input" | "toggle" },
) {
  const slug = slugifyButtonLabel(label);
  const prefix = options?.elementPrefix ?? "btn";
  const id = prefix === "btn" ? buttonIdFromLabel(label) : `${prefix}-${slug}`;
  return { id, ...analyticsDataAttributes(slug) };
}
