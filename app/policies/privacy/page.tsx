import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - AUI | Among Us India",
  description: "Privacy policy for AUI Discord membership subscriptions",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <p className="mb-4">
            <strong>This website is operated by Chirag Solanki (AUI - Among Us India)</strong>
          </p>
          <p className="mb-4">Last Updated: January 3, 2026</p>
          <p>
            At AUI, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website and use our membership services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Personal Information</h3>
          <p className="mb-2">We may collect personal information that you provide to us, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact information (email address, phone number)</li>
            <li>Discord username and ID</li>
            <li>Payment information (processed securely through payment gateways)</li>
            <li>Billing address</li>
            <li>Communication preferences</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Automatically Collected Information</h3>
          <p className="mb-2">When you visit our website, we may automatically collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
          <p className="mb-2">We use the collected information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process your membership subscription payments</li>
            <li>Provide and manage your membership benefits</li>
            <li>Communicate with you about your membership and updates</li>
            <li>Send important notices regarding service changes or policy updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Improve our services and user experience</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information Sharing and Disclosure</h2>
          <p className="mb-2">We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Payment Processors:</strong> To process your subscription payments securely</li>
            <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our services</li>
            <li><strong>Discord:</strong> Your Discord ID and username to grant membership benefits</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
          </ul>
          <p className="mt-4">
            We do not sell, rent, or trade your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction. However, no method 
            of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee 
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services, comply with 
            legal obligations, resolve disputes, and enforce our agreements. Membership data will be retained 
            during your active subscription and for a reasonable period afterward as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Request deletion of your personal information (subject to legal obligations)</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to processing of your personal information in certain circumstances</li>
            <li>Request data portability</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at info@amongusindia.com or chiragsm258@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our website. 
            Cookies are small data files stored on your device. You can control cookies through your browser 
            settings, but disabling cookies may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites (including Discord). We are not responsible 
            for the privacy practices of these external sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 13. We do not knowingly collect 
            personal information from children under 13. If you believe we have collected information from 
            a child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of 
            residence. We ensure appropriate safeguards are in place to protect your information in accordance 
            with this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">11. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes 
            by posting the new policy on this page with an updated &quot;Last Updated&quot; date. Your continued use 
            of our services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
          <p className="mb-2">
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul className="list-none pl-0 mt-2 space-y-1">
            <li><strong>Business Name:</strong> AUI (Among Us India)</li>
            <li><strong>Operated By:</strong> Chirag Solanki</li>
            <li><strong>Email:</strong> info@amongusindia.com</li>
            <li><strong>Email:</strong> chiragsm258@gmail.com</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
