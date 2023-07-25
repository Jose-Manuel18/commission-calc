import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Loader2 } from "lucide-react";

interface EmployeePayments {
  id: number;
  date: Date;
  value: number;
  employeeId: number;
}
interface LastPaymentsProps {
  employeePayments?: EmployeePayments[];
  isLoading: boolean;
}
export function LastPayments({
  employeePayments,
  isLoading,
}: LastPaymentsProps) {
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
                    ${payment.value.toFixed(2)}
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
