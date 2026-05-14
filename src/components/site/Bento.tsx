import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Activity,
  ShieldCheck,
  LineChart,
  ArrowUpRight,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import bento3d from "@/assets/1a.jpg";
import bentoDashboard from "@/assets/2a.webp";
import bentoAccountability from "@/assets/bento-accountability.jpg";
import bentoTimeline from "@/assets/3p.png";

type Item = {
  title: string;
  blurb: string;
  icon: React.ElementType;
  image: string;
  className: string;
  details: string;
};

const items: Item[] = [
  {
    title: "Virtual-First Design",
    blurb:
      "Experience your future home before construction even begins.",
    icon: Box,
    image: bento3d,
    className: "md:col-span-2",
    details:
      "Walk through every room, refine layouts, test spatial flow, and make confident decisions before execution starts.",
  },
  {
    title: "Live Project Tracking",
    blurb:
      "Real-time visibility into your project’s execution.",
    icon: Activity,
    image: bentoDashboard,
    className: "md:col-span-1",
    details:
      "Daily updates, approvals, timelines, material tracking, and site intelligence — all accessible from one seamless dashboard.",
  },
  {
    title: "Full-Stack Accountability",
    blurb:
      "One integrated team from concept to completion.",
    icon: ShieldCheck,
    image: bentoAccountability,
    className: "md:col-span-1",
    details:
      "Architecture, execution, engineering, interiors, and project management under one ecosystem with complete ownership.",
  },
  {
    title: "Data-Driven Timelines",
    blurb:
      "Operational systems designed for predictable delivery.",
    icon: LineChart,
    image: bentoTimeline,
    className: "md:col-span-2",
    details:
      "Execution timelines are continuously monitored and optimized to identify delays before they impact delivery.",
  },
];

export const Bento = () => {
  const [active, setActive] = useState<Item | null>(null);

  return (
    <section
      id="process"
      className="relative overflow-hidden py-28 bg-background border-y border-border"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur-xl px-5 py-2 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              The Prestoliv Difference
            </span>
          </div>

          <h2 className="mt-7 font-display text-5xl sm:text-6xl font-bold leading-[1] tracking-tight text-foreground">
            A modern operating system
            <span className="block text-brand">
              for home construction.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Prestoliv combines architecture, technology, execution, and
            accountability into one seamless construction experience.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 auto-rows-[340px] gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;

            return (
              <motion.button
                key={it.title}
                onClick={() => setActive(it)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-[30px] text-left ${it.className}`}
              >
                {/* Background Image */}
                <motion.img
                  src={it.image}
                  alt={it.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.9 }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />

                {/* Brand Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -top-10 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
                </div>

                {/* Border */}
                <div className="absolute inset-0 rounded-[30px] ring-1 ring-white/10" />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.05 }}
                  className="absolute top-6 left-6 flex items-center justify-center size-12 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl"
                >
                  <Icon className="size-5 text-white" />
                </motion.div>

                {/* CTA */}
                <div className="absolute top-6 right-6 flex items-center justify-center size-12 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="size-5 text-white" />
                </div>

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-8">
                  <div className="max-w-md">
                    <h3 className="font-display text-[30px] leading-tight font-semibold tracking-tight text-white">
                      {it.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      {it.blurb}
                    </p>
                  </div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-brand/20 via-transparent to-white/10" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="overflow-hidden border border-border bg-background/95 backdrop-blur-2xl rounded-[36px] max-w-4xl p-0 shadow-2xl">
          {active && (
            <>
              {/* Hero */}
              <div className="relative h-[360px] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.1 }}
                  src={active.image}
                  alt={active.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-10 left-10">
                  <div className="mb-5 flex items-center justify-center size-14 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
                    <active.icon className="size-6 text-white" />
                  </div>

                  <h3 className="font-display text-5xl font-bold tracking-tight text-white">
                    {active.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 sm:p-12">
                <DialogHeader>
                  <DialogTitle className="sr-only">
                    {active.title}
                  </DialogTitle>

                  <DialogDescription className="text-lg leading-relaxed text-muted-foreground">
                    {active.details}
                  </DialogDescription>
                </DialogHeader>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};