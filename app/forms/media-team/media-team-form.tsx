"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const formSchema = z.object({
  discordUsername: z.string().min(1, "Required"),
  discordId: z.string().min(1, "Required"),
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
  const [showSignIn, setShowSignIn] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discordUsername: "",
      discordId: "",
      platform: "",
      socialHandle: "",
      contentType: "",
      familiarity: "",
      tools: "",
      examples: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (sessionStatus === "unauthenticated") {
      setShowSignIn(true);
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
    <div className="container mx-auto py-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>AUI Media Team Application</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField control={form.control} name="discordUsername" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your Discord username?</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="discordId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your Discord ID?</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="platform" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary social media platform</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
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
                    <FormLabel>Link to your social handles</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="contentType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What type of content do you specialize in?</FormLabel>
                    <FormControl><Textarea {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="familiarity" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you familiar with our server&apos;s theme?</FormLabel>
                    <FormControl><Textarea {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="tools" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What tools or software do you use?</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="examples" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Examples of previous work (links)</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Dialog open={showSignIn} onOpenChange={(open) => setShowSignIn(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
          </DialogHeader>
          <div className="py-2">You must sign in with Discord to submit this form.</div>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setShowSignIn(false)}>Close</Button>
            <Button onClick={() => signIn("discord")}>Sign In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
