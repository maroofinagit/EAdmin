import ProductClient from "@/components/ProductClient";
import { getProducts } from "@/data/Products";

export default async function ProoductPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params
    const product = await getProducts().then(products => products.find(product => product.id === id));

    if (product === undefined) {
        return <div>Product not found</div>;
    }

    return (
        <ProductClient product={product} />
    );
}