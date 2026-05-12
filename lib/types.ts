export interface MenuItem {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number; // preço sem cadastro (padrão)
    priceMember: number; // preço com cadastro
    category: string;
}

export interface CartItem extends MenuItem {
    quantity: number;
    observation?: string;
}
