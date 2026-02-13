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
  reporterUsername: z.string().min(1, "Required"),
  reporterId: z.string().min(1, "Required"),
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
  const [showSignIn, setShowSignIn] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reporterUsername: "",
      reporterId: "",
      moderatorName: "",
      offense: "",
      description: "",
      additional: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (sessionStatus === "unauthenticated") {
      setShowSignIn(true);
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
    <div className="container mx-auto py-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Staff Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField control={form.control} name="reporterUsername" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your Discord username?</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="reporterId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your user ID?</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="moderatorName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discord name of the Moderator</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="offense" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What offense did the staff make?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col gap-2">
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="False warning"/> Gave me a false warning without any discussion/evidence</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Breaking rules"/> Breaking Server rules</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Bias"/> Being biased towards friends</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Inappropriate"/> Inappropriate behaviour</label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please explain the whole issue with as many details as possible</FormLabel>
                    <FormControl><Textarea {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="additional" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional comments?</FormLabel>
                    <FormControl><Textarea {...field} /></FormControl>
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
