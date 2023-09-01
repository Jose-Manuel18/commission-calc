"use client";
import * as React from "react";
import { Loader2 } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiUrls } from "@/utils/apiUrls";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmployeeForm } from "@/components/EmployeeForm";
import { SheetCalc } from "@/components/SheetCalc";

export interface EmployeesProps {
  id: number;
  name: string;
  commission: number;
  payment: number[];
  userId: number;
}
export type Payment = {
  id: number;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  name: string;
  userId: number;
  commission: number;
  total: number;
  payment: {
    value: number;
  };
};
export interface SelectedEmployeeProps {
  id: number;
}
const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: () => {
      return <div className="text-left font-medium">Nombre</div>;
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "commission",
    header: () => {
      return <div className="text-left font-medium">Comisión</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("commission")}%</div>
    ),
  },
];
export default function Page() {
  const userId = 1;
  const [data, setData] = React.useState<Payment[]>([]);
  const [eliminate, setEliminate] = React.useState<SelectedEmployeeProps[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<Payment | null>(null);
  const { refetch, isLoading: loadingEmployee } = useQuery({
    queryKey: ["employee", userId],
    queryFn: async (): Promise<EmployeesProps> => {
      const response = await fetch(`/api/employee/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);

      return result;
    },
  });
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const sheetRef = React.useRef<HTMLButtonElement>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const closePopover = () => closeButtonRef.current?.click();

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  //
  React.useEffect(() => {
    const employeeSelected = table
      .getFilteredSelectedRowModel()
      .flatRows.map((row) => {
        return {
          id: row.original.id,
        };
      });
    setEliminate(employeeSelected);
  }, [rowSelection]);
  const { mutate, isLoading } = useMutation({
    mutationFn: async (ids: SelectedEmployeeProps[]) => {
      await fetch(apiUrls.employee.deleteEmployee, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });
    },
    mutationKey: ["deleteEmployee"],
    onSuccess: () => {
      refetch();
      table.toggleAllRowsSelected(false);
    },
  });

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full lg:max-w-3xl ">
        <div className="flex items-center py-4">
          <SheetCalc selectedEmployee={selectedEmployee} ref={sheetRef} />
          {table.getFilteredSelectedRowModel().rows.length ? (
            <>
              {isLoading ? (
                <Button variant={"destructive"} disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando
                </Button>
              ) : (
                <Button
                  variant={"destructive"}
                  onClick={() => mutate(eliminate)}
                >
                  Eliminar
                </Button>
              )}
            </>
          ) : (
            <>
              <Input
                placeholder="Buscar empleado..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Popover>
                <PopoverTrigger ref={closeButtonRef} asChild>
                  <Button variant="outline" className="ml-2">
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end">
                  <EmployeeForm
                    userId={userId}
                    refetch={refetch}
                    closePopover={closePopover}
                  />
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
        <div className="rounded-md border">
          <Table className="relative">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
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
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        onClick={() => {
                          sheetRef.current?.click();
                          setSelectedEmployee(cell.row.original);
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : loadingEmployee ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center   "
                  >
                    <div className=" flex items-center justify-center">
                      <Loader2 className="mr-2 h-8 w-8 animate-spin " />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No hay empleados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
