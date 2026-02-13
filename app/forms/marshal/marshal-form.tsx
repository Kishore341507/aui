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
  game: z.string().min(1, "Please select a game"),
  activeTimes: z.string().min(1, "Active timings required"),
  dedicateTime: z.string().min(1, "Please enter how much time you can dedicate"),
  botExperience: z.string().min(1, "Please select an option"),
  reason: z.string().min(4, "Please provide a reason"),
});

export default function MarshalForm() {
  const { status: sessionStatus } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      game: "",
      activeTimes: "",
      dedicateTime: "",
      botExperience: "",
      reason: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (sessionStatus === "unauthenticated") {
      setShowSignIn(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forms/marshal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast({ title: "Submitted", description: "Marshal application sent." });
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
              <CardTitle>Marshal Recruitment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Which game do you play regularly on the server?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Valorant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="activeTimes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are your active timings on the server?</FormLabel>
                      <FormControl>
                        <Input placeholder="Answer here.." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dedicateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How much time can you dedicate as a Marshal?</FormLabel>
                      <FormControl>
                        <Input placeholder="Answer here.." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="botExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you know how to use Discord Bots?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                          <label className="inline-flex items-center gap-2">
                            <RadioGroupItem value="Yes" /> Yes
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <RadioGroupItem value="No" /> No
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <RadioGroupItem value="Maybe" /> Maybe
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to become a Marshal?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Answer here.." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
