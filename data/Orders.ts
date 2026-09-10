import { Order } from "@/types/Order";

export const getOrders = async (): Promise<Order[]> => {
    return [
        {
            id: "order-001",
            userId: "728ed521",

            items: [
                {
                    id: "order-001-item-001",
                    productName: "Essential Cotton Crew Neck T-Shirt",

                    color: {
                        name: "Black",
                        hex: "#000000",
                    },

                    size: "L",

                    image:
                        "https://images.pexels.com/photos/12039633/pexels-photo-12039633.jpeg?auto=compress&cs=tinysrgb&w=800",

                    price: 899,
                    quantity: 2,
                },
                {
                    id: "order-001-item-002",
                    productName: "Minimal City Backpack",

                    color: {
                        name: "Black",
                        hex: "#000000",
                    },

                    size: "Medium",

                    image:
                        "https://images.pexels.com/photos/9712994/pexels-photo-9712994.jpeg?auto=compress&cs=tinysrgb&w=800",

                    price: 2299,
                    quantity: 1,
                },
            ],

            subtotal: 4097,
            shipping: 0,
            total: 4097,

            status: "delivered",
            createdAt: "2026-08-28T10:24:00Z",
        },

        {
            id: "order-002",
            userId: "728ed522",

            items: [
                {
                    id: "order-002-item-001",
                    productName: "Minimal Beige Midi Dress",

                    color: {
                        name: "Beige",
                        hex: "#F5F5DC",
                    },

                    size: "M",

                    image:
                        "https://images.pexels.com/photos/9166740/pexels-photo-9166740.jpeg?auto=compress&cs=tinysrgb&w=800",

                    price: 2499,
                    quantity: 1,
                },
                {
                    id: "order-002-item-002",
                    productName: "Elegant Everyday Handbag",

                    color: {
                        name: "Beige",
                        hex: "#F5F5DC",
                    },

                    size: "Medium",

                    image:
                        "https://images.pexels.com/photos/7742547/pexels-photo-7742547.jpeg?auto=compress&cs=tinysrgb&w=800",

                    price: 2999,
                    quantity: 1,
                },
            ],

            subtotal: 5498,
            shipping: 0,
            total: 5498,

            status: "shipped",
            createdAt: "2026-09-02T14:15:00Z",
        },

        {
            id: "order-003",
            userId: "728ed523",

            items: [
                {
                    id: "order-003-item-001",
                    productName: "Urban Runner Sneakers",

                    color: {
                        name: "Black",
                        hex: "#000000",
                    },

                    size: "9",

                    image:
                        "https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg",

                    price: 2999,
                    quantity: 1,
                },
                {
                    id: "order-003-item-002",
                    productName: "Slim Everyday Leather Wallet",

                    color: {
                        name: "Black",
                        hex: "#000000",
                    },

                    size: "Small",

                    image:
                        "https://images.pexels.com/photos/2494607/pexels-photo-2494607.jpeg?auto=compress&cs=tinysrgb&w=800",

                    price: 1199,
                    quantity: 1,
                },
            ],

            subtotal: 4198,
            shipping: 99,
            total: 4297,

            status: "processing",
            createdAt: "2026-09-06T09:42:00Z",
        },

        {
            id: "order-004",
            userId: "728ed524",

            items: [
                {
                    id: "order-004-item-001",
                    productName: "Relaxed Fit Everyday Hoodie",

                    color: {
                        name: "Black",
                        hex: "#000000",
                    },

                    size: "XL",

                    image:
                        "https://images.pexels.com/photos/5781307/pexels-photo-5781307.jpeg?auto=compress&cs=tinysrgb&w=800",

                    price: 1999,
                    quantity: 1,
                },
            ],

            subtotal: 1999,
            shipping: 99,
            total: 2098,

            status: "confirmed",
            createdAt: "2026-09-08T18:20:00Z",
        },

        {
            id: "order-005",
            userId: "728ed525",

            items: [
                {
                    id: "order-005-item-001",
                    productName: "Slim Fit Classic Denim Jeans",

                    color: {
                        name: "Blue",
                        hex: "#0000FF",
                    },

                    size: "M",

                    image:
                        "https://images.pexels.com/photos/17630811/pexels-photo-17630811.jpeg?auto=compress&cs=tinysrgb&w=800",

                    price: 2199,
                    quantity: 1,
                },
                {
                    id: "order-005-item-002",
                    productName: "Full Grain Leather Belt",

                    color: {
                        name: "Brown",
                        hex: "#A52A2A",
                    },

                    size: "Medium",

                    image:
                        "https://images.pexels.com/photos/32734334/pexels-photo-32734334.jpeg?auto=compress&cs=tinysrgb&w=800",

                    price: 999,
                    quantity: 1,
                },
                {
                    id: "order-005-item-003",
                    productName: "Classic Minimal Wristwatch",

                    color: {
                        name: "Brown",
                        hex: "#A52A2A",
                    },

                    size: "Medium",

                    image:
                        "https://images.pexels.com/photos/10561891/pexels-photo-10561891.jpeg?auto=compress&cs=tinysrgb&w=800",

                    price: 3499,
                    quantity: 1,
                },
            ],

            subtotal: 6697,
            shipping: 0,
            total: 6697,

            status: "pending",
            createdAt: "2026-09-10T11:05:00Z",
        },
    ];
}