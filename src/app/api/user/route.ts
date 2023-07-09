import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
interface RequestBody {
  name: string
  email: string
  password: string
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })
  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 })
  } else {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    })
    const { password, ...rest } = user
    return NextResponse.json(rest, { status: 200 })
  }
}
