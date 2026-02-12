"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

export function ModeToggleMobile() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded transition ${
          theme === "light" ? "bg-slate-700" : "hover:bg-slate-700"
        }`}
        title="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded transition ${
          theme === "dark" ? "bg-slate-700" : "hover:bg-slate-700"
        }`}
        title="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded transition ${
          theme === "system" ? "bg-slate-700" : "hover:bg-slate-700"
        }`}
        title="System mode"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  )
}
