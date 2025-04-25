import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Discord],
    callbacks: {
        async session({ session }) {
            if(session.user.image == null || session.user.image == undefined) return session
            const url = new URL(session.user.image)
            const userId = url.pathname.split("/")[2]

            session.user.id = userId

            return session
        }
    }
})