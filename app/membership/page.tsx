import type { Metadata } from "next"
import MembershipCards from "./membership-cards"
import { TawkChat } from "@/components/tawk-chat"
import prisma from "@/prisma/db"
import type { PlanData } from "./membership-cards"
import { ShieldCheck, Zap, HeartHandshake, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Membership Tiers | AUI - India's Most Active Discord Server",
  description:
    "Join exclusive Gold, Platinum, or Diamond membership tiers at AUI. Unlock custom roles, priority access, soundboard privileges, and direct community perks.",
  keywords: [
    "AUI membership",
    "AUI discord membership",
    "India's most active Discord server membership",
    "Among US India Discord premium",
    "AUI discord premium",
    "Indian Discord membership",
  ],
  openGraph: {
    title: "Support AUI - Membership Tiers & Perks",
    description: "Get custom roles, exclusive badges, and soundboard perks on India's premier Discord server.",
    type: "website",
  },
}

const FAQS = [
  {
    q: "How long does perk activation take after payment?",
    a: "Perks are usually granted within 5 to 15 minutes after sharing your transaction receipt in our Discord support channel.",
  },
  {
    q: "Can I transfer or gift a membership to a friend?",
    a: "Yes! Use the 'Gift' option on any tier during checkout to search for and select your friend's Discord profile.",
  },
  {
    q: "What payment methods are supported?",
    a: "We accept all major UPI applications including Google Pay, PhonePe, Paytm, and BHIM via QR code scan.",
  },
  {
    q: "Can I upgrade my tier later?",
    a: "Absolutely. You can upgrade your tier at any time by contacting our support team on Discord or via live chat.",
  },
]

export default async function Page() {
  const dbPlans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  })

  // Optimize N+1 DB queries by executing count queries concurrently
  const plans: PlanData[] = await Promise.all(
    dbPlans.map(async (plan) => {
      const soldCount =
        plan.maxCount != null
          ? await prisma.membership.count({
              where: { planId: plan.id, status: "ACTIVE" },
            })
          : undefined

      const rawPrice = plan.price
      const numericPrice = typeof rawPrice === "number" ? rawPrice : rawPrice.toNumber()

      return {
        id: plan.id,
        slug: plan.slug,
        name: plan.name,
        description: plan.description ?? "",
        price: numericPrice,
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

  // JSON-LD for Search Engine Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: plans.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `${plan.name} Membership`,
        description: plan.description,
        offers: {
          "@type": "Offer",
          price: plan.price,
          priceCurrency: "INR",
          availability:
            plan.maxCount && plan.soldCount && plan.soldCount >= plan.maxCount
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
        },
      },
    })),
  }

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-rose-500/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Accent Glows */}
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -top-40 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-rose-500/20 via-purple-500/20 to-amber-500/20 opacity-40 sm:w-[72.1875rem]"
          />
        </div>

        {/* Pricing Cards Container */}
        <MembershipCards plans={plans} />

        {/* Value Proposition Highlights */}
        <section className="max-w-5xl mx-auto px-4 py-12 border-t border-border/40">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm space-y-2">
              <div className="p-2.5 w-fit mx-auto rounded-xl bg-rose-500/10 text-rose-500">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Instant Setup</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Roles and permissions update automatically upon staff confirmation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm space-y-2">
              <div className="p-2.5 w-fit mx-auto rounded-xl bg-amber-500/10 text-amber-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Verified Server Perks</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enjoy priority voice channels, custom roles, and soundboard access.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm space-y-2">
              <div className="p-2.5 w-fit mx-auto rounded-xl bg-emerald-500/10 text-emerald-500">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Direct Community Impact</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Funds maintain bot hosting, community events, and prize pools.
              </p>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="max-w-3xl mx-auto px-4 pb-20 pt-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" /> Got Questions?
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">Frequently Asked Questions</h3>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/60 bg-card/50 rounded-xl px-4 py-1 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-xs sm:text-sm font-semibold hover:no-underline py-3">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-3">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      <TawkChat />
    </main>
  )
}