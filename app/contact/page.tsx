import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - AUI | Among Us India",
  description: "Get in touch with AUI - Among Us India Discord community",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="space-y-8">
        <section>
          <p className="text-lg text-muted-foreground mb-6">
            Have questions about our membership subscriptions or need support? We're here to help!
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          {/* Business Information Card */}
          <div className="border border-zinc-700 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Business Information</h2>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Legal Name</h3>
              <p className="text-muted-foreground">Chirag Solanki</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Company Name</h3>
              <p className="text-muted-foreground">AUI (Among Us India)</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Business Type</h3>
              <p className="text-muted-foreground">Discord Community & Membership Services</p>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="border border-zinc-700 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
            
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email Addresses</h3>
                <p className="text-muted-foreground text-sm">info@amongusindia.com</p>
                <p className="text-muted-foreground text-sm">chiragsm258@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                <p className="text-muted-foreground text-sm">24-48 hours for all inquiries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registered Address */}
        <section className="border border-zinc-700 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Registered Address</h2>
              <p className="text-muted-foreground leading-relaxed">
                D/505, Shyam Satva, Nava naroda, naroda<br />
                Ahmedabad, Gujarat - 382330<br />
                India
              </p>
            </div>
          </div>
        </section>

        {/* What We Can Help With */}
        <section className="border border-zinc-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">What Can We Help You With?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Sales Inquiries</h3>
              <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                <li>Membership tier information</li>
                <li>Pricing and payment options</li>
                <li>Subscription benefits</li>
                <li>Before-purchase questions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Technical Support</h3>
              <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                <li>Membership activation issues</li>
                <li>Payment problems</li>
                <li>Discord role assignment</li>
                <li>Access to features</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Account Management</h3>
              <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                <li>Subscription cancellation</li>
                <li>Account modifications</li>
                <li>Billing inquiries</li>
                <li>Renewal questions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Policy Questions</h3>
              <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                <li>Refund policy clarifications</li>
                <li>Terms and conditions</li>
                <li>Privacy concerns</li>
                <li>Cancellation policy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="border border-zinc-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Helpful Resources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="/policies/terms" className="text-blue-500 hover:text-blue-400 transition-colors">
              → Terms & Conditions
            </a>
            <a href="/policies/privacy" className="text-blue-500 hover:text-blue-400 transition-colors">
              → Privacy Policy
            </a>
            <a href="/policies/refund" className="text-blue-500 hover:text-blue-400 transition-colors">
              → Return & Refund Policy
            </a>
            <a href="/policies/cancellation" className="text-blue-500 hover:text-blue-400 transition-colors">
              → Cancellation Policy
            </a>
            <a href="/policies/shipping" className="text-blue-500 hover:text-blue-400 transition-colors">
              → Shipping Policy
            </a>
            <a href="/about" className="text-blue-500 hover:text-blue-400 transition-colors">
              → About Us
            </a>
          </div>
        </section>

        {/* Business Hours */}
        <section className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">Business Hours</h2>
          <p className="text-muted-foreground mb-2">
            Email inquiries are monitored during:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>Monday - Saturday: 10:00 AM - 8:00 PM IST</li>
            <li>Sunday: Closed (emergency inquiries will be addressed on next business day)</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            We strive to respond to all inquiries within 24-48 hours during business days.
          </p>
        </section>

        {/* Discord Server */}
        <section className="border border-zinc-700 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-3">Join Our Discord Community</h2>
          <p className="text-muted-foreground mb-4">
            The fastest way to get support and connect with our community is through Discord!
          </p>
          <p className="text-sm text-muted-foreground">
            Visit our Discord server for real-time support and community interaction.
          </p>
        </section>
      </div>
    </div>
  )
}
