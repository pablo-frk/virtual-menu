"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import Cacaulogo from "../../public/cacau-logo.svg";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, totalPrice, updateQuantity, removeItem, clearCart, isMember, setIsMember } =
        useCart();
    const [customerName, setCustomerName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [observations, setObservations] = useState("");
    const [cpf, setCpf] = useState("");

    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .slice(0, 14);
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    const generateWhatsAppMessage = () => {
        const E = {
            pedido: "\uD83D\uDECD\uFE0F", // 🛍️
            cliente: "\uD83D\uDC64", // 👤
            pagamento: "\uD83D\uDCB3", // 💳
            itens: "\uD83D\uDCCB", // 📋
            total: "\uD83D\uDCB0", // 💰
            obs: "\uD83D\uDCDD", // 📝
            fim: "\u2728", // ✨
        };

        const lines: string[] = [];

        lines.push(`${E.pedido} *NOVO PEDIDO - Cacau Show*`);
        lines.push(``);
        lines.push(
            `${E.cliente} *Cliente:* ${customerName || "Não informado"}`,
        );
        lines.push(
            `${E.pagamento} *Pagamento:* ${paymentMethod || "Não informado"}`,
        );
        lines.push(``);
        lines.push(`${E.itens} *ITENS DO PEDIDO:*`);
        lines.push(
            `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
        );

        items.forEach((item) => {
            const price = isMember ? item.priceMember : item.price;
            lines.push(``);
            lines.push(`\u2022 *${item.quantity}x ${item.name}*`);
            lines.push(`  ${formatPrice(price)} cada`);
            lines.push(
                `  Subtotal: ${formatPrice(price * item.quantity)}`,
            );
            if (item.observation) {
                lines.push(`  ${E.obs} Obs: ${item.observation}`);
            }
        });

        lines.push(``);
        lines.push(
            `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
        );
        lines.push(`${E.total} *TOTAL: ${formatPrice(totalPrice)}*`);

        if (observations) {
            lines.push(``);
            lines.push(`${E.obs} *Observações gerais:*`);
            lines.push(observations);
        }

        lines.push(``);
        lines.push(`${E.fim} Obrigado pela preferência!`);

        const message = lines.join("\n");
        return encodeURIComponent(message);
    };

    const handleSendWhatsApp = () => {
        const E = {
            pedido: "\uD83D\uDCE6", // 📦
            cliente: "\uD83D\uDC64", // 👤
            pagamento: "\uD83D\uDCB3", // 💳
            cpf: "\uD83C\uDD94", // 🆔
            itens: "\uD83D\uDCCB", // 📋
            total: "\uD83D\uDCB0", // 💰
            obs: "\uD83D\uDCDD", // 📝
            fim: "\u2728", // ✨
        };

        const lines = [
            `${E.pedido} *NOVO PEDIDO - Cacau Show*`,
            ``,
            `${E.cliente} *Cliente:* ${customerName || "Não informado"}`,
            cpf ? `${E.cpf} *CPF:* ${cpf}` : `${E.cpf} *CPF:* Não informado`,
            `${E.pagamento} *Pagamento:* ${paymentMethod || "Não informado"}`,
            `\uD83C\uDD94 *Tipo:* ${isMember ? "Com cadastro" : "Sem cadastro"}`,
            observations ? `${E.obs} *Observações:* ${observations}` : "",
            ``,
            `${E.itens} *ITENS DO PEDIDO:*`,
        ].filter((line) => line !== null);

        items.forEach((item) => {
            const price = isMember ? item.priceMember : item.price;
            lines.push(`\u2022 *${item.quantity}x ${item.name}*`);
            lines.push(`  ${formatPrice(price)} cada`);
        });

        lines.push(``);
        lines.push(`${E.total} *TOTAL: ${formatPrice(totalPrice)}*`);
        lines.push(``);
        lines.push(`${E.fim} Obrigado pela preferência!`);

        const raw = lines.join("\n");
        const phoneNumber = "5575998701108";
        window.open(
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(raw)}`,
            "_blank",
        );
    };

    const handleConfirmOrder = () => {
        handleSendWhatsApp();
        clearCart();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-lg font-bold text-foreground">
                        Seu Carrinho
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        aria-label="Fechar carrinho"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Toggle cadastro no carrinho */}
                <div className="px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
                        <button
                            onClick={() => setIsMember(true)}
                            className={`flex-1 text-xs py-2 px-3 rounded-md transition-all font-bold inline-flex items-center justify-center gap-1.5 ${
                                isMember
                                    ? "bg-primary shadow text-primary-foreground"
                                    : "text-muted-foreground"
                            }`}
                        >
                            <Image
                                src={Cacaulogo}
                                alt="cacau-logo"
                                className="w-6 h-6"
                            />
                            Com cadastro
                        </button>
                        <button
                            onClick={() => setIsMember(false)}
                            className={`flex-1 text-xs py-2 px-3 rounded-md transition-all font-medium ${
                                !isMember
                                    ? "bg-card shadow text-foreground"
                                    : "text-muted-foreground"
                            }`}
                        >
                            Sem cadastro
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                <MessageCircle className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">
                                Seu carrinho está vazio
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Adicione itens do cardápio
                            </p>
                        </div>
                    ) : (
                        <div className="p-4 space-y-4">
                            {/* Cart Items */}
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 bg-secondary/50 rounded-xl p-3"
                                >
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-foreground text-sm truncate">
                                            {item.name}
                                        </h3>
                                        <p className="text-primary font-bold text-sm mt-1">
                                            {formatPrice(
                                                (isMember ? item.priceMember : item.price) * item.quantity,
                                            )}
                                        </p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center bg-card rounded-lg border border-border">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                    className="p-1.5 hover:bg-muted rounded-l-lg transition-colors"
                                                    aria-label="Diminuir quantidade"
                                                >
                                                    <Minus className="w-3 h-3 text-muted-foreground" />
                                                </button>
                                                <span className="w-6 text-center text-sm font-medium text-foreground">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                    className="p-1.5 hover:bg-muted rounded-r-lg transition-colors"
                                                    aria-label="Aumentar quantidade"
                                                >
                                                    <Plus className="w-3 h-3 text-muted-foreground" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                                className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                                aria-label="Remover item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Customer Info */}
                            <div className="space-y-3 pt-4 border-t border-border">
                                <h3 className="font-semibold text-foreground">
                                    Dados do Pedido
                                </h3>
                                <Input
                                    placeholder="Seu nome"
                                    value={customerName}
                                    onChange={(e) =>
                                        setCustomerName(e.target.value)
                                    }
                                    className="bg-secondary/50"
                                />
                                <Input
                                    placeholder="Forma de pagamento (Pix, Cartão, Dinheiro)"
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="bg-secondary/50"
                                />

                                <Input
                                    placeholder="CPF (caso tenha cadastro Cacau Show)"
                                    value={cpf}
                                    onChange={(e) =>
                                        setCpf(formatCPF(e.target.value))
                                    }
                                    className="bg-secondary/50"
                                    inputMode="numeric"
                                />
                                <Input
                                    placeholder="Observações gerais (opcional)"
                                    value={observations}
                                    onChange={(e) =>
                                        setObservations(e.target.value)
                                    }
                                    className="bg-secondary/50"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-border bg-card">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-muted-foreground">Total</span>
                            <span className="text-2xl font-bold text-foreground">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>
                        <Button
                            onClick={handleConfirmOrder}
                            className="w-full h-12 text-base font-semibold gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                            size="lg"
                        >
                            <Send className="w-5 h-5" />
                            Enviar Pedido via WhatsApp
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
