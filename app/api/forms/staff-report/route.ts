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
    
    // Extract only necessary fields, ignoring reporter inputs if sent
    const { moderatorName, offense, description, additional } = formData;
    
    // Save to DB without reporter info
    await prisma.formResponse.create({
      data: {
        data: { moderatorName, offense, description, additional },
        userId,
        form: "staff-report",
      },
    });

    if (process.env.STAFF_REPORT_CHANNEL_ID) {
      try {
        const embed = {
          embeds: [
            {
              title: "⚠️ New Staff Report",
              color: 0xe74c3c,
              fields: [
                {
                   name: "Reporter", 
                   value: session.user.userId ? `<@${session.user.userId}> (${session.user.name})` : session.user.name || "N/A", 
                   inline: true 
                },
                { name: "Moderator", value: moderatorName || "N/A", inline: true },
                { name: "Offense", value: offense || "N/A", inline: true },
                { name: "Details", value: description ? description.substring(0, 1024) : "N/A", inline: false },
                { name: "Additional", value: additional || "N/A", inline: false },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: `Reporter ID: ${session.user.userId || "N/A"}` },
            },
          ],
        };

        await sendChannelMessage(process.env.STAFF_REPORT_CHANNEL_ID, embed);
      } catch (discordError) {
        console.error("Discord notification error:", discordError);
      }
    }

    return NextResponse.json({ message: "Report submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to process report:", error);
    return NextResponse.json({ message: "Failed to submit report." }, { status: 500 });
  }
}
