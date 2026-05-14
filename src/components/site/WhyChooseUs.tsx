import { motion } from "framer-motion";
import { Clock, Smartphone, FileCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: Clock,
    title: "Guaranteed Timelines",
    desc: "Your finish date is written into your contract, with a delay penalty clause attached to it. We're not aiming for on-time. We're paying if we miss.",
  },
  {
    icon: Smartphone,
    title: "24/7 Total Control",
    desc: "The dashboard doesn't sleep. Open it at midnight, mid-flight, mid-meeting. Your project's last update was minutes ago, not weeks.",
  },
  {
    icon: FileCheck,
    title: "Fixed-Price Contracts",
    desc: "The number you sign is the number you pay. Material price spikes are our problem. Scope changes get quoted and approved in writing before anyone touches a tool.",
  },
  {
    icon: Phone,
    title: "One Team, One Phone Number",
    desc: "You don't manage architects and engineers and contractors and interior designers. You manage one Prestoliv project manager. They manage everything else.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">Why choose us?</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            We've removed the risks of traditional construction.
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-md hairline bg-card p-8 shadow-soft"
              >
                <div className="size-12 rounded-md bg-brand-soft text-brand flex items-center justify-center">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="rounded-[5px] bg-brand text-brand-foreground hover:bg-brand/90 shadow-soft">
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
};
