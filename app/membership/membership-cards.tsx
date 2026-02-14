"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Eye, Palette, Mic, MessageSquare, Wrench, Brain, Lock, Crown, Sliders, Coins, Gift, TrendingUp, LucideIcon, Mail, Headphones, User, MessageCircle, Layers, CreditCard, Copy, Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { QRCodeCanvas } from "qrcode.react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signIn } from "next-auth/react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  expandableFeatures?: Record<string, string[]>
  soldCount?: number
  maxCount?: number
  isDisabled?: boolean
}

const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="text-xl pt-1">{subtitle}</p>
    <p className="text-center text-sm italic text-muted-foreground pt-2">
        100% of your contribution goes directly toward growing and improving AUI.
    </p>
    <br />
  </section>
)

const PricingCard = ({ isYearly, title, monthlyPrice, yearlyPrice, description, features, allFeatures, actionLabel, popular, exclusive, expandableFeatures, soldCount, maxCount, isDisabled }: PricingCardProps) => {
  const { data: session } = useSession()
  const isMobile = useIsMobile()
  const [view, setView] = useState<'features' | 'terms' | 'qr'>('features')
  const [copied, setCopied] = useState(false)
  const [diamondTopUp, setDiamondTopUp] = useState("0")
  const [customTopUp, setCustomTopUp] = useState("")

  const [giftRecipient, setGiftRecipient] = useState<SearchResult | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  useEffect(() => {
    async function searchUsers() {
      if (!debouncedQuery) {
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

  const isDiamond = title.trim().toLowerCase() === "diamond"
  const baseAmount = yearlyPrice && isYearly ? yearlyPrice : monthlyPrice
  const parsedCustomTopUp = Math.max(0, Number(customTopUp) || 0)
  const topUpAmount = diamondTopUp === "custom" ? parsedCustomTopUp : Number(diamondTopUp)
  const amount = isDiamond && baseAmount
    ? baseAmount + (Number.isFinite(topUpAmount) ? topUpAmount : 0)
    : baseAmount ?? "custom"
  const upiId = "BHARATPE.8U0Z1L2A1X48538@fbpe"
  const url = `upi://pay?pa=${upiId}&pn=BharatPe Merchant`

  let tn = ""
  if (giftRecipient && session?.user) {
      tn = `${session.user.userId}|${session.user.name}->${giftRecipient.user.id}|${giftRecipient.user.username}`
  } else if (session?.user) {
      tn = `${session.user.userId}|${session.user.name}`
  }

  const paymentUrl = url + (tn ? "&tn=" + tn : "") + ((amount && amount !== "custom") ? "&am=" + amount : "")

  const isSoldOut = soldCount !== undefined && maxCount !== undefined && soldCount >= maxCount

  const handleGetClick = () => {
    if (view === 'features') {
      if (session?.user?.userId) {
        setView('terms')
      }
    } else {
      setView('features')
    }
  }

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
  <Card
    className={cn(`w-72 flex flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`, {
      "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
        exclusive,
    })}>
    <div>
      <CardHeader className="pb-8 pt-4">
        {popular ? (
          <div className="flex justify-between">
            <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
            {/* <div
              className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white", {
                "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ": popular,
              })}>
              Save 17%
            </div> */}
          </div>
        ) : (
          <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
        )}
        <div className="flex gap-0.5 justify-between items-end">
          <div className="flex gap-0.5">
            <h3 className="text-3xl font-bold">{yearlyPrice && isYearly ? "₹" + yearlyPrice : monthlyPrice ? "₹" + monthlyPrice : "Custom"}</h3>
            <span className="flex flex-col justify-end text-sm mb-1">{yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}</span>
          </div>
          {soldCount !== undefined && maxCount !== undefined && (
            <span className="font-bold text-red-500 mb-1 animate-pulse">
              {maxCount - soldCount} Left
            </span>
          )}
        </div>
        <CardDescription className="pt-1.5 h-12">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
    </div>
    <CardFooter className="mt-2">
      <Dialog onOpenChange={(open) => !open && setView('features')}>
        <DialogTrigger asChild>
          <Button 
            disabled={isDisabled || isSoldOut}
            className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
            {isSoldOut ? "Sold Out" : actionLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl min-h-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{title} - All Features</DialogTitle>
            <DialogDescription className="text-base pt-2">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center mt-4 mb-2">
            <div className="flex gap-0.5 items-baseline">
              <h3 className="text-3xl font-bold">{yearlyPrice && isYearly ? "₹" + yearlyPrice : monthlyPrice ? "₹" + monthlyPrice : "Custom"}</h3>
              <span className="text-sm text-muted-foreground">{yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}</span>
            </div>
            <div className="flex items-center gap-2">
              {session && (
              <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="shadow-[0_0_15px_rgba(236,72,153,0.6)] border-pink-500 text-pink-500 hover:text-pink-600 hover:border-pink-600 dark:text-pink-400 dark:hover:text-pink-300 dark:hover:border-pink-400">
                      <Gift className="h-4 w-4" />
                      Gift
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[250px]" align="end">
                  <Command shouldFilter={false}>
                      <CommandInput placeholder="Search user..." value={searchQuery} onValueChange={setSearchQuery} />
                      <CommandList>
                        {isSearching && <div className="flex justify-center p-4"><Loader2 className="animate-spin h-4 w-4" /></div>}
                        {!isSearching && searchResults.length === 0 && searchQuery && <CommandEmpty>No users found.</CommandEmpty>}
                        {searchResults.map((result) => (
                            <CommandItem 
                              key={result.user.id} 
                              value={result.user.username} 
                              onSelect={() => {
                                  setGiftRecipient(result);
                                  setSearchOpen(false);
                                  setSearchQuery("");
                              }}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Avatar className="h-6 w-6">
                                  {result.user.avatar && <AvatarImage src={`https://cdn.discordapp.com/avatars/${result.user.id}/${result.user.avatar}.png`} />}
                                  <AvatarFallback>{result.user.username[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col overflow-hidden">
                                  <span className="text-sm font-medium truncate">{result.user.global_name || result.user.username}</span>
                                  <span className="text-xs text-muted-foreground truncate">@{result.user.username}</span>
                              </div>
                            </CommandItem>
                        ))}
                      </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              )}
              <Button onClick={() => !session ? signIn('discord') : handleGetClick()}>
                  {!session ? "Login to Get" : view === 'features' ? (giftRecipient ? `Gift to @${giftRecipient.user.username}` : "Get") : "Show Features"}
              </Button>
            </div>
          </div>
          {giftRecipient && (
              <div className="flex justify-end items-center mb-2 animate-in fade-in slide-in-from-top-1">
                  <span className="text-xs text-muted-foreground mr-2">Gifting to:</span>
                  <div className="flex items-center gap-1 bg-pink-100 dark:bg-pink-900/30 px-2 py-0.5 rounded-full border border-pink-200 dark:border-pink-800">
                      <Avatar className="h-3 w-3">
                        {giftRecipient.user.avatar && <AvatarImage src={`https://cdn.discordapp.com/avatars/${giftRecipient.user.id}/${giftRecipient.user.avatar}.png`} />}
                        <AvatarFallback className="text-[8px]">{giftRecipient.user.username[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-semibold text-pink-700 dark:text-pink-300">@{giftRecipient.user.username}</span>
                      <button onClick={() => setGiftRecipient(null)} className="ml-1 text-pink-500 hover:text-pink-700 dark:hover:text-pink-300 focus:outline-none">
                          <X className="h-3 w-3" />
                      </button>
                  </div>
              </div>
          )}
          <div className="relative overflow-hidden" style={{ height: '50vh' }}>
            <AnimatePresence mode="wait" initial={false}>
              {view === 'features' ? (
                 <motion.div
                   key="features"
                   initial={{ rotateY: 90, opacity: 0 }}
                   animate={{ rotateY: 0, opacity: 1 }}
                   exit={{ rotateY: -90, opacity: 0 }}
                   transition={{ duration: 0.3 }}
                   className="absolute inset-0"
                 >
                    <ScrollArea className="h-full pr-4">
                      <div className="flex flex-col gap-3 pb-4">
                        {allFeatures.map((feature: string, index: number) => {
                          if (expandableFeatures?.[feature]) {
                             return (
                               <Accordion type="single" collapsible className="w-full" key={`${feature}-${index}`}>
                                  <AccordionItem value="item-1" className="border-none">
                                     <AccordionTrigger className="py-2 hover:no-underline -ml-1">
                                        <CheckItemWithCategory text={feature} />
                                     </AccordionTrigger>
                                     <AccordionContent className="pl-6 flex flex-col gap-3 pt-2">
                                        {expandableFeatures[feature].map((subFeature, subIndex) => (
                                           <CheckItemWithCategory key={`sub-${subIndex}`} text={subFeature} />
                                        ))}
                                     </AccordionContent>
                                  </AccordionItem>
                               </Accordion>
                             )
                          }
                          return (
                            <CheckItemWithCategory key={`${feature}-${index}`} text={feature} />
                          )
                        })}
                      </div>
                    </ScrollArea>
                 </motion.div>
              ) : view === 'terms' ? (
                 <motion.div
                   key="terms"
                   initial={{ rotateY: 90, opacity: 0 }}
                   animate={{ rotateY: 0, opacity: 1 }}
                   exit={{ rotateY: -90, opacity: 0 }}
                   transition={{ duration: 0.3 }}
                   className="absolute inset-0 flex items-center justify-center flex-col gap-4 p-6"
                 >
                    <h3 className="text-xl font-bold">Terms & Conditions</h3>
                    <div className="text-center text-muted-foreground space-y-3 px-2">
                       <p className="text-sm">
                         You are about to purchase a digital service membership for the Among Us Indians community.
                       </p>
                       <p className="text-sm">
                         By proceeding with this transaction, you explicitly agree to our service agreement and acknowledge that benefits are subject to our community guidelines.
                       </p>
                       <p className="text-xs pt-2">
                         Please review our full <Link href="/policies/terms" className="underline hover:text-foreground transition-colors" target="_blank">Terms & Conditions</Link> before continuing.
                       </p>
                    </div>
                    <Button onClick={() => setView('qr')} className="mt-4 w-full max-w-sm">
                       I Accept & Proceed to Pay
                    </Button>
                 </motion.div>
              ) : (
                 <motion.div
                   key="qr"
                   initial={{ rotateY: 90, opacity: 0 }}
                   animate={{ rotateY: 0, opacity: 1 }}
                   exit={{ rotateY: -90, opacity: 0 }}
                   transition={{ duration: 0.3 }}
                   className="absolute inset-0"
                 >
                    <ScrollArea className="h-full w-full">
                      <div className="flex items-center justify-center flex-col gap-4 min-h-full py-4">
                        {isDiamond && (
                          <ToggleGroup
                            type="single"
                            className="mb-2"
                            value={diamondTopUp}
                            onValueChange={(value) => value && setDiamondTopUp(value)}
                          >
                            <ToggleGroupItem value="0" aria-label="Add 0">
                              +0
                            </ToggleGroupItem>
                            <ToggleGroupItem value="100" aria-label="Add 100">
                              +100
                            </ToggleGroupItem>
                            <ToggleGroupItem value="500" aria-label="Add 500">
                              +500
                            </ToggleGroupItem>
                            {diamondTopUp === "custom" ? (
                              <div className="flex items-center rounded-md border border-input bg-background px-2">
                                <input
                                  type="number"
                                  min={0}
                                  step={1}
                                  inputMode="numeric"
                                  placeholder="Support AUI (₹)"
                                  value={customTopUp}
                                  onChange={(event) => setCustomTopUp(event.target.value)}
                                  className="h-9 w-28 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                />
                              </div>
                            ) : (
                              <ToggleGroupItem value="custom" aria-label="Custom amount">
                                Custom
                              </ToggleGroupItem>
                            )}
                          </ToggleGroup>
                        )}
                        <QRCodeCanvas className='border p-2 bg-foreground rounded ' value={paymentUrl} size={200} level='Q'
                            imageSettings={{
                                src: '/aui.png',
                                height: 50,
                                width: 50,
                                excavate: true,
                            }}
                        />
                        <div className="flex flex-col items-center gap-2">
                          <div 
                            onClick={handleCopyUpiId}
                            className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded border cursor-pointer hover:bg-muted/80 transition-colors group"
                          >
                            <code className="text-xs select-all">{upiId}</code>
                            {copied ? (
                              <Check size={14} className="text-green-500 flex-shrink-0" />
                            ) : (
                              <Copy size={14} className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 text-center text-muted-foreground text-sm">
                            <p><span className="font-semibold text-foreground">Step 1:</span> Pay on QR</p>
                            <p><span className="font-semibold text-foreground">Step 2:</span> Send screenshot on bottom right chat</p>
                        </div>
                        {isMobile && (
                            <Button asChild className="w-full max-w-xs mt-2" variant="outline">
                                <a href={paymentUrl}>
                                    <CreditCard className="mr-2 h-4 w-4" /> Pay via UPI App
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
)}

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
)

const CheckItemWithCategory = ({ text }: { text: string }) => {
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, { Icon: LucideIcon; color: string }> = {
      "Visual": { Icon: Eye, color: "text-blue-400" },
      "Visual Flex": { Icon: Palette, color: "text-purple-400" },
      "Voice Power": { Icon: Mic, color: "text-pink-400" },
      "Chat Power": { Icon: MessageSquare, color: "text-cyan-400" },
      "Chat": { Icon: MessageSquare, color: "text-cyan-400" },
      "Utility": { Icon: Wrench, color: "text-orange-400" },
      "Intelligence": { Icon: Brain, color: "text-indigo-400" },
      "Privacy": { Icon: Lock, color: "text-yellow-400" },
      "Exclusivity": { Icon: Crown, color: "text-amber-400" },
      "Control": { Icon: Sliders, color: "text-teal-400" },
      "Economy": { Icon: Coins, color: "text-emerald-400" },
      "Lottery": { Icon: Gift, color: "text-rose-400" },
      "Hierarchy": { Icon: TrendingUp, color: "text-violet-400" },
      "Status": { Icon: TrendingUp, color: "text-violet-400" },
      "Audio": { Icon: Headphones, color: "text-pink-400" },
      "Identity": { Icon: User, color: "text-violet-400" },
      "Social": { Icon: MessageCircle, color: "text-indigo-400" },
      "VC": { Icon: Mic, color: "text-purple-400" },
      "Chat/Utility": { Icon: Wrench, color: "text-cyan-400" },
      "Reward": { Icon: Gift, color: "text-rose-400" },
      "Included": { Icon: Layers, color: "text-sky-400" },
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
          {description}
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

export default function MembershipCards({ diamondSoldCount = 0 }: { diamondSoldCount?: number }) {
  const isYearly = false

  const goldFeaturesList = [
    "Utility: WV (Which VC is person in?)",
    "Audio: Private Music VC Access",
    "Visual: Special Role Colors",
    "Chat: Spoiler Messages",
    "Chat: Add Reactions",
    "Chat: External Emojis & Stickers",
    "Identity: Change Own Nickname",
    "Chat: Role Income (Casino)",
    "Economy: 250k PVC Coins (Weekly)",
    "Status: Role Hoisting",
    "Social: Private Chat (with Staff)"
  ]

  const platinumFeaturesList = [
    "Visual: Gradient Role Colors",
    "Utility: AV Command",
    "VC: Stream/ Cam Perms",
    "VC: Soundboard Access",
    "Economy: 500k PVC Coins (Weekly)",
    "Chat/Utility: AFK Command",
    "Social: Private Chat (Elite Only)",
    "Chat: Slowmode Bypass",
  ]

  const diamondFeaturesList = [
    "Visual: Custom Role Colors",
    "VC: VVIP Entrance Sound",
    "Exclusivity: Limited to 5 users",
    "Chat: Voice Notes",
    "Reward: Returning Gifts (Nitro/Decor)",
  ]

  const plans: Omit<PricingCardProps, "isYearly">[] = [
    {
      title: "Gold",
      monthlyPrice: 149,
      yearlyPrice: 1999,
      description: "Stand out with your first premium badge.",
      features: [
        "WV (Which VC is person in?)",
        "Private Music VC Access",
        "Special Role Colors",
        "Spoiler Messages"
      ],
      allFeatures: goldFeaturesList,
      actionLabel: "Get Started with Gold",
    },
    {
      title: "Platinum",
      monthlyPrice: 299,
      yearlyPrice: 2999,
      description: "Direct access, priority support, and elite status.",
      features: [
        "All in Gold",
        "Gradient Role Colors",
        "Stream/ Cam Perms",
        "Soundboard Access",
        "Many More..."
      ],
      allFeatures: [
        ...platinumFeaturesList,
        "Included: All in Gold",
      ],
      expandableFeatures: {
        "Included: All in Gold": goldFeaturesList
      },
      actionLabel: "Get Started with Platinum",
      popular: true,
    },
    {
      title: "Diamond",
      monthlyPrice: 1999,
      yearlyPrice: 19999,
      description: "The ultimate tier for power users.",
      features: [
        "All in Gold and Platinum",
        "Custom Role Colors",
        "VVIP Entrance Sound",
        "Exclusivity (Limited to 5 users)",
        "Many More..."
      ],
      allFeatures: [
        ...diamondFeaturesList,
        "Included: All in Gold and Platinum",
      ],
      expandableFeatures: {
        "Included: All in Gold and Platinum": [...goldFeaturesList, ...platinumFeaturesList]
      },
      actionLabel: "Get Started with Diamond",
      exclusive: true,
      soldCount: diamondSoldCount,
      maxCount: 5,
    },
  ]
  return (
    <div className="py-8">
      <PricingHeader title="Membership Tiers" subtitle="Choose the tier that's right for you" />
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-1">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
        })}
      </section>
      
      {/* Contact Link */}
      <div className="text-center mt-2">
        <Link 
          href="/about" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Mail size={16} />
          <span>Have questions?</span>
        </Link>
      </div>
    </div>
  )
}
