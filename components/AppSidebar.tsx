'use client'
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Warehouse,
    BarChart3,
    Tag,
    Settings,
    CreditCard,
    Plus,
    Paintbrush,
    ChevronDown,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator";

const mainNavItems = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Orders",
        url: "/orders",
        icon: ShoppingCart,
    },
    {
        title: "Payments",
        url: "/payments",
        icon: CreditCard,
    },
    {
        title: "Users",
        url: "/users",
        icon: Users,
    },
]

const productManagementItems = [
    {
        title: "All Products",
        url: "/products",
        icon: Package,
    },
    {
        title: "All Categories",
        url: "/categories",
        icon: Tag,
    },
    {
        title: "All Colors",
        url: "/colors",
        icon: Paintbrush,
    },
    {
        title: "Manage Inventory",
        icon: Warehouse,
        items: [
            {
                title: "Add Category",
                action: "add-category",
                icon: Plus,
            },
            {
                title: "Add Product",
                url: "/products/new",
                icon: Plus,
            },
            {
                title: "Add Color",
                action: "add-color",
                icon: Plus,
            },
        ],
    },
];

import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useState } from "react";
import { AddCategorySheet } from "./AddCategorySheet";
import { AddColorSheet } from "./AddColorSheet";


export function AppSidebar() {

    const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
    const [isColorSheetOpen, setIsColorSheetOpen] = useState(false);

    return (
        <Sidebar collapsible='icon'>
            <AddCategorySheet open={isCategorySheetOpen} onOpenChange={setIsCategorySheetOpen} />
            <AddColorSheet open={isColorSheetOpen} onOpenChange={setIsColorSheetOpen} />
            <SidebarHeader>
                <Link
                    href="/"
                    className="flex h-14 items-center justify-center px-2 group-data-[collapsible=icon]:px-0">

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg">
                        <img
                            src="/logo.png"
                            alt="Cyber Mart"
                            className="size-8 object-contain"
                        />
                    </div>

                    <div className="ml-3 min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                        <div className="truncate text-sm font-semibold">
                            Cyber Mart
                        </div>

                        <div className="truncate text-xs text-muted-foreground">
                            Admin Panel
                        </div>
                    </div>
                </Link>
            </SidebarHeader>

            <Separator className="my-2" />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton render={
                                        <a href={item.url} className="flex items-center gap-4">
                                            <item.icon className="size-5!" />
                                            <span>{item.title}</span>
                                        </a>
                                    } />
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="my-2" />

                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {productManagementItems.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    className="group/collapsible"
                                    render={
                                        <SidebarMenuItem>

                                            {item.items ? (
                                                <>
                                                    <CollapsibleTrigger className='cursor-pointer mb-2' render={
                                                        <SidebarMenuButton>
                                                            <item.icon className="size-5!" />
                                                            <span>{item.title}</span>

                                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                        </SidebarMenuButton>
                                                    } />

                                                    <CollapsibleContent>
                                                        <SidebarMenuSub className="space-y-1">
                                                            {item.items.map((subItem) => (
                                                                <SidebarMenuSubItem key={subItem.title}>
                                                                    {subItem.url ? (
                                                                        <SidebarMenuSubButton
                                                                            render={
                                                                                <a href={subItem.url}>
                                                                                    <subItem.icon />
                                                                                    <span>{subItem.title}</span>
                                                                                </a>
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <SidebarMenuSubButton
                                                                            render={
                                                                                <button
                                                                                    className="flex items-center gap-2 cursor-pointer"
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        if (subItem.action === "add-color") {
                                                                                            setIsColorSheetOpen(true);
                                                                                        }
                                                                                        if (subItem.action === "add-category") {
                                                                                            setIsCategorySheetOpen(true);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <subItem.icon />
                                                                                    <span>{subItem.title}</span>
                                                                                </button>
                                                                            }
                                                                        />
                                                                    )}
                                                                </SidebarMenuSubItem>
                                                            ))}
                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                </>
                                            ) : (
                                                <SidebarMenuButton render={
                                                    <a
                                                        href={item.url}
                                                        className="flex items-center gap-4"
                                                    >
                                                        <item.icon className="size-5!" />
                                                        <span>{item.title}</span>
                                                    </a>
                                                } />
                                            )}

                                        </SidebarMenuItem>
                                    } />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="my-2" />

            </SidebarContent>

            <Separator className="my-2" />

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton render={
                            <a href="/settings" className="flex items-center gap-4">
                                <Settings className="size-5!" />
                                <span>Settings</span>
                            </a>

                        } />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}