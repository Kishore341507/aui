"use client";

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

export default function Forms() {

    return (
        <div className='container mx-auto mt-8 px-4 space-y-8'>
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Forms & Applications</h1>
            </div>

            <div className="space-y-6">
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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

                    <Link href='/forms/modration' className="group transition-transform hover:scale-105">
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
                </div>
            </div>

            <Separator />
        </div>
    )
}
