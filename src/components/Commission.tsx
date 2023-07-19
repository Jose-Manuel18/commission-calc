// "use client"
// import React, { useState } from "react"
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// interface CommissionCalculatorProps {
//   id: string
//   commissionPercent: number
//   pay: number
// }

// export const CommissionCalculator: React.FC<CommissionCalculatorProps> = ({
//   commissionPercent,
//   pay,
// }) => {
//   const [dealValue, setDealValue] = useState<number>(0)
//   const [totalCommission, setTotalCommission] = useState<number>(0)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDealValue(Number(e.target.value))
//   }

//   const calculateCommission = () => {
//     const commissionAmount = dealValue * (commissionPercent / 100)
//     setTotalCommission((prevTotal) => prevTotal + commissionAmount)
//     setDealValue(0)
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Commission Calculator</CardTitle>
//         {/* <CardDescription>Card Description</CardDescription> */}
//       </CardHeader>
//       <CardContent>
//         <div className="p-8  rounded shadow-md">
//           <div className="mb-4">
//             <label className="block text-sm font-medium ">Deal Value</label>
//             <div className="flex">
//               <input
//                 type="number"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 value={dealValue}
//                 onChange={handleInputChange}
//               />
//               <button
//                 onClick={calculateCommission}
//                 className="ml-2 px-3 py-2  bg-indigo-500 rounded-md hover:bg-indigo-600"
//               >
//                 Add Commission
//               </button>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium ">Total</label>
//             <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-indigo-500 font-bold">
//               {totalCommission.toFixed(2)}
//             </p>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <p>Card Footer</p>
//       </CardFooter>
//     </Card>
//   )
// }

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useToast } from "@/components/ui/use-toast"
import { useRef, useState } from "react"
interface CommissionCalculatorProps {
  id?: string
  commissionPercent?: number
  pay?: number
  totalAmount?: number
}
export function CommissionCalculator({
  totalAmount,
  commissionPercent,
}: CommissionCalculatorProps) {
  const { toast } = useToast()
  const [dealValue, setDealValue] = useState<number>(0)
  const [totalCommission, setTotalCommission] = useState<number>(0)
  const montoRef = useRef<HTMLInputElement>(null)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDealValue(Number(e.target.value))
  }

  const calculateCommission = () => {
    if (commissionPercent) {
      const commissionAmount = dealValue * (commissionPercent / 100)
      setTotalCommission((prevTotal) => prevTotal + commissionAmount)
      if (montoRef.current) {
        montoRef.current.value = ""
      }
    }
  }

  return (
    <Card className="w-full rounded-t-md rounded-b-none">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
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
        <Button onClick={calculateCommission}> Sumar</Button>

        <Button
          onClick={() => {
            if (totalAmount) {
              navigator.clipboard.writeText(totalAmount.toString())
              toast({
                description: "Monto copiado!",
              })
            }
          }}
          variant={"outline"}
          className="cursor-text "
        >
          {" "}
          ${totalCommission.toFixed(2)}
        </Button>
      </CardFooter>
    </Card>
  )
}
