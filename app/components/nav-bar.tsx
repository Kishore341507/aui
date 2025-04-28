import { Button } from "@/components/ui/button";
import { CircleUser, Settings, SunMoon, LifeBuoy, LogOut, KeyRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ServerLogo from "./server-log";
import { auth } from "@/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ModeToggleSub } from "./mode-toggle-sub";
import { signIn, signOut } from "@/auth";

export default async function NavBar() {

  const session = await auth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="mr-4 flex items-center">
          <Link href="https://discord.gg/amongusindians" className="flex items-center gap-2" target="_blank">
            <ServerLogo></ServerLogo>
            <span className="font-bold inline-block ">AUI</span>
          </Link>
          <nav className="ml-6 flex items-center gap-3 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/donate", label: "Donate" },
              { href: "/forms", label: "Forms" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="transition-colors hover:text-foreground/80">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-center items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {session ? (
                  <Image
                    src={session!.user?.image ?? ""}
                    className="w-8 h-8 rounded-full"
                    alt="profile"
                    width={32}
                    height={32}
                  />
                ) : (
                  <CircleUser className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {session ? `Hi, ${session?.user?.name}` : "Guest User!"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SunMoon className="mr-2 h-4 w-4" />
                  <span>Appearance</span>
                </DropdownMenuSubTrigger>
                <ModeToggleSub />
              </DropdownMenuSub>

              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="https://discord.gg/amongusindians" target="_blank" >Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {/* <Link href={session ? "/api/auth/signout" : "/api/auth/signin"} className="flex" >
                  {session ? (
                    <LogOut className="mr-2 h-4 w-4" />
                  ) : (
                    <KeyRound className="mr-2 h-4 w-4" />
                  )}
                  {session ? <span className="inline-span">Sign Out</span> : <span className="inline-span">Sign In</span>}
                </Link> */}
                <button className="flex" onClick={async () => {
                  'use server'
                  if (session) {
                    await signOut();
                  } else {
                    await signIn("discord");
                  }
                }}>
                  {session ? (
                    <LogOut className="mr-2 h-4 w-4" />
                  ) : (
                    <KeyRound className="mr-2 h-4 w-4" />
                  )}
                  {session ? <span className="inline-span">Sign Out</span> : <span className="inline-span">Sign In</span>}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  );
}