import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  Hammer,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import {
  fetchCalculatorConfig,
  type CalculatorConfig,
  type CalculatorSettings,
  type MaterialConfig,
  type Unit,
} from "@/lib/calculatorConfig";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const toSqft = (val: number, unit: Unit, factor: number) =>
  unit === "sqft" ? val : val * factor;

const formatQty = (n: number) => {
  if (n >= 100000) return (n / 100000).toFixed(2) + " L";
  if (n >= 1000) return Math.round(n).toLocaleString("en-IN");
  if (n < 1) return n.toFixed(3);
  return n.toFixed(1);
};

const formatINR = (n: number) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

const defaultRates = (materials: MaterialConfig[]) =>
  Object.fromEntries(materials.map((m) => [m.id, m.defaultRate]));

// ─── Sub-components ───────────────────────────────────────────────────────────

const UnitToggle = ({
  unit,
  onChange,
}: {
  unit: Unit;
  onChange: (u: Unit) => void;
}) => (
  <div className="flex rounded-xl border border-border bg-surface p-1">
    {(["sqft", "sqm"] as Unit[]).map((u) => (
      <button
        key={u}
        onClick={() => onChange(u)}
        className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
          unit === u
            ? "bg-brand text-brand-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {u === "sqft" ? "sq ft" : "sq m"}
      </button>
    ))}
  </div>
);

const MaterialRow = ({
  material,
  qty,
  rate,
  onRateChange,
  index,
}: {
  material: MaterialConfig;
  qty: number;
  rate: number;
  onRateChange: (id: string, val: number) => void;
  index: number;
}) => {
  const total = qty * rate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-soft"
    >
      <div className="flex items-center gap-3">
        <div className={`h-2 w-2 rounded-full ${material.color}`} />
        <span className="font-medium">{material.label}</span>
      </div>

      <div className="text-right">
        <p className="text-xs text-muted-foreground">{material.unit}</p>
        <p className="font-semibold tabular-nums">{formatQty(qty)}</p>
      </div>

      <div className="text-right">
        <p className="text-xs text-muted-foreground">{material.rateLabel}</p>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">₹</span>
          <input
            type="number"
            value={rate}
            min={0}
            onChange={(e) => onRateChange(material.id, parseFloat(e.target.value) || 0)}
            className="w-24 rounded-lg border border-border bg-surface px-2 py-1 text-right text-sm font-medium focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30"
          />
        </div>
      </div>

      <div className="min-w-[90px] text-right">
        <p className="text-xs text-muted-foreground">total</p>
        <p className="font-semibold text-brand tabular-nums">{formatINR(total)}</p>
      </div>
    </motion.div>
  );
};

