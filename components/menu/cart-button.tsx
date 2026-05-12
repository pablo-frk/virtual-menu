"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
  const { totalItems, totalPrice } = useCart()

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
      <div className="container mx-auto max-w-lg">
        <Button
          onClick={onClick}
          className="w-full h-14 rounded-xl shadow-lg text-base font-semibold flex items-center justify-between px-6"
          size="lg"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span>Ver Carrinho</span>
          </div>
          <span>{formatPrice(totalPrice)}</span>
        </Button>
      </div>
    </div>
  )
}
