"use client"

import { useEffect } from "react"
import { type User } from "next-auth"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Tawk_API: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Tawk_LoadStart: any
  }
}

interface TawkChatProps {
    user: User & {
        userId?: string
    }
}

export function TawkChat({ user }: TawkChatProps) {
  useEffect(() => {
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // Set standard visitor attributes immediately
    window.Tawk_API.visitor = {
      name: user.name,
      email: user.email,
    }

    // Set custom attributes when loaded
    const setAttributes = () => {
      window.Tawk_API.setAttributes({
        id: user.userId,
        image: user.image,
        name: user.name,
        email: user.email,
        discordId: user.userId
      }, function(error: unknown) {
        if (error) {
          console.error("Tawk setAttributes error:", error)
        }
      })
    }

    window.Tawk_API.onLoad = function() {
      setAttributes()
    }

    window.Tawk_API.onChatMaximized = function() {
      setAttributes()
    }

    // Embed Script
    const s1 = document.createElement("script")
    const s0 = document.getElementsByTagName("script")[0]
    s1.async = true
    s1.src = 'https://embed.tawk.to/697fc6bb1b2c131c36971f6b/1jgdi0ji1'
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0)
    }
    
    // Cleanup function to hide widget when component unmounts
    return () => {
        if (window.Tawk_API && window.Tawk_API.hideWidget) {
            window.Tawk_API.hideWidget();
        }
    }

  }, [user])

  return null
}
