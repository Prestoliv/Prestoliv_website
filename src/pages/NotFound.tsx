import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { analyticsProps } from "@/lib/analytics";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main id="page-not-found" className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link
          to="/"
          {...analyticsProps("not-found-home")}
          className="text-primary underline hover:text-primary/90"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
