import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalytics, initAnalyticsScripts, trackPageView } from "@/lib/analytics";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";

/**
 * Loads third-party tags, SPA page views, and scroll-depth milestones.
 * IDs: VITE_GTM_ID, VITE_GA_MEASUREMENT_ID, VITE_META_PIXEL_ID, VITE_CLARITY_PROJECT_ID
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { pathname, search } = useLocation();
  const path = `${pathname}${search}`;

  useScrollDepthTracking();

  useEffect(() => {
    if (!hasAnalytics) return;
    initAnalyticsScripts();
    trackPageView(path);
  }, [path]);

  return <>{children}</>;
}
