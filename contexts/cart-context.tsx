"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { CartItem, MenuItem } from "@/lib/types"

interface CartContextType {
  items: CartItem[]
  addItem: (item: MenuItem, quantity?: number, observation?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateObservation: (id: string, observation: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isMember: boolean
  setIsMember: (value: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isMember, setIsMemberState] = useState(true)

  const setIsMember = useCallback((value: boolean) => {
    setIsMemberState(value)
  }, [])

  const addItem = (item: MenuItem, quantity = 1, observation?: string) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantity, observation: observation || i.observation }
            : i
        )
      }
      return [...prev, { ...item, quantity, observation }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const updateObservation = (id: string, observation: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, observation } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => {
      const price = isMember ? item.priceMember : item.price
      return sum + price * item.quantity
    },
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateObservation,
        clearCart,
        totalItems,
        totalPrice,
        isMember,
        setIsMember,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
