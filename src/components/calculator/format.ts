export function formatINR(n: number): string {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function formatRate(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
