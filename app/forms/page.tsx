import type { Metadata } from "next";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Forms & Applications - AUI Discord | India's Most Active Discord Server",
  description: "Apply for moderator position or submit unban request for AUI Discord - India's most active Discord server. Join the Among US India Discord moderation team.",
  keywords: [
    "AUI discord applications",
    "AUI discord moderator",
    "Among US India Discord moderator",
    "India's most active Discord server moderator",
    "AUI unban request",
    "AUI discord forms"
  ],
};

export default function Forms() {

    return (
        <div className='container mx-auto mt-8 px-4 space-y-8'>
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Forms & Applications</h1>
            </div>

            <div className="space-y-6">
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    
                    <Link href='/forms/moderation' className="group transition-transform hover:scale-105">
                        <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Moderator Application
                                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardTitle>
                                <CardDescription>
                                    Apply for a moderator position on our server. Help maintain a positive community environment.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 mr-1" />
                                    Processing time: 1-2 weeks
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href='/forms/unban' className="group transition-transform hover:scale-105">
                        <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Unban Request
                                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardTitle>
                                <CardDescription>
                                    Submit a request to appeal your ban from the server. Provide detailed information about your case.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 mr-1" />
                                    Processing time: 3-5 days
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href='/forms/staff-report' className="group transition-transform hover:scale-105">
                        <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Staff Report
                                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardTitle>
                                <CardDescription>
                                    Report staff behaviour or false warnings. Reports are confidential.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 mr-1" />
                                    Processing time: 3-5 days
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                </div>
            </div>

            <Separator />
        </div>
    )
}
