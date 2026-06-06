import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Smartphone, FileCheck, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import { buttonIdFromLabel, trackCtaClick } from "@/lib/analytics";

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
    desc: "The number you sign is the number you pay. Material price spikes are our problem. Eligible builds include a 10-year structural warranty — scope changes get quoted and approved in writing before anyone touches a tool.",
  },
  {
    icon: Phone,
    title: "One Team, One Phone Number",
    desc: "You don't manage architects and engineers and contractors and interior designers. You manage one Prestoliv project manager. They manage everything else.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-24 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">Why choose us?</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Transparent construction, built for Hyderabad homeowners.
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

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          <ConsultationDialog source="home_why_choose" buttonLabel="Book a consultation">
            <Button size="lg" className="rounded-[10px] bg-brand text-brand-foreground hover:bg-brand/90">
              Book a consultation
            </Button>
          </ConsultationDialog>
          <Link
            id={buttonIdFromLabel("See our process")}
            to="/process"
            data-analytics-id="see-our-process"
            data-button-id="see-our-process"
            onClick={() =>
              trackCtaClick({
                ctaId: "home_why_choose_process",
                ctaText: "See our process",
                location: "home_why_choose_us",
                destination: "/process",
              })
            }
          >
            <Button size="lg" variant="outline" className="rounded-[10px] group">
              See our process
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
