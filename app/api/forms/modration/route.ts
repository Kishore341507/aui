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

    // Save the form data to the database
    await prisma.formResponse.create({
      data: {
        data: { ...formData },
        userId: userId,
        form: "moderation",
      },
    });

    // Send Discord message if MOD_APPLICATION_CHANNEL_ID exists
    if (process.env.MOD_APPLICATION_CHANNEL_ID) {
      try {
        if (!process.env.DISCORD_BOT_TOKEN) throw new Error("DISCORD_BOT_TOKEN is missing");
        const embed = {
          embeds: [
            {
              title: "🛡️ New Moderator Application",
              color: 0x5865f2,
              fields: [
                {
                  name: "👤 Applicant",
                  value: `**${session.user.name || "Unknown"}**\nUser ID: \`${session.user.userId}\`\nEmail: ${session.user.email || "No email"}`,
                  inline: false,
                },
                {
                  name: "🌍 Country",
                  value: formData.country || "Not provided",
                  inline: true,
                },
                {
                  name: "🎂 Age",
                  value: formData.age || "Not provided",
                  inline: true,
                },
                {
                  name: "⏰ Available Time",
                  value: formData.contributionTime || "Not provided",
                  inline: false,
                },
                {
                  name: "🎤 Voice Chat",
                  value: formData.voiceChat || "Not provided",
                  inline: true,
                },
                {
                  name: "🤖 Bot Experience",
                  value: `${formData.botExperience || "N/A"}/5`,
                  inline: true,
                },
                {
                  name: "📝 Moderation Definition",
                  value: formData.moderationDefinition
                    ? formData.moderationDefinition.substring(0, 1024)
                    : "Not provided",
                  inline: false,
                },
                {
                  name: "📚 Past Experience",
                  value: formData.pastExperience
                    ? formData.pastExperience.substring(0, 1024)
                    : "Not provided",
                  inline: false,
                },
                {
                  name: "⏳ Service Duration",
                  value: formData.serviceDuration || "Not provided",
                  inline: false,
                },
                {
                  name: "ℹ️ About",
                  value: formData.aboutYourself
                    ? formData.aboutYourself.substring(0, 1024)
                    : "Not provided",
                  inline: false,
                },
              ],
              timestamp: new Date().toISOString(),
              footer: {
                text: "AUI Moderation Application",
              },
            },
          ],
        };

        await sendChannelMessage(process.env.MOD_APPLICATION_CHANNEL_ID, embed);
      } catch (webhookError) {
        console.error("Discord webhook error:", webhookError);
        // Continue even if webhook fails
      }
    }

    return NextResponse.json(
      { message: "Application submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to process application:", error);
    return NextResponse.json(
      { message: "Failed to submit application." },
      { status: 500 }
    );
  }
}
