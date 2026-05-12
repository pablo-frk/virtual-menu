"use client"

import { useState } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { Header } from "@/components/menu/header"
import { CategoryFilter } from "@/components/menu/category-filter"
import { MenuList } from "@/components/menu/menu-list"
import { CartButton } from "@/components/menu/cart-button"
import { CartDrawer } from "@/components/menu/cart-drawer"

function MenuContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <MenuList activeCategory={activeCategory} />
      <CartButton onClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default function Home() {
  return (
    <CartProvider>
      <MenuContent />
    </CartProvider>
  )
}
