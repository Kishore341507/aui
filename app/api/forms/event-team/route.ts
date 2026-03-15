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
        form: "event-team",
      },
    });

    if (process.env.EVENT_TEAM_CHANNEL_ID) {
      try {
        if (!process.env.DISCORD_BOT_TOKEN) throw new Error("DISCORD_BOT_TOKEN is missing");
        const embed = {
          embeds: [
            {
              title: "🎪 New Events Team Application",
              color: 0xf1c40f,
              fields: [
                { name: "Applicant", value: session.user.userId ? `<@${session.user.userId}> (${session.user.name})` : session.user.name || "N/A", inline: true },
                { name: "User ID", value: session.user.userId || "N/A", inline: true },
                { name: "Available Evenings", value: formData.availableEvenings || "N/A", inline: true },
                { name: "Weekly Hours", value: formData.weeklyHours || "N/A", inline: true },
                { name: "Voice Calls", value: formData.voiceCalls || "N/A", inline: true },
                { name: "Device", value: formData.device || "N/A", inline: true },
                { name: "Games", value: formData.games ? formData.games.substring(0, 1024) : "N/A", inline: false },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "AUI Events Application" },
            },
          ],
        };

        await sendChannelMessage(process.env.EVENT_TEAM_CHANNEL_ID, embed);
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
