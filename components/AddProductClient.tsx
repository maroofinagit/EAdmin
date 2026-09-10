"use client";

import { useMemo, useState } from "react";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AccessorySize, AccessoryType, BagSize, BagType, ClothingSize, ClothingType, Gender, Product, ProductCategory, ProductColor, ProductColorOption, ProductSize, ProductSizeVariant, ProductType, ShoeSize, ShoeType } from "@/types/Product";


interface AddProductProps {
    categories: readonly ProductCategory[];
    genders: readonly Gender[];

    types: readonly string[];

    colors: readonly ProductColorOption[];

    sizesByCategory: {
        Clothing: readonly ClothingSize[];
        Shoes: readonly ShoeSize[];
        Bags: readonly BagSize[];
        Accessories: readonly AccessorySize[];
    };

    typesByCategory: {
        Clothing: readonly ClothingType[];
        Shoes: readonly ShoeType[];
        Bags: readonly BagType[];
        Accessories: readonly AccessoryType[];
    };

}

export default function AddProductClient({
    categories,
    genders,
    colors,
    sizesByCategory,
    typesByCategory,
}: AddProductProps) {
    /* -------------------------------------------------
       Product Details
    ------------------------------------------------- */

    const [name, setName] = useState("");
    const [category, setCategory] = useState<ProductCategory>("Clothing");
    const [gender, setGender] = useState<Gender>('Men');
    const [type, setType] = useState<ProductType>('T-Shirt');

    const [brand, setBrand] = useState("");
    const [material, setMaterial] = useState("");

    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");

    const [tags, setTags] = useState("");

    const [isFeatured, setIsFeatured] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const [discount, setDiscount] = useState<Product["discount"]>(0);

    const router = useRouter();

    /* -------------------------------------------------
       First Variant
    ------------------------------------------------- */

    const [color, setColor] = useState<ProductColor | "">("");
    const [price, setPrice] = useState("");

    const [selectedSizes, setSelectedSizes] = useState<
        ProductSizeVariant[]
    >([]);

    const [images, setImages] = useState<string[]>([]);

    /* -------------------------------------------------
       Sizes
    ------------------------------------------------- */

    const availableSizes = useMemo(() => {
        if (!category) return [];

        return sizesByCategory[category] ?? [];
    }, [category, sizesByCategory]);

    /* -------------------------------------------------
       Handlers
    ------------------------------------------------- */

    const handleCategoryChange = (
        value: ProductCategory
    ) => {
        setCategory(value);

        // Category determines available sizes.
        // Clear previous selections when category changes.
        setSelectedSizes([]);

        // Type is also category-dependent in most catalogs.
        setType("T-Shirt");
    };

    const handleToggleSize = (
        size: ProductSize,
        checked: boolean
    ) => {
        if (checked) {
            setSelectedSizes((current) => [
                ...current,
                {
                    size,
                    stock: 0,
                },
            ]);

            return;
        }

        setSelectedSizes((current) =>
            current.filter((item) => item.size !== size)
        );
    };

    const handleStockChange = (
        size: ProductSize,
        stock: number
    ) => {
        setSelectedSizes((current) =>
            current.map((item) =>
                item.size === size
                    ? {
                        ...item,
                        stock,
                    }
                    : item
            )
        );
    };

    const handleAddImage = () => {
        const url = window.prompt(
            "Enter image URL"
        );

        if (!url) return;

        setImages((current) => [
            ...current,
            url,
        ]);
    };

    const handleRemoveImage = (
        index: number
    ) => {
        setImages((current) =>
            current.filter(
                (_, imageIndex) =>
                    imageIndex !== index
            )
        );
    };

    /* -------------------------------------------------
       Submit
    ------------------------------------------------- */

    const resetForm = () => {
        setName("");
        setCategory("Clothing");
        setGender("Men");
        setType("T-Shirt");

        setBrand("");
        setMaterial("");

        setShortDescription("");
        setDescription("");

        setTags("");
        setDiscount(0);

        setIsFeatured(false);
        setIsNew(false);
        setIsActive(true);

        setColor("");
        setPrice("");

        setSelectedSizes([]);
        setImages([]);
    };

    const handleSubmit = (
        event: React.SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!category) {
            alert("Please select a category.");
            return;
        }

        if (!gender) {
            alert("Please select a gender.");
            return;
        }

        if (!type) {
            alert("Please select a product type.");
            return;
        }

        if (!color) {
            alert("Please select a variant color.");
            return;
        }

        if (!price || Number(price) < 0) {
            alert("Please enter a valid variant price.");
            return;
        }

        if (selectedSizes.length === 0) {
            alert(
                "Please select at least one size."
            );
            return;
        }

        if (images.length === 0) {
            alert(
                "Please add at least one variant image."
            );
            return;
        }

        const selectedColor = colors.find(
            (item) => item.name === color
        );

        if (!selectedColor) {
            alert("Invalid color.");
            return;
        }

        const product: Product = {
            id: crypto.randomUUID(),

            name: name.trim(),

            category,
            gender,
            type,

            // The main product price mirrors the
            // first variant price initially.

            variants: [
                {
                    id: crypto.randomUUID(),

                    color: selectedColor,

                    images,

                    sizes: selectedSizes,

                    price: Number(price),
                },
            ],

            brand: brand.trim(),

            material:
                material.trim(),

            rating: 0,
            reviews: 0,

            description:
                description.trim(),

            shortDescription:
                shortDescription.trim(),

            tags: tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),

            isFeatured,
            isNew,
            isActive,

            discount: Number(discount),

            lastUpdated:
                new Date().toISOString(),
        };

        console.log("New product created:", product);

        toast.success("Product created successfully!");
        resetForm();
        router.push("/products");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-12 py-12 max-w-5xl mx-auto"
        >
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
                        <BreadcrumbPage>Add a product</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">
                        Product Information
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Add the basic information and
                        specifications for this product.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Product Name */}

                    <div className="space-y-2 flex-col flex">
                        <label className="text-sm font-medium">
                            Product Name{" "}
                            <span className="text-destructive">
                                *
                            </span>
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            placeholder="Enter product name"
                            required
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Category / Gender / Type */}

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2 flex-col flex">
                            <label className="text-sm font-medium">
                                Category{" "}
                                <span className="text-destructive">
                                    *
                                </span>
                            </label>

                            <select
                                value={category}
                                onChange={(event) =>
                                    handleCategoryChange(
                                        event.target
                                            .value as ProductCategory
                                    )
                                }
                                required
                                className="h-10 w-full cursor-pointer rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">
                                    Select category
                                </option>

                                {categories.map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="space-y-2 flex-col flex">
                            <label className="text-sm font-medium">
                                Gender{" "}
                                <span className="text-destructive">
                                    *
                                </span>
                            </label>

                            <select
                                value={gender}
                                onChange={(event) =>
                                    setGender(
                                        event.target
                                            .value as Gender
                                    )
                                }
                                required
                                className="h-10 w-full cursor-pointer rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">
                                    Select gender
                                </option>

                                {genders.map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="space-y-2 flex-col flex">
                            <label className="text-sm font-medium">
                                Product Type{" "}
                                <span className="text-destructive">
                                    *
                                </span>
                            </label>

                            <select
                                value={type}
                                onChange={(event) =>
                                    setType(
                                        event.target.value as ProductType
                                    )
                                }
                                required
                                className="h-10 w-full cursor-pointer rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">
                                    Select type
                                </option>

                                {typesByCategory[category]?.map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    {/* Brand / Material */}

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2 flex-col flex">
                            <label className="text-sm font-medium">
                                Brand{" "}
                                <span className="text-destructive">
                                    *
                                </span>
                            </label>

                            <input
                                type="text"
                                value={brand}
                                onChange={(event) =>
                                    setBrand(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter brand"
                                required
                                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        <div className="space-y-2 flex-col flex">
                            <label className="text-sm font-medium">
                                Material
                            </label>

                            <input
                                type="text"
                                value={material}
                                onChange={(event) =>
                                    setMaterial(
                                        event.target.value
                                    )
                                }
                                placeholder="e.g. Cotton"
                                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>

                    {/* Short Description */}

                    <div className="space-y-2 flex-col flex">
                        <label className="text-sm font-medium">
                            Short Description{" "}
                            <span className="text-destructive">
                                *
                            </span>
                        </label>

                        <input
                            type="text"
                            value={shortDescription}
                            onChange={(event) =>
                                setShortDescription(
                                    event.target.value
                                )
                            }
                            placeholder="Brief description of the product"
                            required
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Description */}

                    <div className="space-y-2 flex-col flex">
                        <label className="text-sm font-medium">
                            Description{" "}
                            <span className="text-destructive">
                                *
                            </span>
                        </label>

                        <textarea
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                            placeholder="Describe the product in detail"
                            rows={5}
                            required
                            className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Tags */}

                    <div className="space-y-2 flex-col flex">
                        <label className="text-sm font-medium">
                            Tags
                        </label>

                        <input
                            type="text"
                            value={tags}
                            onChange={(event) =>
                                setTags(
                                    event.target.value
                                )
                            }
                            placeholder="summer, casual, cotton"
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />

                        <p className="text-xs text-muted-foreground">
                            Separate tags with commas.
                        </p>
                    </div>

                    {/* Discount */}

                    <div className="space-y-2 flex-col flex">
                        <label className="text-sm font-medium">
                            Discount
                        </label>

                        <input
                            type="number"
                            min={0}
                            max={100}
                            value={discount}
                            onChange={(event) =>
                                setDiscount(
                                    event.target.valueAsNumber
                                )
                            }
                            placeholder="Enter discount percentage"
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />

                        <p className="text-xs text-muted-foreground">
                            Optional product-level discount percentage.
                        </p>
                    </div>

                    {/* Status */}

                    <div className="flex flex-wrap gap-6">
                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={isFeatured}
                                onChange={(event) =>
                                    setIsFeatured(
                                        event.target.checked
                                    )
                                }
                                className="h-4 w-4 cursor-pointer"
                            />

                            Featured product
                        </label>

                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={isNew}
                                onChange={(event) =>
                                    setIsNew(
                                        event.target.checked
                                    )
                                }
                                className="h-4 w-4 cursor-pointer"
                            />

                            New product
                        </label>

                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(event) =>
                                    setIsActive(
                                        event.target.checked
                                    )
                                }
                                className="h-4 w-4 cursor-pointer"
                            />

                            Active
                        </label>
                    </div>
                </div>
            </div>

            {/* =================================================
                FIRST VARIANT
            ================================================= */}

            <div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">
                        First Product Variant
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Every product must have at least one
                        variant. Define the color, price,
                        sizes, inventory and images.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Color */}

                    <div className="space-y-3 flex-col flex">
                        <label className="text-sm font-medium">
                            Color{" "}
                            <span className="text-destructive">
                                *
                            </span>
                        </label>

                        <select
                            value={color}
                            onChange={(event) =>
                                setColor(
                                    event.target
                                        .value as ProductColor
                                )
                            }
                            required
                            className="h-10 w-full cursor-pointer rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">
                                Select color
                            </option>

                            {colors.map((item) => (
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

                    <div className="space-y-3 flex-col flex">
                        <label className="text-sm font-medium">
                            Price{" "}
                            <span className="text-destructive">
                                *
                            </span>
                        </label>

                        <p className="text-sm text-muted-foreground">
                            Enter the base price for this
                            color variant.
                        </p>

                        <input
                            type="number"
                            min={0}
                            value={price}
                            onChange={(event) =>
                                setPrice(
                                    event.target.value
                                )
                            }
                            placeholder="Enter price"
                            required
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Sizes */}

                    <div className="space-y-4 flex-col flex">
                        <div>
                            <label className="text-sm font-medium">
                                Sizes{" "}
                                <span className="text-destructive">
                                    *
                                </span>
                            </label>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Select the available sizes and
                                specify stock for each one.
                            </p>
                        </div>

                        {!category && (
                            <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                                Select a category first to
                                see the available sizes.
                            </div>
                        )}

                        {category &&
                            availableSizes.map(
                                (item) => {
                                    const selectedSize =
                                        selectedSizes.find(
                                            (size) =>
                                                size.size ===
                                                item
                                        );

                                    return (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-md border p-3"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={
                                                    !!selectedSize
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    handleToggleSize(
                                                        item,
                                                        event
                                                            .target
                                                            .checked
                                                    )
                                                }
                                                className="h-4 w-4 cursor-pointer"
                                            />

                                            <span className="flex-1 text-sm">
                                                {item}
                                            </span>

                                            {selectedSize && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground">
                                                        Stock:
                                                    </span>

                                                    <input
                                                        type="number"
                                                        min={0}
                                                        value={
                                                            selectedSize.stock
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            handleStockChange(
                                                                item,
                                                                Number(
                                                                    event
                                                                        .target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className="h-9 w-24 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                            )}
                    </div>

                    {/* Images */}

                    <div className="space-y-4 flex-col flex">
                        <div>
                            <label className="text-sm font-medium">
                                Variant Images{" "}
                                <span className="text-destructive">
                                    *
                                </span>
                            </label>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Add images specific to this
                                color variant.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                            {images.map(
                                (
                                    image,
                                    index
                                ) => (
                                    <div
                                        key={`${image}-${index}`}
                                        className="group relative aspect-square overflow-hidden rounded-lg border"
                                    >
                                        <img
                                            src={image}
                                            alt={
                                                color
                                                    ? `${color} variant ${index +
                                                    1
                                                    }`
                                                    : `Variant ${index +
                                                    1
                                                    }`
                                            }
                                            className="size-full object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(
                                                    index
                                                )
                                            }
                                            className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-md bg-background/90 opacity-0 shadow transition-opacity group-hover:opacity-100"
                                        >
                                            <Trash2 className="size-4 text-destructive" />
                                        </button>
                                    </div>
                                )
                            )}

                            <button
                                type="button"
                                onClick={
                                    handleAddImage
                                }
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
                </div>
            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="flex items-center justify-end gap-3">

                <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm md:text-base font-medium hover:bg-green-700 border border-green-700 hover:border-green-700 dark:hover:bg-green-700 dark:hover:text-white dark:border-green-700 text-green-700 hover:text-white dark:text-green-600"
                >
                    <Plus className="size-4" />
                    Create Product
                </button>
            </div>

        </form>
    );
}