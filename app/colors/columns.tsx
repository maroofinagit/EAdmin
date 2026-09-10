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
import { ProductColorOption } from "@/types/Product";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, ProductColorOption>()

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
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    }),

    columnHelper.accessor("hex", {
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
                Hex Code
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <div
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: row.original.hex }}
                />
                <span>{row.original.hex}</span>
            </div>
        ),
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
                            <DropdownMenuLabel>
                                Actions
                            </DropdownMenuLabel>

                            <DropdownMenuItem className="cursor-pointer"
                                onClick={() => {
                                    table.options.meta?.handleEditRow({ rowHex: row.original.hex, name: row.original.name });
                                }}
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Color
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => {
                            table.options.meta?.handleDeleteRow({ rowHex: row.original.hex, name: row.original.name });
                        }}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Color
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            );
        },
    }),
]);