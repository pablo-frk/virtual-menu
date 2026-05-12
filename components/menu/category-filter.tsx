"use client"

import { cn } from "@/lib/utils"
import { categories } from "@/lib/menu-data"

interface CategoryFilterProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="sticky top-[73px] z-30 bg-background py-3 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-secondary border border-border"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
