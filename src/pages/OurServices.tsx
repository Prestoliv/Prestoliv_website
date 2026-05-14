import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { ConsultationDialog } from "@/components/ConsultationDialog";

import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Paintbrush,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import residentialImg from "@/assets/3.jpg";
import commercialImg from "@/assets/2.jpg";
import interiorsImg from "@/assets/1.jpg";

const residentialFeatures = [
  "Architectural design tailored to how your family actually lives.",
  "VR walkthrough before construction begins.",
  "Fixed-price construction contracts with no surprise escalation.",
  "Approvals, NOCs, and loan coordination handled end to end.",
  "One in-house team from foundation to interiors.",
  "10-year structural warranty with long-term support.",
];

const commercialFeatures = [
  "Retail, office, clinic, and restaurant builds designed around operations.",
  "Fast-track approvals and compliance handled in parallel.",
  "Contractual timelines with delay accountability.",
  "MEP-heavy execution capability built in from day one.",
  "Fit-outs, branding, furniture, and IT coordinated together.",
  "Live dashboard visibility for all stakeholders.",
];

const interiorFeatures = [
  "3D visualization before procurement begins.",
  "Custom modular kitchens and wardrobes.",
  "Renovation workflows for occupied homes.",
  "Trade-price procurement through partner vendors.",
  "Dedicated project manager and milestone-linked updates.",
  "Transparent timelines with committed handover dates.",
];

const specializedFeatures = [
  "Architectural design and VR walkthroughs.",
  "Project management for already-started builds.",
  "Integrated vastu consultation.",
  "Structural audits and renovation feasibility.",
  "Construction loan facilitation and documentation.",
  "Independent quality and milestone tracking.",
];

const FeatureList = ({ items }: { items: string[] }) => (
  <div className="mt-8 space-y-4">
    {items.map((feature, i) => (
      <div key={i} className="flex items-start gap-3">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CheckCircle2 className="h-4 w-4" />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {feature}
        </p>
      </div>
    ))}
  </div>
);

const VisualCard = ({
  image,
  title,
  tag,
  progress,
  status,
}: {
  image: string;
  title: string;
  tag: string;
  progress: string;
  status: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.5 }}
    className="relative"
  >
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft">
      {/* Main Image */}
      <img
        src={image}
        alt={title}
        className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Bottom Card */}
      <div className="absolute bottom-5 left-5 max-w-[240px] rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">
          {tag}
        </p>

        <h3 className="mt-2 text-xl font-semibold">{title}</h3>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: progress }}
            />
          </div>

          <span className="text-sm font-medium">{progress}</span>
        </div>
      </div>

      {/* Status */}
      <div className="absolute right-5 top-5 rounded-2xl border border-border/50 bg-background/80 px-4 py-3 backdrop-blur-xl shadow-soft">
        <p className="text-xs text-muted-foreground">Status</p>

        <p className="mt-1 text-lg font-semibold">{status}</p>
      </div>
    </div>
  </motion.div>
);

const OurServices = () => (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
    <Navbar />

    <PageHero
      eyebrow="Our Services"
      title="Built around your project. Backed by our process."
      subtitle="Three core services. One Prestoliv team. From the first sketch to the keys in your hand."
    />

    {/* Residential */}
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <Home className="h-8 w-8" />
            </div>

            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight">
              Residential Construction
            </h2>

            <p className="mt-5 leading-relaxed text-muted-foreground">
              Independent homes, villas, duplexes, and renovations designed
              around how your family actually lives. Fixed-price execution,
              VR-first design, and one accountable team from foundation to
              finish.
            </p>

            <FeatureList items={residentialFeatures} />

            <ConsultationDialog>
              <Button
                size="lg"
                className="mt-8 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 group"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </ConsultationDialog>
          </motion.div>

          <VisualCard
            image={residentialImg}
            title="Villa Construction"
            tag="Live Project"
            progress="72%"
            status="On Schedule"
          />
        </div>
      </div>
    </section>

    {/* Commercial */}
    <section className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <VisualCard
            image={commercialImg}
            title="Commercial Build"
            tag="Execution Dashboard"
            progress="64%"
            status="Approvals Cleared"
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <Building2 className="h-8 w-8" />
            </div>

            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight">
              Commercial Construction
            </h2>

            <p className="mt-5 leading-relaxed text-muted-foreground">
              Offices, retail spaces, clinics, and restaurants engineered
              around operations and launch timelines. Commercial delays cost
              revenue, so our systems track risk before it reaches site.
            </p>

            <FeatureList items={commercialFeatures} />

            <ConsultationDialog>
              <Button
                size="lg"
                className="mt-8 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 group"
              >
                Plan Your Build
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </ConsultationDialog>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Interiors */}
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <Paintbrush className="h-8 w-8" />
            </div>

            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight">
              Interior Design
            </h2>

            <p className="mt-5 leading-relaxed text-muted-foreground">
              Full-home interiors, kitchen remodels, wardrobes, and renovations
              managed from concept to handover. One team owns the design,
              procurement, and execution process.
            </p>

            <FeatureList items={interiorFeatures} />

            <ConsultationDialog>
              <Button
                size="lg"
                className="mt-8 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 group"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </ConsultationDialog>
          </motion.div>

          <VisualCard
            image={interiorsImg}
            title="Luxury Interiors"
            tag="Design Preview"
            progress="89%"
            status="Materials Approved"
          />
        </div>
      </div>
    </section>

    {/* Specialized */}
    <section className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur">
            Specialized Services
          </div>

          <h2 className="mt-6 font-display text-5xl font-bold tracking-tight leading-tight">
            Focused services for clients who need a specific Prestoliv
            capability.
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Same systems. Same in-house expertise. Same accountability.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specializedFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-7 backdrop-blur shadow-soft"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-b from-brand/[0.08] to-transparent" />

              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Layers className="h-5 w-5" />
              </div>

              <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">
                {feature}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <ConsultationDialog>
            <Button
              size="lg"
              className="rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 group"
            >
              Talk to Our Team
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </ConsultationDialog>
        </div>
      </div>
    </section>

    <CtaFooter />
  </main>
);

export default OurServices;