export const CONSENT_STORAGE_KEY = "prestoliv_consent";

export type ConsentChoice = "accepted" | "rejected";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtagConsent(command: "default" | "update", params: Record<string, string>) {
  window.dataLayer = window.dataLayer ?? [];
  if (typeof window.gtag === "function") {
    window.gtag("consent", command, params);
    return;
  }
  window.dataLayer.push(["consent", command, params] as unknown as Record<string, unknown>);
}

export function grantAllConsent() {
  gtagConsent("update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
}

export function getStoredConsent(): ConsentChoice | null {
  const value = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function saveConsent(choice: ConsentChoice) {
  localStorage.setItem(CONSENT_STORAGE_KEY, choice);
}

export function applyStoredConsentOnLoad() {
  if (getStoredConsent() === "accepted") {
    grantAllConsent();
  }
}
