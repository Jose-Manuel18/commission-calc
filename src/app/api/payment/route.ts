import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface POSTBodyRequest {
  employeeId: number;
  value: string;
  monto: number;
}
export async function POST(req: Request) {
  const body: POSTBodyRequest = await req.json();
  try {
    const payment = await prisma.payment.create({
      data: {
        value: +body.value,
        employeeId: body.employeeId,
        date: new Date(),
        monto: body.monto,
      },
    });
    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
interface DELETEBodyRequest {
  employeeId: number;
  ids: number[];
}
export async function DELETE(req: Request) {
  const body: DELETEBodyRequest = await req.json();

  try {
    const deletePayment = await prisma.payment.deleteMany({
      where: {
        employeeId: body.employeeId,
        id: {
          in: body.ids,
        },
      },
    });
    return NextResponse.json(deletePayment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
