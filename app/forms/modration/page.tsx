"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Card,
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, Loader2, Info, AlertTriangle, Shield } from "lucide-react";

// Banner component
const Banner = () => (
  <Image
    src="/mod-form-banner.png"
    alt="Staff Application Banner"
    width={800}
    height={200}
    className="rounded-t-xl w-full object-cover"
  />
);

// Form validation schema
const formSchema = z.object({
  understand: z.boolean().refine((val) => val === true, {
    message: "You must read and understand the responsibilities",
  }),
  country: z.string().min(1, "Country is required"),
  contributionTime: z.string().min(1, "Contribution time is required"),
  age: z.string().min(1, "Age is required"),
  moderationDefinition: z.string().min(10, "Please provide a detailed answer (minimum 10 characters)"),
  pastExperience: z.string().min(10, "Please provide a detailed answer (minimum 10 characters)"),
  voiceChat: z.string().min(1, "Please select an option"),
  aboutYourself: z.string().optional(),
  serverImprovement: z.string().min(10, "Please provide a detailed answer (minimum 10 characters)"),
  serviceDuration: z.string().min(10, "Please provide a detailed answer (minimum 10 characters)"),
  staffViolation: z.string().min(10, "Please provide a detailed answer (minimum 10 characters)"),
  botExperience: z.string().min(1, "Please select an option"),
  argumentScenario: z.string().min(10, "Please provide a detailed answer (minimum 10 characters)"),
  otherServerExperience: z.string().min(10, "Please provide a detailed answer (minimum 10 characters)"),
  whyQualified: z.string().min(10, "Please provide a detailed answer (minimum 10 characters)"),
});

