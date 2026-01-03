import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Return & Refund Policy - AUI | Among Us India",
  description: "Return and refund policy for AUI Discord membership subscriptions",
}

export default function RefundPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Return & Refund Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <p className="mb-4">
            <strong>This website is operated by Chirag Solanki (AUI - Among Us India)</strong>
          </p>
          <p className="mb-4">Last Updated: January 3, 2026</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. No Refund Policy</h2>
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6 mb-4">
            <p className="font-semibold text-yellow-600 dark:text-yellow-400 text-lg mb-2">
              Important Notice: All Sales Are Final
            </p>
            <p className="text-foreground">
              AUI operates a strict NO REFUND policy for all membership subscriptions. Once a payment is made 
              and membership access is granted, no refunds will be issued under any circumstances.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. Nature of Service</h2>
          <p className="mb-4">
            AUI provides digital subscription services for access to premium Discord server features and benefits. 
            These are intangible digital services with no physical goods involved. The nature of our service means:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Membership benefits are delivered instantly upon successful payment</li>
            <li>Access to exclusive features begins immediately</li>
            <li>Digital services cannot be "returned" once accessed</li>
            <li>All subscriptions are non-refundable and non-transferable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Subscription Terms</h2>
          <p className="mb-2">Before purchasing any membership tier, please note:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Monthly Subscriptions:</strong> Valid for 30 days from purchase date - No refunds after purchase</li>
            <li><strong>3 Monthly Subscriptions:</strong> Valid for 90 days from purchase date - No refunds after purchase</li>
            <li><strong>Yearly Subscriptions:</strong> Valid for 365 days from purchase date - No refunds after purchase</li>
            <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
            <li>Cancelling your subscription stops future charges but does not refund past payments</li>
            <li>You will retain access until the end of your current billing period after cancellation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Processing</h2>
          <p className="mb-2">All payments are:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processed securely through authorized payment gateways</li>
            <li>Final and non-refundable once completed</li>
            <li>Charged in Indian Rupees (INR)</li>
            <li>Subject to applicable taxes and payment gateway fees</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Exceptions</h2>
          <p className="mb-4">
            While we maintain a strict no-refund policy, we may consider exceptions only in the following 
            extremely rare circumstances:
          </p>
          
          <h3 className="text-xl font-semibold text-foreground mb-3">Technical Errors</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Duplicate charges due to payment gateway errors (verified by transaction records)</li>
            <li>Charges made after subscription cancellation was confirmed</li>
            <li>Payment processed but membership benefits were never activated due to technical error</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3">Fraudulent Transactions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Unauthorized transactions made without the account holder's knowledge</li>
            <li>Must be reported within 48 hours of the transaction with supporting evidence</li>
          </ul>

          <p className="mt-4 font-semibold">
            Exception requests must be submitted to info@amongusindia.com or chiragsm258@gmail.com within 
            48 hours of the transaction with complete documentation. Each case will be reviewed individually, 
            and AUI's decision will be final.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. What Is NOT Refundable</h2>
          <p className="mb-2">Refunds will NOT be issued for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Change of mind or dissatisfaction with features</li>
            <li>Failure to use the membership or access benefits</li>
            <li>Violation of terms leading to membership suspension or termination</li>
            <li>Bans or kicks from the Discord server due to rule violations</li>
            <li>Discord account suspension or deletion</li>
            <li>Technical issues on Discord's end (not AUI's responsibility)</li>
            <li>Lack of understanding of membership features before purchase</li>
            <li>Personal circumstances preventing use of the membership</li>
            <li>Partial months when cancelling subscription</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Refund Processing (If Applicable)</h2>
          <p className="mb-2">
            In the extremely rare event that a refund is approved under Section 5 (Exceptions):
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Refund Mode:</strong> Original payment method only (UPI, Credit/Debit Card, Net Banking, etc.)</li>
            <li><strong>Processing Time:</strong> 7-14 business days from approval date</li>
            <li><strong>Amount:</strong> Full subscription amount minus any payment gateway charges (if applicable)</li>
            <li>Membership access will be revoked immediately upon refund approval</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Membership Termination by AUI</h2>
          <p>
            If AUI terminates your membership due to violation of terms and conditions or server rules, 
            you will NOT be entitled to any refund for the remaining subscription period. The no-refund 
            policy applies regardless of who initiates the termination.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Service Changes</h2>
          <p>
            AUI reserves the right to modify, add, or remove membership features at any time. Such changes 
            do not entitle members to refunds. We will make reasonable efforts to notify members of 
            significant changes in advance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. How to Cancel Subscription</h2>
          <p className="mb-2">
            While no refunds are provided, you can cancel future subscription renewals:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact us at info@amongusindia.com or chiragsm258@gmail.com</li>
            <li>Provide your Discord username and purchase details</li>
            <li>Cancel at least 24 hours before the next billing date</li>
            <li>You will retain access until the end of your current paid period</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">11. Before You Purchase</h2>
          <p className="mb-2">We strongly recommend:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Carefully review all membership features and benefits</li>
            <li>Read the complete Terms & Conditions</li>
            <li>Ensure you understand the subscription duration and pricing</li>
            <li>Verify you meet all requirements (Discord account, age restrictions, etc.)</li>
            <li>Contact us with any questions BEFORE making a purchase</li>
          </ul>
          <p className="mt-4 font-semibold text-foreground">
            By completing a purchase, you acknowledge that you have read and agree to this No Refund Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
          <p className="mb-2">
            For questions about this Refund Policy or to report exceptional circumstances:
          </p>
          <ul className="list-none pl-0 mt-2 space-y-1">
            <li><strong>Business Name:</strong> AUI (Among Us India)</li>
            <li><strong>Operated By:</strong> Chirag Solanki</li>
            <li><strong>Email:</strong> info@amongusindia.com</li>
            <li><strong>Email:</strong> chiragsm258@gmail.com</li>
          </ul>
          <p className="mt-4 text-sm">
            Response time: 24-48 hours for refund-related inquiries
          </p>
        </section>
      </div>
    </div>
  )
}
