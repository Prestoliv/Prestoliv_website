import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalytics, initAnalyticsScripts, trackPageView } from "@/lib/analytics";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { applyStoredConsentOnLoad } from "@/lib/consent";
import { getPageSeo } from "@/lib/seo/pageTitles";

/**
 * Loads third-party tags, SPA page views, scroll-depth milestones.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { pathname, search } = useLocation();
  const path = `${pathname}${search}`;
  const { title } = getPageSeo(pathname);

  useScrollDepthTracking();

  useEffect(() => {
    applyStoredConsentOnLoad();
  }, []);

  useEffect(() => {
    if (!hasAnalytics) return;
    initAnalyticsScripts();
    trackPageView(path, title);
  }, [path, title]);

  return <>{children}</>;
}
