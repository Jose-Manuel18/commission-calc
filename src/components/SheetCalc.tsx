import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CommissionCalculator } from "./Commission";
import { LastPayments } from "./LastPayments";
import { forwardRef } from "react";
import { Payment } from "./DataTable";
import { useQuery } from "@tanstack/react-query";

import _ from "lodash";
interface SelectedEmployee {
  selectedEmployee: Payment | null;
}
interface EmployeePayments {
  id: number;
  date: Date;
  value: number;
  employeeId: number;
}
export const Modal = forwardRef<HTMLButtonElement, SelectedEmployee>(
  ({ selectedEmployee }, ref) => {
    const {
      data: employeePayments,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["getPayment", selectedEmployee?.id],
      queryFn: async (): Promise<EmployeePayments[]> => {
        const response = await fetch(`api/payment/${selectedEmployee?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        const sortedData = _.orderBy(json, ["date"], ["desc"]);
        return _.take(sortedData, 5);
      },
      enabled: !!selectedEmployee?.id,
    });

    return (
      <AlertDialog>
        <AlertDialogTrigger ref={ref}></AlertDialogTrigger>
        <AlertDialogContent className="overflow-y-scroll h-screen">
          <AlertDialogHeader>
            <CommissionCalculator
              commissionPercent={selectedEmployee?.commission}
              employeeId={selectedEmployee?.id}
              totalAmount={selectedEmployee?.payment}
              refetch={refetch}
            />
            <LastPayments
              isLoading={isLoading}
              employeePayments={employeePayments}
            />
          </AlertDialogHeader>
          <AlertDialogFooter className="pb-16">
            <AlertDialogAction>Cerrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);
