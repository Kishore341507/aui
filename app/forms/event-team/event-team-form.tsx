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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  availableEvenings: z.string().min(1, "Select availability"),
  weeklyHours: z.string().min(1, "Enter hours"),
  voiceCalls: z.string().min(1, "Select option"),
  device: z.string().min(1, "Select device"),
  games: z.string().optional(),
});

export default function EventTeamForm() {
  const { status: sessionStatus } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = sessionStatus === "authenticated";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availableEvenings: "",
      weeklyHours: "",
      voiceCalls: "",
      device: "",
      games: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isAuthenticated) {
      signIn("discord");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forms/event-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast({ title: "Submitted", description: "Event Team application sent." });
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
      {/* Login Alert */}
      {!isAuthenticated && (
        <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 max-w-2xl mx-auto">
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
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>AUI Events Team Recruitment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField control={form.control} name="availableEvenings" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you available to work evenings and weekends?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4" disabled={!isAuthenticated}>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Yes"/> Yes</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="No"/> No</label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="weeklyHours" render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much time can you dedicate each week?</FormLabel>
                    <FormControl><Input {...field} disabled={!isAuthenticated} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="voiceCalls" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you available for occasional voice calls?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4" disabled={!isAuthenticated}>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Yes"/> Yes</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="No"/> No</label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="device" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you use Discord on Mobile or PC?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4" disabled={!isAuthenticated}>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Mobile"/> Mobile</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="PC"/> PC</label>
                        <label className="inline-flex items-center gap-2"><RadioGroupItem value="Both"/> Both</label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="games" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which games do you play regularly?</FormLabel>
                    <FormControl><Input {...field} disabled={!isAuthenticated} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !isAuthenticated}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
