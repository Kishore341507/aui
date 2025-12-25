"use client"

// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Eye, Palette, Mic, MessageSquare, Wrench, Brain, Lock, Crown, Sliders, Coins, Gift, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// type PricingSwitchProps = {
//   onSwitch: (value: string) => void
// }

type PricingCardProps = {
  isYearly?: boolean
  title: string
  monthlyPrice?: number
  yearlyPrice?: number
  description: string
  features: string[]
  allFeatures: string[]
  actionLabel: string
  popular?: boolean
  exclusive?: boolean
}

const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="text-xl pt-1">{subtitle}</p>
    <br />
  </section>
)

// const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
//   <Tabs defaultValue="0" className="w-40 mx-auto" onValueChange={onSwitch}>
//     <TabsList className="py-6 px-2">
//       <TabsTrigger value="0" className="text-base">
//         Monthly
//       </TabsTrigger>
//       <TabsTrigger value="1" className="text-base">
//         Yearly
//       </TabsTrigger>
//     </TabsList>
//   </Tabs>
// )

const PricingCard = ({ isYearly, title, monthlyPrice, yearlyPrice, description, features, allFeatures, actionLabel, popular, exclusive }: PricingCardProps) => (
  <Card
    className={cn(`w-72 flex flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`, {
      "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
        exclusive,
    })}>
    <div>
      <CardHeader className="pb-8 pt-4">
        {/* {isYearly && yearlyPrice && monthlyPrice ? ( */}
        {popular ? (
          <div className="flex justify-between">
            <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
            <div
              className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white", {
                "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ": popular,
              })}>
              Save 17%
              {/* Save ₹{monthlyPrice * 12 - yearlyPrice} */}
            </div>
          </div>
        ) : (
          <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
        )}
        <div className="flex gap-0.5">
          <h3 className="text-3xl font-bold">{yearlyPrice && isYearly ? "₹" + yearlyPrice : monthlyPrice ? "₹" + monthlyPrice : "Custom"}</h3>
          <span className="flex flex-col justify-end text-sm mb-1">{yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}</span>
        </div>
        <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
    </div>
    <CardFooter className="mt-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
            {actionLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{title} - All Features</DialogTitle>
            <DialogDescription className="text-base pt-2">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex gap-0.5 items-baseline mb-2">
              <h3 className="text-3xl font-bold">{yearlyPrice && isYearly ? "₹" + yearlyPrice : monthlyPrice ? "₹" + monthlyPrice : "Custom"}</h3>
              <span className="text-sm text-muted-foreground">{yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}</span>
            </div>
            {allFeatures.map((feature: string, index: number) => (
              <CheckItemWithCategory key={`${feature}-${index}`} text={feature} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </CardFooter>
  </Card>
)

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
)

const CheckItemWithCategory = ({ text }: { text: string }) => {
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, { Icon: any; color: string }> = {
      "Visual": { Icon: Eye, color: "text-blue-400" },
      "Visual Flex": { Icon: Palette, color: "text-purple-400" },
      "Voice Power": { Icon: Mic, color: "text-pink-400" },
      "Chat Power": { Icon: MessageSquare, color: "text-cyan-400" },
      "Utility": { Icon: Wrench, color: "text-orange-400" },
      "Intelligence": { Icon: Brain, color: "text-indigo-400" },
      "Privacy": { Icon: Lock, color: "text-yellow-400" },
      "Exclusivity": { Icon: Crown, color: "text-amber-400" },
      "Control": { Icon: Sliders, color: "text-teal-400" },
      "Economy": { Icon: Coins, color: "text-emerald-400" },
      "Lottery": { Icon: Gift, color: "text-rose-400" },
      "Hierarchy": { Icon: TrendingUp, color: "text-violet-400" }
    }
    return iconMap[category] || { Icon: CheckCircle2, color: "text-green-400" }
  }

  const parts = text.split(': ')
  if (parts.length > 1) {
    const category = parts[0]
    const description = parts.slice(1).join(': ')
    const { Icon, color } = getCategoryIcon(category)
    return (
      <div className="flex gap-2">
        <Icon size={18} className={`my-auto ${color} flex-shrink-0`} />
        <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">
          <span className="font-bold">{category}:</span> {description}
        </p>
      </div>
    )
  }
  return (
    <div className="flex gap-2">
      <CheckCircle2 size={18} className="my-auto text-green-400 flex-shrink-0" />
      <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
    </div>
  )
}

export default function page() {
//   const [isYearly, setIsYearly] = useState(false)
    const isYearly = false
//   const togglePricingPeriod = (value: string) => setIsYearly(parseInt(value) === 1)

  const plans = [
    {
      title: "The Supporter",
      monthlyPrice: 199,
      yearlyPrice: 1999,
      description: "I am not a freeloader; I have a badge.",
      features: [
        'Custom "Supporter" Badge',
        "Voice Notes Permission",
        "Access to .afk command",
        "Hoisted Role"
      ],
      allFeatures: [
        'Visual: Custom "Supporter" Icon/Badge next to name',
        "Voice Power: Permission to use Voice Notes (High engagement feature)",
        "Utility: Access to .afk (Set AFK status)",
        "Hierarchy: Role hoisted above standard members"
      ],
      actionLabel: "Get Started with Supporter",
    },
    {
      title: "The Insider",
      monthlyPrice: 249,
      yearlyPrice: 2499,
      description: "I look cool, and I have power.",
      features: [
        "All Tier 1 perks included",
        "Gradient Role Colours",
        "Access to .wvc command",
        "Monthly 250,000 PVC Coins",
        "And more..."
      ],
      allFeatures: [
        'Visual: Custom "Insider" Icon/Badge next to name',
        "Visual Flex: Gradient Role Colours (User selects from exclusive presets)",
        "Voice Power: Permission to use Voice Notes (High engagement feature)",
        "Chat Power: Permission to upload GIFs in general chat",
        "Utility: Access to !afk (Set AFK status)",
        "Utility: Access to !av (View Avatar command)",
        "Intelligence: Access to !wvc (Who's in VC) - Allows users to see who is hanging out without joining",
        "Privacy: Access to #insider-lounge (Private text channel)",
        "Economy: Monthly 250,000 PVC Coins",
        "Hierarchy: Role hoisted above standard members",
        "Hierarchy: Distinct visual separation in the member list (Gradient section)"
      ],
      actionLabel: "Get Started with Insider",
      popular: true,
    },
    {
      title: "The Elite",
      monthlyPrice: 399,
      yearlyPrice: 3999,
      description: "I have access to the Staff and influence.",
      features: [
        "All Tier 1 & 2 perks included",
        "Private VCs with Staff",
        "Priority Private Music Bot support",
        "Monthly Nitro Giveaway entry",
        "And more..."
      ],
      allFeatures: [
        'Visual: Custom "Elite" Icon/Badge next to name',
        "Visual Flex: Gradient Role Colours (User selects from exclusive presets)",
        "Voice Power: Permission to use Voice Notes (High engagement feature)",
        "Chat Power: Permission to upload GIFs in general chat",
        "Utility: Access to !afk (Set AFK status)",
        "Utility: Access to !av (View Avatar command)",
        "Intelligence: Access to !wvc (Who's in VC) - Allows users to see who is hanging out without joining",
        "Privacy: Access to #insider-lounge (Private text channel)",
        "Exclusivity: Access to Private VCs with Staff (Parasocial bonding)",
        "Control: Priority support for Private Music Bots",
        "Economy: Monthly stipend of 500,000 PVC Coins",
        "Lottery: Automatic entry into monthly Nitro Giveaways",
        "Hierarchy: Top-tier hoisting (displayed immediately below Staff/Mods)"
      ],
      actionLabel: "Get Started with Elite",
      exclusive: true,
    },
  ]
  return (
    <div className="py-8">
      <PricingHeader title="Membership Tiers" subtitle="Choose the tier that's right for you" />
      {/* <PricingSwitch onSwitch={togglePricingPeriod} /> */}
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
        })}
      </section>
    </div>
  )
}