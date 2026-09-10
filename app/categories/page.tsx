import { getPayments } from "@/data/Payments";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getCategories } from "@/data/Categories";

const CategoriesPage = async () => {
  const categories = await getCategories();
  return (
    <div className="flex flex-col gap-4 w-full h-full px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-2xl">All Categories</h1>
      </div>
      <DataTable columns={columns} data={categories}/>
    </div>
  );
};

export default CategoriesPage;
