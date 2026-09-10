import EditProductClient from "@/components/EditProductClient";
import { getColors } from "@/data/Colors";
import { getProducts } from "@/data/Products";
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

export default async function AddProductPage({ params }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params
    const product = await getProducts().then(products => products.find(product => product.id === id));

    if (product === undefined) {
        return <div>Product not found</div>;
    }

    const colors = await getColors();

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
        <EditProductClient
            categories={categories}
            genders={genders}
            types={types}
            typesByCategory={typesByCategory}
            product={product}
        />
    );
}