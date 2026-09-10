"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
    ArrowLeft,
    ImagePlus,
    Plus,
    Trash2,
} from "lucide-react";
import { ProductColor, ProductSize, ProductColorOption, BagSizes, ShoeSizes, ClothingSizes, Product, ProductSizeVariant } from "@/types/Product";
import { Separator } from "./ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { toast } from "sonner";

type AddVariantPageProps = {
    product: Product;
    colors: ProductColorOption[];
    sizes: (typeof ClothingSizes | typeof ShoeSizes | typeof BagSizes) | null;
};

export default function AddVariantPage({ product, colors, sizes }: AddVariantPageProps) {

    const [color, setColor] = useState<ProductColor | "">("");
    const [price, setPrice] = useState("");

    const [images, setImages] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<ProductSizeVariant[]>([]);
    const router = useRouter();

    const availableColors = useMemo(() => {
        const productColors = product.variants.map(
            (variant) => variant.color.hex
        );

        return colors.filter(
            (colorOption) =>
                !productColors.includes(colorOption.name)
        );
    }, [colors, product.variants]);

    if (!product) {
        return (
            <div className="flex min-h-100 flex-col items-center justify-center gap-4">
                <h1 className="text-xl font-semibold">
                    Product not found
                </h1>

                <p className="text-sm text-muted-foreground">
                    The product you're trying to add a variant to doesn't exist.
                </p>

                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
                >
                    <ArrowLeft className="size-4" />
                    Go Back
                </button>
            </div>
        );
    }

    const handleAddImage = () => {
        const url = window.prompt("Enter image URL");

        if (!url) return;

        setImages((current) => [...current, url]);
    };

    const handleRemoveImage = (index: number) => {
        setImages((current) =>
            current.filter((_, imageIndex) => imageIndex !== index)
        );
    };

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Submitting new variant for product:", product.id);

        if (!price || !color || selectedSizes.length === 0) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const variant = {
            color: colors.find((c) => c.name === color),
            sizes: selectedSizes,
            price: parseFloat(price),
            images,
        };

        console.log("New Variant:", variant);

        // Later:
        // await fetch(`/api/products/${productId}/variants`, {
        //     method: "POST",
        //     body: JSON.stringify(variant),
        // });
        toast.success("Variant added successfully!");
        router.push(`/products/${product.id}`);
    };

    return (
        <div className="mx-auto w-full max-w-5xl space-y-6 py-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<a href="/" />}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<a href="/products" />}>
                                    Products
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<a href={`/products/${product.id}`} />}>
                                    {product.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Add Variant</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div>
                        <h1 className="text-2xl font-semibold">
                            Add Variant
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Add a new variant for this product.
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Information */}
            <div className="rounded-xl border bg-card p-5">
                <div className="mb-4">
                    <h2 className="font-semibold">
                        Product
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Variant will be added to this product.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="text-xs text-muted-foreground">
                            Product
                        </p>

                        <p className="mt-1 font-medium">
                            {product.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-muted-foreground">
                            Category
                        </p>

                        <p className="mt-1 font-medium">
                            {product.category}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-muted-foreground">
                            Type
                        </p>

                        <p className="mt-1 font-medium">
                            {product.type}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-muted-foreground">
                            Gender
                        </p>

                        <p className="mt-1 font-medium">
                            {product.gender}
                        </p>
                    </div>
                </div>
            </div>

            {/* Variant Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <div className="rounded-xl border bg-card p-6 flex-col space-y-6 flex">
                    <div className="flex flex-col text-lg gap-1">
                        <h2 className="font-semibold ">
                            Variant Details
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Define the color, size and inventory details.
                        </p>
                    </div>

                    {/* Color */}
                    <div className="space-y-4 flex flex-col">

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">
                                Color <span className="text-destructive">*</span>
                            </label>

                            <span className="text-sm text-muted-foreground">
                                Select a color for this variant. Only colors not already used for this product will be available.
                            </span>
                        </div>

                        <select
                            value={color}
                            onChange={(event) =>
                                setColor(event.target.value as ProductColor)
                            }
                            className="h-10 w-full cursor-pointer rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">
                                Select color
                            </option>

                            {availableColors.map((item) => (
                                <option
                                    key={item.name}
                                    value={item.name}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div className="space-y-4 flex flex-col">

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">
                                Price <span className="text-destructive">*</span>
                            </label>

                            <span className="text-sm text-muted-foreground">
                                Enter the price for this variant. This is the base price before any discounts.
                            </span>
                        </div>

                        <input
                            type="number"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            placeholder="Enter price"
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Size */}
                    <div className="space-y-4 flex flex-col">

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">
                                Size <span className="text-destructive">*</span>
                            </label>

                            <span className="text-sm text-muted-foreground">
                                Select a size for this variant and specify the stock for each size.
                            </span>
                        </div>
                        <div className="space-y-3">
                            {sizes?.map((item) => {
                                const selectedSize = selectedSizes.find(
                                    (size) => size.size === item
                                );

                                return (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-md border p-3"
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 cursor-pointer rounded border text-primary"
                                            checked={!!selectedSize}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    setSelectedSizes((current) => [
                                                        ...current,
                                                        {
                                                            size: item,
                                                            stock: 0,
                                                        },
                                                    ]);
                                                } else {
                                                    setSelectedSizes((current) =>
                                                        current.filter(
                                                            (size) => size.size !== item
                                                        )
                                                    );
                                                }
                                            }}
                                        />

                                        <span className="flex-1 text-sm">
                                            {item}
                                        </span>

                                        {selectedSize && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-muted-foreground">
                                                    Stock :
                                                </span>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={selectedSize.stock}
                                                    onChange={(event) => {
                                                        const stock = Number(event.target.value);

                                                        setSelectedSizes((current) =>
                                                            current.map((size) =>
                                                                size.size === item
                                                                    ? {
                                                                        ...size,
                                                                        stock,
                                                                    }
                                                                    : size
                                                            )
                                                        );
                                                    }}
                                                    placeholder="Stock"
                                                    className="h-9 w-24 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>


                {/* Images */}
                <div className="rounded-xl border bg-card p-6">
                    <div className="mb-6">
                        <h2 className="font-semibold">
                            Variant Images
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Add images specific to this color variant.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                        {images.map((image, index) => (
                            <div
                                key={`${image}-${index}`}
                                className="group relative aspect-square overflow-hidden rounded-lg border"
                            >
                                <img
                                    src={image}
                                    alt={`${color} variant ${index + 1}`}
                                    className="size-full object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveImage(index)
                                    }
                                    className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-md bg-background/90 opacity-0 shadow transition-opacity group-hover:opacity-100"
                                >
                                    <Trash2 className="size-4 text-destructive" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed hover:bg-muted"
                        >
                            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                                <ImagePlus className="size-5" />
                            </div>

                            <span className="text-sm font-medium">
                                Add Image
                            </span>
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    >
                        <Plus className="size-4" />
                        Add Variant
                    </button>
                </div>
            </form>
        </div>
    );
}