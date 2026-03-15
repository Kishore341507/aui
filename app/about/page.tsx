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
