"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CustomRadioGroup from "@/app/components/custom-radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ScanSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import countries from "@/data/countries.json";
import { Button } from "@/components/ui/button";

// import { Loader2 } from "lucide-react";

const formSchema = z.object({
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, "Minimum age is 18"),
  country: z.object({
    name: z.string(),
    flag: z.string(),
    code: z.string(),
  }),
  past_experience: z.string(),
  experience_bots: z.number().min(0).max(5),
  tell_us_about_yourself: z.string().optional(),
  suitable_time: z.string(),
  describe_moderation: z.string(),
  moderation_qualifications: z.string(),
  arguing_members: z.string(),
  improve_server: z.string(),
  step_down_break: z.string(),
  staff_above_violating: z.string(),
  voiceChat: z.enum(["yes", "no", "sometimes"]),
});

export default function UnbanForm() {
  const router = useRouter();
  const { data } = useSession();
  const { toast } = useToast()

  // const [loading, setLoading] = useState(false);
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(0);

  // const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    flag: string;
    code: string;
  } | null>({
    name: "India",
    flag: "https://flagcdn.com/w320/in.png",
    code: "IN",
  });

  // Filter countries based on user input
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleClear = () => {
    setSelectedCountry(null);
    setQuery("");
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleError = (error: { message: string }) => {
    // toast
    toast({
      title: "Encountered An Error While Submitting The Form",
      description: error.message,
      variant: "destructive",
    });
  }

  // Handle input change
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  // }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 18,
      country: {name: "India", flag: "https://flagcdn.com/w320/in.png", code: "IN"},
      past_experience: "",
      experience_bots: 0,
      tell_us_about_yourself: "",
      suitable_time: "",
      improve_server: "",
      step_down_break: "",
      staff_above_violating: "",
      voiceChat: "yes",
    },
  });

  const voiceChatOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "sometimes", label: "Listen in only (muted)" },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setLoading(true);
    console.log(values);
    handleError({
      message: "This form is currently closed for applications. Please check back later.",
    });
    // setLoading(false);

    setTimeout(() => {
      router.push("https://discord.gg/XHQhJ99fnm");
    }, 2000);
  }

  if (!data)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        Not authenticated , please login from top right corner
      </div>
    );

  return (
    <>
      <div className="container w-full mx-auto mt-8 px-4">
        <div>
          <div className="p-8 py-6 space-y-4 bg-card text-center w-full rounded-xl border border-muted-foreground">
            <h1 className="text-2xl font-bold">Mod application form</h1>
            <p className="text-sm text-muted-foreground">
              Help Us Keep the Community Safe & Engaging
            </p>
          </div>
          <Separator />
          {currentStep !== 0 && (
          <div className="flex flex-col px-8 py-6 max-w-2xl mx-auto bg-card text-left rounded-xl border border-muted-foreground mt-4 mb-4">
            <Image
              src={data?.user?.image || ""}
              alt="avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="space-y-1">
              <h2 className="text-lg font-bold">{data?.user?.name}</h2>
              <p className="text-sm text-muted-foreground">
                {data?.user?.email}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Discord ID: {data?.user?.id}</p>
            </div>
          </div>
          )}
        </div>
        {currentStep === 0 && (
  <div className="flex flex-col items-center mt-4 w-full gap-6 text-left px-4 md:px-12 mb-6">
    <h3 className="text-2xl font-bold text-center">⚠️ Notice for Applicants</h3>
    
    <div className="bg-yellow-100 text-yellow-900 p-4 rounded-md border border-yellow-300 shadow-sm w-full max-w-3xl">
      <p className="mb-3">
        The moderator position is a <strong>volunteer role</strong>, and you will <strong>not be financially compensated</strong> for your time or efforts.
      </p>
      <p className="mb-3">
        Moderation on this server can involve the removal of <strong>graphic, disturbing, and potentially illegal content</strong> in both image and text form. This includes, but is not limited to:
      </p>
      <ul className="list-disc list-inside mb-3">
        <li>Dead bodies</li>
        <li>Suicides</li>
        <li>Self-harm</li>
        <li>Sexual assault</li>
        <li>Child sexual abuse material (CSAM)</li>
      </ul>
      <p className="mb-3">
        Additionally, moderators may be subject to <strong>harassment or threats of violence</strong> on Discord or other platforms. This is <strong>not a casual or status-driven position</strong>—it is a <strong>serious responsibility</strong> that demands emotional strength, discretion, and professionalism.
      </p>
      <p className="mb-0">
        While fulfilling, the position is often mentally and emotionally challenging. Please ensure you are ready to commit to the responsibilities that come with it.
      </p>
    </div>

    <div className="w-full max-w-3xl mt-4">
      <h4 className="text-xl font-semibold mb-4">📝 Self-Declaration and Data Consent</h4>
      <p className="mb-3">
        I, <strong>{data?.user?.name}</strong>, holding the Discord ID <strong>{data?.user?.id}</strong> and email address <strong>{data?.user?.email}</strong>, hereby declare the following:
      </p>
      <ul className="list-disc list-inside mb-3 space-y-2">
        <li>I acknowledge that this is a volunteer position with no monetary compensation.</li>
        <li>I understand that I may be exposed to extremely graphic and disturbing content.</li>
        <li>I accept the risk of potential threats or harassment as part of the role.</li>
        <li>I understand that this role demands professionalism, maturity, and emotional resilience.</li>
        <li>I will act responsibly with any sensitive information I may access.</li>
        <li>
          I give consent for the collection and processing of my personal data (name, email, Discord ID, etc.)
          solely for evaluating and managing this application, in compliance with privacy policies.
        </li>
      </ul>
      <p className="mt-3">
        By continuing this application, I confirm that I have read, understood, and agreed to all of the above.
      </p>
    </div>
    <div className="flex items-center justify-center mt-4 w-full">
      <button
        onClick={handleNext}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Proceed to Application Form
      </button>
    </div>
  </div>
)}

{currentStep !== 0 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-8 py-6 mx-auto max-w-2xl bg-card text-left rounded-xl border border-muted-foreground mb-4"
          >
            {currentStep === 1 && (
              <>
              <div className="flex flex-col mb-4">
                <h3 className="text-lg font-bold">
                  Personal Info and Experience
                </h3>
                <p className="text-sm text-muted-foreground">
                  This section helps us get a better understanding of who you
                  are — your basic details, background, and any relevant
                  experience you bring to the table.
                </p>
              </div>
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your age?</FormLabel>
                        <FormDescription>
                        Applicants must be 18 years of age or older to apply.{" "}
                        <span className="text-red-500">
                          Form will be auto rejected if you are under 18.
                        </span>
                        </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your age"
                          min="18"
                          className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        What country do you currently reside in?
                      </FormLabel>
                      <FormDescription>
                        This is to ensure that you are in a timezone that is
                        suitable for the server.
                      </FormDescription>
                      <FormControl>
                        <div className="relative w-full max-w-xs">
                          {/* Container around the input for the icon and text */}
                          <div className="relative w-full">
                            {/* search icon */}
                            {!selectedCountry && (
                            <ScanSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-100" />
                            )}

                            <Input
                              type="text"
                              placeholder="Type your country name..."
                              required
                              value={
                                selectedCountry ? selectedCountry.name : query
                              }
                              onChange={(e) => setQuery(e.target.value)}
                              className="w-full px-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-[#7289da] bg-background"
                              readOnly={!!selectedCountry}
                            />

                            {selectedCountry && (
                              <>
                              <Image
                                src={selectedCountry.flag}
                                alt={selectedCountry.name}
                                width={24}
                                height={16}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-4"
                              />
                              <button
                              onClick={handleClear}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-red-500"
                            >
                              ×
                            </button>
                            </>
                            )}
                          </div>

                          {/* Popover (Dropdown) */}
                          {query &&
                            !selectedCountry &&
                            filteredCountries.length > 0 && (
                              <div className="absolute z-10 w-full mt-1 bg-[#2f3136] rounded-md shadow-lg max-h-60 overflow-auto">
                                {filteredCountries.map((country) => (
                                  <div
                                    key={country.code}
                                    className="flex items-center p-2 hover:bg-[#3a3e44] cursor-pointer"
                                    onClick={() => {
                                      setSelectedCountry(country);
                                      setQuery("");
                                    }}
                                  >
                                    <Image
                                      src={country.flag}
                                      alt={country.name}
                                      width={24}
                                      height={16}
                                      className="w-6 h-4 mr-2"
                                    />
                                    <span className="text-white">
                                      {country.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="past_experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What is your experience moderating other Discord
                        servers? Also describe any past leadership
                        experience you feel is relevant.
                      </FormLabel>
                      <FormDescription>
                        Include your level of authority (e.g. helper/mod/admin)
                        and an approximate number of people on the server(s). Be
                        sure to describe your activities as a moderator in
                        detail. Please leave an invite to the server(s) in
                        question if you can. Type &quot;none&quot; if you have
                        no moderation experience on other discord servers Your
                        answer
                      </FormDescription>
                      <FormControl>
                        <Textarea className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience_bots"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        How experienced are you with using Discord bots?
                      </FormLabel>
                        <FormDescription className="text-sm text-muted-foreground">
                        Please rate your level of experience on a scale from 0 to 5, where 0 indicates no experience and 5 signifies a high level of expertise.
                        </FormDescription>
                      <FormControl>
                        <Slider
                          defaultValue={[0]}
                          max={5}
                          step={1}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tell_us_about_yourself"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tell us about yourself, if you&apos;d like!
                      </FormLabel>
                      <FormDescription>
                        This is optional, but feel free to share anything you
                        think we should know about you. This could include your
                        hobbies, interests, or anything else that makes you who
                        you are.
                      </FormDescription>
                      <FormControl>
                        <Textarea className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
              <div className="flex flex-col mb-4">
                <h3 className="text-lg font-bold">
                  Motivation and Moderation Scenarios
                </h3>
                <p className="text-sm text-muted-foreground">
                  For the following scenarios, describe what action you would
                  take. You can decide that no action should be taken or decide
                  that a user should be warned, temporarily muted, temporarily
                  banned, or permanently banned. Don&apos;t overthink these. The
                  goal is to see your thought process more than which you
                  choose.
                </p>
              </div>
                <FormField
                  control={form.control}
                  name="describe_moderation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Describe in your own words what it means to be a
                        moderator and what moderation entails?
                      </FormLabel>
                      <FormDescription>
                      In your own words, explain what it means to serve as a moderator and what responsibilities the role involves. Describe your understanding of moderation, including the key tasks, values, and expectations associated with maintaining a respectful and safe community environment.
                      </FormDescription>
                      <FormControl>
                        <Textarea className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="moderation_qualifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Why do you feel qualified for/want to be on the server
                        moderation team?
                      </FormLabel>
                        <FormDescription>
                        What motivates you to apply for a position on the server moderation team? Share your reasons for wanting to be part of the team, including any personal or professional motivations that drive your interest in this role. Highlight what you hope to achieve and contribute as a moderator within the community.
                        </FormDescription>
                      <FormControl>
                        <Textarea className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="staff_above_violating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        If a staff member above you or alongside you, is
                        violating the rules what do you do in that situation?
                      </FormLabel>
                      <FormDescription>
                        Describe the steps you would take if you observe a staff member, whether above or alongside you, violating the server rules. Explain how you would handle the situation while maintaining professionalism and ensuring the integrity of the moderation team. Include any specific actions you would take to address the violation and uphold community standards.
                      </FormDescription>
                      <FormControl>
                        <Textarea  className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="arguing_members"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Two members are arguing in a public chatroom. What do
                        you do? Please list all steps.
                      </FormLabel>
                      <FormDescription>
                        Describe the steps you would take to address a situation where two members are arguing in a public chatroom. Outline your approach to de-escalating the conflict, maintaining a respectful environment, and ensuring that all parties involved are treated fairly. Include any specific actions you would take to resolve the issue and restore a positive atmosphere within the chatroom.
                      </FormDescription>
                      <FormControl>
                        <Textarea className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 3 && (
              <>
              <div className="flex flex-col mb-4">
                <h3 className="text-lg font-bold">
                  Availability and Contribution
                </h3>
                <p className="text-sm text-muted-foreground">
                This section helps us better understand your time commitment and the unique value you aim to bring to the server community. Please outline your general availability and describe how you plan to actively support and enhance the server experience.
                </p>
              </div>
                <FormField
                  control={form.control}
                  name="suitable_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What is your suitable time to contribute to the server?
                      </FormLabel>
                      <FormDescription>
                        Please provide your general availability, including the days and times you are most likely to be active and able to contribute to the server. This information will help us understand when you can be most engaged and available for moderation duties.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                        className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]"
                          placeholder="e.g. Monday to Friday, 5 PM to 10 PM"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="voiceChat"
                  render={() => (
                    <CustomRadioGroup
                      label="Will you be able to regularly voice chat?"
                      description="Please select one of the following options to indicate your availability for regular voice chat sessions. This information will help us understand your willingness to engage in real-time discussions and interactions with the community."
                      name="voiceChat"
                      options={voiceChatOptions}
                      defaultValue="yes"
                      onChange={(value) => console.log("Selected:", value)}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="improve_server"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What is something you would like to see improved within
                        the server?
                      </FormLabel>
                      <FormDescription>
                        Please share your thoughts on an aspect of the server
                        that you believe could be improved. This could include
                        suggestions for enhancing community engagement,
                        moderation practices, or any other area where you see
                        potential for positive change. Your input will help us
                        understand your perspective and ideas for improving the
                        server experience.
                      </FormDescription>
                      <FormControl>
                        <Textarea className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="step_down_break"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        For how long will you be able to provide service in
                        moderation before taking any sort of major break or
                        completely step down?
                      </FormLabel>
                      <FormDescription>
                        Please indicate the duration for which you can commit to
                        providing moderation services before considering any
                        major breaks or stepping down from your role. This
                        information will help us understand your long-term
                        availability and commitment to the server community.
                      </FormDescription>
                      <FormControl>
                        <Textarea className="bg-background border border-gray-300 focus:outline-none focus:ring-[#7289da]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep !== 0 && (
            <div className="flex items-center justify-between mt-4 w-full gap-4">
              <div>
              <Pagination>
                <PaginationContent>
                  {currentStep !== 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={handlePrevious}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}

              {Array.from({ length: totalSteps - 1 }).map((_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    onClick={() => handleStepClick(index + 1)}
                    isActive={currentStep === index + 1}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
                  { currentStep !== totalSteps - 1 && (
                                      <PaginationItem>
                    
                                      <PaginationNext
                                        onClick={handleNext}
                                        className="cursor-pointer"
                                      />
                                    </PaginationItem>
                  )}


                </PaginationContent>
              </Pagination>
              </div>
                  { currentStep === totalSteps - 1 && (
                    // submit button
                    <div className="flex items-center justify-end w-full">
                  <Button
                    type="submit"
                    disabled={false}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={() => {
                      handleError({
                        message: "This form is currently closed for applications. Please check back later.",
                      });
                    }}
                    >
                    Submit Application
                  </Button>
                </div>
              )}
            </div>
            )}
          
          </form>
        </Form>
)}
      </div>
    </>
  );
}
