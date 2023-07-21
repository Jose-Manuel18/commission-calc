import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { get: string } }) {
  const userId = parseInt(params.get);
  try {
    const employee = await prisma.employee.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        commission: true,
        payment: {
          select: { value: true },
          orderBy: { value: "desc" },
        },
      },
    });
    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
