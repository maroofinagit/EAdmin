"use client";

import { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AccessoryType, BagType, ClothingType, Gender, Product, ProductCategory, ProductType, ShoeType } from "@/types/Product";
import { Upload } from "lucide-react";


interface AddProductProps {
    categories: readonly ProductCategory[];
    genders: readonly Gender[];

    types: readonly string[];

    typesByCategory: {
        Clothing: readonly ClothingType[];
        Shoes: readonly ShoeType[];
        Bags: readonly BagType[];
        Accessories: readonly AccessoryType[];
    };

    product: Product;

}

export default function EditProductClient({
    categories,
    genders,
    typesByCategory,
    product
}: AddProductProps) {
    /* -------------------------------------------------
       Product Details
    ------------------------------------------------- */

    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState<ProductCategory>(product.category);
    const [gender, setGender] = useState<Gender>(product.gender);
    const [type, setType] = useState<ProductType>(product.type);

    const [brand, setBrand] = useState<Product["brand"]>(product.brand);
    const [material, setMaterial] = useState<Product["material"]>(product.material);

    const [shortDescription, setShortDescription] = useState<Product["shortDescription"]>(product.shortDescription);
    const [description, setDescription] = useState<Product["description"]>(product.description);

    const [tags, setTags] = useState<Product["tags"]>(product.tags);

    const [isFeatured, setIsFeatured] = useState<Product["isFeatured"]>(product.isFeatured);
    const [isNew, setIsNew] = useState<Product["isNew"]>(product.isNew);
    const [isActive, setIsActive] = useState<Product["isActive"]>(product.isActive);

    const [discount, setDiscount] = useState<Product["discount"]>(product.discount ?? "");

    const router = useRouter();

    /* -------------------------------------------------
       Handlers
    ------------------------------------------------- */

    const handleCategoryChange = (
        value: ProductCategory
    ) => {
        setCategory(value);
        setType("T-Shirt");
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

        setTags([]);
        setDiscount(0);

        setIsFeatured(false);
        setIsNew(false);
        setIsActive(true);

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

        const updatedProduct: Product = {
            id: product.id,
            name: name.trim(),

            category,
            gender,
            type,

            // The main product price mirrors the
            // first variant price initially

            brand: brand.trim(),

            material:
                material.trim(),

            rating: 0,
            reviews: 0,

            description:
                description.trim(),

            shortDescription:
                shortDescription.trim(),

            tags: tags.map((tag) => tag.trim()).filter((tag) => tag !== ""),

            isFeatured,
            isNew,
            isActive,

            discount:Number(discount),

            lastUpdated:
                new Date().toISOString(),

                variants: [],
        };
        
        toast.success("Product updated successfully!");
        resetForm();
        router.push(`/products/${product.id}`);
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
                        <BreadcrumbLink render={<a href={`/products/${product.id}`} />}>
                            {product.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Update a product</BreadcrumbPage>
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
                                    event.target.value.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "")
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
                ACTIONS
            ================================================= */}

            <div className="flex items-center justify-end gap-3">

                <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm md:text-base font-medium hover:bg-green-700 border border-green-700 hover:border-green-700 dark:hover:bg-green-700 dark:hover:text-white dark:border-green-700 text-green-700 hover:text-white dark:text-green-600"
                >
                    <Upload className="size-4" />
                    Update Product
                </button>
            </div>

        </form>
    );
}