import { Category } from "@/types/Product";

export const getCategories = async (): Promise<Category[]> => {
    return [
        {
            id: "1",
            name: "Clothing",
            productCount: 120,
            isActive: true,
        },
        {
            id: "2",
            name: "Shoes",
            productCount: 80,
            isActive: true,
        },
        {
            id: "3",
            name: "Bags",
            productCount: 50,
            isActive: false,
        },
        {
            id: "4",
            name: "Accessories",
            productCount: 30,
            isActive: true,
        },
    ];
}