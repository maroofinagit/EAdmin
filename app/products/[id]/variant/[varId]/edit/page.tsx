import EditVariantClient from "@/components/EditVariant";
import { getColors } from "@/data/Colors";
import { getProducts } from "@/data/Products";
import { BagSizes, ClothingSizes, ProductColorOption, ProductVariantColor, ShoeSizes } from "@/types/Product";

export default async function EditVariantPage({ params }: { params: Promise<{ id: string, varId: string }> }) {

    const { id, varId } = await params;
    console.log("EditVariantPage params:", { id, varId });
    const product = await getProducts().then(products => products.find(product => product.id === id));
    if (product === undefined) {
        return <div className="h-full flex items-center justify-center">Product not found</div>;
    }
    const productVariant = product?.variants.find(variant => variant.id === varId);
    if (productVariant === undefined) {
        return <div className="h-full flex items-center justify-center">Variant not found</div>;
    }
    const allColors: ProductColorOption[] = await getColors();
    const allSizes = product.category === 'Clothing' ? ClothingSizes : product.category === 'Shoes' ? ShoeSizes : product.category === 'Bags' ? BagSizes : null;
    return (
        <EditVariantClient product={product} productVariant={productVariant} colors={allColors} sizes={allSizes} />
    );
}