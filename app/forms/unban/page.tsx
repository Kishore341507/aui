// import { auth } from "@/auth"

import { Separator } from "@/components/ui/separator";

export default async function UnbanForm() {

  // const session = await auth()
  // if (!session) return (
  //   <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
  //     Not authenticated , please login from top right corner
  //   </div>
  // )

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">AUI Unban Form</h3>
          <p className="text-sm text-muted-foreground">
            Please fill out the form below to request unban
          </p>
        </div>
        <Separator />
        {/* <AccountForm /> */}
      </div>
    </div>
    </>
  )
}
