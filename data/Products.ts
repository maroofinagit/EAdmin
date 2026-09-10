import { Product } from "@/types/Product";

export const getProducts = async (): Promise<Product[]> => [
    {
        id: "prod-001",
        name: "Essential Cotton Crew Neck T-Shirt",
        category: "Clothing",
        gender: "Men",
        type: "T-Shirt",
        variants: [
            {   
                id: "prod-001-var-001",
                color: {
                    name: "White",
                    hex: "#FFFFFF",
                },
                images: [
                    "https://images.pexels.com/photos/12039633/pexels-photo-12039633.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "M",
                        stock: 24,
                    },
                ],
                price: 899,
            },
            {
                id: "prod-001-var-002",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/12039633/pexels-photo-12039633.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "L",
                        stock: 18,
                    },
                ],
                price: 899,
            }
        ],
        brand: "Urban Thread",
        material: "100% Cotton",
        rating: 4.6,
        reviews: 184,
        description:
            "A versatile everyday crew neck T-shirt crafted from soft breathable cotton with a clean minimalist silhouette.",
        shortDescription: "Soft cotton everyday crew neck T-shirt for casual wear.",
        tags: ["t-shirt", "cotton", "casual", "everyday", "basic"],
        isFeatured: true,
        isNew: false,
        isActive: true,
        discount: 22,
        lastUpdated: "2026-08-28",
    },
    {
        id: "prod-002",
        name: "Classic Oxford Casual Shirt",
        category: "Clothing",
        gender: "Men",
        type: "Shirt",
        variants: [
            {
                id: "prod-002-var-001",
                color: {
                    name: "White",
                    hex: "#FFFFFF",
                },
                images: [
                    "https://images.pexels.com/photos/3214782/pexels-photo-3214782.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "L",
                        stock: 16,
                    },
                ],
                price: 1599,
            },
            {   
                id: "prod-002-var-002",
                color: {
                    name: "Blue",
                    hex: "#0000FF",
                },
                images: [
                    "https://images.pexels.com/photos/6995744/pexels-photo-6995744.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "M",
                        stock: 21,
                    },
                ],
                price: 1599,
            }
        ],
        brand: "Northline",
        material: "Oxford Cotton",
        rating: 4.5,
        reviews: 127,
        description:
            "A timeless Oxford shirt designed for smart-casual dressing with a structured collar and comfortable cotton construction.",
        shortDescription: "Timeless Oxford shirt for smart-casual looks.",
        tags: ["shirt", "oxford", "casual", "smart-casual", "cotton"],
        isFeatured: false,
        isNew: true,
        isActive: false,
        discount: 19,
        lastUpdated: "2026-08-25",
    },
    {
        id: "prod-003",
        name: "Slim Fit Classic Denim Jeans",
        category: "Clothing",
        gender: "Men",
        type: "Jeans",
        variants: [
            {
                id: "prod-003-var-001",
                color: {
                    name: "Blue",
                    hex: "#0000FF",
                },
                images: [
                    "https://images.pexels.com/photos/17630811/pexels-photo-17630811.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "M",
                        stock: 14,
                    },
                ],
                price: 2199,
            },
            {
                id: "prod-003-var-002",
                color: {
                    name: "Navy Blue",
                    hex: "#000080",
                },
                images: [
                    "https://images.pexels.com/photos/17630811/pexels-photo-17630811.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "L",
                        stock: 11,
                    },
                ],
                price: 2199,
            }
        ],
        brand: "Denim Republic",
        material: "Stretch Denim",
        rating: 4.4,
        reviews: 213,
        description:
            "Modern slim-fit jeans made from stretch denim for everyday comfort while maintaining a sharp silhouette.",
        shortDescription: "Comfortable stretch denim with a modern slim fit.",
        tags: ["jeans", "denim", "slim-fit", "casual", "everyday"],
        isFeatured: true,
        isNew: true,
        isActive: true,
        discount: 18,
        lastUpdated: "2026-08-22",
    },
    {
        id: "prod-004",
        name: "Relaxed Fit Everyday Hoodie",
        category: "Clothing",
        gender: "Unisex",
        type: "Hoodie",
        variants: [
            {
                id: "prod-004-var-001",
                color: {
                    name: "White",
                    hex: "#FFFFFF",
                },
                images: [
                    "https://images.pexels.com/photos/5781307/pexels-photo-5781307.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "L",
                        stock: 19,
                    },
                ],
                price: 1999,
            },
            {
                id: "prod-004-var-002",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/5781307/pexels-photo-5781307.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "XL",
                        stock: 12,
                    },
                ],
                price: 1999,
            }
        ],
        brand: "Street Form",
        material: "Cotton Fleece",
        rating: 4.7,
        reviews: 96,
        description:
            "A relaxed unisex hoodie with a soft fleece interior, roomy fit and understated streetwear styling.",
        shortDescription: "Soft fleece hoodie with a relaxed streetwear fit.",
        tags: ["hoodie", "streetwear", "fleece", "unisex", "winter"],
        isFeatured: false,
        isNew: true,
        isActive: true,
        discount: 20,
        lastUpdated: "2026-09-01",
    },
    {
        id: "prod-005",
        name: "Minimal Beige Midi Dress",
        category: "Clothing",
        gender: "Women",
        type: "Dress",
        variants: [
            {
                id: "prod-005-var-001",
                color: {
                    name: "Beige",
                    hex: "#F5F5DC",
                },
                images: [
                    "https://images.pexels.com/photos/9166740/pexels-photo-9166740.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "M",
                        stock: 13,
                    },
                ],
                price: 2499,
            },
            {
                id: "prod-005-var-002",
                color: {
                    name: "Beige",
                    hex: "#F5F5DC",
                },
                images: [
                    "https://images.pexels.com/photos/12494299/pexels-photo-12494299.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "L",
                        stock: 9,
                    },
                ],
                price: 2499,
            }
        ],
        brand: "Luna Wear",
        material: "Rayon Blend",
        rating: 4.8,
        reviews: 74,
        description:
            "A graceful midi dress featuring a clean silhouette and lightweight fabric, suitable for casual outings and semi-formal occasions.",
        shortDescription: "Elegant minimalist midi dress for versatile styling.",
        tags: ["dress", "midi", "women", "minimal", "casual"],
        isFeatured: true,
        isNew: true,
        isActive: true,
        discount: 20,
        lastUpdated: "2026-08-30",
    },
    {
        id: "prod-006",
        name: "Oversized Plaid Casual Shirt",
        category: "Clothing",
        gender: "Women",
        type: "Shirt",
        variants: [
            {
                id: "prod-006-var-001",
                color: {
                    name: "Red",
                    hex: "#FF0000",
                },
                images: [
                    "https://images.pexels.com/photos/6995744/pexels-photo-6995744.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "M",
                        stock: 17,
                    },
                ],
                price: 1799,
            },
            {
                id: "prod-006-var-002",
                color: {
                    name: "Green",
                    hex: "#008000",
                },
                images: [
                    "https://images.pexels.com/photos/6995744/pexels-photo-6995744.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "L",
                        stock: 10,
                    },
                ],
                price: 1799,
            }
        ],
        brand: "Mode Studio",
        material: "Cotton Flannel",
        rating: 4.5,
        reviews: 88,
        description:
            "A relaxed oversized plaid shirt designed for effortless layering and casual everyday outfits .",
        shortDescription: "Relaxed oversized plaid shirt for layering.",
        tags: ["shirt", "plaid", "oversized", "casual", "layering"],
        isFeatured: false,
        isNew: true,
        isActive: true,
        discount: 22,
        lastUpdated: "2026-08-29",
    },
    {
        id: "prod-007",
        name: "Urban Runner Sneakers",
        category: "Shoes",
        gender: "Unisex",
        type: "Sneakers",
        variants: [
            {
                id: "prod-007-var-001",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg",
                ],
                sizes: [
                    {
                        size: "9",
                        stock: 15,
                    },
                ],
                price: 2999,
            },
            {
                id: "prod-007-var-002",
                color: {
                    name: "White",
                    hex: "#FFFFFF",
                },
                images: [
                    "https://images.pexels.com/photos/13691727/pexels-photo-13691727.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "10",
                        stock: 8,
                    },
                ],
                price: 2999,
            }
        ],
        brand: "Stride",
        material: "Mesh & Rubber",
        rating: 4.6,
        reviews: 241,
        description:
            "Lightweight everyday sneakers combining breathable mesh, cushioned support and a clean urban design.",
        shortDescription: "Lightweight sneakers built for everyday movement.",
        tags: ["sneakers", "running", "casual", "urban", "unisex"],
        isFeatured: true,
        isNew: true,
        isActive: true,
        discount: 20,
        lastUpdated: "2026-09-01",
    },
    {
        id: "prod-008",
        name: "Performance Running Shoes",
        category: "Shoes",
        gender: "Men",
        type: "Running Shoes",
        variants: [
            {
                id: "prod-008-var-001",
                color: {
                    name: "Blue",
                    hex: "#0000FF",
                },
                images: [
                    "https://images.pexels.com/photos/9692149/pexels-photo-9692149.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "9",
                        stock: 14,
                    },
                ],
                price: 3999,
            },
            {
                id: "prod-008-var-002",
                color: {
                    name: "Red",
                    hex: "#FF0000",
                },
                images: [
                    "https://images.pexels.com/photos/9692149/pexels-photo-9692149.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "10",
                        stock: 18,
                    },
                ],
                price: 3999,
            }
        ],
        brand: "AeroStep",
        material: "Engineered Mesh",
        rating: 4.7,
        reviews: 168,
        description:
            "Performance-focused running shoes with breathable construction, responsive cushioning and durable rubber outsoles.",
        shortDescription: "Responsive running shoes for daily training.",
        tags: ["running", "sports", "shoes", "fitness", "performance"],
        isFeatured: false,
        isNew: false,
        isActive: true,
        discount: 18,
        lastUpdated: "2026-08-24",
    },
    {
        id: "prod-009",
        name: "Classic Leather Formal Shoes",
        category: "Shoes",
        gender: "Men",
        type: "Formal Shoes",
        variants: [
            {
                id: "prod-009-var-001",
                color: {
                    name: "Brown",
                    hex: "#A52A2A",
                },
                images: [
                    "https://images.pexels.com/photos/2494607/pexels-photo-2494607.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "9",
                        stock: 7,
                    },
                ],
                price: 3499,
            },
            {
                id: "prod-009-var-002",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/2494607/pexels-photo-2494607.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "10",
                        stock: 11,
                    },
                ],
                price: 3499,
            }
        ],
        brand: "Gentleman Co.",
        material: "Genuine Leather",
        rating: 4.5,
        reviews: 119,
        description:
            "Refined formal shoes with a classic leather upper and polished finish, designed for professional and formal occasions.",
        shortDescription: "Classic leather formal shoes with a polished finish.",
        tags: ["formal", "leather", "shoes", "office", "classic"],
        isFeatured: false,
        isNew: false,
        isActive: true,
        discount: 17,
        lastUpdated: "2026-08-18",
    },
    {
        id: "prod-010",
        name: "Strappy Everyday Sandals",
        category: "Shoes",
        gender: "Women",
        type: "Sandals",
        variants: [
            {
                id: "prod-010-var-001",
                color: {
                    name: "Beige",
                    hex: "#F5F5DC",
                },
                images: [
                    "https://images.pexels.com/photos/9692168/pexels-photo-9692168.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "7",
                        stock: 13,
                    },
                ],
                price: 1499,
            },
            {
                id: "prod-010-var-002",
                color: {
                    name: "Brown",
                    hex: "#A52A2A",
                },
                images: [
                    "https://images.pexels.com/photos/9692168/pexels-photo-9692168.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "8",
                        stock: 16,
                    },
                ],
                price: 1499,
            }
        ],
        brand: "Solea",
        material: "Synthetic Leather",
        rating: 4.3,
        reviews: 82,
        description:
            "Comfortable strappy sandals designed for warm-weather days with a lightweight sole and versatile styling.",
        shortDescription: "Lightweight everyday sandals with a clean design.",
        tags: ["sandals", "women", "summer", "casual", "footwear"],
        isFeatured: false,
        isNew: true,
        isActive: true,
        discount: 20,
        lastUpdated: "2026-08-31",
    },
    {
        id: "prod-011",
        name: "Minimal City Backpack",
        category: "Bags",
        gender: "Unisex",
        type: "Backpack",
        variants: [
            {
                id: "prod-011-var-001",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/9712994/pexels-photo-9712994.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 22,
                    },
                ],
                price: 2299,
            },
            {
                id: "prod-011-var-002",
                color: {
                    name: "Grey",
                    hex: "#808080",
                },
                images: [
                    "https://images.pexels.com/photos/9712994/pexels-photo-9712994.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Large",
                        stock: 13,
                    },
                ],
                price: 2299,
            }
        ],
        brand: "CarryLab",
        material: "Water-Resistant Polyester",
        rating: 4.7,
        reviews: 156,
        description:
            "A sleek everyday backpack with a spacious interior and minimalist styling for commuting, college and travel.",
        shortDescription: "Minimal everyday backpack for work and travel.",
        tags: ["backpack", "travel", "college", "commute", "unisex"],
        isFeatured: true,
        isNew: false,
        isActive: true,
        discount: 17,
        lastUpdated: "2026-08-27",
    },
    {
        id: "prod-012",
        name: "Premium Laptop Backpack",
        category: "Bags",
        gender: "Unisex",
        type: "Laptop Bag",
        variants: [
            {
                id: "prod-012-var-001",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/14039944/pexels-photo-14039944.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Large",
                        stock: 18,
                    },
                ],
                price: 2799,
            },
            {
                id: "prod-012-var-002",
                color: {
                    name: "Brown",
                    hex: "#A52A2A",
                },
                images: [
                    "https://images.pexels.com/photos/14039944/pexels-photo-14039944.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Large",
                        stock: 9,
                    },
                ],
                price: 2799,
            }
        ],
        brand: "Urban Carry",
        material: "Canvas & Vegan Leather",
        rating: 4.8,
        reviews: 134,
        description:
            "A premium laptop backpack with a structured design, padded compartment and practical storage for daily commuting.",
        shortDescription: "Structured laptop backpack with padded protection.",
        tags: ["laptop", "backpack", "office", "college", "travel"],
        isFeatured: true,
        isNew: true,
        isActive: true,
        discount: 18,
        lastUpdated: "2026-09-01",
    },
    {
        id: "prod-013",
        name: "Elegant Everyday Handbag",
        category: "Bags",
        gender: "Women",
        type: "Handbag",
        variants: [
            {
                id: "prod-013-var-001",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/10280614/pexels-photo-10280614.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 12,
                    },
                ],
                price: 2999,
            },
            {
                id: "prod-013-var-002",
                color: {
                    name: "Beige",
                    hex: "#F5F5DC",
                },
                images: [
                    "https://images.pexels.com/photos/7742547/pexels-photo-7742547.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 15,
                    },
                ],
                price: 2999,
            }
        ],
        brand: "Aurelia",
        material: "Faux Leather",
        rating: 4.6,
        reviews: 103,
        description:
            "A sophisticated everyday handbag with a structured silhouette and enough room for daily essentials.",
        shortDescription: "Structured handbag for elegant everyday styling.",
        tags: ["handbag", "women", "fashion", "leather", "everyday"],
        isFeatured: false,
        isNew: false,
        isActive: true,
        discount: 20,
        lastUpdated: "2026-08-26",
    },
    {
        id: "prod-014",
        name: "Compact Urban Sling Bag",
        category: "Bags",
        gender: "Unisex",
        type: "Sling Bag",
        variants: [
            {
                id: "prod-014-var-001",
                color: {
                    name: "Olive",
                    hex: "#556B2F",
                },
                images: [
                    "https://images.pexels.com/photos/27911168/pexels-photo-27911168.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Small",
                        stock: 25,
                    },
                ],
                price: 1299,
            },
            {
                id: "prod-014-var-002",
                color: {
                    name: "Orange",
                    hex: "#FFA500",
                },
                images: [
                    "https://images.pexels.com/photos/27911168/pexels-photo-27911168.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Small",
                        stock: 8,
                    },
                ],
                price: 1299,
            }
        ],
        brand: "Packsmith",
        material: "Canvas",
        rating: 4.4,
        reviews: 71,
        description:
            "A compact sling bag designed for carrying everyday essentials while keeping your hands free.",
        shortDescription: "Compact hands-free sling for everyday essentials.",
        tags: ["sling", "bag", "casual", "travel", "unisex"],
        isFeatured: false,
        isNew: true,
        isActive: true,
        discount: 23,
        lastUpdated: "2026-08-30",
    },
    {
        id: "prod-015",
        name: "Classic Minimal Wristwatch",
        category: "Accessories",
        gender: "Men",
        type: "Watch",
        variants: [
            {
                id: "prod-015-var-001",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/3829442/pexels-photo-3829442.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 14,
                    },
                ],
                price: 3499,
            },
            {
                id: "prod-015-var-002",
                color: {
                    name: "Brown",
                    hex: "#A52A2A",
                },
                images: [
                    "https://images.pexels.com/photos/10561891/pexels-photo-10561891.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 9,
                    },
                ],
                price: 3499,
            }
        ],
        brand: "Chrona",
        material: "Stainless Steel & Leather",
        rating: 4.7,
        reviews: 198,
        description:
            "A timeless analog wristwatch featuring a clean dial, refined proportions and a versatile strap.",
        shortDescription: "Timeless minimalist watch for everyday wear.",
        tags: ["watch", "analog", "classic", "minimal", "accessory"],
        isFeatured: true,
        isNew: false,
        isActive: true,
        discount: 20,
        lastUpdated: "2026-08-20",
    },
    {
        id: "prod-016",
        name: "Modern Black Frame Sunglasses",
        category: "Accessories",
        gender: "Unisex",
        type: "Sunglasses",
        variants: [
            {
                id: "prod-016-var-001",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/5583998/pexels-photo-5583998.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 27,
                    },
                ],
                price: 1499,
            },
            {
                id: "prod-016-var-002",
                color: {
                    name: "Brown",
                    hex: "#A52A2A",
                },
                images: [
                    "https://images.pexels.com/photos/1034843/pexels-photo-1034843.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 16,
                    },
                ],
                price: 1499,
            }
        ],
        brand: "Vista",
        material: "Acetate",
        rating: 4.5,
        reviews: 143,
        description:
            "Modern sunglasses with a clean frame profile and versatile styling designed for everyday outdoor wear.",
        shortDescription: "Modern everyday sunglasses with a clean frame.",
        tags: ["sunglasses", "eyewear", "summer", "fashion", "unisex"],
        isFeatured: false,
        isNew: true,
        isActive: true,
        discount: 20,
        lastUpdated: "2026-08-29",
    },
    {
        id: "prod-017",
        name: "Full Grain Leather Belt",
        category: "Accessories",
        gender: "Men",
        type: "Belt",
        variants: [
            {
                id: "prod-017-var-001",
                color: {
                    name: "Brown",
                    hex: "#A52A2A",
                },
                images: [
                    "https://images.pexels.com/photos/32734334/pexels-photo-32734334.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 21,
                    },
                ],
                price: 999,
            },
            {
                id: "prod-017-var-002",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/32734334/pexels-photo-32734334.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Large",
                        stock: 17,
                    },
                ],
                price: 999,
            }
        ],
        brand: "Craft & Hide",
        material: "Full Grain Leather",
        rating: 4.6,
        reviews: 91,
        description:
            "A durable full-grain leather belt finished with a classic metal buckle for everyday and formal outfits.",
        shortDescription: "Classic full-grain leather belt with metal buckle.",
        tags: ["belt", "leather", "formal", "casual", "accessory"],
        isFeatured: false,
        isNew: false,
        isActive: true,
        discount: 20,
        lastUpdated: "2026-08-17",
    },
    {
        id: "prod-018",
        name: "Slim Everyday Leather Wallet",
        category: "Accessories",
        gender: "Men",
        type: "Wallet",
        variants: [
            {
                id: "prod-018-var-001",
                color: {
                    name: "Brown",
                    hex: "#A52A2A",
                },
                images: [
                    "https://images.pexels.com/photos/2494607/pexels-photo-2494607.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Small",
                        stock: 23,
                    },
                ],
                price: 1199,
            },
            {
                id: "prod-018-var-002",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/2494607/pexels-photo-2494607.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Small",
                        stock: 19,
                    },
                ],
                price: 1199,
            }
        ],
        brand: "Leather Works",
        material: "Genuine Leather",
        rating: 4.5,
        reviews: 112,
        description:
            "A slim leather wallet designed to carry essential cards and cash without adding unnecessary bulk.",
        shortDescription: "Slim genuine leather wallet for everyday carry.",
        tags: ["wallet", "leather", "minimal", "men", "accessory"],
        isFeatured: false,
        isNew: false,
        isActive: true,
        discount: 25,
        lastUpdated: "2026-08-15",
    },
    {
        id: "prod-019",
        name: "Contemporary Statement Watch",
        category: "Accessories",
        gender: "Women",
        type: "Watch",
        variants: [
            {
                id: "prod-019-var-001",
                color: {
                    name: "White",
                    hex: "#FFFFFF",
                },
                images: [
                    "https://images.pexels.com/photos/7470851/pexels-photo-7470851.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 11,
                    },
                ],
                price: 3999,
            },
            {
                id: "prod-019-var-002",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/7470851/pexels-photo-7470851.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 7,
                    },
                ],
                price: 3999,
            }
        ],
        brand: "Elora",
        material: "Stainless Steel",
        rating: 4.8,
        reviews: 67,
        description:
            "A contemporary statement watch with a refined metallic finish designed to complement both casual and dressy outfits.",
        shortDescription: "Elegant metallic watch for modern styling.",
        tags: ["watch", "women", "luxury", "fashion", "accessory"],
        isFeatured: true,
        isNew: true,
        isActive: true,
        discount: 20,
        lastUpdated: "2026-09-01",
    },
    {
        id: "prod-020",
        name: "Classic Reflective Sunglasses",
        category: "Accessories",
        gender: "Unisex",
        type: "Sunglasses",
        variants: [
            {
                id: "prod-020-var-001",
                color: {
                    name: "Yellow",
                    hex: "#FFFF00",
                },
                images: [
                    "https://images.pexels.com/photos/255305/pexels-photo-255305.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 18,
                    },
                ],
                price: 1699,
            },
            {
                id: "prod-020-var-002",
                color: {
                    name: "Black",
                    hex: "#000000",
                },
                images: [
                    "https://images.pexels.com/photos/9694176/pexels-photo-9694176.jpeg?auto=compress&cs=tinysrgb&w=800",
                ],
                sizes: [
                    {
                        size: "Medium",
                        stock: 14,
                    },
                ],
                price: 1699,
            }
        ],
        brand: "Raymont",
        material: "Polycarbonate",
        rating: 4.4,
        reviews: 86,
        description:
            "Stylish reflective sunglasses with a contemporary frame designed to add a bold finishing touch to everyday outfits.",
        shortDescription: "Bold reflective sunglasses with a modern frame.",
        tags: ["sunglasses", "reflective", "fashion", "summer", "unisex"],
        isFeatured: false,
        isNew: true,
        isActive: true,
        discount: 24,
        lastUpdated: "2026-08-30",
    }
];
