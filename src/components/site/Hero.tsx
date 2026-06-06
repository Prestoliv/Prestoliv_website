import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import house from "@/assets/hero-house1.png";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import { buttonIdFromLabel, trackCtaClick } from "@/lib/analytics";


export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effects
  const houseY = useTransform(scrollY, [0, 800], [0, 180]);
  const cloudsLeft = useTransform(scrollY, [0, 800], [0, -200]);
  const cloudsRight = useTransform(scrollY, [0, 800], [0, 220]);

  // Text animation
  const headlineY = useTransform(scrollY, [0, 600], [0, -60]);
  const headlineOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate min-h-screen sm:min-h-[130svh] flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, hsl(205 55% 65%) 0%, hsl(200 45% 78%) 50%, hsl(0 0% 100%) 100%)",
      }}
    >
      {/* ───────────────── Clouds ───────────────── */}
      <motion.div
        style={{ x: cloudsLeft }}
        className="pointer-events-none absolute top-24 -left-24 w-[60%] opacity-60"
        aria-hidden
      >
        <div className="aspect-[3/1] rounded-full bg-white/70 blur-3xl" />
      </motion.div>

      <motion.div
        style={{ x: cloudsRight }}
        className="pointer-events-none absolute top-40 -right-20 w-[50%] opacity-50"
        aria-hidden
      >
        <div className="aspect-[3/1] rounded-full bg-white/80 blur-3xl" />
      </motion.div>

      {/* ───────────────── Hero Content ───────────────── */}
      <motion.div
        style={{ y: headlineY, opacity: headlineOpacity }}
        className="relative z-30 max-w-5xl mx-auto px-6 text-center pt-28 sm:pt-36"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.05 }}
          className="font-display text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white drop-shadow-md leading-[0.95]"
        >
          <Link
            to="/services"
            className="underline underline-offset-4 decoration-white/50 hover:decoration-white"
          >
            Home construction in Hyderabad
          </Link>
          ,
          <br />
          finally done right.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-white/90 leading-relaxed"
        >
          Design and build your home with a{" "}
          <Link
            to="/process"
            className="underline underline-offset-4 decoration-white/50 hover:decoration-white"
          >
            virtual 3D walkthrough
          </Link>
          , live site
          tracking, and transparent construction — with a price locked the day you sign.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <ConsultationDialog source="hero" buttonLabel="Get started">
            <Button
              size="lg"
              className="rounded-[10px] bg-white text-foreground hover:bg-white/90 shadow-soft group px-7 py-3"
            >
              Get started
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </ConsultationDialog>

          <Link
            id={buttonIdFromLabel("Calculate Cost")}
            to="/calculator"
            data-analytics-id="calculate-cost"
            data-button-id="calculate-cost"
            onClick={() =>
              trackCtaClick({
                ctaId: "calculate_cost",
                ctaText: "Calculate Cost",
                location: "hero",
                destination: "/calculator",
              })
            }
          >
            <Button
              size="lg"
              variant="outline"
              className="rounded-[10px] border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur px-7 py-3"
            >
              Calculate Cost
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* ───────────────── House Image ───────────────── */}
      <motion.div
        style={{ y: houseY }}
        className="absolute inset-x-0 bottom-[2vh] sm:bottom-[-14vh] z-0 pointer-events-none"
      >
        <motion.img
          src={house}
          alt="Modern home built by Prestoliv — house construction in Hyderabad"
          className="w-[160%] sm:w-full max-w-none sm:max-w-[2000px] mx-auto -ml-[30%] sm:ml-0 select-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          draggable={false}
        />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </motion.div>
    </section>
  );
};