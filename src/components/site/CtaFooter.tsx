import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import logo from "@/assets/logo.svg";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Services", href: "/services" },
      { label: "Process", href: "/process" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
    ],
  },
];

export const CtaFooter = () => (
  <>
    <section className="relative overflow-hidden py-28 bg-gradient-hero">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <motion.div
        aria-hidden
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, hsl(var(--brand)/0.35), transparent 70%)" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
          Build with the certainty you deserve
        </h2>
        <p className="mt-5 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          Tell us about your project. We'll come back with a feasibility plan, a guaranteed timeline and a locked, itemized price.
        </p>
        <div className="mt-8 flex justify-center">
          <ConsultationDialog>
            <Button size="lg" className="rounded-md bg-foreground text-background hover:bg-foreground/90 group">
              Start Your Project
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </ConsultationDialog>
        </div>
      </div>
    </section>

    <footer className="bg-foreground text-background/90">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <img src={logo} alt="Prestoliv" className="h-7 w-auto brightness-0 invert" />
          <p className="mt-4 text-sm text-background/60 max-w-xs">
            Construction, finally done right. 3D walkthroughs, daily site updates and a price that's locked the day you sign.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-background/60">
            <span className="size-2 rounded-full bg-brand animate-pulse" />
            All systems operational
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs font-semibold uppercase tracking-widest text-background/50">{c.title}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link 
                    to={l.href} 
                    className="hover:text-brand transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-background/50">
          <span>© {new Date().getFullYear()} Prestoliv. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background">Terms</a>
            <a href="#" className="hover:text-background">Privacy</a>
            <a href="#" className="hover:text-background">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </>
);