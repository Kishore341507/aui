import type { Metadata } from "next"
import MembershipCards from "./membership-cards"
import { auth } from "@/auth"
import { TawkChat } from "@/components/tawk-chat"

export const metadata: Metadata = {
  title: "Membership Tiers - All AUI Discord | India's Most Active Discord Server",
  description: "Join exclusive Gold, Platinum, or Diamond membership tiers at All AUI Discord - India's most active Discord server. Get premium perks, custom roles, and special access in the Among US India Discord community.",
  keywords: [
    "AUI membership",
    "AUI discord membership",
    "India's most active Discord server membership",
    "Among US India Discord premium",
    "AUI discord premium",
    "Indian Discord membership"
  ],
}

export default async function Page() {
  const session = await auth()

  return (
    <>
      <MembershipCards />
      {session?.user && <TawkChat user={session.user} />}
    </>
  )
}