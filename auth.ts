import NextAuth, { DefaultSession } from "next-auth"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma/db"

// Extend the Session type to include userId
declare module "next-auth" {
    interface Session {
        user: {
            userId?: string;
        } & DefaultSession["user"];
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Discord],
    callbacks: {
        session: async ({ session, user }) => {
            // Get the account from the database
            const account = await prisma.account.findFirst({
                where: { userId: user.id }
            });
            
            if (account && session.user) {
                // Replace the user.id with the providerId (providerAccountId)
                session.user.userId = account.providerAccountId;
            }
            
            return session;
        }
    }
})