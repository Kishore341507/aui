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

    // Save the form data to the database
    await prisma.formResponse.create({
      data: {
        data: { ...formData },
        userId: userId,
        form: "moderation",
      },
    });

    // Send Discord webhook if MOD_FORM_WEBHOOK_URL exists
    if (process.env.MOD_FORM_WEBHOOK_URL) {
      try {
        const embed = buildFormEmbed({
          title: "Moderator Application",
          emoji: "🛡️",
          color: 0x5865f2,
          session,
          fields: [
            { name: "Country", value: formData.country, inline: true },
            { name: "Age", value: formData.age, inline: true },
            { name: "Available Time", value: formData.contributionTime },
            { name: "Voice Chat", value: formData.voiceChat, inline: true },
            { name: "Bot Experience", value: formData.botExperience ? `${formData.botExperience}/5` : "N/A", inline: true },
            { name: "Moderation Definition", value: formData.moderationDefinition },
            { name: "Past Experience", value: formData.pastExperience },
            { name: "Service Duration", value: formData.serviceDuration },
            { name: "About", value: formData.aboutYourself },
          ],
          footerText: "AUI Moderation Application",
        });

        await fetch(process.env.MOD_FORM_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(embed),
        });
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
