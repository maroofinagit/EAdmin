import { getPayments } from "@/data/Payments";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getOrders } from "@/data/Orders";

const OrdersPage = async () => {
  const data = await getOrders();
  return (
    <div className="flex flex-col gap-4 w-full h-full px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-2xl">All Orders</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default OrdersPage;
