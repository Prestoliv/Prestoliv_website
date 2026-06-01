import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import {
  CostCalculatorUnavailable,
  CostCalculatorWidget,
} from "@/components/calculator/CostCalculatorWidget";
import {
  DEFAULT_CALCULATOR_SETTINGS,
  fetchCalculatorConfig,
  type CalculatorSettings,
} from "@/lib/calculatorConfig";

const ConstructionCalculatorPage = () => {
  const [settings, setSettings] = useState<CalculatorSettings | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cfg = await fetchCalculatorConfig();
      if (cancelled) return;
      setSettings(cfg.settings);
      setEnabled(cfg.settings.enabled);
      setBootLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const hero = settings ?? DEFAULT_CALCULATOR_SETTINGS;

  if (bootLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <p className="text-sm">Loading calculator…</p>
        </div>
        <CtaFooter />
      </main>
    );
  }

  if (!enabled && settings) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <PageHero
          eyebrow={hero.hero_eyebrow}
          title="Calculator temporarily unavailable"
          subtitle="Please check back soon or book a consultation for a personalized estimate."
        />
        <section className="px-6 pb-24 -mt-4">
          <CostCalculatorUnavailable settings={settings} />
        </section>
        <CtaFooter />
      </main>
    );
  }

  return (
    <main id="page-calculator" className="min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />

      <PageHero
        eyebrow={hero.hero_eyebrow}
        title={hero.hero_title}
        subtitle={hero.hero_subtitle}
      />

      <div className="mx-auto max-w-6xl px-6 -mt-4 flex justify-center">
        <ConsultationDialog source="calculator_page_hero">
          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl border-brand/30 text-brand hover:bg-brand/5"
          >
            {hero.cta_button}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </ConsultationDialog>
      </div>

      {/* Calculator  overlaps hero slightly */}
      <section id="calculator-widget-section" className="relative z-10 -mt-6 pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-[2rem] border border-border/50 bg-background/95 p-6 shadow-card backdrop-blur-sm sm:p-8 md:p-10">
            <CostCalculatorWidget />
          </div>
        </div>
      </section>

      {/* Bottom CTA band */}
      <section id="calculator-bottom-cta" className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {hero.cta_eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {hero.cta_title}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {hero.cta_subtitle}
            </p>
            <ConsultationDialog source="calculator_bottom">
              <Button
                size="lg"
                className="mt-8 rounded-2xl bg-brand px-8 text-brand-foreground hover:bg-brand/90 group"
              >
                {hero.cta_button}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </ConsultationDialog>
          </motion.div>

          <p className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Indicative estimate only. Final cost depends on design complexity, site
            conditions, approvals, and finish specifications. Rates are managed by Prestoliv
            and updated from the admin dashboard.
          </p>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
};

export default ConstructionCalculatorPage;
