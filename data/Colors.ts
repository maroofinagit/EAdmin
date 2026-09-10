import { ProductColorOption } from "@/types/Product";

export const getColors = async (): Promise<ProductColorOption[]> => {
    return [
        {
            name: "Red",
            hex: "#FF0000",
        },
        {
            name: "Green",
            hex: "#00FF00",
        },
        {
            name: "Blue",
            hex: "#0000FF",
        },
        {
            name: "Yellow",
            hex: "#FFFF00",
        },
        {
            name: "Black",
            hex: "#000000",
        },
        {
            name: "White",
            hex: "#FFFFFF",
        },
        {
            name: "Brown",
            hex: "#A52A2A",
        },
        {
            name: "Orange",
            hex: "#FFA500",
        },
        {
            name: "Purple",
            hex: "#800080",
        },
        {
            name: "Pink",
            hex: "#FFC0CB",
        },
        {
            name: "Grey",
            hex: "#808080",
        },
        {
            name: "Beige",
            hex: "#F5F5DC",
        },
        {
            name: "Maroon",
            hex: "#800000",
        },
        {
            name: "Navy Blue",
            hex: "#000080",
        }
    ];
}
