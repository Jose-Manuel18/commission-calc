import { CommissionCalculator } from "@/components/Commission"
import { DataTableDemo } from "@/components/DataTable"

export const metadata = {
  title: "Commission",
  description: "Commission calculator",
}
export default async function Home() {
  const userId = 4

  return (
    <div className="flex max-h-screen items-center justify-center p-4">
      <DataTableDemo userId={userId} />
      {/* <CommissionCalculator
        name="John Doe"
        id={userId}
        commissionPercent={15}
      /> */}
    </div>
  )
}
