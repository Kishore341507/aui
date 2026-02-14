import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/prisma/db";
import { sendChannelMessage } from "@/lib/discord";

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
        form: "media-team",
      },
    });

    if (process.env.MEDIA_TEAM_CHANNEL_ID) {
      try {
        if (!process.env.DISCORD_BOT_TOKEN) throw new Error("DISCORD_BOT_TOKEN is missing");
        const embed = {
          embeds: [
            {
              title: "📸 New Media Team Application",
              color: 0x1abc9c,
              fields: [
                { name: "Applicant", value: session.user.userId ? `<@${session.user.userId}> (${session.user.name})` : session.user.name || "N/A", inline: true },
                { name: "User ID", value: session.user.userId || "N/A", inline: true },
                { name: "Platform", value: formData.platform || "N/A", inline: true },
                { name: "Handle", value: formData.socialHandle || "N/A", inline: true },
                { name: "Content Type", value: formData.contentType ? formData.contentType.substring(0, 1024) : "N/A", inline: false },
                { name: "Tools", value: formData.tools || "N/A", inline: true },
                { name: "Examples", value: formData.examples || "N/A", inline: false },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "AUI Media Application" },
            },
          ],
        };

        await sendChannelMessage(process.env.MEDIA_TEAM_CHANNEL_ID, embed);
      } catch (discordError) {
        console.error("Discord notification error:", discordError);
      }
    }

    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to process application:", error);
    return NextResponse.json({ message: "Failed to submit application." }, { status: 500 });
  }
}
