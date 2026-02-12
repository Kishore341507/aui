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
        form: "cap-marshal",
      },
    });

    if (process.env.CAP_MARSHAL_WEBHOOK_URL) {
      try {
        const embed = buildFormEmbed({
          title: "Cap/Marshal Application",
          emoji: "🎖️",
          color: 0x5865f2,
          session,
          fields: [
            { name: "Game", value: formData.game },
            { name: "Active Timings", value: formData.activeTimings },
            { name: "Dedication", value: formData.dedication },
            { name: "Knows Bots", value: formData.knowBots },
            { name: "Why", value: formData.why },
          ],
          footerText: "AUI Cap/Marshal Application",
        });

        await fetch(process.env.CAP_MARSHAL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(embed),
        });
      } catch (err) {
        console.error("Webhook error (cap-marshal):", err);
      }
    }

    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to process application:", error);
    return NextResponse.json({ message: "Failed to submit application." }, { status: 500 });
  }
}
