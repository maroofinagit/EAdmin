"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./datatable-features"
import { ArrowUpDown, MoreHorizontal, Clipboard, User, BadgeDollarSign, ShoppingBag } from "lucide-react"

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
import Link from "next/link";
import { Order } from "@/types/Order";
import { toast } from "sonner";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Order>()

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

    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            let colorClass = "";

            switch (status) {
                case "pending":
                    colorClass =
                        "bg-yellow-300 text-yellow-800 dark:bg-yellow-700 dark:text-white";
                    break;

                case "confirmed":
                    colorClass =
                        "bg-purple-300 text-purple-800 dark:bg-purple-700 dark:text-white";
                    break;

                case "processing":
                    colorClass =
                        "bg-blue-300 text-blue-800 dark:bg-blue-700 dark:text-white";
                    break;

                case "shipped":
                    colorClass =
                        "bg-indigo-300 text-indigo-800 dark:bg-indigo-700 dark:text-white";
                    break;

                case "delivered":
                    colorClass =
                        "bg-green-300 text-green-800 dark:bg-green-700 dark:text-white";
                    break;

                case "cancelled":
                    colorClass =
                        "bg-red-200 text-red-900 dark:bg-red-700 dark:text-white";
                    break;

                default:
                    colorClass = "";
            }

            return (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}
                >
                    {status}
                </span>
            );
        },
    }),

    columnHelper.accessor("id", {
        header: "Order ID",
        cell: ({ row }) => (
            <div className="font-medium">
                <Link href={`/orders/${row.original.id}`} className="underline-offset-4 hover:underline">
                    {row.original.id}
                </Link>
            </div>
        ),
    }),

    columnHelper.accessor("userId", {
        header: "User ID",
        cell: ({ row }) => (
            <div className="font-medium">
                <Link href={`/users/${row.original.userId}`} className="underline-offset-4 hover:underline">
                    {row.original.userId}
                </Link>
            </div>
        ),
    }),

    columnHelper.display({
        id: "items",
        header: "Items",
        cell: ({ row }) => {
            const items = row.original.items;

            return (
                <div className="font-medium">
                    {items.reduce(
                        (total, item) => total + item.quantity,
                        0
                    )}
                </div>
            );
        },
    }),

    columnHelper.accessor("total", {
        header: "Total",
        cell: ({ row }) => {
            const total = row.getValue("total") as number;

            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(total);

            return (
                <div className="font-medium">
                    {formatted}
                </div>
            );
        },
    }),

    columnHelper.accessor("createdAt", {
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
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));

            return (
                <div>
                    {date.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </div>
            );
        },
    }),

    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const order = row.original;

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
                        align="center"
                        side="bottom"
                        className="w-full"
                    >
                        <DropdownMenuGroup className="w-full gap-y-2 flex flex-col">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={async () => {
                                    try {
                                        await navigator.clipboard.writeText(order.id);
                                        toast.success("Order ID copied to clipboard");
                                    } catch {
                                        toast.error("Failed to copy Order ID");
                                    }
                                }}
                            >
                                <Clipboard className="h-4 w-4" />
                                Copy order ID
                            </DropdownMenuItem>



                            <DropdownMenuItem className="cursor-pointer">
                                <ShoppingBag className="h-4 w-4" />
                                <Link
                                    href={`/orders/${order.id}`}
                                    className="h-full w-full"
                                >
                                    View order details
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="cursor-pointer">
                                <User className="h-4 w-4" />
                                <Link
                                    href={`/users/${order.userId}`}
                                    className="h-full w-full"
                                >
                                    View user details
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }),
]);