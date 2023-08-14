import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LastPayments } from "./LastPayments";
import { forwardRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { apiUrls } from "@/utils/apiUrls";
import { Payment } from "@/app/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React from "react";
interface SelectedEmployee {
  selectedEmployee: Payment | null;
}
interface EmployeePayments {
  id: number;
  date: Date;
  value: number;
  employeeId: number;
}
export const SheetCalc = forwardRef<HTMLButtonElement, SelectedEmployee>(
  ({ selectedEmployee }, ref) => {
    const [dealValue, setDealValue] = React.useState<number>(0);
    const [totalCommission, setTotalCommission] = React.useState<number>(0);
    const montoRef = React.useRef<HTMLInputElement>(null);
    const calculateCommission = () => {
      if (selectedEmployee?.commission) {
        const commissionAmount =
          dealValue * (selectedEmployee?.commission / 100);
        setTotalCommission((prevTotal) => prevTotal + commissionAmount);
        setDealValue(0);
        if (montoRef.current) {
          montoRef.current.value = "";
          montoRef.current.focus();
        }
      }
    };
    const {
      data: employeePayments,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["getPayment", selectedEmployee?.id],
      queryFn: async (): Promise<EmployeePayments[]> => {
        if (!selectedEmployee?.id) return Promise.resolve([]);
        try {
          const response = await fetch(
            apiUrls.payment.getPayment(selectedEmployee.id),
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          const json = await response.json();
          const sortedData = _.orderBy(json, ["date"], ["desc"]);
          return _.take(sortedData, 5);
        } catch (error) {
          throw new Error();
        }
      },
      enabled: !!selectedEmployee?.id,
    });

    const { mutate, isLoading: isMutating } = useMutation({
      mutationKey: ["createPayment", selectedEmployee?.id],
      mutationFn: async (totalCommission: number) => {
        try {
          if (totalCommission) {
            return fetch(apiUrls.payment.createPayment, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                employeeId: selectedEmployee?.id,
                value: totalCommission,
              }),
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
      onSuccess: () => {
        refetch();
        setDealValue(0);
        setTotalCommission(0);
      },
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDealValue(Number(e.target.value));
    };

    const totalAmount = employeePayments?.reduce(
      (acc, curr) => acc + curr.value,
      selectedEmployee?.total ?? 0,
    );

    return (
      <AlertDialog>
        <AlertDialogTrigger ref={ref}></AlertDialogTrigger>
        <AlertDialogContent className="flex h-full flex-col overflow-auto">
          <AlertDialogHeader>
            <Card className="w-full rounded-b-none rounded-t-md">
              <CardHeader>
                <CardTitle>Calculadora de Comisión</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5 text-left">
                      <Label htmlFor="monto">Monto</Label>
                      <Input
                        ref={montoRef}
                        type="number"
                        id="monto"
                        placeholder="Añadir monto"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5 text-left">
                      <Label htmlFor="comision">Comisión</Label>
                      <Input
                        type="number"
                        id="comision"
                        placeholder={
                          selectedEmployee?.commission?.toString() + "%"
                        }
                        defaultValue={selectedEmployee?.commission}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isMutating ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando
                  </Button>
                ) : (
                  <Button onClick={() => mutate(totalCommission)}>
                    Guardar
                  </Button>
                )}
                <div>
                  <Button
                    onClick={calculateCommission}
                    variant={"secondary"}
                    className="mr-2"
                  >
                    {" "}
                    Sumar
                  </Button>

                  <Button variant={"outline"} className="cursor-pointer ">
                    {" "}
                    ${totalCommission.toFixed(2)}
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <LastPayments
              isLoading={isLoading}
              employeePayments={employeePayments}
              refetch={refetch}
            />
          </AlertDialogHeader>
          <AlertDialogFooter className=" flex flex-row  pb-16 lg:block ">
            <AlertDialogAction className="w-full select-none lg:w-auto">
              Cerrar
            </AlertDialogAction>
            <Button
              className="ml-2 cursor-text select-text lg:ml-0"
              variant={"secondary"}
            >
              ${totalAmount?.toLocaleString()}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);
