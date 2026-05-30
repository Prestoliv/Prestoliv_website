import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  cleanAuthFromUrl,
  completeOAuthCallback,
  shouldHandleAuthHash,
} from "@/lib/auth";

/**
 * When Supabase redirects to /#access_token=... (Site URL root), finish login here.
 */
export function AuthHashHandler() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!shouldHandleAuthHash()) return;
    if (pathname === "/auth/callback") return;

    (async () => {
      const ok = await completeOAuthCallback();
      cleanAuthFromUrl(ok ? "/" : pathname);
      if (!ok) navigate("/", { replace: true });
    })();
  }, [pathname, navigate]);

  return null;
}
