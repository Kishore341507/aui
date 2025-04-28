import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from 'react'

export default function Forms() {
    return (
        <div className='container mx-auto mt-8 px-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                <Link href='/forms/unban'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Unban From</CardTitle>
                            <CardDescription>Fill this form to request an unban from the server</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                
                <Link href='/forms/modApp'>
                <Card>
                    <CardHeader>
                        <CardTitle>Mod Application</CardTitle>
                        <CardDescription>Fill this form to apply for a moderator position</CardDescription>
                    </CardHeader>
                </Card>
                </Link>

            </div>
        </div>
    )
}
