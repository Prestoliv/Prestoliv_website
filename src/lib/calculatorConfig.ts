import { supabase } from "@/lib/supabase";

export type Unit = "sqft" | "sqm";

export type CalculatorSettings = {
  enabled: boolean;
  default_area: number;
  default_unit: Unit;
  sqm_to_sqft_factor: number;
  show_estimate_range: boolean;
  low_variance_pct: number;
  high_variance_pct: number;
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  area_section_title: string;
  area_section_help: string;
  packages_section_title: string;
  packages_section_subtitle: string;
  per_sqft_label: string;
  estimated_total_label: string;
  cta_eyebrow: string;
  cta_title: string;
  cta_subtitle: string;
  cta_button: string;
};

export type PackageConfig = {
  id: string;
  label: string;
  description: string;
  pricePerSqft: number;
  badge: string | null;
  highlight: boolean;
  color: string;
};

const CALCULATOR_SETTINGS_KEY = "calculator_settings";

export const DEFAULT_CALCULATOR_SETTINGS: CalculatorSettings = {
  enabled: true,
  default_area: 1500,
  default_unit: "sqft",
  sqm_to_sqft_factor: 10.764,
  show_estimate_range: false,
  low_variance_pct: 0.05,
  high_variance_pct: 0.05,
  hero_eyebrow: "Construction Cost Calculator",
  hero_title: "Estimate your home construction cost",
  hero_subtitle:
    "Enter your built-up area and compare package rates — get an instant total with no hidden breakdowns.",
  area_section_title: "Built-up area",
  area_section_help:
    "Super built-up area of your home in square feet or square metres.",
  packages_section_title: "Choose a package",
  packages_section_subtitle:
    "All-inclusive construction rate per square foot. Total updates as you change area.",
  per_sqft_label: "per sq ft",
  estimated_total_label: "Estimated construction cost",
  cta_eyebrow: "Ready to build?",
  cta_title: "Get a fixed-price quote for your home",
  cta_subtitle:
    "Our team will assess your site and share a transparent, detailed proposal.",
  cta_button: "Book a Free Consultation",
};

export const FALLBACK_PACKAGES: PackageConfig[] = [
  {
    id: "basic",
    label: "Basic",
    description: "Budget-friendly construction with standard materials and finishes.",
    pricePerSqft: 1900,
    badge: null,
    highlight: false,
    color: "bg-slate-500",
  },
  {
    id: "classic",
    label: "Classic",
    description: "Balanced quality and value — our most popular choice for homes.",
    pricePerSqft: 2100,
    badge: "Most popular",
    highlight: true,
    color: "bg-brand",
  },
  {
    id: "premium",
    label: "Premium",
    description: "Higher-grade materials and enhanced durability throughout.",
    pricePerSqft: 2350,
    badge: null,
    highlight: false,
    color: "bg-amber-500",
  },
  {
    id: "royal",
    label: "Royal",
    description: "Luxury finishes and premium specifications for a superior home.",
    pricePerSqft: 2585,
    badge: null,
    highlight: false,
    color: "bg-violet-500",
  },
];

function num(v: unknown, fallback: number): number {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

function str(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() ? v : fallback;
}

function parseSettings(value: unknown): CalculatorSettings {
  const o =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const unit = o.default_unit === "sqm" ? "sqm" : "sqft";
  const d = DEFAULT_CALCULATOR_SETTINGS;

  return {
    enabled: o.enabled !== false,
    default_area: num(o.default_area, d.default_area),
    default_unit: unit as Unit,
    sqm_to_sqft_factor: num(o.sqm_to_sqft_factor, d.sqm_to_sqft_factor),
    show_estimate_range: o.show_estimate_range === true,
    low_variance_pct: num(o.low_variance_pct, d.low_variance_pct),
    high_variance_pct: num(o.high_variance_pct, d.high_variance_pct),
    hero_eyebrow: str(o.hero_eyebrow, d.hero_eyebrow),
    hero_title: str(o.hero_title, d.hero_title),
    hero_subtitle: str(o.hero_subtitle, d.hero_subtitle),
    area_section_title: str(o.area_section_title, d.area_section_title),
    area_section_help: str(o.area_section_help, d.area_section_help),
    packages_section_title: str(o.packages_section_title, d.packages_section_title),
    packages_section_subtitle: str(o.packages_section_subtitle, d.packages_section_subtitle),
    per_sqft_label: str(o.per_sqft_label, d.per_sqft_label),
    estimated_total_label: str(o.estimated_total_label, d.estimated_total_label),
    cta_eyebrow: str(o.cta_eyebrow, d.cta_eyebrow),
    cta_title: str(o.cta_title, d.cta_title),
    cta_subtitle: str(o.cta_subtitle, d.cta_subtitle),
    cta_button: str(o.cta_button, d.cta_button),
  };
}

export function toSqft(area: number, unit: Unit, factor: number): number {
  return unit === "sqft" ? area : area * factor;
}

export function computePackageTotal(sqft: number, pricePerSqft: number): number {
  return Math.round(sqft * pricePerSqft);
}

export type CalculatorConfig = {
  packages: PackageConfig[];
  settings: CalculatorSettings;
  fromRemote: boolean;
};

export async function fetchCalculatorConfig(): Promise<CalculatorConfig> {
  const [packagesRes, settingsRes] = await Promise.all([
    supabase
      .from("calculator_packages")
      .select("*")
      .eq("enabled", true)
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true }),
    supabase
      .from("app_settings")
      .select("value")
      .eq("key", CALCULATOR_SETTINGS_KEY)
      .maybeSingle(),
  ]);

  const settings = settingsRes.error
    ? DEFAULT_CALCULATOR_SETTINGS
    : parseSettings(settingsRes.data?.value);

  if (packagesRes.error || !packagesRes.data?.length) {
    return {
      packages: FALLBACK_PACKAGES,
      settings,
      fromRemote: false,
    };
  }

  const packages: PackageConfig[] = packagesRes.data.map((row) => ({
    id: String(row.id),
    label: String(row.label),
    description: String(row.description ?? ""),
    pricePerSqft: num(row.price_per_sqft, 0),
    badge:
      row.badge != null && String(row.badge).trim() ? String(row.badge) : null,
    highlight: row.highlight === true,
    color: String(row.color ?? "bg-brand"),
  }));

  return {
    packages,
    settings,
    fromRemote: true,
  };
}
