import {
  Calculator,
  Hammer,
  Layers,
  LayoutGrid,
  Package,
  type LucideIcon,
} from "lucide-react";
import { createElement, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export type Unit = "sqft" | "sqm";

export type CalculatorSettings = {
  enabled: boolean;
  default_area: number;
  default_unit: Unit;
  low_variance_pct: number;
  high_variance_pct: number;
  sqm_to_sqft_factor: number;
};

export type MaterialConfig = {
  id: string;
  label: string;
  icon: ReactNode;
  factor: number;
  unit: string;
  defaultRate: number;
  rateLabel: string;
  color: string;
};

const CALCULATOR_SETTINGS_KEY = "calculator_settings";

export const DEFAULT_CALCULATOR_SETTINGS: CalculatorSettings = {
  enabled: true,
  default_area: 1000,
  default_unit: "sqft",
  low_variance_pct: 0.1,
  high_variance_pct: 0.1,
  sqm_to_sqft_factor: 10.764,
};

const ICON_MAP: Record<string, LucideIcon> = {
  "layout-grid": LayoutGrid,
  layers: Layers,
  package: Package,
  hammer: Hammer,
  calculator: Calculator,
};

function materialIcon(iconKey: string) {
  const Icon = ICON_MAP[iconKey] ?? Package;
  return createElement(Icon, { className: "h-4 w-4" });
}

function num(v: unknown, fallback: number): number {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

function parseSettings(value: unknown): CalculatorSettings {
  const o =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const unit = o.default_unit === "sqm" ? "sqm" : "sqft";
  return {
    enabled: o.enabled !== false,
    default_area: num(o.default_area, DEFAULT_CALCULATOR_SETTINGS.default_area),
    default_unit: unit as Unit,
    low_variance_pct: num(
      o.low_variance_pct,
      DEFAULT_CALCULATOR_SETTINGS.low_variance_pct
    ),
    high_variance_pct: num(
      o.high_variance_pct,
      DEFAULT_CALCULATOR_SETTINGS.high_variance_pct
    ),
    sqm_to_sqft_factor: num(
      o.sqm_to_sqft_factor,
      DEFAULT_CALCULATOR_SETTINGS.sqm_to_sqft_factor
    ),
  };
}

export const FALLBACK_MATERIALS: MaterialConfig[] = [
  {
    id: "bricks",
    label: "Bricks",
    icon: materialIcon("layout-grid"),
    factor: 300,
    unit: "nos",
    defaultRate: 8,
    rateLabel: "per brick",
    color: "bg-orange-400",
  },
  {
    id: "iron",
    label: "Iron (Sariya)",
    icon: materialIcon("layers"),
    factor: 0.03,
    unit: "tonnes",
    defaultRate: 65000,
    rateLabel: "per tonne",
    color: "bg-slate-400",
  },
  {
    id: "sand",
    label: "Sand",
    icon: materialIcon("package"),
    factor: 0.16,
    unit: "cu.m",
    defaultRate: 1800,
    rateLabel: "per cu.m",
    color: "bg-yellow-400",
  },
  {
    id: "concrete",
    label: "Concrete",
    icon: materialIcon("layers"),
    factor: 0.3,
    unit: "quintal",
    defaultRate: 400,
    rateLabel: "per quintal",
    color: "bg-stone-400",
  },
  {
    id: "cement",
    label: "Cement Bags",
    icon: materialIcon("package"),
    factor: 20,
    unit: "bags",
    defaultRate: 400,
    rateLabel: "per bag",
    color: "bg-brand",
  },
];

export type CalculatorConfig = {
  materials: MaterialConfig[];
  settings: CalculatorSettings;
  fromRemote: boolean;
};

export async function fetchCalculatorConfig(): Promise<CalculatorConfig> {
  const [materialsRes, settingsRes] = await Promise.all([
    supabase
      .from("calculator_materials")
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

  if (materialsRes.error || !materialsRes.data?.length) {
    const settings = settingsRes.error
      ? DEFAULT_CALCULATOR_SETTINGS
      : parseSettings(settingsRes.data?.value);
    return {
      materials: FALLBACK_MATERIALS,
      settings,
      fromRemote: false,
    };
  }

  const materials: MaterialConfig[] = materialsRes.data.map((row) => ({
    id: String(row.id),
    label: String(row.label),
    icon: materialIcon(String(row.icon_key ?? "package")),
    factor: num(row.factor, 0),
    unit: String(row.unit),
    defaultRate: num(row.default_rate, 0),
    rateLabel: String(row.rate_label),
    color: String(row.color ?? "bg-brand"),
  }));

  const settings = settingsRes.error
    ? DEFAULT_CALCULATOR_SETTINGS
    : parseSettings(settingsRes.data?.value);

  return {
    materials,
    settings,
    fromRemote: true,
  };
}
