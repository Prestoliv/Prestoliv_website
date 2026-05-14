import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { motion } from "framer-motion";
import { Home, Building2, Paintbrush, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const residentialFeatures = [
  "Architectural design tailored to how you live. We start with how your family actually moves through a day. Vastu inputs incorporated if requested, without compromising livability.",
  "VR walkthrough before a brick is laid. Walk through your home in 3D. Catch what paper drawings can't show. Free with every design package.",
  "Fixed-price construction contracts. The number you sign is the number at handover. Material spikes are our risk. Scope changes are quoted in writing.",
  "Approvals and loans handled. Building plan sanctions, NOCs, and partner-bank loan coordination. You sign documents. We chase signatures.",
  "End-to-end execution under one roof. Foundation to fittings, modular to interiors. One contract. One project manager. One number to call.",
  "10-year structural warranty. Plus 5-to-10-year waterproofing cover and a real person on the phone when something needs attention.",
];

const commercialFeatures = [
  "Designs built around your business. Retail layouts that maximize footfall. Office spaces that scale with headcount. Restaurant kitchens that pass FSSAI on the first attempt.",
  "Fast-track approvals and compliance. Fire NOC, GHMC clearances, electrical inspections, signage permissions, processed in parallel with construction.",
  "Aggressive but honest timelines. We tell you what's possible. We don't promise what isn't. Once set, the date is contractual, with a delay penalty.",
  "MEP-heavy capability built in. HVAC, heavy electrical loads, kitchen plumbing, IT cabling, fire systems, planned from day one, not bolted on later.",
  "Fit-out coordination, end to end. Branding, furniture, signage, IT, security, coordinated alongside civil work. You walk in ready to open.",
  "Real-time tracking for every stakeholder. Limited-access dashboard views for ops heads, franchise teams, investors. Everyone sees. Nobody has to ask.",
];

const interiorFeatures = [
  "Free consultation and design concept. A designer visits, takes your brief, returns in seven working days with mood boards and a preliminary estimate. No design fee buried in the fine print.",
  "3D visualization before we order. Every room rendered with the actual finishes you've picked, laminate, tile, paint, lighting. You approve. Then we procure.",
  "Modular kitchens and wardrobes. In-house modular team. Built to your dimensions, not pulled from a catalog. Hettich and Hafele hardware standard.",
  "Renovation without vacating. For occupied homes, we work in zones. Dust barriers, daily cleanup, defined hours. We treat your space the way we'd want ours treated.",
  "Procurement at trade prices. Sourced through our material-partner network. Bulk-buying savings flow directly into your bill, not ours.",
  "Project management that holds. Dedicated interiors PM. Daily updates. Milestone-linked payments. A fixed handover date, and someone whose job is making sure it lands.",
];

const specializedFeatures = [
  "Architectural design and 3D visualization. Drawings, renderings, and VR walkthroughs as a standalone package. Take it to any builder.",
  "Project management for in-flight builds. Already started with another builder? We can step in to manage milestones, audit quality, and bring dashboard discipline to your project.",
  "Vastu consultation, integrated into design. Vastu inputs woven into the design phase, without compromising sunlight, flow, or modern functionality.",
  "Renovation feasibility and structural audits. Before you buy or extend: structural assessment, load calcs, cost-to-renovate vs. cost-to-rebuild analysis.",
  "Construction loan facilitation. Documentation support, faster sanctions, milestone-linked disbursement, through our partner banks.",
];

const OurServices = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <PageHero
      eyebrow="Our Services"
      title="Built around your project. Backed by our process."
      subtitle="Three core services. One Prestoliv team. From the first sketch to the keys in your hand."
    />

    {/* Residential Construction */}
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="size-16 rounded-md bg-brand-soft text-brand flex items-center justify-center mb-6">
              <Home className="size-8" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Residential Construction</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Independent homes, villas, duplexes, and renovations, designed around how your family lives, not how a template assumes you do. Fixed-price contracts, VR previews, and one in-house team owning every step from foundation to finish.
            </p>
            <div className="mt-8 space-y-4">
              {residentialFeatures.map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <div className="size-6 rounded-full bg-brand-soft text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <div className="size-2 rounded-full bg-brand" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-8 rounded-[5px] bg-brand text-brand-foreground hover:bg-brand/90 shadow-soft group">
              Get a Quote
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-md hairline bg-surface flex items-center justify-center"
          >
            <Home className="size-32 text-muted-foreground/20" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Commercial Construction */}
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 aspect-square rounded-md hairline bg-background flex items-center justify-center"
          >
            <Building2 className="size-32 text-muted-foreground/20" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="size-16 rounded-md bg-brand-soft text-brand flex items-center justify-center mb-6">
              <Building2 className="size-8" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Commercial Construction</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Offices, retail, showrooms, clinics, restaurants. Commercial timelines aren't aspirational — every week of delay is revenue you don't earn back. We engineer your finish date backward from your launch date and write it into the contract.
            </p>
            <div className="mt-8 space-y-4">
              {commercialFeatures.map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <div className="size-6 rounded-full bg-brand-soft text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <div className="size-2 rounded-full bg-brand" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-8 rounded-[5px] bg-brand text-brand-foreground hover:bg-brand/90 shadow-soft group">
              Plan Your Build
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Interior Design */}
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="size-16 rounded-md bg-brand-soft text-brand flex items-center justify-center mb-6">
              <Paintbrush className="size-8" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Interior Design</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Full home interiors, single-room renovations, kitchen and bath remodels. Most interior projects fail because no one owns them. We do, from concept render to handover, including procurement and the people who install it.
            </p>
            <div className="mt-8 space-y-4">
              {interiorFeatures.map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <div className="size-6 rounded-full bg-brand-soft text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <div className="size-2 rounded-full bg-brand" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-8 rounded-[5px] bg-brand text-brand-foreground hover:bg-brand/90 shadow-soft group">
              Start Your Project
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-md hairline bg-surface flex items-center justify-center"
          >
            <Paintbrush className="size-32 text-muted-foreground/20" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Specialized Services */}
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">Specialized Services</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Focused engagements for clients who need a specific Prestoliv capability without a full build contract.</h2>
          <p className="mt-4 text-muted-foreground">Same in-house team. Same standards.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializedFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-md hairline bg-card p-6 shadow-soft"
            >
              <div className="size-10 rounded-md bg-brand-soft text-brand flex items-center justify-center">
                <Layers className="size-5" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{feature}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" className="rounded-[5px] bg-brand text-brand-foreground hover:bg-brand/90 shadow-soft group">
            Talk to Our Team
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>

    <CtaFooter />
  </main>
);

export default OurServices;