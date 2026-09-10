"use client";

import {
    CalendarDays,
    Package,
    Truck,
    CreditCard,
    MapPin,
    ShoppingBag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/types/Order";
import { User } from "@/types/User";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";

type ClientOrderPageProps = {
    order: Order;
    user: User; // Assuming you have a User type defined somewhere
};

const statusStyles: Record<Order["status"], string> = {
    pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    confirmed:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    processing:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    shipped:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    delivered:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    cancelled:
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function ClientOrderPage({
    order,
    user,
}: ClientOrderPageProps) {
    const totalItems = order.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const formattedDate = new Date(order.createdAt).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

    const formattedTime = new Date(order.createdAt).toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    );

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    return (
        <div className="space-y-6 px-12 py-6">

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<a href="/" />}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<a href="/orders" />}>
                            Orders
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{order.id}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Order #{order.id}
                        </h1>

                        <Badge
                            className={statusStyles[order.status]}
                            variant="outline"
                        >
                            {order.status}
                        </Badge>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Placed on {formattedDate} at {formattedTime}
                    </p>
                </div>
            </div>

            {/* Order Information */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <div className="rounded-lg bg-muted p-3">
                            <ShoppingBag className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Items
                            </p>
                            <p className="text-lg font-semibold">
                                {totalItems}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <div className="rounded-lg bg-muted p-3">
                            <CreditCard className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total
                            </p>
                            <p className="text-lg font-semibold">
                                {formatPrice(order.total)}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center px-12 justify-between pt-6">
                        <div className="rounded-lg bg-muted p-3">
                            <Package className="h-5 w-5" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4 w-full justify-between">
                                <p className="text-sm text-muted-foreground">
                                    User ID
                                </p>
                                <p className="text-lg font-semibold">
                                    {order.userId}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 w-full justify-between">
                                <p className="text-sm text-muted-foreground">
                                    User Name
                                </p>
                                <p className="text-lg font-semibold">
                                    {user.fullName}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Order Items + Summary */}
            <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
                {/* Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4"
                            >
                                {/* Product Image */}
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border bg-muted">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <Package className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <h3 className="font-medium">
                                                {item.productName}
                                            </h3>

                                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                                                <span>
                                                    Color:{" "}
                                                    <span className="text-foreground">
                                                        {item.color.name}
                                                    </span>
                                                </span>

                                                <span>
                                                    Size:{" "}
                                                    <span className="text-foreground">
                                                        {item.size}
                                                    </span>
                                                </span>

                                                <span>
                                                    Qty:{" "}
                                                    <span className="text-foreground">
                                                        {item.quantity}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <p className="font-semibold">
                                            {formatPrice(
                                                item.price *
                                                item.quantity
                                            )}
                                        </p>
                                    </div>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {formatPrice(item.price)} each
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Summary */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                Subtotal
                            </span>
                            <span>
                                {formatPrice(order.subtotal)}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                Shipping
                            </span>
                            <span>
                                {order.shipping === 0
                                    ? "Free"
                                    : formatPrice(order.shipping)}
                            </span>
                        </div>

                        <Separator />

                        <div className="flex justify-between">
                            <span className="font-semibold">
                                Total
                            </span>
                            <span className="text-lg font-bold">
                                {formatPrice(order.total)}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Order Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex gap-3">
                            <Package className="mt-0.5 h-5 w-5 text-muted-foreground" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Order ID
                                </p>
                                <p className="font-medium">
                                    {order.id}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <CalendarDays className="mt-0.5 h-5 w-5 text-muted-foreground" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Order Date
                                </p>
                                <p className="font-medium">
                                    {formattedDate}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Truck className="mt-0.5 h-5 w-5 text-muted-foreground" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Status
                                </p>
                                <p className="font-medium capitalize">
                                    {order.status}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Customer
                                </p>
                                <p className="font-medium">
                                    {user.fullName}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}