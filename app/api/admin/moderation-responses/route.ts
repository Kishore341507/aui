import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/prisma/db";
import { console } from "inspector";

export async function GET(request: Request) {
    try {
        const session = await auth();
        
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true, email: true , role: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isAdmin = user.role === 'admin' ;

        if (!isAdmin) {
            return NextResponse.json({ error: "Access denied. Admin privileges required." }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const offset = (page - 1) * limit;

        // Build where clause
        const whereClause: {
            form: string;
            status?: string;
        } = {
            form: "moderation"
        };

        if (status && status !== 'ALL') {
            whereClause.status = status;
        }

        // Fetch moderation responses with pagination
        const [responses, totalCount] = await Promise.all([
            prisma.formResponse.findMany({
                where: whereClause,
                orderBy: { createdAt: 'desc' },
                skip: offset,
                take: limit,
                select: {
                    id: true,
                    userId: true,
                    form: true,
                    data: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            }),
            prisma.formResponse.count({
                where: whereClause
            })
        ]);

        // Get user information for each response
        const responsesWithUsers = await Promise.all(
            responses.map(async (response: {
                id: string;
                userId: string;
                form: string;
                data: unknown;
                status: 'PENDING' | 'ACCEPTED' | 'UNDER_REVIEW' | 'REJECTED';
                createdAt: Date;
                updatedAt: Date;
            }) => {
                const user = await prisma.user.findUnique({
                    where: { id: response.userId },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        accounts: {
                            select: {
                                provider: true,
                                providerAccountId: true
                            }
                        }
                    }
                });
                return { ...response, user };
            })
        );

        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            responses: responsesWithUsers,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        });
    } catch (error) {
        console.error("Error fetching moderation responses:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await auth();
        
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user is admin
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true, email: true , role: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isAdmin = user.role === 'admin' ;
        if (!isAdmin) {
            return NextResponse.json({ error: "Access denied. Admin privileges required." }, { status: 403 });
        }

        const { responseId, status } = await request.json();

        if (!responseId || !status) {
            return NextResponse.json({ error: "Response ID and status are required" }, { status: 400 });
        }

        // Validate status
        const validStatuses = ['PENDING', 'ACCEPTED', 'UNDER_REVIEW', 'REJECTED'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        // Update the response status
        const updatedResponse = await prisma.formResponse.update({
            where: { 
                id: responseId,
                form: "moderation"
            },
            data: { 
                status: status,
                updatedAt: new Date()
            },
            select: {
                id: true,
                userId: true,
                form: true,
                data: true,
                status: true,
                createdAt: true,
                updatedAt: true
            }
        });

        // Get user information
        const responseUser = await prisma.user.findUnique({
            where: { id: updatedResponse.userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                accounts: {
                    select: {
                        provider: true,
                        providerAccountId: true
                    }
                }
            }
        });

        return NextResponse.json({ ...updatedResponse, user: responseUser });
    } catch (error) {
        console.error("Error updating response status:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
