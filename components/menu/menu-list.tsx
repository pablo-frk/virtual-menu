"use client"

import { menuItems, categories } from "@/lib/menu-data"
import { MenuItemCard } from "./menu-item-card"

interface MenuListProps {
  activeCategory: string
}

export function MenuList({ activeCategory }: MenuListProps) {
  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  const groupedItems =
    activeCategory === "all"
      ? categories
          .filter((cat) => cat.id !== "all")
          .map((category) => ({
            ...category,
            items: menuItems.filter((item) => item.category === category.id),
          }))
          .filter((group) => group.items.length > 0)
      : [
          {
            id: activeCategory,
            name:
              categories.find((c) => c.id === activeCategory)?.name ||
              activeCategory,
            items: filteredItems,
          },
        ]

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      {groupedItems.map((group) => (
        <section key={group.id} className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full" />
            {group.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
