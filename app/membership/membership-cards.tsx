"use client"

import React, { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signIn } from "next-auth/react"
import { QRCodeCanvas } from "qrcode.react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import {
  CheckCircle2,
  Eye,
  Palette,
  Mic,
  MessageSquare,
  Wrench,
  Brain,
  Lock,
  Crown,
  Sliders,
  Coins,
  Gift,
  TrendingUp,
  LucideIcon,
  Mail,
  Headphones,
  User,
  MessageCircle,
  Layers,
  CreditCard,
  Copy,
  Check,
  X,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"

export type PlanData = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  interval: string
  category: "BASIC" | "POPULAR" | "EXCLUSIVE"
  features: string[]
  allFeatures: string[]
  expandableFeatures: Record<string, string[]> | null
  discount: number | null
  maxCount: number | null
  isGiftable: boolean
  isSupportable: boolean
  soldCount?: number
}

type DiscordUser = {
  id: string
  username: string
  global_name: string
  avatar: string
  bot: boolean
}

type SearchResult = {
  user: DiscordUser
  nick?: string
}

const INTERVAL_LABELS: Record<string, string> = {
  MONTHLY: "/mo",
  QUARTERLY: "/quarter",
  YEARLY: "/yr",
  LIFETIME: "one-time",
}

const INTERVAL_TAB_LABELS: Record<string, string> = {
  MONTHLY: "Monthly",
  QUARTERLY: "3 Months",
  YEARLY: "Yearly",
  LIFETIME: "Lifetime",
}

const CATEGORY_ICON_MAP: Record<string, { Icon: LucideIcon; color: string }> = {
  Visual: { Icon: Eye, color: "text-blue-400" },
  "Visual Flex": { Icon: Palette, color: "text-purple-400" },
  "Voice Power": { Icon: Mic, color: "text-pink-400" },
  "Chat Power": { Icon: MessageSquare, color: "text-cyan-400" },
  Chat: { Icon: MessageSquare, color: "text-cyan-400" },
  Utility: { Icon: Wrench, color: "text-orange-400" },
  Intelligence: { Icon: Brain, color: "text-indigo-400" },
  Privacy: { Icon: Lock, color: "text-yellow-400" },
  Exclusivity: { Icon: Crown, color: "text-amber-400" },
  Control: { Icon: Sliders, color: "text-teal-400" },
  Economy: { Icon: Coins, color: "text-emerald-400" },
  Lottery: { Icon: Gift, color: "text-rose-400" },
  Hierarchy: { Icon: TrendingUp, color: "text-violet-400" },
  Status: { Icon: TrendingUp, color: "text-violet-400" },
  Audio: { Icon: Headphones, color: "text-pink-400" },
  Identity: { Icon: User, color: "text-violet-400" },
  Social: { Icon: MessageCircle, color: "text-indigo-400" },
  VC: { Icon: Mic, color: "text-purple-400" },
  "Chat/Utility": { Icon: Wrench, color: "text-cyan-400" },
  Reward: { Icon: Gift, color: "text-rose-400" },
  Included: { Icon: Layers, color: "text-sky-400" },
}

const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="text-center space-y-3 max-w-2xl mx-auto px-4 mb-8">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 text-xs font-semibold tracking-wide uppercase">
      <Sparkles className="w-3.5 h-3.5" /> Support the Community
    </div>
    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
      {title}
    </h2>
    <p className="text-lg text-muted-foreground">{subtitle}</p>
    <p className="text-xs italic text-muted-foreground/80 pt-1">
      100% of your contribution directly fuels growing, maintaining, and improving AUI.
    </p>
  </section>
)

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2.5">
    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
    <span className="text-zinc-700 dark:text-zinc-300 text-xs leading-snug">{text}</span>
  </div>
)

const CheckItemWithCategory = ({ text }: { text: string }) => {
  const parts = text.split(": ")
  if (parts.length > 1) {
    const category = parts[0]
    const description = parts.slice(1).join(": ")
    const { Icon, color } = CATEGORY_ICON_MAP[category] || { Icon: CheckCircle2, color: "text-emerald-500" }

    return (
      <div className="flex items-start gap-2.5">
        <Icon size={16} className={cn("mt-0.5 shrink-0", color)} />
        <span className="text-zinc-700 dark:text-zinc-300 text-xs leading-snug">
          <strong className="font-semibold text-foreground">{category}: </strong>
          {description}
        </span>
      </div>
    )
  }

  return <CheckItem text={text} />
}

