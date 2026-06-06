import { PageMeta } from "@/components/PageMeta";
import { getPageSeo } from "@/lib/seo/pageTitles";

/** Renders Helmet meta for a static route path (service pages, calculator, etc.) */
export function PageSeoFromPath({ path }: { path: string }) {
  const seo = getPageSeo(path);
  return <PageMeta title={seo.title} description={seo.description} ogUrl={seo.ogUrl} />;
}
