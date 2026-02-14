"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { UserSearch } from "@/components/user-search";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  moderatorName: z.string().min(1, "Required"),
  offense: z.string().min(1, "Required"),
  description: z.string().min(10, "Please provide details"),
  additional: z.string().optional(),
});

export default function StaffReportForm() {
  const { status: sessionStatus } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isAuthenticated = sessionStatus === "authenticated";
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moderatorName: "",
      offense: "",
      description: "",
      additional: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isAuthenticated) {
      signIn("discord");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forms/staff-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast({ title: "Submitted", description: "Staff report received." });
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Staff Report</h1>
          <p className="text-muted-foreground">
            Submit a formal report regarding staff member conduct
          </p>
        </div>

        {/* Login Alert */}
        {!isAuthenticated && (
          <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
            <div className="flex items-center gap-4 w-full">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <AlertDescription className="text-blue-800 dark:text-blue-200 flex items-center justify-between flex-1">
                <span>Please login with Discord to submit a staff report</span>
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

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField 
              control={form.control} 
              name="moderatorName" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Discord name of the Moderator
                  </FormLabel>
                  <FormControl>
                    <UserSearch 
                      onSelect={(user) => field.onChange(`${user.username} (${user.id})`)} 
                      label={field.value || "Select moderator..."}
                      disabled={!isAuthenticated}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />

            <FormField 
              control={form.control} 
              name="offense" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    What offense did the staff make?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      value={field.value} 
                      className="flex flex-col gap-3 mt-2"
                      disabled={!isAuthenticated}
                    >
                      <label className={`inline-flex items-center gap-2 ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                        <RadioGroupItem value="False warning" disabled={!isAuthenticated} />
                        <span>Gave me a false warning without any discussion/evidence</span>
                      </label>
                      <label className={`inline-flex items-center gap-2 ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                        <RadioGroupItem value="Breaking rules" disabled={!isAuthenticated} />
                        <span>Breaking Server rules</span>
                      </label>
                      <label className={`inline-flex items-center gap-2 ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                        <RadioGroupItem value="Bias" disabled={!isAuthenticated} />
                        <span>Being biased towards friends</span>
                      </label>
                      <label className={`inline-flex items-center gap-2 ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                        <RadioGroupItem value="Inappropriate" disabled={!isAuthenticated} />
                        <span>Inappropriate behaviour</span>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />

            <FormField 
              control={form.control} 
              name="description" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Please explain the whole issue with as many details as possible
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={6} 
                      disabled={!isAuthenticated}
                      placeholder="Provide a detailed explanation of the incident..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />

            <FormField 
              control={form.control} 
              name="additional" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Additional comments?
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={4} 
                      disabled={!isAuthenticated}
                      placeholder="Any additional information you'd like to share..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />

            {/* Submit Button */}
            <div className="pt-4 flex justify-end border-t">
              <Button 
                type="submit" 
                size="lg"
                disabled={isSubmitting || !isAuthenticated}
                className="min-w-[200px]"
              >
                {isSubmitting 
                  ? "Submitting..." 
                  : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
