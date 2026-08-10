import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  ExternalLink,
  ShieldCheck,
  UserX,
  AlertTriangle,
  Calendar,
  Award,
  Palette,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Forms & Applications - AUI Discord | India's Most Active Discord Server",
  description:
    "Apply for moderator position or submit unban request for AUI Discord - India's most active Discord server. Join the Among Us India Discord moderation team.",
  keywords: [
    "AUI discord applications",
    "AUI discord moderator",
    "Among US India Discord moderator",
    "India's most active Discord server moderator",
    "AUI unban request",
    "AUI discord forms",
  ],
};

const FORMS_DATA = [
  {
    href: "/forms/moderation",
    title: "Moderator Application",
    description:
      "Apply for a moderator position on our server. Help maintain a safe, positive, and engaging community environment.",
    time: "1-2 weeks",
    icon: ShieldCheck,
    badge: "Staff Role",
    badgeVariant: "default" as const,
  },
  {
    href: "/forms/unban",
    title: "Unban Request",
    description:
      "Submit a request to appeal your ban from the server. Provide honest and detailed context regarding your case.",
    time: "3-5 days",
    icon: UserX,
    badge: "Appeals",
    badgeVariant: "destructive" as const,
  },
  {
    href: "/forms/staff-report",
    title: "Staff Report",
    description:
      "Report inappropriate staff behavior or false warnings. All submissions are processed strictly confidentially.",
    time: "3-5 days",
    icon: AlertTriangle,
    badge: "Confidential",
    badgeVariant: "secondary" as const,
  },
  {
    href: "/forms/event-team",
    title: "Event Team Application",
    description:
      "Join our event team to brainstorm, host, and manage engaging community activities and giveaways.",
    time: "1-2 weeks",
    icon: Calendar,
    badge: "Community",
    badgeVariant: "outline" as const,
  },
  {
    href: "/forms/marshal",
    title: "Marshal Application",
    description:
      "Apply to become a marshal and take charge of coordinating competitive gaming sessions and esports tournaments.",
    time: "1-2 weeks",
    icon: Award,
    badge: "Gaming",
    badgeVariant: "outline" as const,
  },
  {
    href: "/forms/media-team",
    title: "Media Team Application",
    description:
      "Create graphics, video edits, and promotional materials to power AUI's social presence and event marketing.",
    time: "1-2 weeks",
    icon: Palette,
    badge: "Creative",
    badgeVariant: "outline" as const,
  },
];

export default function Forms() {
  return (
    <div className="container mx-auto mt-8 px-4 sm:px-6 space-y-10 max-w-6xl pb-12">
      {/* Header / Hero Section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="outline" className="px-3 py-1 text-xs font-semibold">
          Community Portal
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Forms & Applications
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Select a category below to submit an official application, report an issue, or file a server ban appeal.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FORMS_DATA.map((form) => {
          const Icon = form.icon;
          return (
            <Link key={form.href} href={form.href} className="group block h-full">
              <Card className="h-full border border-border bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={form.badgeVariant} className="text-[11px] font-medium">
                      {form.badge}
                    </Badge>
                  </div>

                  <div>
                    <CardTitle className="text-lg font-bold flex items-center justify-between group-hover:text-primary transition-colors">
                      {form.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm leading-relaxed line-clamp-3">
                      {form.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardFooter className="pt-0 border-t border-border/40 mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-muted-foreground/80" />
                    <span>Processing: {form.time}</span>
                  </div>
                  <span className="font-medium text-primary inline-flex items-center group-hover:translate-x-0.5 transition-transform">
                    Apply <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>

      <Separator />
    </div>
  );
}