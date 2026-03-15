import type { Metadata } from "next"
import MembershipCards from "./membership-cards"
import { TawkChat } from "@/components/tawk-chat"
import prisma from "@/prisma/db"
import Image from "next/image"
import type { PlanData } from "./membership-cards"

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
  const dbPlans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  })

  const plans: PlanData[] = await Promise.all(
    dbPlans.map(async (plan: (typeof dbPlans)[number]) => {
      const soldCount =
        plan.maxCount != null
          ? await prisma.membership.count({
              where: { planId: plan.id, status: "ACTIVE" },
            })
          : undefined

      return {
        id: plan.id,
        slug: plan.slug,
        name: plan.name,
        description: plan.description ?? "",
        price: plan.price.toNumber(),
        interval: plan.interval,
        category: plan.category,
        features: plan.features,
        allFeatures: plan.allFeatures,
        expandableFeatures: (plan.expandableFeatures as Record<string, string[]> | null) ?? null,
        discount: plan.discount ?? null,
        maxCount: plan.maxCount ?? null,
        isGiftable: plan.isGiftable,
        isSupportable: plan.isSupportable,
        soldCount,
      }
    })

  )

  console.log(plans);

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
      <MembershipCards plans={plans} />
      <TawkChat />
    </>
  )
}