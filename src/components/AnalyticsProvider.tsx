import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalytics, initAnalyticsScripts, trackPageView } from "@/lib/analytics";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { RoutePageMeta } from "@/components/RoutePageMeta";
import { getPageSeo } from "@/lib/seo/pageTitles";

/**
 * Loads third-party tags, SPA page views, scroll-depth milestones, and per-route SEO.
 * IDs: VITE_GTM_ID, VITE_GA_MEASUREMENT_ID, VITE_META_PIXEL_ID, VITE_CLARITY_PROJECT_ID
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { pathname, search } = useLocation();
  const path = `${pathname}${search}`;
  const { title } = getPageSeo(pathname);

  useScrollDepthTracking();

  useEffect(() => {
    if (!hasAnalytics) return;
    initAnalyticsScripts();
    trackPageView(path, title);
  }, [path, title]);

  return (
    <>
      <RoutePageMeta />
      {children}
    </>
  );
}
