"use client";

import { useState } from "react";
import CategoryPill from "./CategoryPill";

interface CategoryItem {
  id: string;
  label: string;
}

interface CategorySliderProps {
  categories: CategoryItem[];
  activeId: string;
  onSelect: (id: string) => void;
  isMobile: boolean;
}

export default function CategorySlider({ categories, activeId, onSelect, isMobile }: CategorySliderProps) {
  const [isPaused, setIsPaused] = useState(false);

  // --- Mobile: scroll nativo ---
  if (isMobile) {
    return (
      <div className="w-full overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
        <div className="flex gap-2 w-fit">
          {categories.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.label}
              isActive={cat.id === activeId}
              onClick={() => onSelect(cat.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // --- Desktop: CSS animation marquee ---
  const doubled = [...categories, ...categories];

  return (
    <div
      className="w-full overflow-hidden pb-0.5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex gap-3 w-fit animate-marquee"
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {doubled.map((cat, i) => (
          <CategoryPill
            key={`${cat.id}-${i}`}
            label={cat.label}
            isActive={cat.id === activeId}
            onClick={() => onSelect(cat.id)}
          />
        ))}
      </div>
    </div>
  );
}