const PricingCard = ({ plan, popular, exclusive }: { plan: PlanData; popular: boolean; exclusive: boolean }) => {
  const { data: session } = useSession()
  const isMobile = useIsMobile()
  const [view, setView] = useState<"features" | "terms" | "qr">("features")
  const [copied, setCopied] = useState(false)
  const [supportTopUp, setSupportTopUp] = useState("0")
  const [customTopUp, setCustomTopUp] = useState("")

  const [giftRecipient, setGiftRecipient] = useState<SearchResult | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 400)
    return () => clearTimeout(handler)
  }, [searchQuery])

  useEffect(() => {
    async function searchUsers() {
      if (!debouncedQuery.trim()) {
        setSearchResults([])
        return
      }

      setIsSearching(true)
      try {
        const res = await fetch(`/api/discord/search?query=${encodeURIComponent(debouncedQuery)}`)
        const data = await res.json()
        const filtered = (data.results || []).filter((r: SearchResult) => r.user.id !== session?.user?.userId)
        setSearchResults(filtered)
      } catch (error) {
        console.error("Search failed", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    searchUsers()
  }, [debouncedQuery, session?.user?.userId])

  const parsedCustomTopUp = Math.max(0, Number(customTopUp) || 0)
  const topUpAmount = supportTopUp === "custom" ? parsedCustomTopUp : Number(supportTopUp)
  const baseAmount = plan.price
  const amount = plan.isSupportable
    ? baseAmount + (Number.isFinite(topUpAmount) ? topUpAmount : 0)
    : baseAmount

  const upiId = "BHARATPE.8U0Z1L2A1X48538@fbpe"
  const url = `upi://pay?pa=${upiId}&pn=BharatPe Merchant`

  let tn = ""
  if (giftRecipient && session?.user) {
    tn = `${session.user.userId}|${session.user.name}->${giftRecipient.user.id}|${giftRecipient.user.username}`
  } else if (session?.user) {
    tn = `${session.user.userId}|${session.user.name}`
  }

  const paymentUrl = url + (tn ? "&tn=" + encodeURIComponent(tn) : "") + `&am=${amount}`
  const intervalLabel = INTERVAL_LABELS[plan.interval] ?? ""
  const isSoldOut = plan.maxCount != null && plan.soldCount !== undefined && plan.soldCount >= plan.maxCount

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Card
      className={cn(
        "relative w-full max-w-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 rounded-2xl border bg-card text-card-foreground shadow-md hover:shadow-xl",
        popular && "border-rose-500/80 ring-1 ring-rose-500/50 shadow-rose-500/10 dark:shadow-rose-500/5",
        exclusive && "border-amber-500/80 ring-1 ring-amber-500/50 shadow-amber-500/10 dark:shadow-amber-500/5 bg-gradient-to-b from-card via-card to-amber-500/5"
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Most Popular
        </div>
      )}
      {exclusive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-black text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
          <Crown className="w-3 h-3" /> Exclusive
        </div>
      )}

      <div>
        <CardHeader className="pb-4 pt-6">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-foreground">{plan.name}</CardTitle>
            {plan.discount != null && plan.discount > 0 && (
              <Badge variant="secondary" className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-semibold">
                Save {plan.discount}%
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-baseline mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold tracking-tight">₹{plan.price}</span>
              <span className="text-sm font-medium text-muted-foreground">{intervalLabel}</span>
            </div>
            {plan.maxCount != null && plan.soldCount !== undefined && (
              <span className="text-xs font-bold text-red-500 animate-pulse bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                {plan.maxCount - plan.soldCount} Left
              </span>
            )}
          </div>

          <CardDescription className="pt-2 text-xs line-clamp-2 min-h-[2.5rem]">
            {plan.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2.5 pt-0">
          <div className="border-t pt-4 space-y-2.5">
            {plan.features.map((feature: string) => (
              <CheckItem key={feature} text={feature} />
            ))}
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-4 pb-6">
        <Dialog onOpenChange={(open) => !open && setView("features")}>
          <DialogTrigger asChild>
            <Button
              disabled={isSoldOut}
              className={cn(
                "w-full rounded-xl font-semibold shadow-sm transition-all duration-200",
                popular && "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25",
                exclusive && "bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/25 font-bold"
              )}
            >
              {isSoldOut ? "Sold Out" : `Get Started with ${plan.name}`}
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-xl w-full p-6 sm:rounded-2xl overflow-hidden">
            <DialogHeader className="pr-6">
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                {plan.name}
                <Badge variant="outline" className="text-xs font-normal">
                  {INTERVAL_TAB_LABELS[plan.interval] ?? plan.interval}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-sm pt-1">
                {plan.description}
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-between items-center my-4 py-3 px-4 bg-muted/40 rounded-xl border">
              <div>
                <span className="text-2xl font-bold">₹{amount}</span>
                <span className="text-xs text-muted-foreground ml-1">{intervalLabel}</span>
              </div>

              <div className="flex items-center gap-2">
                {plan.isGiftable && session && (
                  <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-pink-500/50 text-pink-500 hover:text-pink-600 hover:bg-pink-500/10 dark:text-pink-400 gap-1.5"
                      >
                        <Gift className="h-4 w-4" />
                        Gift
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0 w-[260px]" align="end">
                      <Command shouldFilter={false}>
                        <CommandInput placeholder="Search Discord User..." value={searchQuery} onValueChange={setSearchQuery} />
                        <CommandList>
                          {isSearching && (
                            <div className="flex justify-center p-4">
                              <Loader2 className="animate-spin h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          {!isSearching && searchResults.length === 0 && searchQuery && (
                            <CommandEmpty>No users found.</CommandEmpty>
                          )}
                          {searchResults.map((result) => (
                            <CommandItem
                              key={result.user.id}
                              value={result.user.username}
                              onSelect={() => {
                                setGiftRecipient(result)
                                setSearchOpen(false)
                                setSearchQuery("")
                              }}
                              className="flex items-center gap-2 cursor-pointer p-2"
                            >
                              <Avatar className="h-7 w-7 shrink-0">
                                {result.user.avatar && (
                                  <AvatarImage src={`https://cdn.discordapp.com/avatars/${result.user.id}/${result.user.avatar}.png`} />
                                )}
                                <AvatarFallback className="text-xs">{result.user.username[0]?.toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-xs font-semibold truncate">{result.user.global_name || result.user.username}</span>
                                <span className="text-[10px] text-muted-foreground truncate">@{result.user.username}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}

                <Button
                  size="sm"
                  onClick={() => (!session ? signIn("discord") : setView(view === "features" ? "terms" : "features"))}
                >
                  {!session ? "Login to Purchase" : view === "features" ? (giftRecipient ? `Gift to @${giftRecipient.user.username}` : "Continue") : "View Plan Details"}
                </Button>
              </div>
            </div>

            {giftRecipient && (
              <div className="flex items-center justify-between bg-pink-500/10 border border-pink-500/20 px-3 py-1.5 rounded-lg mb-2">
                <span className="text-xs text-pink-600 dark:text-pink-300 font-medium flex items-center gap-1.5">
                  <Gift className="h-3.5 w-3.5" /> Gifting to @{giftRecipient.user.username}
                </span>
                <button onClick={() => setGiftRecipient(null)} className="text-pink-500 hover:text-pink-700">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="relative min-h-[320px] overflow-hidden">
              <AnimatePresence mode="wait">
                {view === "features" && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <ScrollArea className="h-[320px] pr-3">
                      <div className="space-y-3 pb-4">
                        {plan.allFeatures.map((feature: string, index: number) => {
                          if (plan.expandableFeatures?.[feature]) {
                            return (
                              <Accordion type="single" collapsible key={`${feature}-${index}`}>
                                <AccordionItem value="item-1" className="border-none">
                                  <AccordionTrigger className="py-1.5 hover:no-underline">
                                    <CheckItemWithCategory text={feature} />
                                  </AccordionTrigger>
                                  <AccordionContent className="pl-6 space-y-2 pt-1">
                                    {plan.expandableFeatures[feature].map((subFeature, subIndex) => (
                                      <CheckItemWithCategory key={`sub-${subIndex}`} text={subFeature} />
                                    ))}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            )
                          }
                          return <CheckItemWithCategory key={`${feature}-${index}`} text={feature} />
                        })}
                      </div>
                    </ScrollArea>
                  </motion.div>
                )}

                {view === "terms" && (
                  <motion.div
                    key="terms"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col justify-between p-4 bg-muted/20 rounded-xl border"
                  >
                    <div className="space-y-3 text-center">
                      <div className="p-2 w-fit mx-auto bg-primary/10 text-primary rounded-full">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold">Terms & Service Guidelines</h3>
                      <div className="text-xs text-muted-foreground space-y-2 max-w-md mx-auto">
                        <p>
                          You are purchasing a digital membership tier for the Among Us Indians community.
                        </p>
                        <p>
                          Benefits are activated automatically upon verification and are subject to community code of conduct.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <Button onClick={() => setView("qr")} className="w-full gap-2">
                        I Agree & Proceed to Payment <ArrowRight className="w-4 h-4" />
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground">
                        Review our full{" "}
                        <Link href="/policies/terms" className="underline hover:text-foreground" target="_blank">
                          Terms & Conditions
                        </Link>
                      </p>
                    </div>
                  </motion.div>
                )}

                {view === "qr" && (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <ScrollArea className="h-[320px] pr-2">
                      <div className="flex flex-col items-center justify-center space-y-4 py-2">
                        {plan.isSupportable && (
                          <div className="w-full space-y-1.5">
                            <span className="text-[11px] font-semibold text-muted-foreground block text-center">
                              Add optional support contribution
                            </span>
                            <ToggleGroup
                              type="single"
                              value={supportTopUp}
                              onValueChange={(value) => value && setSupportTopUp(value)}
                              className="justify-center gap-1"
                            >
                              <ToggleGroupItem value="0" size="sm" className="text-xs">
                                +₹0
                              </ToggleGroupItem>
                              <ToggleGroupItem value="100" size="sm" className="text-xs">
                                +₹100
                              </ToggleGroupItem>
                              <ToggleGroupItem value="500" size="sm" className="text-xs">
                                +₹500
                              </ToggleGroupItem>
                              {supportTopUp === "custom" ? (
                                <div className="flex items-center rounded-md border bg-background px-2 h-8">
                                  <input
                                    type="number"
                                    min={0}
                                    placeholder="Amount (₹)"
                                    value={customTopUp}
                                    onChange={(e) => setCustomTopUp(e.target.value)}
                                    className="w-20 bg-transparent text-xs outline-none"
                                  />
                                </div>
                              ) : (
                                <ToggleGroupItem value="custom" size="sm" className="text-xs">
                                  Custom
                                </ToggleGroupItem>
                              )}
                            </ToggleGroup>
                          </div>
                        )}

                        <div className="p-3 bg-white rounded-xl shadow-md border">
                          <QRCodeCanvas
                            value={paymentUrl}
                            size={160}
                            level="Q"
                            imageSettings={{
                              src: "/aui.png",
                              height: 36,
                              width: 36,
                              excavate: true,
                            }}
                          />
                        </div>

                        <div
                          onClick={handleCopyUpiId}
                          className="flex items-center gap-2 bg-muted/80 hover:bg-muted px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-colors"
                        >
                          <span>{upiId}</span>
                          {copied ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </div>

                        <div className="text-center space-y-0.5 text-xs text-muted-foreground">
                          <p><strong className="text-foreground">Step 1:</strong> Scan QR & Complete UPI Payment</p>
                          <p><strong className="text-foreground">Step 2:</strong> Share receipt screenshot in support chat</p>
                        </div>

                        {isMobile && (
                          <Button asChild className="w-full gap-2" variant="outline" size="sm">
                            <a href={paymentUrl}>
                              <CreditCard className="h-4 w-4" /> Open UPI Payment App
                            </a>
                          </Button>
                        )}
                      </div>
                    </ScrollArea>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default function MembershipCards({ plans }: { plans: PlanData[] }) {
  const intervals = useMemo(() => [...new Set(plans.map((p) => p.interval))], [plans])
  const hasMultipleIntervals = intervals.length > 1

  const renderPlanGroup = (groupPlans: PlanData[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto px-4">
      {groupPlans.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          popular={plan.category === "POPULAR"}
          exclusive={plan.category === "EXCLUSIVE"}
        />
      ))}
    </div>
  )

  return (
    <div className="py-12 bg-background">
      <PricingHeader
        title="Choose Your Tier"
        subtitle="Unlock exclusive perks, elevated status, and empower the community."
      />

      {hasMultipleIntervals ? (
        <Tabs defaultValue={intervals[0]} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-muted/60 p-1 rounded-xl">
              {intervals.map((interval) => (
                <TabsTrigger key={interval} value={interval} className="rounded-lg text-xs sm:text-sm px-4 py-1.5 font-medium">
                  {INTERVAL_TAB_LABELS[interval] ?? interval}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {intervals.map((interval) => (
            <TabsContent key={interval} value={interval} className="focus-visible:outline-none">
              {renderPlanGroup(plans.filter((p) => p.interval === interval))}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        renderPlanGroup(plans)
      )}

      <div className="text-center mt-12">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Have questions before getting started? Reach out to us</span>
        </Link>
      </div>
    </div>
  )
}