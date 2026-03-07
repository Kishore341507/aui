'use client';
import { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "What is this Discord server about?",
    answer:
      "This server is built to bring people together around shared interests, discussions, and collaboration. It's a space to connect, learn, and grow with an active community.",
  },
  {
    question: "How do I get started after joining?",
    answer:
      "Once you join, head to the welcome and rules channels, pick your roles, and introduce yourself. You'll unlock channels and features as you get involved.",
  },
  {
    question: "Is the server moderated?",
    answer:
      "Yes, moderation and automation tools are in place to keep the community safe, friendly, and spam-free, so conversations stay enjoyable for everyone.",
  },
  {
    question: "Can I promote my work or projects here?",
    answer:
      "Yes, we have dedicated channels for sharing projects, content, and ideas. Just make sure to follow the server guidelines when posting.",
  },
  {
    question: "Is this server free to join?",
    answer:
      "Absolutely. Joining the server is free. Some optional roles or perks may be available in the future, but the core community will always remain open.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-10 px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8">
        <Image
          className="max-w-sm w-full rounded-xl h-auto"
          src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
          alt="FAQ Illustration"
          width={830}
          height={844}
        />
        <div className="flex-1">
          <p className="text-indigo-500 text-sm font-medium">FAQ&apos;s</p>
          <h1 className="text-3xl font-semibold">Looking for answers?</h1>
          <p className="text-sm text-gray-400 mt-2 pb-4">
            Build a thriving Discord community without the chaos — automated, scalable,
            and designed for real engagement.
          </p>

          {/* FAQ Items */}
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-700 py-4 cursor-pointer"
                onClick={() => toggleIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">{faq.question}</h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-all duration-500 ease-in-out ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p
                  className={`text-sm text-gray-400 transition-all duration-500 ease-in-out max-w-md overflow-hidden ${
                    openIndex === index
                      ? "opacity-100 max-h-96 translate-y-0 pt-4"
                      : "opacity-0 max-h-0 -translate-y-2 pt-0"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
