import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Policy - AUI | Among Us India",
  description: "Shipping policy for AUI Discord membership subscriptions",
}

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <p className="mb-4">
            <strong>This website is operated by Chirag Solanki (AUI - Among Us India)</strong>
          </p>
          <p className="mb-4">Last Updated: January 3, 2026</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. No Physical Shipping</h2>
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-6 mb-4">
            <p className="font-semibold text-blue-600 dark:text-blue-400 text-lg mb-3">
              Digital Service - No Shipping Required
            </p>
            <p className="text-foreground mb-3">
              AUI provides exclusively digital membership subscription services. We do not sell, ship, or deliver 
              any physical products or goods.
            </p>
            <p className="text-foreground">
              <strong>Therefore, this Shipping Policy is NOT APPLICABLE to our services.</strong>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. Nature of Service</h2>
          <p className="mb-4">
            AUI offers premium Discord server membership subscriptions which include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Digital access to exclusive Discord server features</li>
            <li>Special roles and permissions on Discord</li>
            <li>Virtual benefits and perks within the community</li>
            <li>Access to private channels and features</li>
            <li>In-server virtual currency and economy benefits</li>
          </ul>
          <p className="mt-4">
            All these benefits are delivered digitally and instantly upon successful payment verification.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Instant Digital Delivery</h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Delivery Method</h3>
          <p className="mb-2">
            Upon successful payment, your membership benefits are activated through:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Delivery Platform:</strong> Discord (discord.gg or Discord App)</li>
            <li><strong>Delivery Time:</strong> Immediate to 15 minutes after payment confirmation</li>
            <li><strong>Delivery Mode:</strong> Automatic role assignment on Discord server</li>
            <li><strong>No Tracking Required:</strong> All changes are instant and visible on your Discord profile</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">What You Receive</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Updated Discord roles reflecting your membership tier</li>
            <li>Immediate access to exclusive channels and features</li>
            <li>Activation of special permissions and benefits</li>
            <li>Confirmation message in designated channel (if applicable)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Delivery Timeline</h2>
          
          <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Standard Processing Time</h3>
            <ul className="list-disc pl-6 space-y-1 text-foreground">
              <li><strong>Automatic Processing:</strong> 0-5 minutes</li>
              <li><strong>Manual Verification (if required):</strong> Up to 15 minutes</li>
              <li><strong>Maximum Delay:</strong> 24 hours (in rare technical issues)</li>
            </ul>
          </div>

          <p className="mb-2">
            If your membership is not activated within 15 minutes:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Verify that you have joined the AUI Discord server</li>
            <li>Check if payment was successfully completed</li>
            <li>Ensure your Discord account is properly linked</li>
            <li>Contact our support team with payment proof</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Requirements for Delivery</h2>
          <p className="mb-2">
            To receive your digital membership benefits, you must:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Have an active Discord account</strong> - Required for service delivery</li>
            <li><strong>Be a member of AUI Discord server</strong> - Join before or immediately after purchase</li>
            <li><strong>Have Discord notifications enabled</strong> - To receive confirmation messages</li>
            <li><strong>Not be banned/blocked</strong> - From the AUI Discord server</li>
            <li><strong>Meet Discord's age requirements</strong> - As per Discord Terms of Service</li>
          </ul>
          <p className="mt-4 font-semibold text-foreground">
            Failure to meet these requirements may delay or prevent delivery of services. No refunds will be 
            provided if you fail to meet delivery requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. No Geographical Restrictions</h2>
          <p>
            Since our services are entirely digital and delivered via Discord:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Available worldwide (wherever Discord is accessible)</li>
            <li>No shipping zones or regional restrictions</li>
            <li>No customs or import duties</li>
            <li>No international shipping fees</li>
            <li>Instant delivery regardless of location</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Delivery Confirmation</h2>
          <p className="mb-2">
            You will know your membership has been successfully delivered when:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your Discord role changes to reflect your membership tier (Gold/Platinum/Diamond)</li>
            <li>You can access previously locked channels and features</li>
            <li>Your username appears in the member list with special role colors</li>
            <li>Special permissions and commands become available to you</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Delivery Issues</h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Common Issues & Solutions</h3>
          
          <div className="space-y-4">
            <div className="border border-zinc-700 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-2">Issue: Role not assigned after payment</p>
              <p className="text-sm">
                <strong>Solution:</strong> Ensure you're in the AUI Discord server, verify payment was successful, 
                wait up to 15 minutes, or contact support with transaction proof.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-2">Issue: Cannot access exclusive channels</p>
              <p className="text-sm">
                <strong>Solution:</strong> Refresh Discord (Ctrl+R or close and reopen), check your role assignment, 
                ensure you're looking at the correct server.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-2">Issue: Payment successful but no confirmation</p>
              <p className="text-sm">
                <strong>Solution:</strong> Save payment receipt/screenshot, verify Discord username is correct, 
                contact support immediately at info@amongusindia.com
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Technical Support</h2>
          <p className="mb-2">
            For delivery-related technical issues:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact us within 24 hours of payment</li>
            <li>Provide transaction ID and payment proof</li>
            <li>Include your Discord username and ID</li>
            <li>Describe the issue you're experiencing</li>
            <li>We will resolve delivery issues within 24-48 hours</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. Future Physical Merchandise</h2>
          <p>
            If AUI decides to offer physical merchandise (such as branded clothing, accessories, or other goods) 
            in the future, a separate and comprehensive Shipping Policy will be created and published for those 
            products. Such policy will include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Shipping methods and carriers</li>
            <li>Delivery timeframes</li>
            <li>Shipping costs and zones</li>
            <li>Tracking information</li>
            <li>International shipping terms</li>
          </ul>
          <p className="mt-4">
            This current policy applies only to digital membership subscriptions and will be updated if physical 
            products are introduced.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">11. Service Continuity</h2>
          <p>
            Your digital membership benefits continue without interruption:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>24/7 Access:</strong> Benefits are available around the clock</li>
            <li><strong>No Redelivery Needed:</strong> One-time activation, continuous access</li>
            <li><strong>Automatic Renewal:</strong> Benefits continue seamlessly on renewal</li>
            <li><strong>No Delivery Fees:</strong> All included in subscription price</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Support</h2>
          <p className="mb-2">
            For questions about service delivery or activation issues:
          </p>
          <ul className="list-none pl-0 mt-2 space-y-1">
            <li><strong>Business Name:</strong> AUI (Among Us India)</li>
            <li><strong>Operated By:</strong> Chirag Solanki</li>
            <li><strong>Email:</strong> info@amongusindia.com</li>
            <li><strong>Email:</strong> chiragsm258@gmail.com</li>
          </ul>
          <p className="mt-4 text-sm">
            Support hours: We respond to delivery issues within 24 hours, with most issues resolved immediately.
          </p>
        </section>

        <section className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground">
            AUI provides <strong>digital-only subscription services</strong> with <strong>instant delivery</strong> via Discord. 
            No physical shipping is involved. All membership benefits are activated automatically within minutes of 
            successful payment. For delivery support, contact us at info@amongusindia.com or chiragsm258@gmail.com.
          </p>
        </section>
      </div>
    </div>
  )
}
