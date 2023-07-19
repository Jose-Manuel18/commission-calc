import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CommissionCalculator } from "./Commission"
import { LastPayments } from "./LastPayments"
import { forwardRef } from "react"
import { Payment } from "./DataTable"
interface SelectedEmployee {
  selectedEmployee: Payment | null
}

export const Modal = forwardRef<HTMLButtonElement, SelectedEmployee>(
  ({ selectedEmployee }, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger ref={ref}></AlertDialogTrigger>
        <AlertDialogContent className="overflow-y-scroll h-screen">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <CommissionCalculator
              commissionPercent={selectedEmployee?.commission}
              totalAmount={selectedEmployee?.pay}
            />
            <LastPayments />
          </AlertDialogHeader>
          <AlertDialogFooter className="pb-16">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  },
)
