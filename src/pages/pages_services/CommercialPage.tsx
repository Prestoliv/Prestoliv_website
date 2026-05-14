import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { ConsultationDialog } from "@/components/ConsultationDialog";

import { motion } from "framer-motion";
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import residentialImg from "@/assets/3.jpg";
import commercialImg from "@/assets/2.jpg";
import interiorsImg from "@/assets/1.jpg";

const commercialFeatures = [
  "Retail, office, clinic, and restaurant builds designed around operations.",
  "Fast-track approvals and compliance handled in parallel.",
  "Contractual timelines with delay accountability.",
  "MEP-heavy execution capability built in from day one.",
  "Fit-outs, branding, furniture, and IT coordinated together.",
  "Live dashboard visibility for all stakeholders.",
];

const relatedServices = [
  {
    label: "Residential Construction",
    href: "/services/residential",
    image: residentialImg,
    tag: "Live Project",
    title: "Villa Construction",
    progress: "72%",
    status: "On Schedule",
  },
  {
    label: "Interior Design",
    href: "/services/interiors",
    image: interiorsImg,
    tag: "Design Preview",
    title: "Luxury Interiors",
    progress: "89%",
    status: "Materials Approved",
  },
];

const FeatureList = ({ items }: { items: string[] }) => (
  <div className="mt-8 space-y-4">
    {items.map((feature, i) => (
      <div key={i} className="flex items-start gap-3">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{feature}</p>
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
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.5 }}
    className="relative"
  >
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft">
      <img
        src={image}
        alt={title}
        className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-5 left-5 max-w-[240px] rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">{tag}</p>
        <h3 className="mt-2 text-xl font-semibold">{title}</h3>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white" style={{ width: progress }} />
          </div>
          <span className="text-sm font-medium">{progress}</span>
        </div>
      </div>
      <div className="absolute right-5 top-5 rounded-2xl border border-border/50 bg-background/80 px-4 py-3 backdrop-blur-xl shadow-soft">
        <p className="text-xs text-muted-foreground">Status</p>
        <p className="mt-1 text-lg font-semibold">{status}</p>
      </div>
    </div>
  </motion.div>
);

const CommercialPage = () => (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
    <Navbar />

    <PageHero
      eyebrow="Commercial Construction"
      title="Engineered around operations and launch timelines."
      subtitle="Offices, retail spaces, clinics, and restaurants built to open on time. Commercial delays cost revenue — our systems track risk before it reaches site."
    />

    {/* Main Service Section */}
    <section className="py-24">
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

            <div className="flex flex-row gap-4">
            <ConsultationDialog>
              <Button
                size="lg"
                className="mt-8 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 group"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </ConsultationDialog>

              <Link to="/calculator">
                <Button
                  size="lg"
                  className="mt-8 rounded-xl border border-brand bg-white text-brand hover:bg-brand hover:text-white group"
                >
                  Calculate Cost
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Other Services */}
    <section className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Explore More
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
            Other Prestoliv Services
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {relatedServices.map((service, i) => (
            <motion.a
              key={i}
              href={service.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft"
            >
              <img
                src={service.image}
                alt={service.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">{service.tag}</p>
                <h3 className="mt-1 text-xl font-semibold">{service.title}</h3>
              </div>
              <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl">
                {service.label}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>

    <CtaFooter />
  </main>
);

export default CommercialPage;
