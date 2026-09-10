import { getPayments } from "@/data/Payments";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const PaymentsPage = async () => {
  const data = await getPayments();
  return (
    <div className="flex flex-col gap-4 w-full h-full px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-2xl">All Payments</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default PaymentsPage;
