import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { ConsultationDialog } from "@/components/ConsultationDialog";

import { motion } from "framer-motion";

import {
  MessageSquare,
  PencilRuler,
  Box,
  Sun,
  Layers,
  FileCheck,
  Map,
  Hammer,
  Wrench,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// Replace with your actual images
import processHero from "@/assets/1p.png";
import process2 from "@/assets/2p.jpg";
import process3 from "@/assets/3p.png";

const phases = [
  {
    title: "Phase 1 — Design It Right",
    image: processHero,
    headline: "Design Everything Before You Build Anything.",
    progress: "32%",
    steps: [
      {
        n: "01",
        icon: MessageSquare,
        title: "Initial Consultation",
        desc: "One honest conversation. Your vision, your land, your budget. We tell you what's possible — and what isn't worth attempting.",
      },
      {
        n: "02",
        icon: PencilRuler,
        title: "Architectural Planning",
        desc: "2D layouts and 3D elevations drawn around how you actually live. Vastu in. Light in. Compromise out.",
      },
      {
        n: "03",
        icon: Box,
        title: "The 3D Experience",
        desc: "Step inside your home in VR before it exists. Move a wall. Swap a finish. Catch what paper can't show.",
      },
    ],
  },
  {
    title: "Phase 2 — Lock It Down",
    image: process2,
    headline: "Every Detail Finalized Before Execution Begins.",
    progress: "64%",
    steps: [
      {
        n: "",
        icon: Sun,
        title: "Lighting Analysis",
        desc: "Real solar data, not guesswork. We orient every window for the sunlight you'll actually live with.",
        isSubCard: true,
      },
      {
        n: "",
        icon: Layers,
        title: "Material Testing",
        desc: "Tile, paint, laminate, cabinetry — tested in your 3D model before a single rupee leaves your account.",
        isSubCard: true,
      },
      {
        n: "04",
        icon: FileCheck,
        title: "Budgeting & Contracts",
        desc: "Every line item priced. Every price locked. Commodity volatility is on us.",
      },
      {
        n: "05",
        icon: Map,
        title: "Govt. Permissions",
        desc: "Sanctions, NOCs, clearances. We file. We follow up. You won't visit a single government office.",
      },
      {
        n: "06",
        icon: Hammer,
        title: "Site Preparation",
        desc: "Soil tested. Utilities staged. Boundaries marked. By groundbreaking, nothing is still a question.",
      },
    ],
  },
  {
    title: "Phase 3 — Build It True",
    image: process3,
    headline: "Execution With Real Accountability.",
    progress: "92%",
    steps: [
      {
        n: "07",
        icon: Wrench,
        title: "Structural Execution",
        desc: "Foundation to roof, audited at every pour. Site photos and updates land in your dashboard daily.",
      },
      {
        n: "08",
        icon: Hammer,
        title: "Finishing & Interiors",
        desc: "Modular kitchens, wardrobes, woodwork, smart fittings. All in-house. No coordination chaos.",
      },
      {
        n: "09",
        icon: ShieldCheck,
        title: "Quality Audit & Handover",
        desc: "A 150-point inspection before we call it done. Then keys, warranties, documentation, and support.",
      },
    ],
  },
];

const Process = () => (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
    <Navbar />

    <PageHero
      eyebrow="Our Process"
      title="From vision to reality, pixel by pixel."
      subtitle="Nine steps. Zero guesswork. Every decision is made in 3D before a brick is laid."
    />

    <section className="relative py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-20 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[260px_1fr]">
          {/* Sticky Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-xl shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Build Journey
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-brand" />
                  <span className="font-medium">Design</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-brand/70" />
                  <span className="font-medium">Approvals</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-brand/40" />
                  <span className="font-medium">Construction</span>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Every phase tracked through the Prestoliv dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {phases.map((phase, phaseIndex) => (
              <section
                key={phase.title}
                className="mb-32 last:mb-0"
              >
                {/* Hero Visual */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-[32px] border border-border/60 bg-card shadow-soft"
                >
                  <img
                    src={phase.image}
                    alt={phase.title}
                    className="h-[500px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Left Content */}
                  <div className="absolute bottom-8 left-8 max-w-2xl text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                      {phase.title}
                    </p>

                    <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                      {phase.headline}
                    </h2>
                  </div>

                  {/* Floating Progress Card */}
                  <div className="absolute right-8 top-8 w-[260px] rounded-3xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-xl">
                    <p className="text-sm text-white/70">
                      Current Progress
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: phase.progress }}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm">
                        Active Phase
                      </span>

                      <span className="font-semibold">
                        {phase.progress}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative mt-16">
                  <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-border md:block" />

                  <div className="space-y-8">
                    {phase.steps.map((step, i) => {
                      const Icon = step.icon;

                      return (
                        <motion.div
                          key={step.title}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{
                            duration: 0.5,
                            delay: i * 0.06,
                          }}
                          className={`
                            group
                            relative
                            overflow-hidden
                            rounded-3xl
                            border
                            border-border/60
                            bg-card/60
                            backdrop-blur
                            p-8
                            shadow-soft
                            transition-all
                            duration-500
                            hover:-translate-y-1
                            hover:shadow-2xl
                            ${step.isSubCard ? "ml-8 md:ml-16" : ""}
                          `}
                        >
                          {/* Glow */}
                          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-b from-brand/[0.08] to-transparent" />

                          <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
                            {/* Icon */}
                            <div className="flex items-center gap-5">
                              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                                <Icon className="h-7 w-7" />
                              </div>

                              {step.n && (
                                <div className="hidden md:block">
                                  <p className="font-mono text-sm text-muted-foreground">
                                    STEP
                                  </p>

                                  <p className="text-3xl font-bold">
                                    {step.n}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h3 className="font-display text-2xl font-semibold tracking-tight">
                                {step.title}
                              </h3>

                              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                                {step.desc}
                              </p>

                              {/* Mini UI */}
                              <div className="mt-6 flex flex-wrap gap-3">
                                <div className="rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm backdrop-blur">
                                  Daily Tracking
                                </div>

                                <div className="rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm backdrop-blur">
                                  Dashboard Sync
                                </div>

                                <div className="rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm backdrop-blur">
                                  Live Updates
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>
            ))}

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[32px] border border-border/60 bg-card/70 p-12 text-center backdrop-blur-xl shadow-soft"
            >
              <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
              </div>

              <p className="text-xs uppercase tracking-[0.25em] text-brand">
                Ready To Build?
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
                A better building experience starts before construction does.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Walk through your future home in 3D. Track every milestone in
                real time. One team. One dashboard. Zero chaos.
              </p>

              <ConsultationDialog>
                <Button
                  size="lg"
                  className="mt-10 rounded-2xl bg-brand text-brand-foreground hover:bg-brand/90 group"
                >
                  Book a Consultation

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </ConsultationDialog>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    <CtaFooter />
  </main>
);

export default Process;