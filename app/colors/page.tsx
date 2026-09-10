import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getColors } from "@/data/Colors";

const ColorsPage = async () => {
  const colors = await getColors();
  return (
    <div className="flex flex-col gap-4 w-full h-full px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-2xl">All Colors</h1>
      </div>
      <DataTable columns={columns} data={colors}/>
    </div>
  );
};

export default ColorsPage;
