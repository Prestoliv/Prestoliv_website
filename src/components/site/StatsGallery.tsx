import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";

const images = [g1, g2, g3, g4, g5, g1, g2];

export const StatsGallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-45%"]);

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          Your dashboard updates before you finish your morning coffee.
        </h2>
        <div className="space-y-8">
          <p className="text-muted-foreground text-base leading-relaxed">
            Site photos from today. Work completed yesterday. What's happening tomorrow. The exact rupee balance of your build. Everything a site visit would tell you, without the site visit.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { v: "+100", l: "Team Members" },
              { v: "+60K", l: "Customers" },
              { v: "+70K", l: "Projects" },
            ].map((s) => (
              <div key={s.l} className="rounded-md hairline bg-surface p-4">
                <div className="font-display text-3xl font-bold text-foreground">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={ref} className="relative mt-16 overflow-hidden">
        <motion.div style={{ x }} className="flex gap-5 will-change-transform pl-6">
          {images.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-[60vw] sm:w-[420px] aspect-[4/3] rounded-md overflow-hidden hairline shadow-soft bg-muted"
            >
              <img
                src={src}
                alt={`Project ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};