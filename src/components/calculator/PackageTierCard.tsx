import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { PackageConfig } from "@/lib/calculatorConfig";
import { formatINR, formatRate } from "./format";

type PackageTierCardProps = {
  pkg: PackageConfig;
  total: number;
  perSqftLabel: string;
  selected: boolean;
  onSelect: () => void;
  index: number;
};

export function PackageTierCard({
  pkg,
  total,
  perSqftLabel,
  selected,
  onSelect,
  index,
}: PackageTierCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      onClick={onSelect}
      className={`group relative flex w-full flex-col overflow-hidden rounded-3xl border bg-card text-left shadow-soft transition-all duration-300 ${
        selected
          ? "border-brand shadow-glow scale-[1.02] z-10"
          : "border-border/60 hover:border-brand/35 hover:shadow-card"
      } ${pkg.highlight && !selected ? "ring-1 ring-brand/20" : ""}`}
    >
      <div className={`h-1.5 w-full ${pkg.color}`} aria-hidden />

      {pkg.badge && (
        <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-foreground shadow-sm">
          {pkg.badge}
        </span>
      )}

      <div className="flex flex-1 flex-col p-6 pt-5">
        <div className="flex items-start justify-between gap-3 pr-16">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
              {pkg.label}
            </h3>
            {pkg.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {pkg.description}
              </p>
            )}
          </div>
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
              selected
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border bg-surface text-transparent group-hover:border-brand/40"
            }`}
          >
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold tabular-nums tracking-tight text-foreground">
              {formatRate(pkg.pricePerSqft)}
            </span>
            <span className="text-sm text-muted-foreground">{perSqftLabel}</span>
          </div>

          <div
            className={`mt-4 flex items-center justify-between rounded-2xl px-4 py-3 transition-colors ${
              selected ? "bg-brand/10" : "bg-surface group-hover:bg-brand/[0.06]"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Estimated total
            </span>
            <span className="font-display text-lg font-bold tabular-nums text-brand">
              {formatINR(total)}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
