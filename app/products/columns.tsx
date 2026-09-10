"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal, Star, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { Product } from "@/types/Product";
import { DataTableFeatures } from "./datatable-features";
import { Checkbox } from "@/components/ui/checkbox";

const getTotalStock = (product: Product) => {
    return product.variants.reduce((total, variant) => total + variant.sizes.reduce((t, s) => t + s.stock, 0), 0);
};

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const columns: ColumnDef<DataTableFeatures, Product>[] = [
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }),
    {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => {
            const product = row.original;
            const productId = row.original.id;

            return (
                <div className="flex items-center gap-4">
                    <img
                        src={product.variants[0]?.images[0] || "/placeholder.png"}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                    />

                    <Link href={`/products/${productId}`} className="font-medium underline-offset-4 hover:underline">
                        {product.name}
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: "type",
        header: "Type",
    },

    {
        accessorKey: "gender",
        header: "Gender",
    },

    {
        accessorKey: "brand",
        header: "Brand",
    },

    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = row.original.variants.reduce((minPrice, variant) => {
                return Math.min(minPrice, variant.price);
            }, Infinity);

            return (
                <span>
                    ₹{price.toLocaleString("en-IN")}
                </span>
            );
        },
    },

    {
        id: "stock",
        header: "Stock",
        cell: ({ row }) => {
            const stock = getTotalStock(row.original);

            return (
                <span
                    className={
                        stock === 0
                            ? "text-red-500"
                            : stock < 10
                                ? "text-yellow-500"
                                : ""
                    }
                >
                    {stock}
                </span>
            );
        },
    },

    {
        id: "rating",
        header: "Rating",
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />

                    <span>{product.rating}</span>

                    <span className="text-muted-foreground">
                        ({product.reviews})
                    </span>
                </div>
            );
        },
    },

    {
        id: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const product = row.original;

            return (
                product.isActive ? (
                    <Badge className="bg-green-300 text-green-800 dark:text-white dark:bg-green-700">
                        Active
                    </Badge>
                ) : (
                    <Badge className="bg-red-300 text-red-800 dark:text-white dark:bg-red-700">
                        Inactive
                    </Badge>
                )
            );
        },
    },

    {
        id: "actions",
        cell: ({ row, table }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 cursor-pointer"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    } />

                    <DropdownMenuContent align="end" className="space-y-2 px-4 py-2">
                        <DropdownMenuItem render={
                            <Link href={`/products/${product.id}`}>
                                <Eye className="mr-2 h-4 w-4 cursor-pointer" />
                                View
                            </Link>
                        } />

                        <DropdownMenuItem render={
                            <Link href={`/products/${product.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4 cursor-pointer" />
                                Edit
                            </Link>
                        } />

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => {
                            table.options.meta?.handleDeleteRow({rowId: product.id, name : product.name});
                        }}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];