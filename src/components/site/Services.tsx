import { motion } from "framer-motion";
import { PencilRuler, Activity, KeyRound, ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01",
    icon: PencilRuler,
    title: "Visionary Planning",
    desc: "You see it before we build it. Architectural drawings, 3D model, full VR walkthrough included. Most clients catch eight to twelve things they would have lived with for thirty years.",
    tags: ["3D Model", "VR Walkthrough", "Drawings"],
  },
  {
    n: "02",
    icon: Activity,
    title: "Transparent Execution",
    desc: "You watch it as we build it. Daily photos, live work logs, real-time payment status. AI flags scheduling risks before they become delays. You stay informed without lifting a phone.",
    tags: ["Daily Logs", "Live Dashboard", "AI Risk Alerts"],
  },
  {
    n: "03",
    icon: KeyRound,
    title: "Quality Handover",
    desc: "You move in when we said you would. Approvals, structure, interiors, snag closure, all handled, all on the date written in your contract. Move in. Don't move in and renovate.",
    tags: ["Approvals", "Snag Closure", "On-Time Handover"],
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-brand">Building without the anxiety</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl">
              Engineered for certainty.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Most construction stress comes from not knowing what's happening, what it'll cost, or when it'll end. We've engineered all three out of the process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-md hairline bg-card p-6 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-500 ease-smooth overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between">
                  <div className="size-10 rounded-md bg-brand-soft text-brand flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{s.n}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold flex items-center justify-between">
                  {s.title}
                  <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-muted text-foreground/70 border border-border">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};