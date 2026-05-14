import { motion } from "framer-motion";
import s1 from "@/assets/showcase-1.jpg";
import s2 from "@/assets/gallery-5.jpg";
import team from "@/assets/team.jpg";

export const Showcase = () => (
  <section className="py-24 bg-surface border-y border-border">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-xl">
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          Delivering Quality Spaces with Precision and Care
        </h2>
        <p className="mt-4 text-muted-foreground">
          We blend design discipline with hands-on craft so every Prestoliv project, from a single home to a full commercial fit-out, performs at its best.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-7 aspect-[4/3] rounded-md overflow-hidden hairline shadow-soft"
        >
          <img src={s1} alt="Modern courtyard" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ delay: 0.1 }}
          className="col-span-12 md:col-span-5 aspect-[4/3] rounded-md overflow-hidden hairline shadow-soft"
        >
          <img src={s2} alt="Modern home exterior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ delay: 0.15 }}
          className="col-span-12 md:col-start-4 md:col-span-6 aspect-[16/9] rounded-md overflow-hidden hairline shadow-soft"
        >
          <img src={team} alt="Construction team" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
        </motion.div>
      </div>
    </div>
  </section>
);