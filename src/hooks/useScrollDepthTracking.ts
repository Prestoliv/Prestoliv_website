import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalytics, trackScrollDepth } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 100] as const;

/** Fires scroll_depth once per milestone per page view */
export function useScrollDepthTracking() {
  const { pathname } = useLocation();
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current = new Set();
    if (!hasAnalytics) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const percent = Math.min(100, Math.round((scrollTop / maxScroll) * 100));

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
}