export default function Page() {
  const { status: sessionStatus } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  // State for multi-step form
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      understand: false,
      country: "",
      contributionTime: "",
      age: "",
      moderationDefinition: "",
      pastExperience: "",
      voiceChat: "",
      aboutYourself: "",
      serverImprovement: "",
      serviceDuration: "",
      staffViolation: "",
      botExperience: "",
      argumentScenario: "",
      otherServerExperience: "",
      whyQualified: "",
    },
  });

  // Scroll to top on step change
  useEffect(() => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  // Handler for form submission
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/forms/modration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({ 
          title: "Application submitted", 
          description: "Your staff application has been submitted successfully." 
        });
        // Redirect to home page after successful submission
        setTimeout(() => {
          router.push("/");
        }, 1);
      } else {
        toast({ 
          title: "Submission failed", 
          description: "There was an error submitting your application.", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({ 
        title: "Submission error", 
        description: "An unexpected error occurred.", 
        variant: "destructive" 
      });
    } finally {
    //   setIsSubmitting(false);
    }
  };

  // Form steps using shadcn form components
  const getFormStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CardContent key="step1" className="p-0">
            <Banner />
            <div className="p-6 pt-0">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">Among Us India Staff Applications</CardTitle>
                <CardDescription className="text-center text-gray-400">
                  Welcome! We appreciate your interest in joining our moderation team.
                </CardDescription>
              </CardHeader>
              <div className="space-y-6 text-white">
                {/* Important Information Alert */}
                <Alert className="bg-blue-950/30 border-blue-400/30 backdrop-blur-sm">
                  <Info className="h-5 w-5 text-blue-400" />
                  <AlertTitle className="text-blue-200 text-lg font-semibold mb-3">
                    Important Information
                  </AlertTitle>
                  <AlertDescription>
                    <div className="space-y-3">
                      {[
                        "Please ensure you are genuinely interested in a staff position before applying.",
                        "Complete the application accurately and thoroughly.",
                        "Experience is valued, but not required. We encourage all interested candidates to apply.",
                        "We are looking for serious applicants dedicated to contributing to our community.",
                        "This is a volunteer role, and there is no monetary compensation.",
                      ].map((text, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <CheckCircle2 className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                          <p className="text-blue-100 text-sm leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Warning Alert */}
                <Alert className="bg-amber-950/40 border-amber-400/40 backdrop-blur-sm">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <AlertTitle className="text-amber-200 text-lg font-semibold">
                    Please Read Carefully
                  </AlertTitle>
                  <AlertDescription>
                    <div className="space-y-4">
                      <p className="text-amber-100 text-sm leading-relaxed">
                        This is a volunteer moderator position. Your role will involve handling highly graphic content (images and text), including but not limited to violence, self-harm, and hate speech. Moderators may also face threats and harassment.
                      </p>
                      <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-600/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="h-4 w-4 text-amber-300" />
                          <span className="text-amber-200 font-medium text-sm">This requires:</span>
                        </div>
                        <ul className="text-amber-100 text-xs space-y-1 ml-6 list-disc">
                          <li>Maturity and emotional resilience</li>
                          <li>Ability to handle disturbing content</li>
                          <li>Commitment to community safety</li>
                        </ul>
                      </div>
                      <p className="text-amber-100 text-sm italic">
                        While challenging, this can be a rewarding experience for those dedicated to maintaining a safe community.
                      </p>
                      <FormField
                        control={form.control}
                        name="understand"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0 mt-4 p-3 bg-amber-900/20 rounded-lg border border-amber-600/20">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="border-amber-400 data-[state=checked]:bg-amber-500 data-[state=checked]:text-amber-950"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium text-amber-100 cursor-pointer">
                                I have read and understood the responsibilities of this role.
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        );

      case 1:
        return (
          <CardContent key="step2" className="p-0">
            <Banner />
            <div className="p-6 pt-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Staff Applications</CardTitle>
              </CardHeader>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What country do you currently reside in?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contributionTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your suitable time to contribute to the server?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 8 PM - 11 PM IST" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your age?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 18" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="moderationDefinition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe in your own words what it means to be a moderator and what moderation entails?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your detailed answer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pastExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please describe any past moderation or leadership experience you feel is relevant?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your detailed answer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="voiceChat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are you able to regularly voice chat?</FormLabel>
                      <FormDescription>
                        We regularly hold meetings through VC discussing moderation and often have our training sessions done via voice chat.
                      </FormDescription>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="rounded-lg p-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="vc-yes" />
                            <Label htmlFor="vc-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="vc-no" />
                            <Label htmlFor="vc-no">No</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="listen-only" id="vc-listen" />
                            <Label htmlFor="vc-listen">Listen in only (muted)</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aboutYourself"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell us about yourself, if you&apos;d like!</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your answer (optional, but helps us know you better!)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serverImprovement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is something you would like to see improved within the server?</FormLabel>
                      <FormDescription>
                        This could be something in our rules, the channels, roles, bots etc.
                      </FormDescription>
                      <FormControl>
                        <Textarea placeholder="Your detailed answer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serviceDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>For how long will you be able to provide service in moderation before taking any sort of major break or completely step down?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 6 months, 1 year, indefinitely" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        );

      case 2:
        return (
          <CardContent key="step3" className="p-0">
            <Banner />
            <div className="p-6 pt-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Moderation Scenarios</CardTitle>
                <CardDescription className="text-center">
                  For the following scenarios, describe what action you would take. You can decide that no action should be taken or decide that a user should be warned, temporarily muted, temporarily banned, or permanently banned. Don&apos;t overthink these. The goal is to see your thought process more than which you choose.
                </CardDescription>
              </CardHeader>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="staffViolation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>If a staff member above you or alongside you, is violating the rules what do you do in that situation?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your detailed answer" {...field} />
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
                      <FormLabel>How experienced are you with using Discord bots?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="px-6 rounded-lg p-2"
                        >
                          <div className="flex justify-between">
                            <Label>Very Poor</Label>
                            <Label>Very Familiar</Label>
                          </div>
                          <div className="flex items-center justify-between space-x-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <div key={value} className="flex flex-col items-center space-y-1">
                                <Label htmlFor={`bot-xp-${value}`}>{value}</Label>
                                <RadioGroupItem value={String(value)} id={`bot-xp-${value}`} />
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="argumentScenario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two members are arguing in a public chatroom. What do you do? Please list all steps.</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your detailed answer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="otherServerExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your experience moderating other Discord servers?</FormLabel>
                      <FormDescription>
                        Include your level of authority (e.g. helper/mod/admin) and an approximate number of people on the server(s). Be sure to describe your activities as a moderator in detail. Please leave an invite to the server(s) in question if you can. Type &quot;none&quot; if you have no moderation experience on other discord servers
                      </FormDescription>
                      <FormControl>
                        <Textarea placeholder="Your detailed answer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whyQualified"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you feel qualified for/want to be on the server moderation team?</FormLabel>
                      <FormDescription>
                        What makes you a good candidate for moderator overall? How much experience do you have with the game? What is motivating you to fill out this form right now?
                      </FormDescription>
                      <FormControl>
                        <Textarea placeholder="Your detailed answer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        );

      default:
        return null;
    }
  };

  // Validation for each step
  const validateStep = async (step: number) => {
    const fieldsForStep: { [key: number]: (keyof z.infer<typeof formSchema>)[] } = {
      0: ["understand"],
      1: ["country", "contributionTime", "age", "moderationDefinition", "pastExperience", "voiceChat", "serverImprovement", "serviceDuration"],
      2: ["staffViolation", "botExperience", "argumentScenario", "otherServerExperience", "whyQualified"],
    };

    const fieldsToValidate = fieldsForStep[step];
    if (!fieldsToValidate) return true;

    const isValid = await form.trigger(fieldsToValidate);
    return isValid;
  };

  // Multi-step navigation functions
  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 2) {
      setCurrentStep(step => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  // Render loading state
  if (sessionStatus === "loading") {
    return (
      <div className="min-h-screen bg-black bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  // Render unauthenticated state
  if (sessionStatus === "unauthenticated") {
    return (
      <div className="min-h-screen bg-black bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto py-12 flex flex-col items-center justify-center h-screen">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-gray-200/20 shadow-lg p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Authentication Required</CardTitle>
              <CardDescription className="text-center">
                Please sign in with Discord to access the staff application.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={() => signIn("discord")}>Sign In with Discord</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Render the main form
  return (
    // <div className="min-h-screen bg-black bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <div >
      <div className="container mx-auto py-12"> 
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Card ref={formContainerRef} className="w-full max-w-2xl mx-auto bg-transparent backdrop-blur-sm border-gray-200/20 shadow-lg border-0">
              {getFormStep(currentStep)}
              <CardFooter className="flex justify-between items-center mt-4">
                <div>
                  {currentStep > 0 && (
                    <Button onClick={prevStep} variant="ghost" type="button">
                      Go Back
                    </Button>
                  )}
                </div>
                <div>
                  {currentStep < 2 && (
                    <Button onClick={nextStep} type="button">
                      Next
                    </Button>
                  )}
                  {currentStep === 2 && (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
