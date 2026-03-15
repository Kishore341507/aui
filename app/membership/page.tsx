import type { Metadata } from "next"
import MembershipCards from "./membership-cards"
import { TawkChat } from "@/components/tawk-chat"
import prisma from "@/prisma/db"
import Image from "next/image"

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
    where: { slug: "Diamond" }
  })

  const diamondSoldCount = diamondPlan ? await prisma.membership.count({
    where: {
      planId: diamondPlan.id,
      status: "ACTIVE"
    }
  }) : 0

  return (
    <>
      <section
          className="relative min-h-[10vh] flex items-center justify-center overflow-hidden"
        >
    
    
          {/* Background */}
          <Image
            src="/heroback.avif"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
            {/* content */}
            <div className="relative z-10 max-w-4xl h-[20vh] m-auto px-4 text-center ">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Membership Tiers</h1>
                <p className="mt-4 text-lg md:text-xl text-white/90">
                    Choose the tier that&apos;s right for you.
                </p>
            </div>
    
        </section>
      <MembershipCards diamondSoldCount={diamondSoldCount} />
      <TawkChat />
    </>
  )
}