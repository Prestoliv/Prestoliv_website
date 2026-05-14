import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { motion } from "framer-motion";
import { Eye, Clock, Lock, FileCheck, Users, Shield, Smartphone, Calendar, Building, CheckCircle, Wrench } from "lucide-react";
import team from "@/assets/team.jpg";
import p1 from "@/assets/p1.jpeg";
import p2 from "@/assets/p2.png";
import { Button } from "@/components/ui/button";

const commitments = [
  { icon: Eye, title: "VR-First", desc: "See It Before You Build It", detail: "Walk through your home in 3D before a single brick is laid. Catch what paper drawings can't show." },
  { icon: Smartphone, title: "24/7 Live Dashboard", desc: "Daily site logs, payment tracking, and milestone updates — visible to you the moment they happen." },
  { icon: Lock, title: "Locked Price", desc: "The Quote Is the Price", detail: "Per-sqft for residential, fixed-BoQ for custom builds. Material spikes don't reach your bill." },
  { icon: FileCheck, title: "Penalty Clause", desc: "On-Time, In Writing", detail: "Your handover date sits in the contract with a delay penalty attached. We're paying if we miss." },
];

const howWeWork = [
  { n: "01", icon: Users, title: "Radical Ownership", desc: "One Prestoliv team handles design, approvals, construction, and interiors. You manage one project manager. We manage everything else, including the vendors most builders make you chase." },
  { n: "02", icon: Shield, title: "Future-Proof Quality", desc: "500+ in-process quality checks across structural, MEP, and finish phases. Backed by structural and waterproofing warranties that outlast the build itself." },
  { n: "03", icon: Smartphone, title: "Digital Integrity", desc: "Every milestone, every payment, every material approval, logged, timestamped, and visible to you in real time. If it happened on site, it's on the record." },
  { n: "04", icon: Calendar, title: "Predictable Delivery", desc: "AI-driven scheduling flags risk weeks before it hits the site. Your handover date is contractual, not aspirational, with a delay penalty backing it." },
  { n: "05", icon: Building, title: "Financial Ease", desc: "Loan coordination with partner banks. Faster approvals through track-record-based bank relationships. Disbursement aligned to construction milestones, you draw only what you've used." },
  { n: "06", icon: CheckCircle, title: "Government Approvals, Handled", desc: "Building plan sanctions, NOCs, and municipal clearances filed and followed up by our team. You sign documents we put in front of you. You will not visit a government office." },
];

const teamMembers = [
  { name: "Udayan Reddy", role: "Co-Founder", linkedin: "https://www.linkedin.com/in/udayanreddy/", image: p1 },
  { name: "Rao Balaji", role: "Co-Founder", linkedin: "https://www.linkedin.com/in/raobalaji/", image: p2 },
];

const About = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <PageHero
      eyebrow="About Us"
      title="Rebuilding the building experience."
      subtitle="Construction in India runs on three broken promises: the timeline slips, the budget grows, the updates stop. Prestoliv was built to end all three. VR design before we break ground. A live dashboard while we build. A price that holds, written into the contract."
    />

