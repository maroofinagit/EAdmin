# CyberMart Admin Panel

The **CyberMart Admin Panel** is the vendor-facing content management system for [CyberMart](https://cybermart.vercel.app).

It provides a centralized interface for managing the store's product catalog and related data, allowing vendors or administrators to maintain the storefront without directly modifying the application's source data.

## Overview

CyberMart is an e-commerce platform, and this repository contains its **administration and vendor management interface**.

The admin panel is designed to make common catalog-management tasks simple and structured, including:

* Managing products
* Adding and managing product categories
* Managing product colors
* Managing product variants
* Managing product sizes and stock
* Updating product information
* Controlling product availability and status

The goal is to provide a clean **Content Management System (CMS)** for the CyberMart storefront while keeping administrative functionality separate from the customer-facing application.

### Production Storefront

**CyberMart:**
https://cybermart.vercel.app

---

## Features

### Product Management

Administrators can manage the products available on CyberMart, including:

* Product name and descriptions
* Brand and material
* Category and product type
* Gender
* Product images
* Product variants
* Colors
* Sizes
* Stock quantities
* Pricing
* Discounts
* Product tags
* Featured and new-product status
* Product availability

### Category Management

The admin panel provides functionality for managing the product catalog structure.

Administrators can:

* Add categories
* View existing categories
* Update category information
* Enable or disable categories
* Track product counts associated with categories

### Color Management

Product colors can be managed independently through the admin panel.

Each color contains:

* Color name
* Hexadecimal color value

This allows products to use a consistent set of colors throughout the catalog.

### Variant Management

CyberMart products support multiple variants based on attributes such as:

* Color
* Size
* Stock
* Price
* Images

This makes it possible to manage products with different combinations of colors, sizes, and inventory.

---

## Tech Stack

The admin panel is built using modern web technologies:

* **Next.js** — React framework for the application
* **React** — UI development
* **TypeScript** — Type-safe application development
* **Tailwind CSS** — Styling and responsive UI
* **Zustand** — Client-side state management
* **Lucide React** — Interface icons
* **Sonner** — Toast notifications
* **Vercel** — Deployment platform

---

## Project Structure

The project follows a modular structure to keep UI, data, state, and type definitions separated.

```text
e-admin/
├── app/
│   ├── dashboard/
│   ├── products/
│   ├── categories/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── Product/
│   ├── Category/
│   └── ...
│
├── stores/
│   └── ...
│
├── types/
│   └── ...
│
├── Data/
│   └── ...
│
├── public/
│   └── ...
│
├── package.json
└── README.md
```

> The exact structure may evolve as the application grows.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm, pnpm, yarn, or bun
* Git

### Clone the Repository

```bash
git clone <repository-url>
cd e-admin
```

### Install Dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

### Run the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Environment Variables

If the application requires environment variables, create a `.env.local` file in the project root:

```env
# Example
NEXT_PUBLIC_API_URL=
```

Do not commit sensitive credentials or production secrets to the repository.

---

## Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs the project's linting checks.

---

## Relationship With CyberMart

The admin panel is a separate application from the customer-facing CyberMart storefront.

```text
                    CyberMart
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   Customer Storefront        Admin Panel
   cybermart.vercel.app       Vendor / CMS
          │                         │
          │                         │
          ▼                         ▼
     Browse Products          Manage Products
     View Variants            Manage Categories
     Shopping Cart            Manage Colors
     Checkout                 Manage Inventory
```

The storefront is responsible for the **customer experience**, while the admin panel is responsible for **catalog and vendor management**.

---

## Product Data Model

CyberMart uses a structured product model that supports variants and inventory.

A simplified product structure looks like:

```text
Product
│
├── Basic Information
│   ├── Name
│   ├── Brand
│   ├── Description
│   ├── Category
│   ├── Gender
│   └── Type
│
├── Variants
│   │
│   ├── Color
│   │   ├── Name
│   │   └── Hex
│   │
│   ├── Images
│   │
│   ├── Price
│   │
│   └── Sizes
│       ├── Size
│       └── Stock
│
└── Product Metadata
    ├── Rating
    ├── Reviews
    ├── Tags
    ├── Discount
    ├── Featured
    ├── New
    └── Active
```

This structure allows the admin panel to manage products at a more granular level instead of treating every color or size as a separate product.

---

## Design Goals

The admin panel is built around a few core principles:

### Simple Management

Common catalog operations should require minimal steps.

### Structured Data

Products, categories, colors, variants, and inventory are represented using strongly typed structures to reduce inconsistent data.

### Reusable Components

Common UI elements are kept reusable to make future development and maintenance easier.

### Separation of Concerns

The administration interface is kept separate from the customer-facing storefront so that vendor functionality can evolve independently.

### Scalable Architecture

The project structure is designed so additional administrative functionality can be added without restructuring the entire application.

---

## Future Improvements

Potential areas for future development include:

* Authentication and role-based access control
* Persistent backend/database integration
* Image upload and media management
* Order management
* Customer management
* Inventory analytics
* Sales dashboards
* Vendor management
* Activity logs
* Bulk product operations
* Advanced search and filtering

---

## Deployment

The application can be deployed using [Vercel](https://vercel.com).

For production deployment, configure the required environment variables in the deployment platform before building the application.

---

## Related Project

**CyberMart — Customer Storefront**

https://cybermart.vercel.app

This admin panel serves as the management layer for the CyberMart e-commerce experience.

---

## License

This project is currently maintained as part of the CyberMart application.

If this repository is being shared with a client or development team, please refer to the project's applicable agreement regarding usage, modification, and distribution.

---

## Author

Built and maintained as part of the **CyberMart** e-commerce platform.