const SummaryCard = ({
  label,
  value,
  sub,
  delay,
}: {
  label: string;
  value: string;
  sub?: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.45 }}
    className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft"
  >
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {label}
    </p>
    <p className="mt-2 font-display text-3xl font-bold tracking-tight">{value}</p>
    {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
  </motion.div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const ConstructionCalculatorPage = () => {
  const [config, setConfig] = useState<CalculatorConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<Unit>("sqft");
  const [area, setArea] = useState<number>(1000);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [showBreakdown, setShowBreakdown] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const cfg = await fetchCalculatorConfig();
      if (cancelled) return;
      setConfig(cfg);
      setUnit(cfg.settings.default_unit);
      setArea(cfg.settings.default_area);
      setRates(defaultRates(cfg.materials));
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const materials = config?.materials ?? [];
  const settings: CalculatorSettings | undefined = config?.settings;

  const sqft = settings
    ? toSqft(area, unit, settings.sqm_to_sqft_factor)
    : area;

  const rows = materials.map((m) => ({
    material: m,
    qty: sqft * m.factor,
    rate: rates[m.id] ?? m.defaultRate,
    total: sqft * m.factor * (rates[m.id] ?? m.defaultRate),
  }));

  const grandTotal = rows.reduce((s, r) => s + r.total, 0);
  const lowPct = settings?.low_variance_pct ?? 0.1;
  const highPct = settings?.high_variance_pct ?? 0.1;

  const handleRateChange = (id: string, val: number) =>
    setRates((prev) => ({ ...prev, [id]: val }));

  const handleReset = () => {
    if (!config) return;
    setArea(config.settings.default_area);
    setUnit(config.settings.default_unit);
    setRates(defaultRates(config.materials));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <p className="text-sm">Loading calculator…</p>
        </div>
        <CtaFooter />
      </main>
    );
  }

  if (settings && !settings.enabled) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <PageHero
          eyebrow="Construction Cost Calculator"
          title="Calculator temporarily unavailable"
          subtitle="Please check back soon or book a consultation for a personalized estimate."
        />
        <section className="py-16 px-6 text-center">
          <ConsultationDialog>
            <Button size="lg" className="rounded-xl bg-brand text-brand-foreground">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </ConsultationDialog>
        </section>
        <CtaFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />

      <PageHero
        eyebrow="Construction Cost Calculator"
        title="Know your build cost before you break ground."
        subtitle="Enter your area and get an instant material estimate — bricks, iron, sand, concrete, and cement. Adjust rates to match your local market."
      />

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 rounded-3xl border border-border/60 bg-card p-8 shadow-soft"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <Calculator className="h-7 w-7" />
            </div>

            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight">
              Total built-up area
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the total area you plan to construct. All material quantities and
              cost estimates will update instantly.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <UnitToggle unit={unit} onChange={setUnit} />

              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3">
                <input
                  type="number"
                  value={area}
                  min={0}
                  onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent text-2xl font-bold tracking-tight focus:outline-none"
                />
                <span className="shrink-0 text-sm text-muted-foreground">
                  {unit === "sqft" ? "sq ft" : "sq m"}
                </span>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground transition hover:border-brand hover:text-brand"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            {unit === "sqm" && area > 0 && settings && (
              <p className="mt-3 text-xs text-muted-foreground">
                ≈ {Math.round(sqft).toLocaleString("en-IN")} sq ft
              </p>
            )}
          </motion.div>

          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Estimated Total"
              value={formatINR(grandTotal)}
              sub="material cost only"
              delay={0.1}
            />
            <SummaryCard
              label="Low Estimate"
              value={formatINR(grandTotal * (1 - lowPct))}
              sub={`−${Math.round(lowPct * 100)}% variance`}
              delay={0.18}
            />
            <SummaryCard
              label="High Estimate"
              value={formatINR(grandTotal * (1 + highPct))}
              sub={`+${Math.round(highPct * 100)}% variance`}
              delay={0.26}
            />
          </div>

          <div className="rounded-3xl border border-border/60 bg-card shadow-soft overflow-hidden">
            <button
              onClick={() => setShowBreakdown((v) => !v)}
              className="flex w-full items-center justify-between px-8 py-5"
            >
              <div className="flex items-center gap-3">
                <Hammer className="h-5 w-5 text-brand" />
                <span className="font-semibold">Material breakdown</span>
                <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                  {materials.length} items
                </span>
              </div>
              {showBreakdown ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {showBreakdown && (
                <motion.div
                  key="breakdown"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 border-t border-border px-6 pb-6 pt-4">
                    <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 pb-1">
                      {["Material", "Quantity", "Rate (editable)", "Total"].map(
                        (h) => (
                          <p
                            key={h}
                            className="text-right text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground first:text-left"
                          >
                            {h}
                          </p>
                        )
                      )}
                    </div>

                    {rows.map((r, i) => (
                      <MaterialRow
                        key={r.material.id}
                        material={r.material}
                        qty={r.qty}
                        rate={r.rate}
                        onRateChange={handleRateChange}
                        index={i}
                      />
                    ))}
                  </div>

                  <div className="border-t border-border bg-surface px-8 py-4">
                    <p className="text-xs text-muted-foreground">
                      Rates are editable — update them to match your local market
                      prices. Difference could be ±5–10%.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-border/60 bg-card p-10 text-center shadow-soft"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Ready to build?
            </p>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Get a fixed-price quote for your home
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Our team will do a detailed site assessment and give you a transparent,
              no-surprise construction estimate.
            </p>
            <ConsultationDialog>
              <Button
                size="lg"
                className="mt-2 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 group"
              >
                Book a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </ConsultationDialog>
          </motion.div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
};

export default ConstructionCalculatorPage;
