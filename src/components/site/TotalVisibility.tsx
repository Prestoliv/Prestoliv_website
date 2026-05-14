import { motion } from "framer-motion";
import { Smartphone, Clock, IndianRupee, Eye } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Site photos from today",
    desc: "200 photos a week from your site engineer, curated and captioned by 7 PM.",
  },
  {
    icon: Clock,
    title: "Work completed yesterday",
    desc: "Every task logged, every material tracked, every milestone updated in real time.",
  },
  {
    icon: Eye,
    title: "What's happening tomorrow",
    desc: "Scheduled tasks, upcoming approvals, and potential risks flagged before they hit.",
  },
  {
    icon: IndianRupee,
    title: "Exact rupee balance",
    desc: "Every payment, every approval, every material cost — itemized and visible.",
  },
];

export const TotalVisibility = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">TOTAL VISIBILITY</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Your dashboard updates before you finish your morning coffee.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Site photos from today. Work completed yesterday. What's happening tomorrow. The exact rupee balance of your build. Everything a site visit would tell you, without the site visit.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-md hairline bg-card p-6 shadow-soft"
              >
                <div className="size-12 rounded-md bg-brand-soft text-brand flex items-center justify-center">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
