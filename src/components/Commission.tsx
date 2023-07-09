// "use client"
// import { useRef, useState } from "react"
// import { motion } from "framer-motion"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"
// export function CommissionCalculator() {
//   const { setTheme } = useTheme()
//   const [sales, setSales] = useState<number>(0)
//   const [commissionRate, setCommissionRate] = useState(0)
//   const [commission, setCommission] = useState(0)
//   const salesRef = useRef<HTMLInputElement>(null)
//   const commissionRef = useRef<HTMLInputElement>(null)
//   const calculateCommission = () => {
//     const commission = (sales * commissionRate) / 100
//     setCommission(commission)
//   }
//   console.log(sales)

//   return (
//     <motion.div
//       className="container justify-center flex p-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="w-full max-w-xs">
//         <form className="border-[0.5px] shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
//               htmlFor="sales"
//             >
//               Sales Amount ($)
//             </label>
//             <div className="flex items-center justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//               <input
//                 ref={salesRef}
//                 className="w-full focus:outline-none focus:shadow-outline"
//                 id="sales"
//                 type="number"
//                 placeholder="Sales amount"
//                 onChange={(e) => setSales(parseInt(e.target.value))}
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className={`flex ml-2 w-4 h-4 cursor-pointer text-black ${
//                   sales === 0 ? "hidden" : "block"
//                 }`}
//                 onClick={() => {
//                   setSales(0)
//                   if (salesRef.current) {
//                     salesRef.current.value = ""
//                   }
//                 }}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="commission-rate"
//             >
//               Commission Rate (%)
//             </label>
//             <div className="flex items-center justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//               <input
//                 ref={commissionRef}
//                 className=" w-full focus:outline-none focus:shadow-outline"
//                 id="commission-rate"
//                 type="number"
//                 placeholder="Commission rate"
//                 onChange={(e) => setCommissionRate(parseInt(e.target.value))}
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className={`flex ml-2 w-4 h-4 cursor-pointer text-black ${
//                   commissionRate === 0 ? "hidden" : "block"
//                 }`}
//                 onClick={() => {
//                   setCommissionRate(0)
//                   if (commissionRef.current) {
//                     commissionRef.current.value = ""
//                   }
//                 }}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="button"
//               onClick={calculateCommission}
//             >
//               Calculate
//             </button>
//           </div>
//         </form>
//         <p className="text-center text-white text-md">
//           Your commission is: ${commission}
//         </p>
//       </div>
//     </motion.div>
//   )
// }
"use client"
import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
interface CommissionCalculatorProps {
  name: string
  id: number
  commissionPercent: number
}

export const CommissionCalculator: React.FC<CommissionCalculatorProps> = ({
  name,
  id,
  commissionPercent,
}) => {
  const [dealValue, setDealValue] = useState<number>(0)
  const [totalCommission, setTotalCommission] = useState<number>(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDealValue(Number(e.target.value))
  }

  const calculateCommission = () => {
    const commissionAmount = dealValue * (commissionPercent / 100)
    setTotalCommission((prevTotal) => prevTotal + commissionAmount)
    setDealValue(0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Calculator for {name}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="p-8  rounded shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium ">Deal Value</label>
            <div className="flex">
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={dealValue}
                onChange={handleInputChange}
              />
              <button
                onClick={calculateCommission}
                className="ml-2 px-3 py-2  bg-indigo-500 rounded-md hover:bg-indigo-600"
              >
                Add Commission
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium ">
              Total Commission
            </label>
            <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-indigo-500 font-bold">
              {totalCommission.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
