"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HeroComponent() {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:min-h-screen">
        {/* Image - Shows first on mobile, second on desktop */}
        <motion.div 
          className="order-1 lg:order-2 flex justify-center items-center h-auto lg:h-full pt-4 lg:pt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full lg:h-screen flex items-center justify-center">
            <motion.img 
              src="/hero.png" 
              alt="AUI Discord Community" 
              className="w-full h-auto object-contain rounded-2xl shadow-2xl lg:rounded-none"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.div>

        {/* Content - Shows second on mobile, first on desktop */}
        <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col justify-center h-full lg:h-screen">
          <motion.h1 
            className="text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Welcome to AUI
          </motion.h1>
          <motion.p 
            className="text-sm lg:text-base text-muted-foreground mb-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            India&apos;s most active Discord server with 50,000+ members. Join Among US India for tournaments, 24/7 music, and an amazing community experience!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild className="hover:shadow-2xl hover:shadow-primary/50 transition-shadow duration-300">
                <Link href="https://discord.gg/amongusindians" target="_blank">
                  Join the Server
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
