import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export const PageHero = ({ eyebrow, title, subtitle }: PageHeroProps) => (
  <section
    className="relative pt-36 pb-20 overflow-hidden"
    style={{ background: "linear-gradient(to bottom, hsl(205 55% 65%) 0%, hsl(200 45% 78%) 60%, hsl(0 0% 100%) 100%)" }}
  >
    <div className="pointer-events-none absolute top-24 -left-20 w-[55%] aspect-[3/1] rounded-full bg-white/60 blur-2xl" aria-hidden />
    <div className="pointer-events-none absolute top-44 -right-16 w-[45%] aspect-[3/1] rounded-full bg-white/70 blur-2xl" aria-hidden />
    <div className="relative max-w-4xl mx-auto px-6 text-center">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-block text-xs font-semibold tracking-widest uppercase text-black/90 bg-black/15 backdrop-blur px-3 py-1 rounded-full border border-white/30"
      >
        {eyebrow}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-5 font-display text-5xl sm:text-6xl font-bold tracking-tight text-black drop-shadow-sm"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-black/90"
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);