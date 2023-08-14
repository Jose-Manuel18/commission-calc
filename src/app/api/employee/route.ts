import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface PostBodyRequest {
  name: string;
  userId: number;
  commission: string;
}

export async function POST(req: Request) {
  let body: PostBodyRequest;
  try {
    body = await req.json();
    if (
      (typeof body.name !== "string" && typeof body.commission !== "string") ||
      (body.userId && typeof body.userId !== "number")
    ) {
      throw new Error("Invalid input");
    }
  } catch (error) {
    // If we can't parse the request body, return a 400 response.
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const employee = await prisma.employee.create({
      data: {
        name: body.name,
        userId: body.userId,
        commission: +body.commission,
      },
    });
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    // If the database operation fails, log the error and return a 500 response.
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

interface DeleteBodyRequest {
  ids: {
    id: string;
  }[];
}

export async function DELETE(req: Request) {
  const body: DeleteBodyRequest = await req.json();

  const ids = body.ids.map((id) => id.id);

  try {
    const deleteEmployee = await prisma.employee.deleteMany({
      where: {
        id: {
          in: ids.map(Number),
        },
      },
    });
    return NextResponse.json(deleteEmployee, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
