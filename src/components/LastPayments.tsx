import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Loader2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiUrls } from "@/utils/apiUrls";

interface EmployeePayments {
  id: number;
  date: Date;
  value: number;
  employeeId: number;
}
interface LastPaymentsProps {
  employeePayments?: EmployeePayments[];
  isLoading: boolean;
  refetch: () => void;
}
export function LastPayments({
  employeePayments,
  isLoading,
  refetch,
}: LastPaymentsProps) {
  const { mutate, isLoading: isMutating } = useMutation({
    mutationKey: ["deletePayment"],
    mutationFn: async ({
      id,
      employeeId,
    }: {
      id: number;
      employeeId: number;
    }) => {
      await fetch(apiUrls.payment.deletePayment, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, employeeId }),
      });
    },

    onSuccess: refetch,
  });

  return (
    <div className="rounded-b-md border">
      {employeePayments?.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeePayments?.map((payment, index) => {
              let date = new Date(payment.date);
              return (
                <TableRow key={index}>
                  <TableCell className="">
                    ${payment.value.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-left">
                    {date.toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell className="text-left">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            mutate({
                              id: payment.id,
                              employeeId: payment.employeeId,
                            })
                          }
                        >
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : isLoading ? (
        <div className="flex justify-center ">
          <Loader2 className="my-2 h-8 w-8 animate-spin  text-gray-600" />
        </div>
      ) : (
        <Table>
          <TableRow className="text-center ">
            <TableCell className="font-medium">No hay pagos</TableCell>
          </TableRow>
        </Table>
      )}
    </div>
  );
}
