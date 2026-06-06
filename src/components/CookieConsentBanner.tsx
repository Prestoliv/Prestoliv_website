import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  applyStoredConsentOnLoad,
  CONSENT_STORAGE_KEY,
  getStoredConsent,
  grantAllConsent,
  saveConsent,
} from "@/lib/consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    applyStoredConsentOnLoad();
    if (!getStoredConsent()) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    grantAllConsent();
    saveConsent("accepted");
    setVisible(false);
  };

  const rejectAll = () => {
    saveConsent("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-foreground px-4 py-4 text-background shadow-[0_-8px_40px_rgba(0,0,0,0.25)] sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-background/80 sm:max-w-2xl">
          We use cookies to improve your experience and measure site performance.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={rejectAll}
            className="rounded-[10px] border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background"
          >
            Reject All
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={acceptAll}
            className="rounded-[10px] bg-brand text-brand-foreground hover:bg-brand/90"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
