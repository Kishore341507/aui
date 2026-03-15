"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { data: session } = useSession();

  const navItems = [
    { label: "About Us", href: "/about" },
    { label: "Forms", href: "/forms" },
    { label: "Membership", href: "/membership" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-center p-4 md:p-8 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        className="
          flex items-center justify-between
          border border-slate-700
          rounded-full text-white text-sm
          px-4 py-2
          w-full max-w-[1120px]
          backdrop-blur-md
          bg-black/40
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/aui_dark.svg"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-bold text-lg">AUI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 ml-7">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative overflow-hidden h-6 group"
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                {item.label}
              </span>
              <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* User Icon + Hover Dropdown */}
        <div className="hidden md:flex items-center gap-4 relative group">
          {/* User Button (UI UNCHANGED) */}
          <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300 flex items-center justify-center">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="User"
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-indigo-400"
              >
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M18 21C18 17.6863 15.3137 15 12 15C8.68629 15 6 17.6863 6 21"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            )}
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-3 w-48 rounded-xl bg-black/90 backdrop-blur-md border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="p-2 text-sm">
              <p className="px-3 py-2 text-slate-400">
                {session ? `Hi, ${session.user?.name}` : "Guest"}
              </p>

              <div className="h-px bg-slate-700 my-1" />

              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-lg hover:bg-white/10"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn("discord")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-400"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 bg-black w-full flex flex-col items-center gap-4 p-4 md:hidden">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}

            <button
              onClick={() =>
                session ? signOut() : signIn("discord")
              }
              className="bg-white text-black px-4 py-2 rounded-full"
            >
              {session ? "Sign Out" : "Sign In"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}