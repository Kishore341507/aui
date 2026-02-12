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
        form: "media-team",
      },
    });

    if (process.env.MEDIA_TEAM_WEBHOOK_URL) {
      try {
        const embed = buildFormEmbed({
          title: "Media Team Application",
          emoji: "🎬",
          color: 0x1f2937,
          session,
          fields: [
            { name: "Discord Username", value: formData.discordUsername },
            { name: "Discord ID", value: formData.discordId },
            { name: "Platform", value: formData.platform },
            { name: "Handles / Links", value: formData.handles },
            { name: "Content Type", value: formData.contentType },
            { name: "Server Familiarity", value: formData.serverFamiliarity },
            { name: "Tools", value: formData.tools },
            { name: "Experience / Examples", value: formData.experience },
          ],
          footerText: "AUI Media Team Application",
        });

        await fetch(process.env.MEDIA_TEAM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(embed),
        });
      } catch (err) {
        console.error("Webhook error (media-team):", err);
      }
    }

    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to process application:", error);
    return NextResponse.json({ message: "Failed to submit application." }, { status: 500 });
  }
}
