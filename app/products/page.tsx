import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getProducts } from "@/data/Products";
import { ProductCategory } from "@/types/Product"

const ProductsPage = async () => {
  const data = await getProducts();

  return (
    <div className="flex flex-col gap-4 w-full h-full px-8 py-8">
      <div className="flex flex-col justify-between">
        <h1 className="font-semibold text-2xl">All Products</h1>
        <p className="text-sm text-muted-foreground">
          This table contains all the products in the system. You can view, edit, or delete products as needed.
        </p>
      </div>
      <div className="flex flex-col gap-6 mt-6 w-full h-full">
        {ProductCategory.map((category) => {
          const categoryProducts = data.filter(
            (product) => product.category === category
          );

          return (
            <section key={category} className="flex flex-col gap-4 w-full h-full">
              <h2 className="text-xl font-semibold">{category}</h2>
              <DataTable
                data={categoryProducts}
                columns={columns}
              />
              <Separator className="my-4 bg-white/30" />
            </section>
          );
        })}
      </div>

    </div>
  );
};

export default ProductsPage;
