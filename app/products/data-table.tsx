"use client"

import { ColumnFiltersState, SortingState, useTable, type ColumnDef, type RowData, TableMeta } from "@tanstack/react-table"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClothingType, Gender, ProductType } from "@/types/Product";
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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [dialogOpen, setDialogOpen] = useState(false);

  const [dialogData, setDialogData] = useState<{
    title: string;
    description: string;
    type: "update" | "delete" | "default";
    onConfirm: () => void;
  } | null>(null);


  const handleDeleteRow = ({ rowId, name }: { rowId: string; name: string }) => {

    setDialogData({
      title: `Delete Product - ${name}?`,
      description: `This action cannot be undone.`,
      type: "delete",
      onConfirm: () => {
        setNewData((prev) =>
          prev.filter((row) => row.id !== rowId)
        );

        setRowSelection({});
        setDialogOpen(false);
        toast.success(`Product "${name}" has been deleted.`);
      },
    });

    setDialogOpen(true);

  }

  const table = useTable({
    features,
    data: newData,
    columns,
    getRowId: (row) => row.id,
    meta: {
      handleDeleteRow,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
  })

  const handleDeleteSelectedRows = () => {
    const selectedRowIds = Object.keys(rowSelection)

    setDialogData({
      title: "Delete selected products?",
      description: `Are you sure you want to delete ${selectedRowIds.length} products?`,
      type: "delete",
      onConfirm: () => {
        setNewData((prev) =>
          prev.filter((row) => !selectedRowIds.includes(row.id))
        );

        setRowSelection({});
        setDialogOpen(false);
        toast.success(`${selectedRowIds.length} product(s) have been deleted.`);
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
                  Delete {Object.keys(rowSelection).length} selected Product(s)
                </Button>
              </div>
            </div>
          )
        }

        <div className="flex items-center py-4 gap-4">
          <Select
            value={(table.getColumn("gender")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) => {
              table
                .getColumn("gender")
                ?.setFilterValue(value === "All Genders" ? undefined : value);
            }}
          >
            <SelectTrigger className="w-45 cursor-pointer">
              <SelectValue placeholder="Filter Gender..." />
            </SelectTrigger>

            <SelectContent className="px-5 py-2 space-y-4 flex flex-col">
              <SelectItem value="All Genders"
                className="cursor-pointer">
                All Genders
              </SelectItem>

              {Object.values(Gender).map((gender) => (
                <SelectItem key={gender} value={gender} className="cursor-pointer">
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) => {
              table
                .getColumn("type")
                ?.setFilterValue(value === "All Types" ? undefined : value);
            }}
          >
            <SelectTrigger className="w-45 cursor-pointer">
              <SelectValue placeholder="Filter Type..." />
            </SelectTrigger>

            <SelectContent className="px-5 py-2 space-y-4 flex flex-col">
              <SelectItem value="All Types"
                className="cursor-pointer">
                All Types
              </SelectItem>

              {Object.values(ProductType).map((type) => (
                <SelectItem key={type} value={type} className="cursor-pointer">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


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