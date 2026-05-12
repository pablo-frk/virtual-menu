"use client";

import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import Cacaulogo from "../../public/cacau-logo.svg";

export function Header() {
    return (
        <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary bg-white">
                        <Image src={Cacaulogo} className="w-20 h-10 text-primary-foreground fill-current " alt="Cacau-Logo" />

                    </div>
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-foreground">
                            Cacau Show - Inhambupe
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Cardápio Digital
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