{/* Our Story Section */}
<section className="relative overflow-hidden py-28">
  {/* Background Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute left-1/3 top-20 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
  </div>

  <div className="mx-auto max-w-7xl px-6">
    <div className="grid items-center gap-20 lg:grid-cols-2">
      
      {/* LEFT VISUALS */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Main Image */}
        <div className="overflow-hidden rounded-[32px] border border-border/60 shadow-2xl">
          <img
            src={team}
            alt="Prestoliv Team"
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Floating Metric Card */}
        <div className="absolute -right-6 top-10 w-[220px] rounded-3xl border border-white/20 bg-background/80 p-5 backdrop-blur-xl shadow-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Dashboard Visibility
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Site Photos</span>
              <span className="font-semibold">Daily</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Budget Tracking</span>
              <span className="font-semibold">Live</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Approvals</span>
              <span className="font-semibold">Tracked</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Kicker */}
        <div className="inline-flex items-center rounded-full border border-border/60 bg-card/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur">
          Our Story
        </div>

        {/* Headline */}
        <h2 className="mt-6 font-display text-5xl font-bold tracking-tight leading-[1.05] sm:text-6xl">
          We started because we'd been let down too.
        </h2>

        {/* Body */}
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Prestoliv didn't begin in a boardroom. It began with the same
            frustration our clients know — site visits that revealed nothing,
            budgets that quietly grew, and a handover date that kept moving.
          </p>

          <p>
            We saw an industry where the person paying for the home had the
            least visibility into it.
          </p>

          <p>
            So we rebuilt the model from the ground up: design proven in 3D
            before a brick is laid, every rupee and milestone visible on a
            live dashboard, and a completion date we put in writing.
          </p>

          <p className="text-foreground font-medium">
            Not a contractor's promise — a system that keeps it.
          </p>
        </div>

        {/* Bottom Pills */}
        <div className="mt-10 flex flex-wrap gap-3">
          <div className="rounded-full border border-border/60 bg-card/60 px-5 py-3 text-sm backdrop-blur">
            VR-First Design
          </div>

          <div className="rounded-full border border-border/60 bg-card/60 px-5 py-3 text-sm backdrop-blur">
            Live Dashboard
          </div>

          <div className="rounded-full border border-border/60 bg-card/60 px-5 py-3 text-sm backdrop-blur">
            Fixed Timelines
          </div>

          <div className="rounded-full border border-border/60 bg-card/60 px-5 py-3 text-sm backdrop-blur">
            Full Accountability
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

    {/* About Us - Four Commitments */}
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">About Us</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">The foundations of our firm.</h2>
          <p className="mt-4 text-muted-foreground">Four commitments that turn construction from a gamble into a guarantee.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commitments.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-md hairline bg-card p-6 shadow-soft"
              >
                <div className="size-10 rounded-md bg-brand-soft text-brand flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm font-medium text-brand">{c.desc}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Meet the Team */}
    <section className="relative overflow-hidden py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-20 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-border/60 bg-card/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur">
            Meet the team behind your build
          </div>

          <h2 className="mt-6 font-display text-5xl font-bold tracking-tight leading-[1.05] sm:text-6xl">
            Led by Industry Visionaries
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Prestoliv combines architecture, engineering, construction, and
            interiors under one accountable team — so the people designing your
            home are aligned with the people building it.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {teamMembers.map((member, i) => (
            <motion.a
              key={member.name}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
              }}
              whileHover={{ y: -6 }}
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-border/60
                bg-card/60
                backdrop-blur-xl
                shadow-soft
                transition-all
                duration-500
                hover:shadow-2xl
              "
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-b from-brand/[0.08] to-transparent" />

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="aspect-[4/4.5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Floating Badge */}
                <div className="absolute left-5 top-5 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-xl">
                  Prestoliv Leadership
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl font-bold text-white">
                        {member.name}
                      </h3>

                      <p className="mt-2 text-sm text-white/70">
                        {member.role}
                      </p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="flex items-center justify-between border-t border-border/50 px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Role
                  </p>

                  <p className="mt-1 font-medium">
                    {member.role}
                  </p>
                </div>

                <div className="rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm backdrop-blur">
                  View Profile
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>

    {/* How We Work */}
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">How we work</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Six commitments behind every Prestoliv project.</h2>
          <p className="mt-4 text-muted-foreground">Designed to remove the three things that derail traditional builds: delays, confusion, and broken trust.</p>
        </div>
        <div className="mt-16 space-y-6">
          {howWeWork.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-md hairline bg-card p-8 shadow-soft"
              >
                <div className="flex items-start gap-6">
                  <div className="size-12 rounded-md bg-brand-soft text-brand flex items-center justify-center shrink-0">
                    <Icon className="size-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-muted-foreground">{item.n}</span>
                      <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" className="rounded-[5px] bg-brand text-brand-foreground hover:bg-brand/90 shadow-soft">
            Contact Us
          </Button>
        </div>
      </div>
    </section>

    <CtaFooter />
  </main>
);

export default About;