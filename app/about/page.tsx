import type { Metadata } from "next"
import { Users, Target, Award, Heart, Zap, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - AUI | Among Us India",
  description: "Learn about AUI - India's most active Discord community",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About AUI (Among Us India)</h1>
      
      <div className="space-y-8">
        {/* Introduction */}
        <section className="space-y-4">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome to <strong className="text-foreground">AUI (Among Us India)</strong> - India&apos;s most active 
            and vibrant Discord community! Founded and operated by <strong className="text-foreground">Chirag Solanki</strong>, 
            AUI has grown from a simple gaming server to become one of the largest and most engaged Discord communities in India.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With over 50,000+ members and counting, we&apos;ve created a space where gamers, content creators, and 
            friends come together to connect, play, and build lasting relationships. Our community thrives on 
            inclusivity, entertainment, and the shared passion for gaming and social interaction.
          </p>
        </section>

        {/* Our Mission */}
        <section className="border border-zinc-700 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create the most welcoming, entertaining, and feature-rich Discord community in India where 
                every member feels valued, heard, and connected. We strive to provide unparalleled social gaming 
                experiences while fostering genuine friendships and memorable moments.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-zinc-700 rounded-lg p-5">
              <h3 className="font-semibold text-lg text-foreground mb-2">Active Community</h3>
              <p className="text-muted-foreground text-sm">
                24/7 active voice channels and text chats with thousands of engaged members ready to play, 
                talk, and hang out at any time of the day.
              </p>
            </div>
            <div className="border border-zinc-700 rounded-lg p-5">
              <h3 className="font-semibold text-lg text-foreground mb-2">Gaming Together</h3>
              <p className="text-muted-foreground text-sm">
                Find teammates for your favorite games, participate in tournaments, and join gaming sessions 
                across multiple titles including Among Us, Valorant, Minecraft, and more.
              </p>
            </div>
            <div className="border border-zinc-700 rounded-lg p-5">
              <h3 className="font-semibold text-lg text-foreground mb-2">Premium Features</h3>
              <p className="text-muted-foreground text-sm">
                Exclusive membership tiers with unique perks including custom roles, private channels, music bots, 
                special permissions, and much more to enhance your Discord experience.
              </p>
            </div>
            <div className="border border-zinc-700 rounded-lg p-5">
              <h3 className="font-semibold text-lg text-foreground mb-2">Events & Activities</h3>
              <p className="text-muted-foreground text-sm">
                Regular community events, gaming tournaments, giveaways, movie nights, and interactive activities 
                that bring everyone together for fun and prizes.
              </p>
            </div>
            <div className="border border-zinc-700 rounded-lg p-5">
              <h3 className="font-semibold text-lg text-foreground mb-2">Economy System</h3>
              <p className="text-muted-foreground text-sm">
                Engage with our in-server economy featuring PVC Coins, casino games, trading, and rewards that 
                make your server activity even more exciting and rewarding.
              </p>
            </div>
            <div className="border border-zinc-700 rounded-lg p-5">
              <h3 className="font-semibold text-lg text-foreground mb-2">Safe Environment</h3>
              <p className="text-muted-foreground text-sm">
                Strict moderation, clear rules, and a dedicated staff team ensuring a safe, respectful, and 
                toxicity-free environment for all members to enjoy.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Our Values
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <Users className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Community First</h3>
                <p className="text-muted-foreground text-sm">
                  Every decision we make prioritizes the community experience, member feedback, and collective 
                  enjoyment above all else.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Shield className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Safety & Respect</h3>
                <p className="text-muted-foreground text-sm">
                  We maintain zero tolerance for harassment, discrimination, or toxicity, ensuring everyone 
                  feels safe and respected.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Award className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Excellence & Innovation</h3>
                <p className="text-muted-foreground text-sm">
                  Continuously improving our features, introducing new perks, and staying ahead with the latest 
                  Discord innovations to provide the best experience.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Heart className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Inclusivity & Diversity</h3>
                <p className="text-muted-foreground text-sm">
                  Welcoming members from all backgrounds, regions, and gaming preferences, creating a diverse 
                  and vibrant community ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="border border-zinc-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              What started as a small Discord server for Among Us players has evolved into one of India&apos;s 
              premier gaming and social communities. Through dedication, innovation, and an unwavering commitment 
              to our members, AUI has achieved remarkable milestones:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Grown to 50,000+ active members across India</li>
              <li>Introduced innovative premium membership tiers with exclusive features</li>
              <li>Built a robust economy system with PVC Coins and interactive games</li>
              <li>Established 24/7 moderation and support infrastructure</li>
              <li>Created a thriving ecosystem of channels, features, and activities</li>
              <li>Fostered countless friendships, gaming squads, and memorable experiences</li>
            </ul>
            <p>
              And we&apos;re just getting started! We continue to evolve, innovate, and expand to provide even better 
              experiences for our community.
            </p>
          </div>
        </section>

        {/* Membership Benefits */}
        <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-3">Premium Memberships</h2>
          <p className="text-muted-foreground mb-4">
            Take your AUI experience to the next level with our premium membership tiers - Gold, Platinum, and Diamond. 
            Each tier unlocks exclusive features, special roles, private channels, and unique perks designed to enhance 
            your community experience.
          </p>
          <a 
            href="/membership" 
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Explore Membership Tiers
          </a>
        </section>

        {/* Team */}
        <section className="border border-zinc-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">The Team Behind AUI</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Founder & Operator</h3>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Chirag Solanki</strong> - The visionary behind AUI, responsible 
                for establishing and operating this incredible community. With a passion for gaming and community building, 
                Chirag has transformed AUI into India&apos;s most active Discord server.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Moderation & Support Team</h3>
              <p className="text-muted-foreground">
                A dedicated team of moderators, administrators, and support staff work around the clock to ensure 
                the community remains safe, welcoming, and fun for everyone. Our team is committed to resolving 
                issues, organizing events, and maintaining the high standards that make AUI special.
              </p>
            </div>
          </div>
        </section>

        {/* Helpful Resources */}
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
            <a href="/contact" className="text-blue-500 hover:text-blue-400 transition-colors">
              → Contact Us
            </a>
          </div>
        </section>

        {/* Join Us */}
        <section className="text-center border border-zinc-700 rounded-lg p-8 space-y-4">
          <h2 className="text-3xl font-bold">Join the AUI Family Today!</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you&apos;re looking for gaming partners, want to make new friends, or simply want to be part of 
            India&apos;s most vibrant Discord community - AUI welcomes you with open arms!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a 
              href="/membership" 
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Become a Member
            </a>
            <a 
              href="/contact" 
              className="inline-block border border-zinc-700 text-foreground font-semibold px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
          <div className="space-y-2 text-muted-foreground">
            <p><strong className="text-foreground">Business Name:</strong> AUI (Among Us India)</p>
            <p><strong className="text-foreground">Operated By:</strong> Chirag Solanki</p>
            <p><strong className="text-foreground">Email:</strong> info@amongusindia.com</p>
            <p><strong className="text-foreground">Email:</strong> chiragsm258@gmail.com</p>
          </div>
        </section>
      </div>
    </div>
  )
}
