"use client";

import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CustomRadioGroup from "@/app/components/custom-radio-group";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import countries from "@/data/countries.json";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  ban_reason: z.string().nonempty({
    message: "Ban reason is required.",
  }),
  why_unban: z.string().nonempty({
    message: "Why do you want to get unbanned?",
  }),
  extra: z.string(),
});

type Country = {
  name: string;
};

export default function UnbanForm() {
  const router = useRouter();
  const { data } = useSession();

  const [loading, setLoading] = useState(false);
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Filter countries based on user input
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleClear = () => {
    setSelectedCountry(null);
    setQuery('');
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

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ban_reason: "",
      why_unban: "",
      extra: "",
    },
  });

  const voiceChatOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "sometimes", label: "Listen in only (muted)" },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);

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
      <div className="container">
        <div>
          <div className="p-8 py-6 space-y-4 bg-card text-center">
            <h1 className="text-2xl font-bold">Mod application form</h1>
            <p className="text-sm text-muted-foreground">
              Help Us Keep the Community Safe & Engaging
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between px-8 py-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-4">
              <img
                src={data?.user?.image || ""}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="space-y-1">
                <h2 className="text-lg font-bold">{data?.user?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {data?.user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Discord ID: wsds</p>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-8 py-6 mx-auto max-w-2xl"
            >
              {currentStep === 0 && (
                <>
                <h3 className="text-lg font-bold">Personal Info and Experience</h3>
                <p className="text-sm text-muted-foreground">
                This section helps us get a better understanding of who you are — your basic details, background, and any relevant experience you bring to the table.</p>
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What is your age?</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your age"
                            min="18"
                            max="99"
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What country do you currently reside in?
                        </FormLabel>
                        <FormControl>
                        <div className="relative w-full max-w-xs">
      {/* Container around the input for the icon and text */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search for a country..."
          value={selectedCountry ? selectedCountry.name : query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7289da] bg-white"
          readOnly={!!selectedCountry}
        />

        {selectedCountry && (
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-4"
          />
        )}

        {selectedCountry && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>

      {/* Popover (Dropdown) */}
      {query && !selectedCountry && filteredCountries.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-[#2f3136] rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              className="flex items-center p-2 hover:bg-[#3a3e44] cursor-pointer"
              onClick={() => {
                setSelectedCountry(country);
                setQuery('');
              }}
            >
              <img src={country.flag} alt={country.name} className="w-6 h-4 mr-2" />
              <span className="text-white">{country.name}</span>
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
                          Please describe any past moderation or leadership
                          experience you feel is relevant?
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
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
                        What is your experience moderating other Discord servers?
                        </FormLabel>
                        <FormDescription>Include your level of authority (e.g. helper/mod/admin) and an approximate number of people on the server(s). Be sure to describe your activities as a moderator in detail. Please leave an invite to the server(s) in question if you can. Type "none" if you have no moderation experience on other discord servers
                        Your answer</FormDescription>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <FormField
                    control={form.control}
                    name="experience_bots"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                        How experienced are you with using Discord bots?
                        </FormLabel>
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
                          Tell us about yourself, if you'd like!
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 1 && (
                <>
                <h3 className="text-lg font-bold">Motivation and Moderation Scenarios</h3>
                <p className="text-sm text-muted-foreground">For the following scenarios, describe what action you would take. You can decide that no action should be taken or decide that a user should be warned, temporarily muted, temporarily banned, or permanently banned. Don't overthink these. The goal is to see your thought process more than which you choose.
                </p>
                  <FormField
                    control={form.control}
                    name="extra"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Describe in your own words what it means to be a
                          moderator and what moderation entails?
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
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
                        <FormLabel>
                        Why do you feel qualified for/want to be on the server moderation team?
                        <FormDescription>
                        What makes you a good candidate for moderator overall? How much experience do you have with the game? What is motivating you to fill out this form right now?

                        </FormDescription>
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
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
                        <FormLabel>
                        If a staff member above you or alongside you, is violating the rules what do you do in that situation?
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
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
                        <FormLabel>
                        Two members are arguing in a public chatroom. What do you do? Please list all steps.
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  
                </>
              )}

              {currentStep === 2 && (
                <>
                <h3 className="text-lg font-bold">Availability and Contribution</h3>
                <p className="text-sm text-muted-foreground">This section helps us understand your availability and how you plan to contribute to the server.</p>
                  <FormField
                    control={form.control}
                    name="suitable_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What is your suitable time to contribute to the
                          server?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter reason here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attend_voice_chat"
                    render={() => (
                      <CustomRadioGroup
                        label="Will you be able to regularly voice chat?"
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
                          What is something you would like to see improved
                          within the server?
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
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
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* next page button */}
              <div className="flex items-center justify-between mt-4 w-full">
                <Pagination>
                  <PaginationContent>
                      {currentStep !== 0 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={handlePrevious}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                      )}

                    {Array.from({ length: totalSteps }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => handleStepClick(index)}
                          isActive={currentStep === index}
                          className="cursor-pointer"
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={handleNext}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              {/* <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Join Unban Server"
                )}
              </Button> */}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
