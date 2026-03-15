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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  platform: z.string().min(1, "Required"),
  socialHandle: z.string().min(1, "Required"),
  contentType: z.string().min(1, "Required"),
  familiarity: z.string().optional(),
  tools: z.string().optional(),
  examples: z.string().optional(),
});

export default function MediaTeamForm() {
  const { status: sessionStatus } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = sessionStatus === "authenticated";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      socialHandle: "",
      contentType: "",
      familiarity: "",
      tools: "",
      examples: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isAuthenticated) {
      signIn("discord");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forms/media-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast({ title: "Submitted", description: "Media Team application sent." });
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Media Team Application</h1>
          <p className="text-muted-foreground">
            Apply to create media content and promote AUI across platforms.
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
            <FormField control={form.control} name="platform" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Primary social media platform</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-wrap gap-4 mt-2" disabled={!isAuthenticated}>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="YouTube"/> YouTube</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Instagram"/> Instagram</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Twitch"/> Twitch</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Reddit"/> Reddit</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Others"/> Others</label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

            <FormField control={form.control} name="socialHandle" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Link to your social handles</FormLabel>
                <FormControl><Input {...field} disabled={!isAuthenticated} placeholder="https://..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="contentType" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">What type of content do you specialize in?</FormLabel>
                <FormControl><Textarea {...field} disabled={!isAuthenticated} placeholder="Video editing, graphic design, streaming..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="familiarity" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Are you familiar with our server&apos;s theme?</FormLabel>
                <FormControl><Textarea {...field} disabled={!isAuthenticated} placeholder="Tell us what you know about AUI..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="tools" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">What tools or software do you use?</FormLabel>
                <FormControl><Input {...field} disabled={!isAuthenticated} placeholder="Photoshop, Premiere Pro, OBS..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="examples" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Examples of previous work (links)</FormLabel>
                <FormControl><Input {...field} disabled={!isAuthenticated} placeholder="Portfolio or content links" /></FormControl>
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
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
