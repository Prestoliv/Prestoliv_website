import { motion } from "framer-motion";
import {
  FolderKanban,
  IndianRupee,
  TriangleAlert,
  ClipboardCheck,
} from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "One source of truth",
    desc: "Drawings, contracts, schedules, and approvals live in one place — not scattered across WhatsApp threads and email chains.",
  },
  {
    icon: IndianRupee,
    title: "Money you can trace",
    desc: "Every rupee mapped to a milestone. See what's paid, what's pending, and what each material actually cost — line by line.",
  },
  {
    icon: TriangleAlert,
    title: "Risks before they're problems",
    desc: "Our system watches every dependency in your schedule and flags slippage weeks early, while there's still time to act.",
  },
  {
    icon: ClipboardCheck,
    title: "Decisions, documented",
    desc: 'Every approval and design change recorded with date, context, and who signed off. No "I never agreed to that."',
  },
];

export const TotalVisibility = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-background">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand backdrop-blur">
            Total Visibility
          </div>

          <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Your project has nothing to hide.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            On most builds, information is something you have to chase. With
            Prestoliv, it's already waiting for you — every photo, payment,
            decision, and delay risk in one place, updated daily.
            <span className="block mt-4 text-foreground font-medium">
              You don't ask how the build is going. You open the app and see.
            </span>
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur p-7 shadow-soft"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-brand/[0.08] to-transparent" />

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-brand-soft text-brand">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="relative mt-6">
                  <h3 className="text-xl font-display font-semibold tracking-tight">
                    {f.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};