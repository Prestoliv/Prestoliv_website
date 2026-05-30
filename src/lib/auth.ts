import { supabase } from "@/lib/supabase";
import { dashboardProfileUrl } from "@/lib/dashboard";
import { trackSignInComplete } from "@/lib/analytics";

function hashHasAuthTokens(hash: string): boolean {
  return hash.includes("access_token") || hash.includes("error=");
}

/**
 * Completes Supabase OAuth (hash or PKCE code), opens dashboard, cleans URL.
 * Returns true if a session was established.
 */
export async function completeOAuthCallback(): Promise<boolean> {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("OAuth code exchange failed:", error.message);
      return false;
    }
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Session read failed:", sessionError.message);
    return false;
  }

  if (!session?.user) return false;

  trackSignInComplete();
  window.open(dashboardProfileUrl(session.user.id), "_blank");
  return true;
}

export function cleanAuthFromUrl(pathname = "/"): void {
  window.history.replaceState({}, document.title, pathname);
}

/** Supabase sometimes redirects to Site URL root with #access_token instead of /auth/callback */
export function shouldHandleAuthHash(): boolean {
  return hashHasAuthTokens(window.location.hash);
}
