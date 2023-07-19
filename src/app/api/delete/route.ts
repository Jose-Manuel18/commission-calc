import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
interface RequestBody {
  ids: {
    id: string
  }[]
}

export async function DELETE(req: Request) {
  const body: RequestBody = await req.json()

  const ids = body.ids.map((id) => id.id)

  try {
    const deleteEmployee = await prisma.employee.deleteMany({
      where: {
        id: {
          in: ids.map(Number),
        },
      },
    })
    return NextResponse.json(deleteEmployee, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
