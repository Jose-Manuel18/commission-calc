import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

interface RequestBody {
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

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  if (await bcrypt.compare(body.password, user.password)) {
    const { password, ...rest } = user

    return NextResponse.json(rest, {
      status: 200,
    })
  } else {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    )
  }
}
