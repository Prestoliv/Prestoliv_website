import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";

const images = [
  { src: g1, label: "Daily Progress" },
  { src: g2, label: "Live Site Updates" },
  { src: g3, label: "Material Tracking" },
  { src: g4, label: "Project Timeline" },
  { src: g5, label: "Team Coordination" },
  { src: g1, label: "Budget Visibility" },
  { src: g2, label: "Client Dashboard" },
];

export const StatsGallery = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-42%"]);

  return (
    <section
      id="about"
      className="relative py-14 overflow-hidden bg-background"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Top Content */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
              Built for modern construction teams
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-tight">
              Your dashboard updates before you finish your morning coffee.
            </h2>
          </div>

          <div className="space-y-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Site photos from today. Work completed yesterday. What's
              happening tomorrow. The exact rupee balance of your build.
              Everything a site visit would tell you, without the site visit.
            </p>

            {/* Instead of fake stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-5">
                <p className="text-sm text-muted-foreground">
                  Real-time updates
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Every single day
                </h3>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-5">
                <p className="text-sm text-muted-foreground">
                  Designed for
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Builders & clients
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div ref={ref} className="relative mt-20 overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-6 will-change-transform pl-6"
        >
          {images.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative shrink-0 w-[78vw] sm:w-[440px] aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-soft"
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Dashboard Feature
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {item.label}
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fade Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};