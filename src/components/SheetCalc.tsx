// import React, { forwardRef } from "react"
// import {
//   SheetTrigger,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   Sheet,
// } from "./ui/sheet"
// import { CommissionCalculator } from "./Commission"
// import { LastPayments } from "./LastPayments"

interface SheetCalcProps {
  children?: React.ReactNode
  name: string
  id: string
  commission: number
  pay: number
}

// export const SheetCalc = forwardRef<HTMLButtonElement, SheetCalcProps>(
//   ({ children, name, id, commission, pay }, ref) => {
//     return (
//       <Sheet>
//         <SheetTrigger ref={ref}></SheetTrigger>
//         <SheetContent
//           className="overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <SheetHeader>
//             <SheetTitle>Who's sheet this belongs to? {name}</SheetTitle>
//             <SheetDescription>
//               <CommissionCalculator totalAmount={pay} />
//               <LastPayments />
//             </SheetDescription>
//           </SheetHeader>
//         </SheetContent>
//       </Sheet>
//     )
//   },
// )
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CommissionCalculator } from "./Commission"
import { LastPayments } from "./LastPayments"
import { forwardRef } from "react"

export const Modal = forwardRef<HTMLButtonElement, SheetCalcProps>(
  ({ children, name, id, commission, pay }, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger ref={ref}></AlertDialogTrigger>
        <AlertDialogContent className="overflow-y-scroll h-screen">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <CommissionCalculator
                commissionPercent={commission}
                totalAmount={pay}
              />
              <LastPayments />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  },
)
