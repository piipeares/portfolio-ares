"use client";
import { memo } from "react";

interface CategoryPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryPill = memo(function CategoryPill({ label, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.4em] px-4 md:px-5 py-2 md:py-2.5 rounded-full border transition-all duration-500 whitespace-nowrap ${
        isActive
          ? "border-fuchsia-500/40 text-fuchsia-400 bg-fuchsia-500/5 shadow-[0_0_20px_rgba(217,70,239,0.1)]"
          : "border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300"
      }`}
    >
      {label}
    </button>
  );
});

export default CategoryPill;
