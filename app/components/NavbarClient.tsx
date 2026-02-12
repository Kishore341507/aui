"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  CircleUser,
  Settings,
  SunMoon,
  LifeBuoy,
  LogOut,
  KeyRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggleSub } from "./mode-toggle-sub";
import { ModeToggleMobile } from "./mode-toggle-mobile";
import { handleSignIn, handleSignOut } from "@/app/actions/auth";
import type { Session } from "next-auth";

export default function NavbarClient({ session }: { session: Session | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { label: "About Us", href: "/about" },
    { label: "Forms", href: "/forms" },
    { label: "Membership", href: "/membership" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(!(currentScrollY > lastScrollY && currentScrollY > 100));
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
      <nav className="flex items-center justify-between border border-slate-700 rounded-full text-white text-sm px-4 py-2 w-full max-w-[1120px] backdrop-blur-md bg-black/40">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/aui_dark.png" alt="Logo" width={32} height={32} />
          <span className="font-bold text-lg">AUI</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative group h-6 overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform">
                {item.label}
              </span>
              <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* User dropdown (from reference navbar) */}
        <div className="hidden md:flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {session ? (
                  <Image
                    src={session.user?.image ?? ""}
                    alt="profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <CircleUser className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {session ? `Hi, ${session.user?.name}` : "Guest User!"}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SunMoon className="mr-2 h-4 w-4" />
                  Appearance
                </DropdownMenuSubTrigger>
                <ModeToggleSub />
              </DropdownMenuSub>

              <DropdownMenuItem asChild>
                <Link href="https://discord.gg/amongusindians" target="_blank">
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  Support
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() =>
                  session ? handleSignOut() : handleSignIn("discord")
                }
              >
                {session ? (
                  <LogOut className="mr-2 h-4 w-4" />
                ) : (
                  <KeyRound className="mr-2 h-4 w-4" />
                )}
                {session ? "Sign Out" : "Sign In"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-black/95 backdrop-blur-md border-b border-slate-700 text-white p-4">
          <div className="flex flex-col gap-4">
            {/* Mobile nav items */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 hover:bg-slate-700 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-slate-700 pt-4 mt-2">
              {/* Theme toggle */}
              <div className="flex items-center justify-between px-4 py-2">
                <span className="flex items-center gap-2">
                  <SunMoon className="h-4 w-4" />
                  Theme
                </span>
                <ModeToggleMobile />
              </div>

              {/* Sign In/Out */}
              <button
                onClick={() => {
                  if (session) {
                    handleSignOut();
                  } else {
                    handleSignIn("discord");
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-700 rounded transition text-left mt-2"
              >
                <span className="flex items-center gap-2">
                  {session ? (
                    <LogOut className="h-4 w-4" />
                  ) : (
                    <KeyRound className="h-4 w-4" />
                  )}
                  {session ? "Sign Out" : "Sign In"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
