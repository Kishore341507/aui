import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/prisma/db";
import { buildFormEmbed } from "@/lib/discord";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.json();
    const userId = session.user.id;

    await prisma.formResponse.create({
      data: {
        data: { ...formData },
        userId: userId,
        form: "staff-report",
      },
    });

    if (process.env.STAFF_REPORT_WEBHOOK_URL) {
      try {
        const embed = buildFormEmbed({
          title: "Staff Report",
          emoji: "📣",
          color: 0xff0000,
          session,
          fields: [
            { name: "Reporter Username", value: formData.reporter_username },
            { name: "Reporter ID", value: formData.reporter_id },
            { name: "Moderator Name", value: formData.moderator_name },
            { name: "Offense", value: formData.offense },
            { name: "Details", value: formData.details },
            { name: "Additional", value: formData.additional },
          ],
          footerText: "AUI Staff Report",
        });

        await fetch(process.env.STAFF_REPORT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(embed),
        });
      } catch (err) {
        console.error("Webhook error (staff-report):", err);
      }
    }

    return NextResponse.json({ message: "Report submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to process report:", error);
    return NextResponse.json({ message: "Failed to submit report." }, { status: 500 });
  }
}
