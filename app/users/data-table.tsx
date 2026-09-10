"use client"

import { SortingState, useTable, type ColumnDef, type RowData } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { features, type DataTableFeatures } from "./datatable-features"
import { DataTablePagination } from "@/components/TablePagination";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ConfirmDialogBox";

type TableRow = {
  id: string
}


interface DataTableProps<TData extends TableRow> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}

export function DataTable<TData extends TableRow>({
  columns,
  data,
}: DataTableProps<TData>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [newData, setNewData] = useState(data)
  const [dialogOpen, setDialogOpen] = useState(false);

  const [dialogData, setDialogData] = useState<{
    title: string;
    description: string;
    type: "update" | "delete" | "default";
    onConfirm: () => void;
  } | null>(null);


  const handleDeleteRow = ({ rowId, name }: { rowId: string; name: string }) => {

    setDialogData({
      title: `Delete User - ${name}?`,
      description: `This action cannot be undone.`,
      type: "delete",
      onConfirm: () => {
        setNewData((prev) =>
          prev.filter((row) => row.id !== rowId)
        );

        setRowSelection({});
        setDialogOpen(false);
        toast.success(`User "${name}" has been deleted.`);
      },
    });

    setDialogOpen(true);

  }

  const table = useTable({
    features,
    data: newData,
    columns,
    meta: {
      handleDeleteRow,
    },
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  const handleDeleteSelectedRows = () => {
    const selectedRowIds = Object.keys(rowSelection)

    setDialogData({
      title: "Delete selected Users?",
      description: `Are you sure you want to delete ${selectedRowIds.length} users?`,
      type: "delete",
      onConfirm: () => {
        setNewData((prev) =>
          prev.filter((row) => !selectedRowIds.includes(row.id))
        );

        setRowSelection({});
        setDialogOpen(false);
        toast.success(`${selectedRowIds.length} user(s) have been deleted.`);
      },
    });
    setDialogOpen(true);
  }


  return (
    <div className="w-full space-y-4">
      {dialogData && (
        <ConfirmDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={dialogData.title}
          description={dialogData.description}
          type={dialogData.type}
          onConfirm={dialogData.onConfirm}
        />
      )}
      <div className="overflow-hidden rounded-md border px-4 py-2">
        {
          rowSelection && Object.keys(rowSelection).length > 0 && (
            <div className="flex items-center justify-between px-2 py-2">
              <div className=" justify-end w-full flex items-center gap-2 text-sm text-muted-foreground">
                <Button variant="destructive" className="flex items-center gap-2 cursor-pointer" onClick={handleDeleteSelectedRows}>
                  <Trash className="w-4 h-4 text-red-500" />
                  Delete {Object.keys(rowSelection).length} selected User(s)
                </Button>
              </div>
            </div>
          )
        }

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  )
}