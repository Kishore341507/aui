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
        userId: userId,
        form: "marshal",
      },
    });

    if (process.env.CAP_MARSHAL_WEBHOOK_URL) {
      try {
        const embed = {
          embeds: [
            {
              title: "🧭 New Marshal Application",
              color: 0x57f287,
              fields: [
                { name: "Game", value: formData.game || "Not provided", inline: true },
                { name: "Active Times", value: formData.activeTimes || "Not provided", inline: true },
                { name: "Dedicated Time", value: formData.dedicateTime || "Not provided", inline: true },
                { name: "Bot Experience", value: formData.botExperience || "Not provided", inline: true },
                { name: "Reason", value: formData.reason ? formData.reason.substring(0, 1024) : "Not provided", inline: false },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "AUI Marshal Application" },
            },
          ],
        };

        await fetch(process.env.CAP_MARSHAL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(embed),
        });
      } catch (webhookError) {
        console.error("Discord webhook error:", webhookError);
      }
    }

    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to process application:", error);
    return NextResponse.json({ message: "Failed to submit application." }, { status: 500 });
  }
}
