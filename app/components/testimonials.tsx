"use client";

import { motion } from "framer-motion";
import React from "react";


export default function TestimonialSection() {
const testimonials = [
  {
    text: "AUI is easily the most active Among Us community in India. Finding lobbies and playing with fun people here is super easy.",
    name: "Cristofer Levin",
    role: "Active community member",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    text: "I joined AUI to find better Among Us lobbies and stayed for the amazing community. The events and voice chats are always lively.",
    name: "Rohan Mehta",
    role: "Discord gamer",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  },
  {
    text: "AUI made Among Us way more fun. Playing with organized lobbies and friendly players makes every game exciting.",
    name: "Jason Kim",
    role: "Community player",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
  },
  {
    text: "If you love Among Us and want a great Indian community, AUI is the place to be. The moderators and players keep it welcoming.",
    name: "Alex Turner",
    role: "Regular player",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
  },
  {
    text: "The vibe in AUI is amazing. From casual games to competitive rounds, there's always something happening.",
    name: "Sofia Martinez",
    role: "Discord community member",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
  },
  {
    text: "AUI helped me connect with other Among Us players across India. The community is active, friendly, and always ready to play.",
    name: "Daniel Wong",
    role: "Among Us enthusiast",
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
  },
];

  const rows = [
    { start: 0, end: 3, className: "animate-scroll" },
    { start: 3, end: 6, className: "animate-scroll-reverse" },
  ];

  const renderCard = (testimonial: any, index: number) => (
    <div
      key={index}
      className="bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl p-6 shrink-0 w-[340px] transition"
    >
      {/* stars */}
      <div className="flex mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#facc15"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
          ))}
      </div>

      <p className="text-neutral-300 text-sm mb-6">{testimonial.text}</p>

      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-white text-sm">{testimonial.name}</p>
          <p className="text-neutral-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll {
          animation: scroll 18s linear infinite;
        }

        .animate-scroll-reverse {
          animation: scrollReverse 18s linear infinite;
        }
      `}</style>

      <section className="bg-black py-24 px-4">
        <div className="max-w-6xl mx-auto">
           {/* Heading */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Trusted by thriving Discord communities
            </h2>
            <p className="text-gray-300 text-lg">
              Community leaders love how automation, smart structure, and engagement
              tools turn Discord servers into places people actually want to stay.
            </p>
          </motion.div>

          {/* rows */}
          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative overflow-hidden">
                {/* fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10"></div>

                <div className={`flex gap-6 ${row.className}`}>
                  {[
                    ...testimonials.slice(row.start, row.end),
                    ...testimonials.slice(row.start, row.end),
                  ].map((testimonial, index) =>
                    renderCard(testimonial, index)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}