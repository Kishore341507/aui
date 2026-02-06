"use client"

import { useEffect } from "react"
import { type User } from "next-auth"
import { useSession } from "next-auth/react"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Tawk_API: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Tawk_LoadStart: any
  }
}

export function TawkChat() {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user) return

    const user = session.user as User & { userId?: string }

    
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // helper to set attributes
    const setAttributes = () => {
       if (window.Tawk_API && window.Tawk_API.setAttributes) {
            window.Tawk_API.setAttributes({
                id: user.userId,
                image: user.image,
                name: user.name + ` (${user.email})`,
                email: user.email,
                discordId: user.userId
            }, function(error: unknown) {
                if (error) {
                console.error("Tawk setAttributes error:", error)
                }
            })
       }
    }

    // Embed Script if not present
    const src = 'https://embed.tawk.to/697fc6bb1b2c131c36971f6b/1jgdi0ji1';
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (!script) {
        script = document.createElement("script")
        script.async = true
        script.src = src
        script.charset = 'UTF-8'
        script.setAttribute('crossorigin', '*')
        const s0 = document.getElementsByTagName("script")[0]
        if (s0 && s0.parentNode) {
            s0.parentNode.insertBefore(script, s0)
        }
    }

    window.Tawk_API.onLoad = function() {
      setAttributes()
    }

    // If script is already loaded/loading, try to set attributes and show widget
    if (window.Tawk_API) {
        // If the widget is already initialized (e.g. navigating back), show it
        if (window.Tawk_API.showWidget) {
            window.Tawk_API.showWidget();
        }
        // Try setting attributes immediately in case it's already loaded
        setAttributes();
    }
    
    // Cleanup function to hide widget when component unmounts
    return () => {
        if (window.Tawk_API && window.Tawk_API.hideWidget) {
            window.Tawk_API.hideWidget();
        }
    }

  }, [session])

  return null
}
