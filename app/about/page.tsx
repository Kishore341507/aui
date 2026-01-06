import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - AUI | Among Us India",
  description: "Learn about AUI - India's most active Discord community",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-12 lg:px-24 py-8">
      <h1 className="text-4xl font-bold mb-8">About AUI (Among Us India)</h1>
      
      <div className="space-y-8">
        {/* Introduction */}
        <section className="space-y-4">
          <p className="text-base text-muted-foreground">
            Welcome to AUI (Among Us India) – India&apos;s most active and vibrant Discord community! Founded and operated by Chirag Solanki, AUI has grown from a simple gaming server to become one of the largest and most engaged Discord communities in India.
          </p>
          <p className="text-base text-muted-foreground">
            AUI is an individually owned online gaming and social community that offers free and paid digital memberships focused on Discord-based events, perks, and entertainment.
          </p>
          <p className="text-base text-muted-foreground">
            With over 50,000+ members and counting, we provide a space where gamers, content creators, and friends come together to connect, play, and build lasting relationships in a safe and engaging environment.
          </p>
        </section>

        {/* Our Mission */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-base text-muted-foreground">
            To create the most welcoming, entertaining, and feature‑rich Discord community in India where every member feels valued, heard, and connected. We strive to provide high‑quality social gaming experiences while fostering genuine friendships and memorable moments through purely digital services.
          </p>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Active Community</h3>
              <p className="text-base text-muted-foreground">
                24/7 active voice channels and text chats with thousands of engaged members ready to play, talk, and hang out.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Premium Features</h3>
              <p className="text-base text-muted-foreground">
                Exclusive membership tiers with unique perks including custom roles, private channels, music features, special permissions, and other digital benefits delivered through our Discord server after successful payment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Events & Activities</h3>
              <p className="text-base text-muted-foreground">
                Regular community events, gaming tournaments, giveaways, movie nights, and interactive activities designed for entertainment and fair play.
              </p>
              <p className="text-base text-muted-foreground">
                Events do not guarantee any financial rewards; they are for fun and community engagement.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Economy System (PVC Coins)</h3>
              <p className="text-base text-muted-foreground">
                A fun in‑server economy featuring PVC Coins and rewards that make your server activity more engaging.
              </p>
              <p className="text-base text-muted-foreground">
                PVC Coins are virtual, non‑monetary points used only inside the AUI community for entertainment and in‑server rewards.
              </p>
              <p className="text-base text-muted-foreground">
                PVC Coins cannot be bought, sold, traded, withdrawn, or exchanged for real money, cryptocurrency, or any other currency, and they have no monetary or investment value.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Safe Environment</h3>
              <p className="text-base text-muted-foreground">
                Strict moderation, clear rules, and a dedicated staff team to keep the community safe, respectful, and free from harassment or toxicity.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Community First</h3>
              <p className="text-base text-muted-foreground">
                Every decision prioritizes the overall community experience, member feedback, and collective enjoyment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Safety & Respect</h3>
              <p className="text-base text-muted-foreground">
                Zero tolerance for harassment, discrimination, or toxicity so everyone feels safe and respected.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Excellence & Innovation</h3>
              <p className="text-base text-muted-foreground">
                Continuous improvement of features and perks, using the latest Discord tools.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Inclusivity & Diversity</h3>
              <p className="text-base text-muted-foreground">
                A welcoming space for members from all backgrounds, regions, and gaming preferences.
              </p>
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
          <div className="space-y-3">
            <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
              <li>Grown to 50,000+ active members across India</li>
              <li>Introduced premium membership tiers with exclusive digital features</li>
              <li>Built an in‑server economy system with PVC Coins and interactive games (no real‑money value)</li>
              <li>Established 24/7 moderation and support</li>
              <li>Created a wide ecosystem of channels, features, and activities</li>
              <li>Helped form countless friendships and gaming squads</li>
            </ul>
          </div>
        </section>

        {/* Membership Benefits */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Premium Memberships</h2>
          <p className="text-base text-muted-foreground mb-4">
            Take your AUI experience to the next level with our premium membership tiers – Gold, Platinum, and Diamond. Each tier unlocks exclusive digital features, special roles, private channels, and unique perks designed to enhance your community experience on our Discord server.
          </p>
          <p className="text-base text-muted-foreground mb-4">
            All purchases are governed by our Terms & Conditions, Privacy Policy, Return & Refund Policy, Cancellation Policy, and Shipping (Digital Delivery) Policy.
          </p>
          <a 
            href="/membership" 
            className="text-base underline"
          >
            Explore Membership Tiers
          </a>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">The Team Behind AUI</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Founder & Operator</h3>
              <p className="text-base text-muted-foreground">
                Chirag Solanki – Founder and individual operator of AUI (Among Us India), responsible for establishing and running the community.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Moderation & Support Team</h3>
              <p className="text-base text-muted-foreground">
                A dedicated team of moderators, administrators, and support staff work around the clock to keep the community safe, welcoming, and fun for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Helpful Resources */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Helpful Resources</h2>
          <div className="flex flex-col gap-2">
            <a href="/policies/terms" className="text-base underline">
              → Terms & Conditions
            </a>
            <a href="/policies/privacy" className="text-base underline">
              → Privacy Policy
            </a>
            <a href="/policies/refund" className="text-base underline">
              → Return & Refund Policy
            </a>
            <a href="/policies/cancellation" className="text-base underline">
              → Cancellation Policy
            </a>
            <a href="/policies/shipping" className="text-base underline">
              → Shipping Policy
            </a>
            <a href="/contact" className="text-base underline">
              → Contact Us
            </a>
          </div>
        </section>

        {/* Join Us */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Join the AUI Family Today!</h2>
          <p className="text-base text-muted-foreground mb-6">
            Whether you&apos;re looking for gaming partners, want to make new friends, or simply want to be part of 
            India&apos;s most vibrant Discord community - AUI welcomes you with open arms!
          </p>
          <div className="flex flex-col gap-2">
            <a 
              href="/membership" 
              className="text-base underline"
            >
              → Become a Member
            </a>
            <a 
              href="/contact" 
              className="text-base underline"
            >
              → Contact Us
            </a>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
          <div className="space-y-2">
            <p className="text-base text-muted-foreground"><strong>Business Name:</strong> AUI (Among Us India)</p>
            <p className="text-base text-muted-foreground"><strong>Operated By:</strong> Chirag Solanki</p>
            <p className="text-base text-muted-foreground"><strong>Email:</strong> info@amongusindia.com</p>
            <p className="text-base text-muted-foreground"><strong>Email:</strong> chiragsm258@gmail.com</p>
          </div>
        </section>
      </div>
    </main>
  )
}
