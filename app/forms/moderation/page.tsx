import type { Metadata } from "next";
import ModerationForm from "./mod-form";

export const metadata: Metadata = {
  title: "Staff Application - India's Most Active Discord Server",
  description: "Apply to join the India's Most Active Discord Server AUI moderation team. Help maintain a safe and welcoming community by volunteering as a moderator.",
  keywords: ["staff application", "moderation", "community", "volunteer", "Discord"],
  openGraph: {
    title: "Staff Application - India's Most Active Discord Server",
    description: "Apply to join the India's Most Active Discord Server AUI moderation team. Help maintain a safe and welcoming community by volunteering as a moderator.",
    type: "website",
  },
};

export default function Page() {
  return <ModerationForm />;
}
