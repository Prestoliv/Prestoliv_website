import { Link, type LinkProps } from "react-router-dom";
import { trackNavigationClick } from "@/lib/analytics";

type TrackableLinkProps = LinkProps & {
  linkText: string;
  navLocation: string;
};

/** Internal router link with navigation_click analytics */
export function TrackableLink({ linkText, navLocation, onClick, to, ...props }: TrackableLinkProps) {
  const destination = typeof to === "string" ? to : (to.pathname ?? "");

  return (
    <Link
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
