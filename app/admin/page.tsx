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
import { Clock, ExternalLink, Users, FileText, Shield, Settings } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className='container mx-auto mt-8 px-4 space-y-8'>
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage applications, users, and system settings</p>
            </div>

            <div className="space-y-6">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    
                    {/* Moderation Responses Card */}
                    <Link href='/admin/moderation-responses' className="group transition-transform hover:scale-105">
                        <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        Moderation Responses
                                    </div>
                                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardTitle>
                                <CardDescription>
                                    Review and manage moderator applications and other form submissions. Update status and process requests.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <FileText className="w-4 h-4 mr-1" />
                                    Form submissions management
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* User Management Card (Placeholder for future feature) */}
                    {/* <Card className="h-full border-2 opacity-60 cursor-not-allowed">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-muted-foreground">
                                <Users className="w-5 h-5" />
                                User Management
                            </CardTitle>
                            <CardDescription>
                                Manage user accounts, roles, and permissions. View user activity and handle account issues.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                Coming soon
                            </div>
                        </CardContent>
                    </Card> */}

                    {/* System Settings Card (Placeholder for future feature) */}
                    {/* <Card className="h-full border-2 opacity-60 cursor-not-allowed">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-muted-foreground">
                                <Settings className="w-5 h-5" />
                                System Settings
                            </CardTitle>
                            <CardDescription>
                                Configure application settings, manage server configurations, and system preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                Coming soon
                            </div>
                        </CardContent>
                    </Card> */}

                </div>
            </div>

            <Separator />

            <div className="text-center text-sm text-muted-foreground">
                <p>Admin panel for managing applications and system resources</p>
            </div>
        </div>
    );
}
