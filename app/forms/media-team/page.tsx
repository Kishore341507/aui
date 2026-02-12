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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import AuthPrompt from "@/components/auth-prompt";

const schema = z.object({
  discordUsername: z.string().min(1, "Discord username required"),
  discordId: z.string().min(1, "Discord ID required").regex(/^\d+$/, "Discord ID must contain only numbers"),
  platform: z.enum(["YouTube","Instagram","Twitch","Reddit","Others"]),
  handles: z.string().min(1, "Please provide links"),
  contentType: z.string().min(3, "Please indicate content type"),
  serverFamiliarity: z.string().min(3, "Please describe how your content fits"),
  tools: z.string().optional(),
  experience: z.string().optional(),
});

export default function MediaTeamForm() {
  const router = useRouter();
  const { data } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { discordUsername: "", discordId: "", platform: "YouTube", handles: "", contentType: "", serverFamiliarity: "", tools: "", experience: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/forms/media-team", {
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
          <h3 className="text-lg font-medium">AUI Media Team Application</h3>
          <p className="text-sm text-muted-foreground">Join the media team—create videos and content that promote AUI.</p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField control={form.control} name="discordUsername" render={({ field }) => (
              <FormItem>
                <FormLabel>What is your Discord username?*</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="discordId" render={({ field }) => (
              <FormItem>
                <FormLabel>What is your Discord ID?*</FormLabel>
                <FormControl>
                  <Input {...field} inputMode="numeric" pattern="\\d*" placeholder="Numeric only" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="platform" render={({ field }) => (
              <FormItem>
                <FormLabel>Please indicate your primary social platform*</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Twitch">Twitch</SelectItem>
                      <SelectItem value="Reddit">Reddit</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="handles" render={({ field }) => (
              <FormItem>
                <FormLabel>Link to your social handles*</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="contentType" render={({ field }) => (
              <FormItem>
                <FormLabel>1. What type of content do you specialize in?*</FormLabel>
                <FormControl><Textarea {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="serverFamiliarity" render={({ field }) => (
              <FormItem>
                <FormLabel>2. Are you familiar with our server's theme?*</FormLabel>
                <FormControl><Textarea {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="tools" render={({ field }) => (
              <FormItem>
                <FormLabel>3. What tools/software do you use?</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="experience" render={({ field }) => (
              <FormItem>
                <FormLabel>4. Can you share examples of previous work?*</FormLabel>
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
