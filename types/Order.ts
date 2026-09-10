import { ProductColorOption, ProductSize } from "./Product";

export type OrderStatus =
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

export type Order = {
    id: string;

    userId: string;

    items: OrderItem[];

    subtotal: number;
    shipping: number;
    total: number;

    status: OrderStatus;

    createdAt: string;
};

export type OrderItem = {
    id: string;

    productName: string;

    color: ProductColorOption;
    size: ProductSize;

    image?: string;

    price: number;
    quantity: number;
};