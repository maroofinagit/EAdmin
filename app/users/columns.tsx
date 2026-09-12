"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./datatable-features"
import { ArrowUpDown, MoreHorizontal, Trash2, Clipboard ,UserIcon, BadgeDollarSign } from "lucide-react"

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
import Image from "next/image";
import { User } from "@/types/User";
import { toast } from "sonner";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, User>()

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
                case "active":
                    colorClass = "bg-green-300 text-green-800 dark:text-white dark:bg-green-700"
                    break
                case "inactive":
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

    columnHelper.accessor("fullName", {
        header: "Full Name",
        cell: ({ row }) => {
            const fullName = row.getValue("fullName") as string
            const avatarUrl = row.original.avatar
            return (
                <div className="flex items-center gap-4 text-xs md:text-sm">
                    <div className="relative size-8 md:size-10 rounded-full overflow-hidden">
                        <Image src={avatarUrl} alt="Avatar" fill className="object-cover rounded-full" />
                    </div>
                    <Link href={`/users/${row.original.id}`} className="font-medium underline-offset-4 hover:underline">
                        {fullName}
                    </Link>
                </div>
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
        cell: ({ row }) => {
            const email = row.getValue("email") as string
            return (
                <div className="font-medium text-xs md:text-sm">{email}</div>
            )
        },

    }),

    columnHelper.display({
        header: "Actions",
        id: "actions",
        cell: ({ row , table}) => {
            const userId = row.original.id

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
                                onClick={() => {
                                    navigator.clipboard.writeText(userId)
                                    toast.success("User ID copied to clipboard!", {
                                        duration: 2000,
                                    })
                                }}
                                className="cursor-pointer"
                            >   
                                <Clipboard className="h-4 w-4" />
                                Copy user ID
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="cursor-pointer">
                            <UserIcon className="h-4 w-4" />
                            <Link href={`/users/${userId}`} className="w-full h-full">
                                View User details
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => {
                            table.options.meta?.handleDeleteRow({ rowId: userId, name: row.original.fullName });
                        }}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }),
])