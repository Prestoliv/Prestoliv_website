const DEFAULT_DASHBOARD_ORIGIN = "https://dashboard.prestoliv.com";

export const dashboardOrigin =
  import.meta.env.VITE_DASHBOARD_URL?.replace(/\/$/, "") || DEFAULT_DASHBOARD_ORIGIN;

export function dashboardProfileUrl(userId: string): string {
  return `${dashboardOrigin}/at/profile?uid=${encodeURIComponent(userId)}`;
}
