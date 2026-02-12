"use client";

import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  ban_reason: z.string().nonempty({
    message: "Ban reason is required.",
  }),
  why_unban: z.string().nonempty({
    message: "Why do you want to get unbanned?",
  }),
  extra: z.string()
})

export default function UnbanForm() {
  const router = useRouter();
  const { data } = useSession();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ban_reason: "",
      why_unban: "",
      extra: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await fetch('/api/forms/unban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your unban request has been submitted successfully.",
        });
        
        // Redirect to Discord server after a delay
        setTimeout(() => {
          router.push('https://discord.gg/XHQhJ99fnm');
        }, 2000);
      } else {
        throw new Error(result.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  // Allow guests to fill the form. They must sign in to submit. We show a sign-in CTA at submit time.

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">AUI Unban Form</h3>
            <p className="text-sm text-muted-foreground">
              Please fill out the form below to request unban
            </p>
          </div>
          <Separator />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="ban_reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why did you got banned?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Toxicity Doxing etc" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide the reason for your ban.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="why_unban"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you believe your appeal should be accepted?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter reason here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="extra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is there anything else you would like us to know?</FormLabel>
                    <FormControl>
                      <Textarea  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {data ? (
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Submit Unban Request"
                  )}
                </Button>
              ) : (
                <Button onClick={() => signIn('discord')}>
                  Sign in with Discord to submit
                </Button>
              )}
            </form>
          </Form>

        </div>
      </div>
    </>
  )
}
