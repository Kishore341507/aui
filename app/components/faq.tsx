'use client';
import { useState } from "react";

const faqs = [
  {
    question: "How do I join the AUI Discord server?",
    answer:
      "Click the 'Join Now' button and you'll be invited to our Discord server instantly. Complete a quick verification to access all channels and events. It takes less than 2 minutes!",
  },
  {
    question: "What games do you play on AUI?",
    answer:
      "We have active communities for Valorant, CS:GO, BGMI, Minecraft, Among Us, Apex Legends, and more. New games are added based on community interest. Check our #game-announcements channel for the latest tournaments.",
  },
  {
    question: "Do you hold regular tournaments with prizes?",
    answer:
      "Yes! We host weekly tournaments for various games with real cash prizes and exclusive in-game rewards. Tournament details are announced in the #tournaments channel with full prize breakdowns and registration instructions.",
  },
  {
    question: "Is there an age restriction to join?",
    answer:
      "Members should be 13+. We have moderation in place to keep the community respectful and safe for all players. We also have family-friendly channels for younger members.",
  },
  {
    question: "Can I stream my gameplay from the server?",
    answer:
      "Absolutely! Many members stream from home studios and in-server. We have dedicated #streaming channels and support from the community. Your first stream? We'll help promote it!",
  },
  {
    question: "How are competitive rankings determined?",
    answer:
      "Rankings are based on tournament placements, game stats, and community involvement. Top 100 members get monthly recognition and exclusive roles. Check #rankings to see where you stand!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-balck-900 text-white py-10 px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8">
        <img
          className="max-w-sm w-full rounded-xl h-auto"
          src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
          alt="FAQ Illustration"
        />
        <div className="flex-1">
          <p className="text-indigo-500 text-sm font-medium">FAQ&apos;s</p>
          <h1 className="text-3xl font-semibold">Got Questions? We&apos;ve Got Answers</h1>
          <p className="text-sm text-gray-400 mt-2 pb-4">
            Everything you need to know about joining AUI, tournaments, gameplay, and being part of India&apos;s biggest gaming community.
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
