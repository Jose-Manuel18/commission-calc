import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import _ from "lodash";
interface CommissionCalculatorProps {
  id?: string;
  commissionPercent?: number;
  pay?: number;
  employeeId?: number;
  totalAmount?: {
    value: number;
  };

  refetch: () => void;
}
export function CommissionCalculator({
  employeeId,
  commissionPercent,
  refetch,
}: CommissionCalculatorProps) {
  const [totalCommission, setTotalCommission] = useState<number>(0);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["createPayment", employeeId],
    mutationFn: async (totalCommission: number) => {
      try {
        if (totalCommission) {
          return fetch("api/payment/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              employeeId: employeeId,
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
      setTotalCommission(0);
    },
  });

  const [dealValue, setDealValue] = useState<number>(0);

  const montoRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDealValue(Number(e.target.value));
  };

  const calculateCommission = () => {
    if (commissionPercent) {
      const commissionAmount = dealValue * (commissionPercent / 100);
      setTotalCommission((prevTotal) => prevTotal + commissionAmount);
      if (montoRef.current) {
        montoRef.current.value = "";
      }
    }
  };

  console.log(totalCommission);

  return (
    <Card className="w-full rounded-t-md rounded-b-none">
      <CardHeader>
        <CardTitle>Calculadora de Comisión</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex text-left flex-col space-y-1.5">
              <Label htmlFor="monto">Monto</Label>
              <Input
                ref={montoRef}
                type="number"
                id="monto"
                placeholder="Añadir monto"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex text-left flex-col space-y-1.5">
              <Label htmlFor="comision">Comisión</Label>
              <Input
                type="number"
                id="comision"
                placeholder={commissionPercent?.toString() + "%"}
                defaultValue={commissionPercent}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando
          </Button>
        ) : (
          <Button onClick={() => mutate(totalCommission)}>Guardar</Button>
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
  );
}
