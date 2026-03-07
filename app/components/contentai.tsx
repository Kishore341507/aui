"use client";

import { motion } from "framer-motion";

export default function ContentAISection() {
  const dotListLeft = [
    "Epic Tournaments",
    "Real Prizes & Recognition",
    "Competitive Rankings",
  ];

  const dotListRight = [
    "24/7 Music Streaming",
    "Gaming Channels by Genre",
    "Community Events",
  ];

  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Top Row */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Column */}
        <motion.div
          className="lg:flex-1 flex flex-col gap-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-indigo-500/30 text-white-400 px-4 py-1 rounded-full text-sm font-semibold w-fit">
            Competitive Gaming
          </span>
          <h3 className="text-3xl font-semibold">
            Dominate with Tournaments & Rankings
          </h3>
          <p className="text-gray-300 text-lg">
            Prove your skills in our monthly tournaments. Compete for titles, earn badges, climb the leaderboards, and win real prizes.
          </p>

          {/* Dot List */}
          <div className="flex flex-col gap-3 mt-4">
            {dotListLeft.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="w-3 h-3 bg-indigo-500 rounded-full flex-shrink-0"></div>
                <p className="text-white font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          className="lg:flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://framerusercontent.com/images/opU4u9tpFihLry6OpmKv0EfPk.png"
            alt="mockup"
            className="w-full rounded-xl object-cover"
          />
        </motion.div>
      </div>

      {/* Second Row Section */}
      <div className="max-w-6xl mx-auto px-4 mt-16 flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Image */}
        <motion.div
          className="lg:flex-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://framerusercontent.com/images/QnUrRrOnqyfoKpIqi3ZtGg1F6w.png"
            alt="social cards"
            className="w-full rounded-xl object-contain"
          />
        </motion.div>

        {/* Right Text Column */}
        <motion.div
          className="lg:flex-1 flex flex-col gap-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-indigo-500/30 text-white-400 px-4 py-1 rounded-full text-sm font-semibold w-fit">
            Community Experience
          </span>
          <h3 className="text-3xl font-semibold text-white">
            Your 24/7 Entertainment Hub
          </h3>
          <p className="text-gray-300 text-lg">
            Beyond gaming, enjoy continuous music streaming, movie nights, creative channels, and exclusive hangout spaces where thousands are always online.
          </p>

          {/* Dot List */}
          <div className="flex flex-col gap-3 mt-4">
            {dotListRight.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="w-3 h-3 bg-indigo-500 rounded-full flex-shrink-0"></div>
                <p className="text-white font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
