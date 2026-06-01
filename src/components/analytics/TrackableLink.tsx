import { Link, type LinkProps } from "react-router-dom";
import { buttonIdFromLabel, slugifyButtonLabel, trackNavigationClick } from "@/lib/analytics";

type TrackableLinkProps = LinkProps & {
  linkText: string;
  navLocation: string;
};

/** Internal router link with navigation_click analytics */
export function TrackableLink({ linkText, navLocation, onClick, to, ...props }: TrackableLinkProps) {
  const destination = typeof to === "string" ? to : (to.pathname ?? "");
  const elementId = buttonIdFromLabel(linkText);
  const slug = slugifyButtonLabel(linkText);

  return (
    <Link
      id={elementId}
      data-analytics-id={slug}
      data-button-id={slug}
      to={to}
      onClick={(e) => {
        trackNavigationClick({
          linkText,
          destination,
          location: navLocation,
        });
        onClick?.(e);
      }}
      {...props}
    />
  );
}
