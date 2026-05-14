import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Box, Activity, ShieldCheck, LineChart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import bento3d from "@/assets/bento-3d.jpg";
import bentoDashboard from "@/assets/bento-dashboard.jpg";
import bentoAccountability from "@/assets/bento-accountability.jpg";
import bentoTimeline from "@/assets/bento-timeline.jpg";

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
      "Your 3D home design isn't a brochure, it's a draft of your real life.",
    icon: Box,
    image: bento3d,
    className: "md:col-span-2 md:row-span-1",
    details:
      "Walk the corridor. Stand in the kitchen. Notice the bad sightline before the wall exists. Fix it now, when fixing it costs nothing. Your 3D design isn't a sales render, it's a chance to experience your future home before construction begins.",
  },
  {
    title: "Live Project Tracking",
    blurb:
      "Your site engineer shoots 200 photos a week. You get the ones that matter.",
    icon: Activity,
    image: bentoDashboard,
    className: "md:col-span-1",
    details:
      "Every evening by 7 PM, your dashboard updates with curated site photos, completed work, approvals, payments, and material progress. No chasing contractors for updates. No wondering what happened on site today. Everything important, one tap away.",
  },
  {
    title: "Full-Stack Accountability",
    blurb:
      "Architects, structural engineers, MEP, project managers, finishers, interiors — all Prestoliv.",
    icon: ShieldCheck,
    image: bentoAccountability,
    className: "md:col-span-1",
    details:
      "One turnkey team owns the entire project from design to delivery. No vendor blame games. No disappearing subcontractors. When something works, one team takes responsibility. When something breaks, the same team fixes it.",
  },
  {
    title: "Data-Driven Timelines",
    blurb:
      "We don't promise dates, we commit to them, in writing.",
    icon: LineChart,
    image: bentoTimeline,
    className: "md:col-span-2",
    details:
      "Our scheduling system tracks every dependency across your project and flags delays weeks before they become site problems. Timelines aren't guesswork, they're monitored daily, backed by accountability, and written directly into your contract.",
  },
];

export const Bento = () => {
  const [active, setActive] = useState<Item | null>(null);

  return (
    <section id="process" className="py-24 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">The Prestoliv Difference</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            A modern operating system for building.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.button
                key={it.title}
                onClick={() => setActive(it)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group relative text-left overflow-hidden rounded-md hairline bg-card shadow-soft hover:shadow-card transition-all duration-500 ease-smooth ${it.className}`}
              >
                <img
                  src={it.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-[1.04] transition-transform duration-700 ease-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/10" />
                <div className="relative h-full p-6 flex flex-col justify-end">
                  <div className="absolute top-4 left-4 inline-flex items-center justify-center size-9 rounded-md bg-white border border-border shadow-soft">
                    <Icon className="size-4 text-brand" />
                  </div>
                  <div className="absolute top-4 right-4 inline-flex items-center justify-center size-9 rounded-md bg-foreground text-background opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                    <Plus className="size-4" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{it.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground max-w-sm">{it.blurb}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl rounded-md p-0 overflow-hidden">
          {active && (
            <>
              <div className="relative h-56 w-full">
                <img src={active.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">{active.title}</DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
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