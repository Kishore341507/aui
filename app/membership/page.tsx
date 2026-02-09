import type { Metadata } from "next"
import MembershipCards from "./membership-cards"
import { TawkChat } from "@/components/tawk-chat"
import prisma from "@/prisma/db"

export const metadata: Metadata = {
  title: "Membership Tiers - AUI | India's Most Active Discord Server",
  description: "Join exclusive Gold, Platinum, or Diamond membership tiers at AUI - India's most active Discord server. Get premium perks, custom roles, and special access in the Among US India Discord community.",
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
  // Get Diamond plan and count active memberships
  const diamondPlan = await prisma.plan.findFirst({
    where: { slug: "AUI Diamond" }
  })

  const diamondSoldCount = diamondPlan ? await prisma.membership.count({
    where: {
      planId: diamondPlan.id,
      status: "ACTIVE"
    }
  }) : 0

  return (
    <>
      <MembershipCards diamondSoldCount={diamondSoldCount} />
      <TawkChat />
    </>
  )
}