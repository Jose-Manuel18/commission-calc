import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { get: string } }) {
  const employeeId = params.get;

  try {
    const payments = await prisma.payment.findMany({
      where: {
        employeeId: +employeeId,
      },
      take: 5,
      orderBy: {
        value: "desc",
      },
    });
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
