import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calculator,
  IndianRupee,
  RefreshCw,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import { PackageTierCard } from "@/components/calculator/PackageTierCard";
import { formatINR, formatRate } from "@/components/calculator/format";
import {
  computePackageTotal,
  fetchCalculatorConfig,
  toSqft,
  type CalculatorConfig,
  type CalculatorSettings,
  type Unit,
} from "@/lib/calculatorConfig";

const AREA_MIN = 300;
const AREA_MAX = 15000;
const AREA_STEP = 50;

const STEPS = [
  { n: 1, label: "Enter area" },
  { n: 2, label: "Pick a package" },
  { n: 3, label: "View estimate" },
];

function UnitToggle({
  unit,
  onChange,
}: {
  unit: Unit;
  onChange: (u: Unit) => void;
}) {
  return (
    <div className="flex rounded-2xl border border-border bg-background p-1">
      {(["sqft", "sqm"] as Unit[]).map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => onChange(u)}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
            unit === u
              ? "bg-brand text-brand-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {u === "sqft" ? "Sq ft" : "Sq m"}
        </button>
      ))}
    </div>
  );
}

export function CostCalculatorWidget() {
  const [config, setConfig] = useState<CalculatorConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<Unit>("sqft");
  const [area, setArea] = useState(1500);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const cfg = await fetchCalculatorConfig();
      if (cancelled) return;
      setConfig(cfg);
      setUnit(cfg.settings.default_unit);
      setArea(cfg.settings.default_area);
      const defaultPkg =
        cfg.packages.find((p) => p.highlight) ?? cfg.packages[0] ?? null;
      setSelectedId(defaultPkg?.id ?? null);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const packages = config?.packages ?? [];
  const settings = config?.settings;

  const sqft = settings ? toSqft(area, unit, settings.sqm_to_sqft_factor) : area;

  const selectedPackage = useMemo(
    () => packages.find((p) => p.id === selectedId) ?? packages[0],
    [packages, selectedId]
  );

  const selectedTotal = selectedPackage
    ? computePackageTotal(sqft, selectedPackage.pricePerSqft)
    : 0;

  const lowPct = settings?.low_variance_pct ?? 0.05;
  const highPct = settings?.high_variance_pct ?? 0.05;

  const clampArea = (v: number) =>
    Math.min(AREA_MAX, Math.max(AREA_MIN, v || AREA_MIN));

  const handleAreaChange = (v: number) => setArea(clampArea(v));

  const handleReset = () => {
    if (!config) return;
    setArea(config.settings.default_area);
    setUnit(config.settings.default_unit);
    const defaultPkg =
      config.packages.find((p) => p.highlight) ?? config.packages[0] ?? null;
    setSelectedId(defaultPkg?.id ?? null);
  };

  if (loading || !settings) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 text-muted-foreground">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        <p className="text-sm">Preparing your estimate…</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Steps */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {STEPS.map((step, i) => (
          <div key={step.n} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                {step.n}
              </span>
              <span className="text-sm font-medium text-foreground">{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <span className="hidden h-px w-8 bg-border sm:block" aria-hidden />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left — inputs & live total */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card"
            >
              <div className="border-b border-border/60 bg-surface px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Ruler className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold tracking-tight">
                      {settings.area_section_title}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {settings.area_section_help}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6">
                <UnitToggle unit={unit} onChange={setUnit} />

                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <input
                      type="number"
                      min={AREA_MIN}
                      max={AREA_MAX}
                      value={area}
                      onChange={(e) => handleAreaChange(parseFloat(e.target.value))}
                      className="w-full bg-transparent font-display text-4xl font-bold tracking-tight text-foreground focus:outline-none"
                    />
                    <span className="shrink-0 text-sm font-medium text-muted-foreground">
                      {unit === "sqft" ? "sq ft" : "sq m"}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={AREA_MIN}
                    max={AREA_MAX}
                    step={AREA_STEP}
                    value={clampArea(area)}
                    onChange={(e) => handleAreaChange(parseInt(e.target.value, 10))}
                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-surface accent-brand"
                    aria-label="Built-up area"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>{AREA_MIN.toLocaleString("en-IN")}</span>
                    <span>{AREA_MAX.toLocaleString("en-IN")}+</span>
                  </div>
                </div>

                {unit === "sqm" && area > 0 && (
                  <p className="rounded-xl bg-surface px-3 py-2 text-xs text-muted-foreground">
                    ≈{" "}
                    <strong className="text-foreground">
                      {Math.round(sqft).toLocaleString("en-IN")} sq ft
                    </strong>{" "}
                    used for package pricing
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition hover:border-brand/30 hover:text-brand"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reset to defaults
                </button>
              </div>
            </motion.div>

            {/* Live estimate card */}
            {selectedPackage && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-br from-brand/[0.08] via-card to-card p-6 shadow-glow"
              >
                <div className="flex items-center gap-2 text-brand">
                  <IndianRupee className="h-4 w-4" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                    {settings.estimated_total_label}
                  </p>
                </div>
                <p className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground">
                  {formatINR(selectedTotal)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{selectedPackage.label}</span>
                  {" · "}
                  {formatRate(selectedPackage.pricePerSqft)} {settings.per_sqft_label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Based on {Math.round(sqft).toLocaleString("en-IN")} sq ft built-up area
                </p>

                {settings.show_estimate_range && (
                  <p className="mt-3 rounded-xl bg-background/60 px-3 py-2 text-xs text-muted-foreground">
                    Indicative range: {formatINR(selectedTotal * (1 - lowPct))} –{" "}
                    {formatINR(selectedTotal * (1 + highPct))}
                  </p>
                )}

                <ConsultationDialog>
                  <Button className="mt-5 w-full rounded-2xl bg-brand text-brand-foreground hover:bg-brand/90 group">
                    {settings.cta_button}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </ConsultationDialog>
              </motion.div>
            )}

            <div className="hidden space-y-3 lg:block">
              <TrustPill icon={ShieldCheck} text="All-inclusive package rates" />
              <TrustPill icon={Sparkles} text="Instant estimate — no material breakdown" />
              <TrustPill icon={Building2} text="Transparent ₹/sq ft pricing" />
            </div>
          </div>
        </aside>

        {/* Right — packages */}
        <div className="lg:col-span-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Construction packages
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {settings.packages_section_title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {settings.packages_section_subtitle}
            </p>
          </div>

          {packages.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No packages are available right now. Please contact us for a custom quote.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {packages.map((pkg, i) => (
                <PackageTierCard
                  key={pkg.id}
                  pkg={pkg}
                  total={computePackageTotal(sqft, pkg.pricePerSqft)}
                  perSqftLabel={settings.per_sqft_label}
                  selected={selectedPackage?.id === pkg.id}
                  onSelect={() => setSelectedId(pkg.id)}
                  index={i}
                />
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3 lg:hidden">
            <TrustPill icon={ShieldCheck} text="All-inclusive rates" />
            <TrustPill icon={Sparkles} text="No hidden breakdown" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustPill({
  icon: Icon,
  text,
}: {
  icon: typeof ShieldCheck;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3 py-2 text-xs text-muted-foreground shadow-soft">
      <Icon className="h-3.5 w-3.5 shrink-0 text-brand" />
      <span>{text}</span>
    </div>
  );
}

export function CostCalculatorUnavailable({
  settings,
}: {
  settings: CalculatorSettings;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-border/60 bg-card p-10 text-center shadow-soft">
      <Calculator className="mx-auto h-10 w-10 text-brand" />
      <h2 className="mt-4 font-display text-xl font-bold">Calculator unavailable</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Please check back soon or book a consultation for a personalized estimate.
      </p>
      <ConsultationDialog>
        <Button className="mt-6 rounded-xl bg-brand text-brand-foreground">
          {settings.cta_button}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </ConsultationDialog>
    </div>
  );
}
