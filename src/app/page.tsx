import { CommissionCalculator } from "@/components/Commission"
export const metadata = {
  title: "Commission",
  description: "Commission calculator",
}
export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <CommissionCalculator />
    </div>
  )
}
