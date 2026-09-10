export const ProductCategory = ["Clothing", "Shoes", "Bags", "Accessories"] as const;
export type ProductCategory = typeof ProductCategory[number];

export interface Category {
    id: string;
    name: ProductCategory;
    productCount: number;
    isActive: boolean;
}

export const Gender = ["Men", "Women", "Unisex"] as const;
export type Gender = typeof Gender[number];

export const ClothingType = [
    "T-Shirt",
    "Shirt",
    "Jeans",
    "Trousers",
    "Jacket",
    "Hoodie",
    "Top",
    "Dress"
] as const;

export type ClothingType = typeof ClothingType[number];

export const ShoeType = [
    "Sneakers",
    "Running Shoes",
    "Formal Shoes",
    "Heels",
    "Flats",
    "Sandals"
] as const; 
export type ShoeType = typeof ShoeType[number];

export const BagType = [
    "Backpack",
    "Laptop Bag",
    "Sling Bag",
    "Handbag",
    "Shoulder Bag"
] as const;

export type BagType = typeof BagType[number];

export const AccessoryType = [
    "Watch",
    "Belt",
    "Sunglasses",
    "Wallet",
    "Hat",
    "Scarf",
    "Jewelry"
] as const;
export type AccessoryType = typeof AccessoryType[number];

export const ProductType = [
    ...ClothingType,
    ...ShoeType,
    ...BagType,
    ...AccessoryType,
] as const;

export type ProductType = ClothingType | ShoeType | BagType | AccessoryType;

export type ProductColor =
    | "Black"
    | "White"
    | "Red"
    | "Blue"
    | "Navy Blue"
    | "Green"
    | "Olive"
    | "Yellow"
    | "Pink"
    | "Purple"
    | "Orange"
    | "Brown"
    | "Beige"
    | "Grey"
    | "Maroon";

export interface ProductColorOption {
    name: ProductColor;
    hex: string;
}

export const ClothingSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type ClothingSize = typeof ClothingSizes[number];

export const ShoeSizes = ["6", "7", "8", "9", "10", "11", "12"] as const;
export type ShoeSize = typeof ShoeSizes[number];

export const BagSizes = ["Small", "Medium", "Large"] as const;
export type BagSize = typeof BagSizes[number];

export const AccessorySizes = ["One Size"] as const;
export type AccessorySize = typeof AccessorySizes[number];

export type ProductSize = ClothingSize | ShoeSize | BagSize | AccessorySize;

export interface ProductVariantColor {
    color: ProductColorOption;
    images: string[];
    sizes: ProductSizeVariant[];
    price: number;
    id: string;
}

export interface ProductSizeVariant {
    size: ProductSize;
    stock: number;
}

export interface Product {
    id: string;
    name: string;

    category: ProductCategory;
    gender: Gender;
    type: ProductType;

    variants: ProductVariantColor[];

    brand: string;
    material: string;

    rating: number;
    reviews: number;

    description: string;
    shortDescription: string;

    tags: string[];

    isFeatured: boolean;
    isNew: boolean;
    isActive: boolean;
    discount: number;

    lastUpdated: string;
}
