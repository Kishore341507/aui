
"use client";

import { usePathname } from "next/navigation";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // No top padding on the homepage
  const isHomePage = pathname === "/";

  return (
    <main className={isHomePage ? "" : "pt-32"}>
      {children}
    </main>
  );
}
