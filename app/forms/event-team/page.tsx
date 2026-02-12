"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AuthPrompt from "@/components/auth-prompt";

const schema = z.object({
  discordUsername: z.string().min(3, "Discord username required"),
  discordId: z.string().min(1, "Discord ID required").regex(/^\d+$/, "Discord ID must contain only numbers"),
  eveningsWeekends: z.enum(["yes","no"]),
  timePerWeek: z.string().min(1, "Please specify"),
  voiceCalls: z.enum(["yes","no"]),
  device: z.enum(["Mobile","PC","Both"]),
  games: z.string().optional(),
});

export default function EventTeamForm() {
  const router = useRouter();
  const { data } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { discordUsername: "", discordId: "", eveningsWeekends: "yes", timePerWeek: "", voiceCalls: "yes", device: "Both", games: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/forms/event-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (res.ok) {
        toast({ title: "Success", description: "Application submitted successfully." });
        setTimeout(() => router.push("/"), 1200);
      } else {
        throw new Error(result.message || "Failed to submit");
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to submit application.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const attemptSubmit = () => {
    if (data) {
      form.handleSubmit(onSubmit)();
    } else {
      setShowAuth(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <h3 className="text-lg font-medium">AUI Events Team Recruitment</h3>
          <p className="text-sm text-muted-foreground">Plan and coordinate events; promote the server with staff members.</p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField control={form.control} name="discordUsername" render={({ field }) => (
              <FormItem>
                <FormLabel>Your Discord Username *</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="discordId" render={({ field }) => (
              <FormItem>
                <FormLabel>Your Discord User ID *</FormLabel>
                <FormControl>
                  <Input {...field} inputMode="numeric" pattern="\\d*" placeholder="Numeric only" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="eveningsWeekends" render={({ field }) => (
              <FormItem>
                <FormLabel>1. Are you available to work evenings and weekends as needed? *</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="ev-yes"/><label htmlFor="ev-yes">Yes</label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="ev-no"/><label htmlFor="ev-no">No</label></div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="timePerWeek" render={({ field }) => (
              <FormItem>
                <FormLabel>2. How much time are you able to dedicate each week? *</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="voiceCalls" render={({ field }) => (
              <FormItem>
                <FormLabel>3. Are you available for occasional voice calls? *</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="vc-yes"/><label htmlFor="vc-yes">Yes</label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="vc-no"/><label htmlFor="vc-no">No</label></div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="device" render={({ field }) => (
              <FormItem>
                <FormLabel>4. Do you use discord on a Mobile or PC? *</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="games" render={({ field }) => (
              <FormItem>
                <FormLabel>5. Which games do you play regularly?</FormLabel>
                <FormControl><Textarea {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div>
              <Button type="button" onClick={attemptSubmit} disabled={loading}>{loading ? (<><Loader2 className="w-4 h-4 animate-spin mr-2"/>Submitting...</>) : "Submit Application"}</Button>
            </div>
          </form>
        </Form>

        <AuthPrompt open={showAuth} setOpen={setShowAuth} />
      </div>
    </div>
  );
}
