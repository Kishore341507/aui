"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aditya Kumar",
    role: "Pro Valorant Player",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=830&auto=format&fit=crop",
    title: "Tournament Changed My Life",
    quote:
      "Won my first tournament on AUI and got sponsored for semi-pro. The competitive environment here is unmatched. Every match sharpens my skills.",
    layout: "imageTop",
  },
  {
    name: "Priya Singh",
    role: "Content Creator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=830&auto=format&fit=crop",
    title: "Built My Streaming Community Here",
    quote:
      "Started streaming in AUI channels 6 months ago. Now I have 50K followers! The support from the community is incredible, everyone celebrates each other's wins.",
    layout: "textTop",
  },
  {
    name: "Rohan Patel",
    role: "BGMI Squad Leader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=830&auto=format&fit=crop",
    title: "Found My Perfect Gaming Crew",
    quote:
      "Looking for consistent squad members? AUI has them all. Met 10 best friends here who I play with daily. The discord culture is friendship-first.",
    layout: "imageTop",
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-black text-white py-20 overflow-hidden">
      {/* Heading */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4">Stories from Our Gaming Family</h2>
        <p className="text-gray-300 text-lg">
          Hear from members who found their perfect gaming crew, won tournaments, built their streaming presence, and made lifelong friends on AUI.
        </p>
      </motion.div>

      {/* Testimonial Grid */}
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 px-4">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            {/* Conditional layout */}
            {t.layout === "textTop" && (
              <div className="p-6 bg-white text-black rounded-[20px] flex flex-col gap-2">
                <h5 className="font-bold text-lg text-black font-sans">{t.title}</h5>
                <p className="text-black font-sans">{t.quote}</p>
              </div>
            )}

            {/* Image container */}
            <div className="relative w-full h-80 rounded-[20px] overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover object-top"
              />
              {/* Name Card */}
              <div className="absolute bottom-5 left-0 bg-indigo-900 text-white px-4 py-2 rounded-tr-[20px] rounded-br-[20px]">
                <p className="font-semibold">{t.name}</p>
                <p className="text-green-200 text-sm">{t.role}</p>
              </div>
            </div>

            {/* Text below image if layout is imageTop */}
            {t.layout === "imageTop" && (
              <div className="p-6 bg-white text-black rounded-[20px] flex flex-col gap-2">
                <h5 className="font-bold text-lg text-black font-sans">{t.title}</h5>
                <p className="text-black font-sans">{t.quote}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-12 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <a
          href="https://discord.gg/amongusindians"
          target="_blank"
          className="bg-indigo-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
        >
          Join the Community
        </a>
      </motion.div>
    </section>
  );
}
