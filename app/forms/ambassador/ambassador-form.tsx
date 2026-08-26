"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  ambassadorFor: z.string().min(1, "This field is required"),
  activityLevel: z.string().min(1, "This field is required"),
  timeDedication: z.string().min(1, "This field is required"),
  leadershipExperience: z.string().min(1, "This field is required"),
  motivation: z.string().min(1, "This field is required"),
});

export default function AmbassadorForm() {
  const { status: sessionStatus } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = sessionStatus === "authenticated";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ambassadorFor: "",
      activityLevel: "",
      timeDedication: "",
      leadershipExperience: "",
      motivation: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isAuthenticated) {
      signIn("discord");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forms/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast({ title: "Submitted", description: "Ambassador application sent." });
        setTimeout(() => router.push("/"), 500);
      } else {
        toast({ title: "Error", description: "Failed to submit.", variant: "destructive" });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Unexpected error.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Ambassador Recruitment</h1>
          <p className="text-muted-foreground">
            Apply to become an Ambassador and represent our server within your community.
          </p>
        </div>

        {/* Login Alert */}
        {!isAuthenticated && (
          <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
            <div className="flex items-center gap-4 w-full">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <AlertDescription className="text-blue-800 dark:text-blue-200 flex items-center justify-between flex-1">
                <span>Please login with Discord to submit an application</span>
                <Button
                  onClick={() => signIn("discord")}
                  size="sm"
                  className="ml-4 shrink-0"
                >
                  Login to Discord
                </Button>
              </AlertDescription>
            </div>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField control={form.control} name="ambassadorFor" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">What would you like to become an Ambassador for?</FormLabel>
                <FormControl><Input {...field} disabled={!isAuthenticated} placeholder="e.g. Gaming, a specific game, community, interest, etc." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="activityLevel" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">How active are you in this community?</FormLabel>
                <FormControl><Input {...field} disabled={!isAuthenticated} placeholder="e.g. Daily, 3–4 days a week, occasionally" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="timeDedication" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">How much time can you dedicate as an Ambassador?</FormLabel>
                <FormControl><Input {...field} disabled={!isAuthenticated} placeholder="e.g. 1–2 hours daily" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="leadershipExperience" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Please describe any past leadership experience you feel is relevant?</FormLabel>
                <FormControl><Input {...field} disabled={!isAuthenticated} placeholder="e.g. Hosted a Valo Event in XYZ server" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="motivation" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Why do you want to become an Ambassador?</FormLabel>
                <FormControl><Textarea {...field} disabled={!isAuthenticated} placeholder="Tell us why you want to represent AUI..." className="min-h-[120px]" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Submit Button */}
            <div className="pt-4 flex justify-end border-t">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !isAuthenticated}
                className="min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
