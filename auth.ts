import NextAuth, { DefaultSession } from "next-auth"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma/db"

declare module "next-auth" {
    interface Session {
        user: {
            userId?: string
        } & DefaultSession["user"]
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),

    providers: [
        Discord({
            clientId: process.env.AUTH_DISCORD_ID!,
            clientSecret: process.env.AUTH_DISCORD_SECRET!,

            issuer: "https://discord.com",
        }),
    ],

    callbacks: {
        async session({ session, user }) {
            const account = await prisma.account.findFirst({
                where: {
                    userId: user.id,
                    provider: "discord",
                },
            })

            if (account && session.user) {
                session.user.userId = account.providerAccountId
            }

            return session
        },
    },
})