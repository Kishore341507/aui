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

    await prisma.formResponse.create({
      data: {
        data: { ...formData },
        userId,
        form: "staff-report",
      },
    });

    if (process.env.STAFF_REPORT_WEBHOOK_URL) {
      try {
        const embed = {
          embeds: [
            {
              title: "⚠️ New Staff Report",
              color: 0xe74c3c,
              fields: [
                { name: "Reporter", value: formData.reporterUsername || "N/A", inline: true },
                { name: "Reporter ID", value: formData.reporterId || "N/A", inline: true },
                { name: "Moderator", value: formData.moderatorName || "N/A", inline: true },
                { name: "Offense", value: formData.offense || "N/A", inline: true },
                { name: "Details", value: formData.description ? formData.description.substring(0, 1024) : "N/A", inline: false },
                { name: "Additional", value: formData.additional || "N/A", inline: false },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "AUI Staff Report" },
            },
          ],
        };

        await fetch(process.env.STAFF_REPORT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(embed),
        });
      } catch (webhookError) {
        console.error("Discord webhook error:", webhookError);
      }
    }

    return NextResponse.json({ message: "Report submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to process report:", error);
    return NextResponse.json({ message: "Failed to submit report." }, { status: 500 });
  }
}
