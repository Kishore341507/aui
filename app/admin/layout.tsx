import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/prisma/db";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true , role : true}
  });

  if (!user) {
    redirect("/");
  }

  // Simple admin check - you can modify this logic
  const isAdmin = user.role === 'admin' ;

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">
                Manage applications and user data
              </p>
            </div>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}
