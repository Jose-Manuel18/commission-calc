import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface RequestBody {
  employeeId: number
  value: string
}
export async function POST(req: Request) {
  const body: RequestBody = await req.json()
  try {
    const payment = await prisma.payment.create({
      data: {
        value: +body.value,
        employeeId: body.employeeId,
        date: new Date(),
      },
    })
    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
