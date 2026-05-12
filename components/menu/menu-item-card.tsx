"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import type { MenuItem } from "@/lib/types";
import Cacaulogo from "../../public/cacau-logo.svg";

interface MenuItemCardProps {
    item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const { addItem, isMember, setIsMember } = useCart();

    const selectedPrice = isMember ? item.priceMember : item.price;

    const handleAdd = () => {
        setIsAdding(true);
        addItem(item, quantity);
        setTimeout(() => {
            setIsAdding(false);
            setQuantity(1);
        }, 300);
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-foreground text-lg leading-tight">
                    {item.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
                </p>

                {/* Toggle cadastro */}
                <div className="mt-3 flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
                    <button
                        onClick={() => setIsMember(true)}
                        className={`flex-1 text-xs py-1.5 px-2 rounded-md transition-all font-bold inline-flex items-center justify-center gap-1 ${
                            isMember
                                ? "bg-primary shadow text-primary-foreground"
                                : "text-muted-foreground"
                        }`}
                    >
                        <Image
                            src={Cacaulogo}
                            alt="cacau-logo"
                            className="w-7 h-7 "
                        />
                        Com cadastro
                    </button>
                    <button
                        onClick={() => setIsMember(false)}
                        className={`flex-1 text-xs py-1.5 px-2 rounded-md transition-all font-medium ${
                            !isMember
                                ? "bg-card shadow text-foreground"
                                : "text-muted-foreground"
                        }`}
                    >
                        Sem cadastro
                    </button>
                </div>

                {/* Preços */}
                <div className="mt-2 flex items-center gap-3">
                    <span className="text-lg font-bold text-primary">
                        {formatPrice(selectedPrice)}
                    </span>
                    {isMember && (
                        <span className="text-xs text-muted-foreground line-through">
                            {formatPrice(item.price)}
                        </span>
                    )}
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center bg-secondary rounded-lg">
                        <button
                            onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                            }
                            className="p-2 hover:bg-muted rounded-l-lg transition-colors"
                            aria-label="Diminuir quantidade"
                        >
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <span className="w-8 text-center font-medium text-foreground">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 hover:bg-muted rounded-r-lg transition-colors"
                            aria-label="Aumentar quantidade"
                        >
                            <Plus className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>
                    <Button
                        onClick={handleAdd}
                        size="sm"
                        className={`transition-all ${isAdding ? "scale-95 bg-accent" : ""}`}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
