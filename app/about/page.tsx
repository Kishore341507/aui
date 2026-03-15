import type { Metadata } from "next"
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us - Among Us India",
  description: "Learn about AUI - India's most active Discord community",
}

export default function AboutPage() {
  return (
    <>
    <section
      className="relative min-h-[10vh] flex items-center justify-center overflow-hidden"
    >


      {/* Background */}
      <Image
        src="/heroback.avif"
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />
        {/* content */}
        <div className="relative z-10 max-w-4xl h-[20vh] m-auto px-4 text-center ">
            <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
                AUI (Among Us India) is India&apos;s most active Discord community.
            </p>
        </div>
 
    </section>

    <main className="container mx-auto px-6 lg:px-20 py-16 max-w-6xl">
  

  {/* Introduction */}
  <section className="space-y-6 mb-20">
    <h2 className="text-3xl font-semibold">Who We Are</h2>

    <p className="text-muted-foreground leading-relaxed">
      AUI is an independently operated online gaming and social community
      founded by <strong>Chirag Solanki</strong>. Our platform offers both
      free and premium digital memberships designed to enhance the Discord
      community experience.
    </p>

    <p className="text-muted-foreground leading-relaxed">
      From casual gaming sessions to large community events, AUI provides
      a welcoming environment where gamers, creators, and friends come
      together to enjoy interactive entertainment.
    </p>
  </section>

  {/* Mission */}
  <section className="mb-20 p-8 rounded-3xl bg-indigo-600 text-white">
    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>

    <p className="leading-relaxed text-indigo-100 max-w-3xl">
      Our mission is to build the most engaging Discord community in India
      where members feel valued, safe, and connected. We focus on creating
      fun social gaming experiences while encouraging genuine friendships
      and memorable moments through digital interaction.
    </p>
  </section>

  {/* What We Offer */}
  <section className="mb-20">
    <h2 className="text-3xl font-semibold mb-10">What We Offer</h2>

    <div className="grid md:grid-cols-2 gap-8">

      <div className="p-6 rounded-2xl border hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3">Active Community</h3>
        <p className="text-muted-foreground">
          24/7 voice channels and chats where members connect, game,
          and hang out together.
        </p>
      </div>

      <div className="p-6 rounded-2xl border hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3">Premium Features</h3>
        <p className="text-muted-foreground">
          Exclusive membership tiers with perks like custom roles,
          private channels, music features, and enhanced permissions.
        </p>
      </div>

      <div className="p-6 rounded-2xl border hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3">Events & Activities</h3>
        <p className="text-muted-foreground">
          Community tournaments, movie nights, giveaways, and
          entertainment-focused events for members.
        </p>
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
            With over 60,000+ members and counting, we provide a space where gamers, content creators, and friends come together to connect, play, and build lasting relationships in a safe and engaging environment.
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
              <li>Grown to 60,000+ active members across India</li>
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

      <div className="p-6 rounded-2xl border hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3">PVC Coin Economy</h3>
        <p className="text-muted-foreground">
          A virtual in-server currency used for fun activities and
          rewards within the community.
        </p>

        <p className="text-xs text-muted-foreground mt-3">
          PVC Coins have no real-world value and cannot be traded,
          sold, or exchanged for money or cryptocurrency.
        </p>
      </div>

    </div>
  </section>

  {/* Values */}
  <section className="mb-20">
    <h2 className="text-3xl font-semibold mb-10">Our Values</h2>

    <div className="grid md:grid-cols-2 gap-8">

      <div>
        <h3 className="font-semibold mb-2">Community First</h3>
        <p className="text-muted-foreground">
          Every decision focuses on improving the member experience.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Safety & Respect</h3>
        <p className="text-muted-foreground">
          Strong moderation ensures a positive and respectful environment.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Innovation</h3>
        <p className="text-muted-foreground">
          We constantly evolve using new Discord features and ideas.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Inclusivity</h3>
        <p className="text-muted-foreground">
          A welcoming space for gamers from all backgrounds.
        </p>
      </div>

    </div>
  </section>

  {/* Membership */}
  <section className="mb-20 p-8 rounded-3xl border bg-muted/30">
    <h2 className="text-3xl font-semibold mb-4">Premium Memberships</h2>

    <p className="text-muted-foreground mb-6 max-w-3xl">
      Upgrade your AUI experience with our Gold, Platinum, and Diamond
      memberships. Each tier unlocks exclusive digital perks, private
      channels, and enhanced community features.
    </p>

    <a
      href="/membership"
      className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
    >
      Explore Memberships
    </a>
  </section>

  {/* Team */}
  <section className="mb-20">
    <h2 className="text-3xl font-semibold mb-8">The Team Behind AUI</h2>

    <div className="p-6 border rounded-2xl">
      <h3 className="font-semibold text-lg mb-2">Founder</h3>
      <p className="text-muted-foreground">
        <strong>Chirag Solanki</strong> – Founder and operator of
        AUI (Among Us India), responsible for building and managing
        the community.
      </p>
    </div>
  </section>

 
</main>

</>
    
  )
}
