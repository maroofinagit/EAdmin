import AddProductClient from "@/components/AddProductClient";
import { getColors } from "@/data/Colors";
import {
    ProductCategory,
    Gender,
    ShoeSizes,
    BagSizes,
    AccessorySizes,
    ClothingSizes,
    ClothingType,
    ShoeType,
    BagType,
    AccessoryType,
} from "@/types/Product";


export default async function AddProductPage() {
    const colors =  await getColors();

    const types = [
        ...ClothingType,
        ...ShoeType,
        ...BagType,
        ...AccessoryType,
    ];

    const sizesByCategory = {
        Clothing: ClothingSizes,
        Shoes: ShoeSizes,
        Bags: BagSizes,
        Accessories: AccessorySizes,
    };

    const categories = ProductCategory;
    const genders = Gender;
    
    const typesByCategory = {
        Clothing: ClothingType,
        Shoes: ShoeType,
        Bags: BagType,
        Accessories: AccessoryType,
    };

    return (
        <AddProductClient
            categories={categories}
            genders={genders}
            types={types}
            sizesByCategory={sizesByCategory}
            colors={colors}
            typesByCategory={typesByCategory}
        />
    );
}