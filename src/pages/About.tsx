import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { motion } from "framer-motion";
import { Eye, Clock, Lock, FileCheck, Users, Shield, Smartphone, Calendar, Building, CheckCircle, Wrench } from "lucide-react";
import team from "@/assets/team.jpg";
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
  { name: "Udayan Reddy", role: "Co-Founder", linkedin: "https://www.linkedin.com/in/udayanreddy/" },
  { name: "Rao Balaji", role: "Co-Founder", linkedin: "https://www.linkedin.com/in/raobalaji/" },
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
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="aspect-[4/3] rounded-md overflow-hidden hairline shadow-soft"
        >
          <img src={team} alt="The Prestoliv team" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">Our Story</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Rebuilding the building experience.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Construction in India runs on three broken promises: the timeline slips, the budget grows, the updates stop. Prestoliv was built to end all three. VR design before we break ground. A live dashboard while we build. A price that holds, written into the contract.
          </p>
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
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">Meet the team behind your build</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Led by Industry Visionaries</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {teamMembers.map((member, i) => (
            <motion.a
              key={member.name}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-md hairline bg-card p-6 shadow-soft hover:shadow-card transition-all duration-500 ease-smooth"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                </div>
                <div className="size-10 rounded-md bg-brand-soft text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                  <Users className="size-5" />
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