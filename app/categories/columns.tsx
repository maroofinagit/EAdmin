"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./datatable-features"
import { ArrowUpDown, MoreHorizontal, Clipboard, User, BadgeDollarSign, Trash2, Pencil, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/Product";
import { useState } from "react";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Category>()

export const columns = columnHelper.columns([

    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomePageRowsSelected() &&
                    !table.getIsAllPageRowsSelected()
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) =>
                    row.toggleSelected(!!value)
                }
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }),

    columnHelper.accessor("name", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="flex items-center p-0"
                onClick={() =>
                    column.toggleSorting(
                        column.getIsSorted() === "asc"
                    )
                }
            >
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-medium text-xs md:text-sm">
                {row.getValue("name")}
            </div>
        ),
    }),

    columnHelper.accessor("productCount", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="flex items-center p-0"
                onClick={() =>
                    column.toggleSorting(
                        column.getIsSorted() === "asc"
                    )
                }
            >
                Products
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-medium text-xs md:text-sm">
                {row.getValue("productCount")}
            </div>
        ),
    }),

    columnHelper.accessor("isActive", {
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive") as boolean;

            return (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] md:text-xs font-semibold ${isActive
                        ? "bg-green-300 text-green-800 dark:bg-green-700 dark:text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
                        }`}
                >
                    {isActive ? "Active" : "Inactive"}
                </span>
            );
        },
    }),

    columnHelper.display({
        header: "Actions",
        id: "actions",
        cell: ({ row, table }) => {
            const category = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="ghost"
                                className="h-8 w-8 cursor-pointer p-0"
                            >
                                <span className="sr-only">
                                    Open menu
                                </span>

                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        }
                    />

                    <DropdownMenuContent
                        align="end"
                        side="bottom"
                        className="w-48"
                    >
                        <DropdownMenuGroup className="flex flex-col gap-2">
                            <DropdownMenuLabel
                            >
                                Actions
                            </DropdownMenuLabel>

                            <DropdownMenuItem className="cursor-pointer"
                                onClick={() => {
                                    table.options.meta?.handleEditRow({ rowId: row.original.id, name: row.original.name, productCount: row.original.productCount, isActive: row.original.isActive });
                                }}
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Category
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => {
                            table.options.meta?.handleDeleteRow({ rowId: row.original.id, name: row.original.name });
                        }}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Category
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            );
        },
    }),
]);