"use client";

import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Content */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4 md:gap-[300px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <div className="md:flex-1 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl text-white font-sans">
              Everything You Need to Compete & Connect
            </h2>
          </div>

          {/* Subtext + Buttons */}
          <div className="md:flex-1 flex flex-col gap-4">
            <p className="text-gray-300 text-lg max-w-md font-sans">
              From tournaments to 24/7 music, gaming channels to exclusive events—all in one thriving community.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://discord.gg/amongusindians"
                target="_blank"
                className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white-300 transition"
              >
                Join Now
              </a>
              <a
                href="#features"
                className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition"
              >
                Explore Events
              </a>
            </div>
          </div>
        </motion.div>

        {/* New Lower Section */}
        <motion.div
          className="relative text-white z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Circle */}
          <div className="absolute -z-50 w-[400px] -top-10 -left-20 aspect-square rounded-full bg-indigo-500/30 blur-3xl z-[-1]"></div>

          {/* Intro Text */}
          <p className="text-lg max-w-3xl text-left">
            Every day, thousands of players gather on our server to compete, collaborate, and celebrate gaming culture. From casual meetups to massive tournaments, we&apos;ve built the ultimate platform for Indian gamers.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div className="md:col-span-2">
              <img
                alt="features showcase"
                src="/newone.webp"
                className="rounded-lg " style={{ width: '80%'}}
              />
            </div>
            <div className="md:col-span-1 flex flex-col gap-4">
              <img
                alt="features showcase"
                className="hover:-translate-y-0.5 transition duration-300 rounded-lg w-full"
                src="/auinew.webp"
              />
              <h3 className="text-[24px]/7.5 text-white font-800 font-medium mt-6">
                Built for Gamers, By Gamers
              </h3>
              <p className="text-slate-400 mt-2">
                We understand what drives the gaming community. Tournaments, rankings, real-time achievements, and a culture of competition—all while building genuine friendships.
              </p>
              <a
                href="https://discord.gg/amongusindians"
                target="_blank"
                className="group flex items-center gap-2 mt-4 text-indigo-600 hover:text-indigo-700 transition"
              >
                Join the Competition
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right w-6 h-6 group-hover:translate-x-1 transition duration-300"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
