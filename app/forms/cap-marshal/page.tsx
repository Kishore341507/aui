"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AuthPrompt from "@/components/auth-prompt";

const schema = z.object({
  game: z.string().min(1, "Please select a game"),
  activeTimings: z.string().min(1, "Active timings are required"),
  dedication: z.string().min(1, "Please indicate how much time you can dedicate"),
  knowBots: z.enum(["yes", "no", "maybe"]),
  why: z.string().min(10, "Please provide a reason (min 10 chars)"),
});

export default function CapMarshalForm() {
  const router = useRouter();
  const { data } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { game: "", activeTimings: "", dedication: "", knowBots: "no", why: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/forms/cap-marshal", {
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

  // Called when user attempts to submit
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
          <h3 className="text-lg font-medium">Marshal Recruitment</h3>
          <p className="text-sm text-muted-foreground">To become a Marshal you need a dedicated role and regular activity during active gaming VC hours.</p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="game"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1. Which game do you play regularly on the server?*</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a game" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Among Us","Codenames","Cambio","Taboo","Monopoly","Skribbl","Stumble Guys","Chess","SmashKarts","Brawlhalla","Valorant","GTA V","Minecraft","BGMI"
                        ].map((g) => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activeTimings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2. What are your active timings on the server?*</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer here.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dedication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>3. How much time can you dedicate as a Marshal?*</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer here.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="knowBots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>4. Do you know how to use Discord Bots?*</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="rb-yes"/><label htmlFor="rb-yes">Yes</label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="rb-no"/><label htmlFor="rb-no">No</label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="maybe" id="rb-maybe"/><label htmlFor="rb-maybe">Maybe</label></div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="why"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>5. Why do you want to become a Marshal?*</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button type="button" onClick={attemptSubmit} disabled={loading}>
                {loading ? (<><Loader2 className="w-4 h-4 animate-spin mr-2"/>Submitting...</>) : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>

        <AuthPrompt open={showAuth} setOpen={setShowAuth} />
      </div>
    </div>
  );
}
