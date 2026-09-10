"use client";

import { Product } from "@/types/Product";
import {
    Edit,
    MoreHorizontal,
    Package,
    Plus,
    Star,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialogBox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductPageProps {
    product: Product;
}

export default function ProductClient({ product }: ProductPageProps) {

    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);

    const [dialogData, setDialogData] = useState<{
        title: string;
        description: string;
        type: "update" | "delete" | "default";
        onConfirm: () => void;
    } | null>(null);

    const [variants, setVariants] = useState(product.variants);
    console.log("ProductPage variants:", variants);

    const totalStock = product.variants.reduce(
        (total, variant) =>
            total +
            variant.sizes.reduce(
                (sizeTotal, size) => sizeTotal + size.stock,
                0
            ),
        0
    );

    const colors = variants.map(
        (variant) => variant.color
    );

    const sizes = [
        ...new Set(
            variants.flatMap((variant) =>
                variant.sizes.map(
                    (sizeVariant) => sizeVariant.size
                )
            )
        ),
    ];

    const handleDeleteVariant = (variantId: string) => {
        // Implement the logic to delete the variant here
        setDialogData({
            title: `Delete Variant ?`,
            description: `This action cannot be undone.`,
            type: "delete",
            onConfirm: () => {
                setVariants((prevVariants) => prevVariants.filter((variant) => variant.id !== variantId));
                setDialogOpen(false);
                toast.success(`Variant has been deleted.`);
            },
        });
        setDialogOpen(true);
    };

    const handleDeleteProduct = () => {
        // Implement the logic to delete the product here
        console.log(`Deleting product with ID: ${product.id}`);
        setDialogData({
            title: `Delete Product - ${product.name}?`,
            description: `This action cannot be undone.`,
            type: "delete",
            onConfirm: () => {
                // Implement the logic to delete the product here
                setDialogOpen(false);
                toast.success(`Product "${product.name}" has been deleted.`);
                router.push("/products");
            },
        });
        setDialogOpen(true);
    };

    return (
        <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="flex flex-col items-start">

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
                            <BreadcrumbPage>{product.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-col items-start lg:items-center lg:flex-row lg:gap-0 gap-4 justify-between w-full mt-8">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4">
                        <Link href={`/products/${product.id}/edit`} className="flex items-center justify-center gap-2 rounded-lg border dark:border-white border-black dark:hover:border-white hover:border-black bg-transparent px-3 py-2 text-sm font-medium hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
                            <Edit className="mr-2 size-4" />
                            Edit Product
                        </Link>

                        <button className='flex cursor-pointer items-center justify-center gap-2 rounded-lg border dark:border-red-400 border-red-600 dark:text-red-400 text-red-600 dark:hover:border-red-400 hover:border-red-600 bg-transparent px-3 py-2 text-sm font-medium hover:bg-red-600 dark:hover:bg-red-400 dark:hover:text-black hover:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
                            onClick={handleDeleteProduct}
                        >
                            <Package className="mr-2 size-4" />
                            Delete Product
                        </button>
                    </div>
                </div>
            </div>


            {/* Product overview */}
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <CardTitle>Product Information</CardTitle>
                                <CardDescription>
                                    Basic information about this product.
                                </CardDescription>
                            </div>

                            <div className="flex gap-2">
                                {product.isActive ? (
                                    <Badge variant="default" className="dark:bg-green-800 bg-green-300 text-black dark:text-white">
                                        Active
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary">
                                        Inactive
                                    </Badge>
                                )}

                                {product.isFeatured && (
                                    <Badge variant="outline">
                                        Featured
                                    </Badge>
                                )}

                                {product.isNew && (
                                    <Badge variant="outline">
                                        New
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Basic details */}
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoItem
                                label="Brand"
                                value={product.brand}
                            />

                            <InfoItem
                                label="Category"
                                value={product.category}
                            />

                            <InfoItem
                                label="Type"
                                value={product.type}
                            />

                            <InfoItem
                                label="Gender"
                                value={product.gender}
                            />

                            <InfoItem
                                label="Material"
                                value={product.material || "Not specified"}
                            />

                            <InfoItem
                                label="Product ID"
                                value={product.id}
                                mono
                            />
                        </div>

                        <Separator />

                        {/* Description */}
                        <div className="flex flex-col xl:flex-row items-center justify-between rounded-lg gap-8">
                            <div className="xl:w-1/3 aspect-4/5 h-80 relative rounded-lg overflow-hidden border p-2 bg-red-100">
                                <Image
                                    src={variants.length > 0 && variants[0].images.length > 0 ? variants[0].images[0] : "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png"}
                                    alt={product.name}
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                            <div className="space-y-4 h-full w-2/3">
                                <div>
                                    <h3 className="font-medium">
                                        Short Description
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                        {product.shortDescription}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium">
                                        Description
                                    </h3>

                                    <p className="mt-1 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Tags */}
                        <div>
                            <h3 className="mb-3 font-medium">Tags</h3>

                            <div className="flex flex-wrap gap-2">
                                {product.tags.length > 0 ? (
                                    product.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                        >
                                            {tag}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No tags added.
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Stats</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {/* <StatItem
                                label="Price"
                                value={`₹${product.price.toLocaleString("en-IN")}`}
                            /> */}

                            <StatItem
                                label="Total Variants"
                                value={product.variants.length.toString()}
                            />

                            <StatItem
                                label="Total Stock"
                                value={totalStock.toString()}
                            />

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Rating
                                </span>

                                <div className="flex items-center gap-1">
                                    <Star className="size-4 fill-current" />
                                    <span className="font-medium">
                                        {product.rating.toFixed(1)}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        ({product.reviews})
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Available Options</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <p className="mb-2 text-sm text-muted-foreground">
                                    Colors
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {colors.map((color) => (
                                        <Badge
                                            key={color.hex}
                                            variant="outline"
                                        >
                                            {color.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-muted-foreground">
                                    Sizes
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <Badge
                                            key={size}
                                            variant="outline"
                                        >
                                            {size}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Variants */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <CardTitle>Variants</CardTitle>
                            <CardDescription>
                                Manage the available color and size
                                combinations for this product.
                            </CardDescription>
                        </div>

                        <Link href={`/products/${product.id}/variant/new`} className="flex items-center justify-center gap-2 rounded-lg border dark:border-white border-black dark:hover:border-white hover:border-black bg-transparent px-3 py-2 text-sm font-medium hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
                            <Plus className="mr-2 size-4" />
                            Add Variant
                        </Link>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Color</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead className="w-15" />
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {variants.length > 0 ? (
                                    variants.flatMap((variant, variantIndex) =>
                                        variant.sizes.map((sizeVariant, sizeIndex) => (
                                            <TableRow
                                                key={variant.id}
                                            >
                                                {/* Color */}
                                                <TableCell>
                                                    <div className="flex items-center gap-4">
                                                        <span
                                                            className="size-5 rounded-full border border-gray-500"
                                                            style={{
                                                                backgroundColor:
                                                                    variant.color.hex,
                                                            }}
                                                            title={
                                                                variant.color.name
                                                            }
                                                        />

                                                        <span>
                                                            {variant.color.name}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                {/* Size */}
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {sizeVariant.size}
                                                    </Badge>
                                                </TableCell>

                                                {/* Price */}
                                                <TableCell>
                                                    ₹
                                                    {variant.price.toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </TableCell>

                                                {/* Stock */}
                                                <TableCell>
                                                    <StockBadge
                                                        stock={sizeVariant.stock}
                                                    />
                                                </TableCell>

                                                {/* Actions */}
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            render={
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="cursor-pointer"
                                                                >
                                                                    <MoreHorizontal className="size-4" />
                                                                </Button>
                                                            }
                                                        />

                                                        <DropdownMenuContent align="start" className=" space-y-2 p-2 w-full">
                                                            <DropdownMenuItem className="cursor-pointer">
                                                                <Edit className="mr-2 size-4" />
                                                                <Link href={`/products/${product.id}/variant/${variant.id}/edit`}>
                                                                    Edit Variant
                                                                </Link>
                                                            </DropdownMenuItem>

                                                            <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive"
                                                                onClick={() => handleDeleteVariant(variant.id)}
                                                            >
                                                                <Trash2 className="mr-2 size-4" />
                                                                Delete Variant
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="h-32 text-center"
                                        >
                                            <div className="space-y-2">
                                                <p className="font-medium">
                                                    No variants yet
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    Add a variant to start managing
                                                    inventory.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {dialogData && (
                <ConfirmDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    title={dialogData.title}
                    description={dialogData.description}
                    type={dialogData.type}
                    onConfirm={dialogData.onConfirm}
                />
            )}

            {/* Last updated */}
            <p className="text-right text-xs text-muted-foreground">
                Last updated:{" "}
                {new Date(product.lastUpdated).toLocaleString("en-IN")}
            </p>
        </div >
    );
}

/* -------------------------------------------------------------------------- */
/* Helper Components                                                          */
/* -------------------------------------------------------------------------- */

function InfoItem({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>

            <p className={mono ? "font-mono text-sm" : "font-medium"}>
                {value}
            </p>
        </div>
    );
}

function StatItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
                {label}
            </span>

            <span className="font-semibold">{value}</span>
        </div>
    );
}

function StockBadge({ stock }: { stock: number }) {
    if (stock === 0) {
        return (
            <Badge variant="destructive">
                Out of stock
            </Badge>
        );
    }

    if (stock <= 5) {
        return (
            <Badge variant="secondary">
                {stock} left
            </Badge>
        );
    }

    return (
        <span className="text-sm font-medium">
            {stock}
        </span>
    );
}