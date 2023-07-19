import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"

interface EmployeePayments {
  id: number
  date: Date
  value: number
  employeeId: number
}
interface LastPaymentsProps {
  employeeId?: number
}
export function LastPayments({ employeeId }: LastPaymentsProps) {
  const { data: employeePayments } = useQuery({
    queryKey: ["getPayment", employeeId],
    queryFn: async (): Promise<EmployeePayments[]> => {
      const response = await fetch(`api/payment/${employeeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      return response.json()
    },
  })
  //   const fechas = employeePayments?.map((payment) => payment.date)
  // const date = new Date(fechas)

  if (employeePayments) {
    const fechas = employeePayments.map((payment) => {
      let date = new Date(payment.date)
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    })
    console.log(fechas)
  }
  console.log("employeeId", employeePayments)

  return (
    <div className="border rounded-b-md">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeePayments?.map((payment) => {
            let date = new Date(payment.date)
            return (
              <TableRow key={payment.employeeId}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                {/* <TableCell>{invoice.paymentStatus}</TableCell> */}
                <TableCell>
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
                <TableCell className="text-right">${payment.value}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
