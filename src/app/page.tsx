// import { CommissionCalculator } from "@/components/Commission"
import { DataTableDemo } from "@/components/DataTable"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Commission",
  description: "Commission calculator",
}

export default async function Home() {
  const userId = 1
  // const user = await fetchUser(userId)

  return (
    <div className="flex w-full max-w-full items-center justify-center p-4">
      <DataTableDemo userId={userId} />
    </div>
  )
}
