"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link"

export default function Hero() {
  const sectionRef = useRef(null);

  // Scroll progress inside hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Middle image moves DOWN on scroll
  const middleY = useTransform(scrollYProgress, [0, 0.4], [-40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] flex items-center justify-center  overflow-hidden"
    >
   <div className="absolute inset-0 pointer-events-none z-20">
  {/* Left Top */}
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  }}
  style={{
    top: 180,
    left: -140,
    rotate: "15deg",
    zIndex: 1,
    filter: "blur(2px)",
  }}
  className="absolute w-44 sm:w-56 md:w-80"
>
  <Image
    src="/screen1.png"
    alt="Left Top"
    width={400}
    height={800}
    className="rounded-2xl shadow-lg"
  />
</motion.div>

{/* Left Bottom */}
<motion.div
  animate={{ y: [0, 8, 0] }}
  transition={{
    duration: 3.5,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  }}
  style={{
    bottom: 250,
    left: -110,
    rotate: "-10deg",
    zIndex: 1,
    filter: "blur(2px)",
  }}
  className="absolute w-36 sm:w-48 md:w-64"
>
  <Image
    src="/screen2.png"
    alt="Left Bottom"
    width={280}
    height={560}
    className="rounded-2xl shadow-lg"
  />
</motion.div>

{/* Right Top */}
<motion.div
  animate={{ y: [0, -12, 0] }}
  transition={{
    duration: 5,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  }}
  style={{
    top: 180,
    right: -100,
    rotate: "-15deg",
    zIndex: 1,
    filter: "blur(2px)",
  }}
  className="absolute w-44 sm:w-56 md:w-72"
>
  <Image
    src="/discord.jfif"
    alt="Right Top"
    width={300}
    height={600}
    className="rounded-2xl shadow-lg"
  />
</motion.div>

{/* Right Bottom */}
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{
    duration: 4.5,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  }}
  style={{
    bottom: 250,
    right: -100,
    rotate: "10deg",
    zIndex: 1,
    filter: "blur(2px)",
  }}
  className="absolute w-36 sm:w-48 md:w-64"
>
  <Image
    src="/nitro.jfif"
    alt="Right Bottom"
    width={280}
    height={560}
    className="rounded-2xl shadow-lg"
  />
</motion.div>


</div>


      {/* Bottom blur fade / black overlay */}
      <div
        className="
          absolute
          left-0
          right-0
          bottom-0
          h-48
          z-20
          pointer-events-none
          bg-black/100
          backdrop-blur-md
          [mask-image:linear-gradient(to_bottom,transparent,black)]
        "
      />

      {/* Background */}
      <Image
        src="/heroback.avif"
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative w-full max-w-[1120px] px-4 text-center text-white -translate-y-24 sm:-translate-y-32 md:-translate-y-52 ">
        {/* Text */}
        <div className="mb-16 z-30">
          <div className="group relative inline-flex items-center gap-2 px-4 py-1 text-sm font-medium border border-cyan-500/30 rounded-full bg-cyan-950/20 text-cyan-200 backdrop-blur-md transition-all hover:bg-cyan-500/10 hover:border-cyan-400">
            {/* SVG Icon: Sparkles */}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 animate-pulse">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
            </svg>
            
            <span className="relative">
              Introducing <span className="text-white">AUI</span>
            </span>
            
            {/* Subtle background glow */}
            <div className="absolute inset-0 -z-10 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
           Welcome to AUI
            
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base md:text-lg">
           India's most active Discord server with 50,000+ members. Join Among US India for tournaments, 24/7 music, and an amazing community experience!
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="
                px-6 py-3
                rounded-xl
                bg-white text-black
                font-medium
                transition
                transform
                hover:scale-105
                hover:shadow-lg
                hover:shadow-white/30
                font-sans
              "
            >
              <Link href="https://discord.gg/amongusindians" target="_blank">
                  Join the Server
                </Link>
            </button>

           
          </div>
        </div>

        {/* 🔥 Images */}
        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            top-full
            mt-8
            flex
            flex-col sm:flex-row
            justify-center
            items-center sm:items-end
            gap-6
          "
        >
          {/* Left */}
          <div className="w-[140px] sm:w-[180px] md:w-[270px]">
            <Image
              src="/phone2.png"
              alt="Left mockup"
              width={300}
              height={600}
              className="rounded-2xl"
            />
          </div>

          {/* Middle (animated) */}
          <motion.div
            style={{ y: middleY }}
            className="w-[180px] sm:w-[220px] md:w-[300px] z-10"
          >
            <Image
              src="/phone1.png"
              alt="Center mockup"
              width={340}
              height={680}
              className="rounded-2xl"
            />
          </motion.div>

          {/* Right */}
          <div className="w-[140px] sm:w-[180px] md:w-[270px]">
            <Image
              src="/phone3.png"
              alt="Right mockup"
              width={300}
              height={600}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
