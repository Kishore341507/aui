import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions - AUI | Among Us India",
  description: "Terms and conditions for AUI Discord membership subscriptions",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <p className="mb-4">
            <strong>This website is operated by Chirag Solanki (AUI - Among Us India)</strong>
          </p>
          <p className="mb-4">Last Updated: January 3, 2026</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website and purchasing membership subscriptions from AUI (Among Us India), 
            you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to 
            these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
          <p>
            AUI provides premium Discord server membership subscriptions with various tiers (Gold, Platinum, and Diamond). 
            These memberships grant access to exclusive features, roles, and benefits within our Discord community. 
            All memberships are digital subscriptions with no physical goods involved.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Subscription Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Memberships are available on monthly or yearly subscription basis</li>
            <li>All prices are listed in Indian Rupees (INR)</li>
            <li>Payment must be made in full before access is granted</li>
            <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
            <li>You are responsible for maintaining the confidentiality of your account information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Responsibilities</h2>
          <p className="mb-2">As a member, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information during registration</li>
            <li>Follow Discord's Terms of Service and Community Guidelines</li>
            <li>Follow AUI server rules and regulations</li>
            <li>Not share your membership benefits with non-members</li>
            <li>Not engage in any abusive, harassing, or inappropriate behavior</li>
            <li>Not attempt to circumvent or manipulate the membership system</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All payments are processed securely through authorized payment gateways</li>
            <li>Prices are subject to change with prior notice</li>
            <li>You are responsible for any applicable taxes or fees</li>
            <li>Failed payments may result in suspension or termination of membership</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Membership Benefits</h2>
          <p>
            Membership benefits are subject to change. AUI reserves the right to modify, add, or remove features 
            at any time. We will make reasonable efforts to notify members of significant changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Termination</h2>
          <p className="mb-2">AUI reserves the right to terminate or suspend your membership if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You violate these terms and conditions</li>
            <li>You violate Discord's Terms of Service or Community Guidelines</li>
            <li>You violate AUI server rules</li>
            <li>You engage in fraudulent or abusive behavior</li>
            <li>Payment issues arise</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
          <p>
            AUI and Chirag Solanki shall not be liable for any indirect, incidental, special, consequential, 
            or punitive damages resulting from your use of or inability to use the service. Our total liability 
            shall not exceed the amount paid by you for the membership subscription.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Intellectual Property</h2>
          <p>
            All content, features, and functionality on this website and Discord server are owned by AUI 
            and are protected by copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India. 
            Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">11. Changes to Terms</h2>
          <p>
            AUI reserves the right to modify these terms at any time. Changes will be effective immediately 
            upon posting. Your continued use of the service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Information</h2>
          <p>
            For questions about these Terms & Conditions, please contact us at:
          </p>
          <ul className="list-none pl-0 mt-2 space-y-1">
            <li>Email: info@amongusindia.com</li>
            <li>Email: chiragsm258@gmail.com</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
