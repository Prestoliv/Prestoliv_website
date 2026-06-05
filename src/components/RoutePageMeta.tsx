import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { getPageSeo } from "@/lib/seo/pageTitles";

/** Updates document title and meta tags on every SPA route change */
export function RoutePageMeta() {
  const { pathname } = useLocation();
  const { title, description } = getPageSeo(pathname);

  useEffect(() => {
    document.title = title;
  }, [pathname, title]);

  return <PageMeta title={title} description={description} />;
}
