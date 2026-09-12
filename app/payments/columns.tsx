"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./datatable-features"
import { ArrowUpDown, MoreHorizontal, Clipboard, User, BadgeDollarSign } from "lucide-react"

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
import { Payment } from "@/types/Payment";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>()

export const columns = columnHelper.columns([
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

    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            let colorClass = ""
            switch (status) {
                case "pending":
                    colorClass = "bg-yellow-300 text-yellow-800 dark:text-white dark:bg-yellow-700"
                    break
                case "processing":
                    colorClass = "bg-blue-300 text-blue-800 dark:text-white dark:bg-blue-700"
                    break
                case "success":
                    colorClass = "bg-green-300 text-green-800 dark:text-white dark:bg-green-700"
                    break
                case "failed":
                    colorClass = "bg-red-200 text-red-900 dark:text-white dark:bg-red-700"
                    break
                default:
                    colorClass = ""
            }

            return (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${colorClass}`}
                >
                    {status}
                </span>
            )
        },
    }),
    columnHelper.accessor("email", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    }),
    columnHelper.accessor("amount", {
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="font-medium text-xs md:text-sm">{formatted}</div>
        },
    }),
    columnHelper.accessor("fullName", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className='flex items-center p-0 text-xs md:text-sm'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full Name
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },

    }),
    columnHelper.accessor("userId", {
        header: "User ID",
        cell: ({ row }) => {
            const userId = row.getValue("userId") as string

            return (
                <div className="font-medium text-xs md:text-sm">
                    <Link href={`/users/${userId}`} className="underline-offset-4 hover:underline">
                        {userId}
                    </Link>
                </div>
            )
        },
    }),
    columnHelper.display({
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        }
                    />

                    <DropdownMenuContent align="center" side="bottom" className="w-full flex flex-col gap-2">

                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem
                            className="cursor-pointer"
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                <Clipboard className="h-4 w-4" />
                                Copy payment ID
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                                <User className="h-4 w-4" />
                            <Link href={`/users/${payment.userId}`} className="w-full h-full">

                                View User details
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer">
                            <BadgeDollarSign className=" h-4 w-4" />
                            View payment details
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }),
])