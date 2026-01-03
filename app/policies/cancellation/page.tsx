import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cancellation Policy - AUI | Among Us India",
  description: "Cancellation policy for AUI Discord membership subscriptions",
}

export default function CancellationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cancellation Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <p className="mb-4">
            <strong>This website is operated by Chirag Solanki (AUI - Among Us India)</strong>
          </p>
          <p className="mb-4">Last Updated: January 3, 2026</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Cancellation Overview</h2>
          <p>
            You may cancel your AUI membership subscription at any time. However, please note that 
            cancellation does not entitle you to a refund for the current billing period. You will 
            continue to have access to your membership benefits until the end of your paid subscription period.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. How to Cancel</h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Cancellation Process</h3>
          <p className="mb-2">To cancel your subscription, follow these steps:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Send an email to <strong>info@amongusindia.com</strong> or <strong>chiragsm258@gmail.com</strong></li>
            <li>Subject line: &quot;Membership Cancellation Request&quot;</li>
            <li>Include the following information:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Your Discord username and ID</li>
                <li>Your registered email address</li>
                <li>Current membership tier (Gold/Platinum/Diamond)</li>
                <li>Transaction ID or payment proof</li>
                <li>Reason for cancellation (optional but appreciated)</li>
              </ul>
            </li>
            <li>We will process your cancellation within 24-48 hours</li>
            <li>You will receive a confirmation email once cancellation is complete</li>
          </ol>

          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 mt-4">
            <p className="text-foreground">
              <strong>Important:</strong> Cancel at least 24 hours before your next billing date to avoid being 
              charged for the next period.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cancellation Timeline</h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Monthly Subscriptions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Billing Cycle:</strong> 30 days from purchase date</li>
            <li><strong>Cancellation Window:</strong> Must cancel at least 24 hours before renewal</li>
            <li><strong>Access Duration:</strong> Retain access until end of current 30-day period</li>
            <li><strong>Auto-renewal:</strong> Stops after current period ends</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Yearly Subscriptions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Billing Cycle:</strong> 365 days from purchase date</li>
            <li><strong>Cancellation Window:</strong> Must cancel at least 24 hours before renewal</li>
            <li><strong>Access Duration:</strong> Retain access until end of current 365-day period</li>
            <li><strong>Auto-renewal:</strong> Stops after current period ends</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. What Happens After Cancellation</h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Immediate Effects</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your subscription will be marked as &quot;cancelled&quot;</li>
            <li>No further charges will be made to your payment method</li>
            <li>You will receive a cancellation confirmation email</li>
            <li>You can still access all membership benefits until the period ends</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">After Period Ends</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>All premium membership benefits will be revoked</li>
            <li>Special roles and permissions will be removed from your Discord account</li>
            <li>Access to exclusive channels and features will be disabled</li>
            <li>Any accumulated benefits (coins, etc.) may be reset per server rules</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. No Partial Refunds</h2>
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
            <p className="text-foreground mb-2">
              <strong>Important Notice:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancelling your subscription does NOT result in a refund for unused days</li>
              <li>No pro-rated refunds are provided for partial months or years</li>
              <li>All payments are final as per our Return & Refund Policy</li>
              <li>You paid for access for the full period, which you will receive</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Reactivation</h2>
          <p className="mb-2">
            If you decide to rejoin AUI membership after cancellation:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You can purchase a new subscription at any time</li>
            <li>Previous membership benefits are not carried forward</li>
            <li>New subscription period starts from the new purchase date</li>
            <li>Pricing may have changed since your original subscription</li>
            <li>Previous transaction history may not be restored</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cancellation by AUI</h2>
          <p className="mb-4">
            AUI reserves the right to cancel or suspend your membership under the following circumstances:
          </p>
          
          <h3 className="text-xl font-semibold text-foreground mb-3">Grounds for Cancellation</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violation of Terms & Conditions</li>
            <li>Violation of Discord Terms of Service or Community Guidelines</li>
            <li>Violation of AUI server rules</li>
            <li>Abusive, harassing, or inappropriate behavior</li>
            <li>Fraudulent activity or payment disputes</li>
            <li>Sharing or reselling membership benefits</li>
            <li>Multiple warnings without improvement</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Immediate Termination</h3>
          <p className="mb-2">If AUI cancels your membership:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access to all membership benefits will be revoked immediately</li>
            <li>NO REFUND will be provided for the remaining subscription period</li>
            <li>You may be permanently banned from purchasing future memberships</li>
            <li>Decision is final and not subject to appeal</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Payment Failures</h2>
          <p className="mb-2">
            If a recurring payment fails:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We will attempt to process payment for up to 3 days</li>
            <li>You will receive email notifications about failed payments</li>
            <li>After 3 failed attempts, your subscription will be automatically cancelled</li>
            <li>Access to membership benefits will be suspended</li>
            <li>You will need to purchase a new subscription to regain access</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Cooling-Off Period</h2>
          <p>
            As per Indian consumer protection laws, please note that digital content services (like our 
            membership subscriptions) that are delivered immediately upon purchase are generally NOT eligible 
            for cooling-off period refunds. By purchasing and immediately receiving access to our digital 
            services, you waive any cooling-off period rights that may otherwise apply.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. Downgrading</h2>
          <p className="mb-2">
            Currently, we do not support downgrading between membership tiers (e.g., Diamond to Platinum). 
            If you wish to move to a lower tier:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must cancel your current subscription</li>
            <li>Wait until your current period ends</li>
            <li>Purchase the new desired tier</li>
            <li>No refund will be provided for the difference in price</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">11. Service Discontinuation</h2>
          <p>
            In the unlikely event that AUI discontinues the membership service entirely, we will provide 
            at least 30 days notice. Active subscriptions will be honored until their expiration date, 
            or pro-rated refunds may be offered at AUI&apos;s discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact for Cancellation Support</h2>
          <p className="mb-2">
            For assistance with cancellation or questions about this policy:
          </p>
          <ul className="list-none pl-0 mt-2 space-y-1">
            <li><strong>Business Name:</strong> AUI (Among Us India)</li>
            <li><strong>Operated By:</strong> Chirag Solanki</li>
            <li><strong>Email:</strong> info@amongusindia.com</li>
            <li><strong>Email:</strong> chiragsm258@gmail.com</li>
          </ul>
          <p className="mt-4 text-sm">
            Response time: We aim to process cancellation requests within 24-48 hours during business days.
          </p>
        </section>
      </div>
    </div>
  )
}
