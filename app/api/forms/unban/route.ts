import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/prisma/db";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.json();
    const userId = session.user.id;

    // Save the form data to the database
    await prisma.formResponse.create({
      data: {
        data: { ...formData },
        userId: userId,
        form: "unban",
      },
    });

    return NextResponse.json(
      { message: "Unban request submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to process unban request:", error);
    return NextResponse.json(
      { message: "Failed to submit unban request." },
      { status: 500 }
    );
  }
}
