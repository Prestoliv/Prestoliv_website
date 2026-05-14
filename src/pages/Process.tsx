import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { motion } from "framer-motion";
import { MessageSquare, PencilRuler, Box, Sun, Layers, FileCheck, Map, Hammer, Wrench, KeyRound, ShieldCheck } from "lucide-react";

const phases = [
  {
    title: "Phase 1 — Design It Right",
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
    steps: [
      {
        n: "",
        icon: Sun,
        title: "Lighting Analysis",
        desc: "Real solar data, not guesswork. We orient every window for the sunlight you'll actually live with — across all four seasons.",
        isSubCard: true,
      },
      {
        n: "",
        icon: Layers,
        title: "Material Testing",
        desc: "Tap to swap. Tile, paint, laminate, cabinetry, tested in your 3D model before a single rupee leaves your account.",
        isSubCard: true,
      },
      {
        n: "04",
        icon: FileCheck,
        title: "Budgeting & Contracts",
        desc: "Every line item priced. Every price locked. The quote you sign is the bill you pay, commodity volatility is on us.",
      },
      {
        n: "05",
        icon: Map,
        title: "Govt. Permissions",
        desc: "Sanctions, NOCs, clearances. We file. We follow up. We close every loop. You won't visit a single government office.",
      },
      {
        n: "06",
        icon: Hammer,
        title: "Site Preparation",
        desc: "Soil tested. Utilities staged. Boundaries marked. By groundbreaking, nothing about your site is still a question.",
      },
    ],
  },
  {
    title: "Phase 3 — Build It True",
    steps: [
      {
        n: "07",
        icon: Wrench,
        title: "Structural Execution",
        desc: "Foundation to roof, audited at every pour. Site photos and progress logs land in your dashboard by 7 PM each working day.",
      },
      {
        n: "08",
        icon: Hammer,
        title: "Finishing & Interiors",
        desc: "Modular kitchens, wardrobes, woodwork, smart fittings. All in-house. No vendor blame games. No coordination headaches.",
      },
      {
        n: "09",
        icon: ShieldCheck,
        title: "Quality Audit & Handover",
        desc: "A 150-point inspection before we call it done. Then keys, warranties, documentation, and a number that actually picks up after you move in.",
      },
    ],
  },
];

const Process = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <PageHero
      eyebrow="Our Process"
      title="From vision to reality, pixel by pixel."
      subtitle="Nine steps. Zero guesswork. Every decision is made in 3D before a brick is laid."
    />
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {phases.map((phase, phaseIndex) => (
          <div key={phase.title} className="mb-24 last:mb-0">
            <h2 className="font-display text-2xl font-bold tracking-tight mb-12">{phase.title}</h2>
            <div className="relative">
              <div className="absolute left-6 sm:left-8 top-2 bottom-2 w-px bg-border" aria-hidden />
              <ul className="space-y-10">
                {phase.steps.map((step, i) => {
                  const Icon = step.icon;
                  const globalIndex = phases.slice(0, phaseIndex).reduce((acc, p) => acc + p.steps.length, 0) + i;
                  return (
                    <motion.li
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: globalIndex * 0.05 }}
                      className={`relative ${step.isSubCard ? 'pl-12 sm:pl-16 ml-8 sm:ml-12' : 'pl-20 sm:pl-24'}`}
                    >
                      <div className={`absolute left-0 top-0 ${step.isSubCard ? 'size-8 sm:size-10' : 'size-12 sm:size-16'} rounded-md bg-brand-soft text-brand flex items-center justify-center shadow-soft`}>
                        <Icon className={`${step.isSubCard ? 'size-4 sm:size-5' : 'size-5 sm:size-6'}`} />
                      </div>
                      <div className="flex items-baseline gap-3">
                        {step.n && <span className="font-mono text-xs text-muted-foreground">{step.n}</span>}
                        <h3 className={`font-display ${step.isSubCard ? 'text-lg' : 'text-2xl'} font-semibold`}>{step.title}</h3>
                      </div>
                      <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">{step.desc}</p>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
    <CtaFooter />
  </main>
);

export default Process;