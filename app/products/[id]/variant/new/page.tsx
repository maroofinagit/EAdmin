import AddVariantPage from "@/components/AddVariant";
import { getColors } from "@/data/Colors";
import { getProducts } from "@/data/Products";
import { BagSizes, ClothingSizes, ProductColorOption, ShoeSizes } from "@/types/Product";

export default async function NewVariantPage({ params, colors, sizes }: { params: Promise<{ id: string }>; colors: ProductColorOption[]; sizes: (typeof ClothingSizes | typeof ShoeSizes | typeof BagSizes)[] }) {

    const { id } = await params;
    const product = await getProducts().then(products => products.find(product => product.id === id));
    if (product === undefined) {
        return <div className="h-full flex items-center justify-center">Product not found</div>;
    }
    const allColors: ProductColorOption[] = await getColors();
    const allSizes = product.category === 'Clothing' ? ClothingSizes : product.category === 'Shoes' ? ShoeSizes : product.category === 'Bags' ? BagSizes : null;
    return (
        <AddVariantPage product={product} colors={allColors} sizes={allSizes} />
    );
}