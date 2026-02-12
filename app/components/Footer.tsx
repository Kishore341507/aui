export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-20">
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-16">
        {/* Left section */}
        <div className="lg:col-span-3 space-y-6">
          <a href="https://discord.gg/amongusindians" target="_blank" className="block">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">
              AUI
            </h2>
          </a>

          <p className="text-sm md:text-base">
            Stay updated with tournaments, events, and community news. Follow us for exclusive announcements!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="example@email.com"
              className="bg-[#14171A] text-white/70 border border-white/10 px-3 py-3 rounded-md w-full sm:flex-1 sm:max-w-xs placeholder:text-sm placeholder:font-light focus:outline-none focus:ring-1 focus:ring-gray-600"
            />
            <button className="bg-[#14171A] text-white px-5 py-3 rounded-md border border-white/10 text-sm hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28">
          {/* Community */}
          <div>
            <h3 className="font-medium text-sm mb-4 md:mb-6">Community</h3>
            <ul className="space-y-3 md:space-y-4 text-sm text-white/70">
              <li><a href="https://discord.gg/amongusindians" target="_blank" className="hover:text-white">Join Discord</a></li>
              <li><a href="#" className="hover:text-white">Tournaments</a></li>
              <li><a href="#" className="hover:text-white">Events</a></li>
            </ul>
          </div>

          {/* Gaming */}
          <div>
            <h3 className="font-medium text-sm mb-4 md:mb-6">Gaming</h3>
            <ul className="space-y-3 md:space-y-4 text-sm text-white/70">
              <li><a href="#" className="hover:text-white">Valorant</a></li>
              <li><a href="#" className="hover:text-white">BGMI</a></li>
              <li><a href="#" className="hover:text-white">Minecraft</a></li>
              <li><a href="#" className="hover:text-white">CS:GO</a></li>
            </ul>
          </div>

          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium text-sm mb-4 md:mb-6">Company</h3>
            <ul className="space-y-3 md:space-y-4 text-sm text-white/70">
              <li><a href="#" className="hover:text-white">About AUI</a></li>
              <li><a href="#" className="hover:text-white">Leaderboards</a></li>
              <li><a href="#" className="hover:text-white">Partners</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className=" mx-auto mt-12 md:mt-16 pt-6 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/70 text-xs sm:text-sm">
          © 2025 Among Us Indians. All rights reserved.
        </p>

        <div className="flex gap-5 md:gap-6">
          {[
            { name: "Discord", url: "https://discord.gg/amongusindians" },
            { name: "Twitter", url: "#" },
            { name: "Instagram", url: "#" },
            { name: "YouTube", url: "#" },
          ].map((social, i) => (
            <a key={i} href={social.url} target="_blank" className="text-white hover:text-indigo-400 transition">
              <span className="sr-only">{social.name}</span>
              <span className="text-sm font-medium">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
