import type { Metadata } from "next"
import Link from "next/link"
import {
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Building2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | AUI - Among Us India",
  description:
    "Get in touch with the AUI (Among Us India) support team for membership inquiries, payment assistance, and Discord server technical support.",
  openGraph: {
    title: "Contact AUI Support & Community Team",
    description: "Have questions regarding Discord memberships or billing? Reach out to AUI staff.",
    type: "website",
  },
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact AUI",
    description: "Official contact page for AUI (Among Us India) Discord Community.",
    mainEntity: {
      "@type": "Organization",
      name: "AUI (Among Us India)",
      legalName: "Chirag Solanki",
      email: ["info@amongusindia.com", "chiragsm258@gmail.com"],
      url: "https://amongusindia.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@amongusindia.com",
        availableLanguage: ["English", "Hindi"],
      },
    },
  }

  return (
    <main className="min-h-screen text-foreground py-12 px-4 sm:px-6 relative overflow-hidden antialiased ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


      <div className="container mx-auto max-w-5xl space-y-12">
        {/* Header Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-500 text-xs font-semibold tracking-wide uppercase shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> We&apos;re Here to Help
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Have questions about your membership subscription, payment verification, or community guidelines? Reach out to us below.
          </p>
        </section>

        {/* Primary Contact Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Information Card */}
          <div className="group rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-sm hover:border-border transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">Business Entity</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="pb-3 border-b border-border/40">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                  Legal Representative
                </span>
                <p className="font-semibold text-foreground">Chirag Solanki</p>
              </div>

              <div className="pb-3 border-b border-border/40">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                  Brand Name
                </span>
                <p className="font-semibold text-foreground">AUI (Among Us India)</p>
              </div>

              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                  Services Provided
                </span>
                <p className="text-muted-foreground">
                  Discord Community Operations, Tiered Memberships & Digital Perks
                </p>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="group rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-sm hover:border-border transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">Direct Support</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">
                  Email Communications
                </span>
                <a
                  href="mailto:info@amongusindia.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border/40 text-xs sm:text-sm font-medium transition-colors group/mail"
                >
                  <span className="truncate">info@amongusindia.com</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover/mail:translate-x-1 transition-transform shrink-0" />
                </a>
                <a
                  href="mailto:chiragsm258@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border/40 text-xs sm:text-sm font-medium transition-colors group/mail"
                >
                  <span className="truncate">chiragsm258@gmail.com</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover/mail:translate-x-1 transition-transform shrink-0" />
                </a>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Typical response time: <strong>24 - 48 business hours</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Registered Address Card */}
        <section className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight">Registered Address</h2>
              <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                AUI Operational Desk<br />
                Gujarat, India
              </address>
            </div>
          </div>
        </section>

        {/* Help Categories Section */}
        <section className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">What Can We Help You With?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Sales & Membership Inquiries</h3>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
                <li>Tier perks and pricing clarification</li>
                <li>Gifting memberships to other Discord members</li>
                <li>Custom role eligibility and perks</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Technical & Tier Support</h3>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
                <li>Membership activation and manual UPI updates</li>
                <li>Role synchronization with Discord</li>
                <li>Voice channel priority and bot access</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Account & Billing Management</h3>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
                <li>Subscription status and renewal cycles</li>
                <li>Transaction receipts and reference tracking</li>
                <li>Discord ID transfers</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Policy & Privacy Inquiries</h3>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
                <li>Refund policy terms and exceptions</li>
                <li>Data privacy and account linkage</li>
                <li>Community code of conduct enforcement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Links & Business Hours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Helpful Resources */}
          <section className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-6 space-y-4">
            <h2 className="text-lg font-bold tracking-tight">Helpful Policy Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { label: "Terms & Conditions", href: "/policies/terms" },
                { label: "Privacy Policy", href: "/policies/privacy" },
                { label: "Return & Refund Policy", href: "/policies/refund" },
                { label: "Cancellation Policy", href: "/policies/cancellation" },
                { label: "Shipping Policy", href: "/policies/shipping" },
                { label: "About Our Community", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-2.5 rounded-lg bg-muted/30 hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all flex items-center justify-between group/link"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </section>

          {/* Business Hours */}
          <section className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-500 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Operating Hours (IST)</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex justify-between pb-2 border-b border-border/30">
                  <span>Monday – Saturday</span>
                  <span className="font-semibold text-foreground">10:00 AM – 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-rose-400">Closed (Emergency Only)</span>
                </li>
              </ul>
            </div>
            <p className="text-[11px] text-muted-foreground/80 leading-relaxed pt-2">
              Inquiries received outside business operating hours are logged and answered on the next business day.
            </p>
          </section>
        </div>

        {/* Discord Banner */}
        <section className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-card to-rose-500/10 p-8 text-center space-y-4 relative overflow-hidden">
          <div className="p-3 w-fit mx-auto rounded-full bg-purple-500/10 text-purple-400">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl font-black tracking-tight">Need Faster Real-Time Support?</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              For instant payment verification, custom role setups, and live community chat, open a ticket directly on our Discord server.
            </p>
          </div>
          <a
            href="https://discord.gg/amongusindia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all hover:scale-105"
          >
            Join Discord Community <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>
      </div>
    </main>
  )
}