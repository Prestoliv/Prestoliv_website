import { Helmet } from "react-helmet-async";

export const OG_IMAGE_URL = "https://www.prestoliv.com/og-image.png";

type PageMetaProps = {
  title: string;
  description: string;
};

export const PageMeta = ({ title, description }: PageMetaProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={OG_IMAGE_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Prestoliv" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={OG_IMAGE_URL} />
  </Helmet>
);
