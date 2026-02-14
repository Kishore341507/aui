"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  user: {
    id: string
    username: string
    global_name: string
    avatar: string
  }
  nick: string | null
}

interface UserSearchProps {
  onSelect: (user: User["user"]) => void
  label?: string
  disabled?: boolean
}

export function UserSearch({ onSelect, label = "Select user...", disabled = false }: UserSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [query, setQuery] = React.useState("")
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (query.length < 2) {
      setUsers([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/discord/search?query=${query}`)
        const data = await res.json()
        setUsers(data.results || [])
      } catch (error) {
        console.error("Failed to fetch users", error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {value ? (
             value 
          ) : (
            label
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search Discord user..." 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && <div className="py-6 text-center text-sm">Searching...</div>}
            {!loading && users.length === 0 && query.length >= 2 && (
              <CommandEmpty>No user found.</CommandEmpty>
            )}
            <CommandGroup>
              {users.map((result) => (
                <CommandItem
                  key={result.user.id}
                  value={result.user.username}
                  onSelect={() => {
                    setValue(result.user.username)
                    onSelect(result.user)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    <Avatar className="h-6 w-6">
                      <AvatarImage 
                        src={`https://cdn.discordapp.com/avatars/${result.user.id}/${result.user.avatar}.png`} 
                      />
                      <AvatarFallback>{result.user.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{result.nick || result.user.global_name || result.user.username}</span>
                      <span className="text-xs text-muted-foreground">@{result.user.username}</span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === result.user.username ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
