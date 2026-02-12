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
  reporter_username: z.string().min(3, "Your Discord username is required"),
  reporter_id: z.string().min(1, "Your Discord ID is required").regex(/^\d+$/, "Discord ID must contain only numbers"),
  moderator_name: z.string().min(3, "Moderator name required"),
  offense: z.string().min(3, "Please select an offense"),
  details: z.string().min(10, "Please provide details of the issue"),
  additional: z.string().optional(),
});

export default function StaffReportForm() {
  const router = useRouter();
  const { data } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { reporter_username: "", reporter_id: "", moderator_name: "", offense: "", details: "", additional: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/forms/staff-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await res.json();
      if (res.ok) {
        toast({ title: "Success", description: "Report submitted successfully." });
        setTimeout(() => router.push("/"), 1200);
      } else {
        throw new Error(result.message || "Failed to submit");
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to submit report.", variant: "destructive" });
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
          <h3 className="text-lg font-medium">Staff Reports</h3>
          <p className="text-sm text-muted-foreground">Please only report staff if there was a false warning or rule-breaking behavior. Your identity will remain confidential.</p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField control={form.control} name="reporter_username" render={({ field }) => (
              <FormItem>
                <FormLabel>What is your Discord username?*</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="reporter_id" render={({ field }) => (
              <FormItem>
                <FormLabel>What is your user ID?*</FormLabel>
                <FormControl>
                  <Input {...field} inputMode="numeric" pattern="\\d*" placeholder="Numeric only" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="moderator_name" render={({ field }) => (
              <FormItem>
                <FormLabel>Discord name of the Moderator*</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="offense" render={({ field }) => (
              <FormItem>
                <FormLabel>What offense did the staff make?*</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select offense" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false-warning">Gave a false warning without evidence</SelectItem>
                      <SelectItem value="breaking-rules">Breaking Server rules</SelectItem>
                      <SelectItem value="biased">Being biased towards friends</SelectItem>
                      <SelectItem value="inappropriate">Inappropriate behaviour</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="details" render={({ field }) => (
              <FormItem>
                <FormLabel>Please explain the whole issue with as many details as possible*</FormLabel>
                <FormControl><Textarea {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="additional" render={({ field }) => (
              <FormItem>
                <FormLabel>Additional comments</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div>
              <Button type="button" onClick={attemptSubmit} disabled={loading}>{loading ? (<><Loader2 className="w-4 h-4 animate-spin mr-2"/>Submitting...</>) : "Submit Report"}</Button>
            </div>
          </form>
        </Form>

        <AuthPrompt open={showAuth} setOpen={setShowAuth} />
      </div>
    </div>
  );
}
