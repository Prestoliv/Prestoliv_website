import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import house from "@/assets/hero-house.png";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const houseY = useTransform(scrollY, [0, 800], [0, 140]);
  const cloudsLeft = useTransform(scrollY, [0, 800], [0, -200]);
  const cloudsRight = useTransform(scrollY, [0, 800], [0, 220]);
  const headlineY = useTransform(scrollY, [0, 600], [0, -40]);
  const headlineOpacity = useTransform(scrollY, [0, 500], [1, 0.15]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      style={{ background: "linear-gradient(to bottom, hsl(205 55% 65%) 0%, hsl(200 45% 78%) 45%, hsl(0 0% 100%) 100%)" }}
    >
      {/* Cloud layers */}
      <motion.div
        style={{ x: cloudsLeft }}
        className="pointer-events-none absolute top-32 -left-20 w-[55%] opacity-70"
        aria-hidden
      >
        <div className="aspect-[3/1] rounded-full bg-white/70 blur-2xl" />
      </motion.div>
      <motion.div
        style={{ x: cloudsRight }}
        className="pointer-events-none absolute top-52 -right-16 w-[45%] opacity-60"
        aria-hidden
      >
        <div className="aspect-[3/1] rounded-full bg-white/80 blur-2xl" />
      </motion.div>

      {/* Text content over sky */}
      <motion.div
        style={{ y: headlineY, opacity: headlineOpacity }}
        className="relative z-20 max-w-6xl mx-auto px-6 text-center pt-36 sm:pt-40"
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-sm"
        >
          Construction, finally
          <br />
          done right.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 max-w-xl mx-auto text-base sm:text-lg text-white/90"
        >
          Design, build and finish your home with 3D walkthroughs, daily site updates, and a price that's locked the day you sign.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 flex items-center justify-center gap-3"
        >
          <Button size="lg" className="rounded-[5px] bg-white text-foreground hover:bg-white/90 shadow-soft group px-6">
            Get started
            <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Parallax house as full-bleed background image */}
      <motion.div
        style={{ y: houseY }}
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
      >
        <motion.img
          src={house}
          alt="Modern home built by Prestoliv"
          className="w-full max-w-[1600px] mx-auto select-none"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          draggable={false}
        />
        {/* Fade bottom into page background */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </motion.div>
    </section>
  );
};