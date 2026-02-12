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
        form: "event-team",
      },
    });

    if (process.env.EVENT_TEAM_WEBHOOK_URL) {
      try {
        const embed = buildFormEmbed({
          title: "Event Team Application",
          emoji: "🎪",
          color: 0x34d399,
          session,
          fields: [
            { name: "Discord Username", value: formData.discordUsername },
            { name: "Discord ID", value: formData.discordId },
            { name: "Evenings/Weekends Available", value: formData.eveningsWeekends },
            { name: "Time per Week", value: formData.timePerWeek },
            { name: "Available for Voice Calls", value: formData.voiceCalls },
            { name: "Device", value: formData.device },
            { name: "Games", value: formData.games },
          ],
          footerText: "AUI Event Team Application",
        });

        await fetch(process.env.EVENT_TEAM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(embed),
        });
      } catch (err) {
        console.error("Webhook error (event-team):", err);
      }
    }

    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to process application:", error);
    return NextResponse.json({ message: "Failed to submit application." }, { status: 500 });
  }
}
