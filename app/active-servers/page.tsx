import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Most Active Discord Servers in India | Best Indian Gaming Communities",
  description: "Discover the most active Discord servers in India. Join the best Indian gaming communities, social hangouts, and top-rated Discord Indian servers today.",
  keywords: [
    "active server in india",
    "discord indian server",
    "best server on discord india",
    "active server in discord",
    "indian gaming discord server",
    "among us india",
    "social discord servers india"
  ],
  openGraph: {
    title: "Most Active Discord Servers in India",
    description: "Find and join the best active Discord servers in India for gaming, chatting, and community events.",
    type: "website",
  }
}

interface Server {
  id: string
  name: string
  description: string
  icon: string
  splash: string | null
  banner: string | null
  approximate_presence_count: number
  approximate_member_count: number
  vanity_url_code: string | null
}

async function getServers(): Promise<Server[]> {
  const res = await fetch(
    "https://discord.com/api/discovery/search?query=active%20server%20india&limit=25",
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch servers")
  }
  const data = await res.json()
  return data.hits
}

export default async function ActiveServersPage() {
  const servers = await getServers()

  // Move "amongusindians" to the top
  const targetVanity = "amongusindians"
  const targetIndex = servers.findIndex(s => s.vanity_url_code === targetVanity)
  
  if (targetIndex > -1) {
    const [targetServer] = servers.splice(targetIndex, 1)
    servers.unshift(targetServer)
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Most Active Discord Servers in India</h1>
        
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-4">
          <p className="text-lg text-muted-foreground">
            Looking for the <strong>best server on Discord India</strong>? Browse our curated list of top communities. 
            Whether you want to join an <strong>active server in Discord</strong> for chatting or find a dedicated <strong>Indian gaming Discord server</strong>, we have you covered.
          </p>
          <p className="text-sm text-muted-foreground/80">
             Explore the ultimate collection of <strong>Discord Indian servers</strong> where you can meet new friends, participate in events, and be part of an <strong>active server in India</strong>.
          </p>
        </div>

        <div className="grid gap-6">
            {servers.map((server, index) => (
                <a
                  key={server.id}
                  href={`https://discord.gg/${server.vanity_url_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className={`flex flex-row items-center overflow-hidden relative transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${index === 0 ? "border-yellow-500/50 shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.5)]" : "hover:border-foreground/30"}`}>
                      {index === 0 && (
                          <div className="absolute top-0 right-0 p-4 z-10">
                              <Crown className="w-8 h-8 text-yellow-500 fill-yellow-500 animate-pulse drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                          </div>
                      )}
                      {index === 0 && (
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
                      )}

                      <div className="w-10 h-10 bg-muted relative shrink-0 ml-4 rounded-md overflow-hidden">
                          {server.icon ? (
                              <img
                                  src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=512`}
                                  alt={server.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                          ) : (
                              <div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/50 text-[10px]">
                                  N/A
                              </div>
                          )}
                      </div>
                      
                      <div className="flex flex-col justify-between p-4 flex-grow min-w-0">
                          <div>
                              <div className="flex items-center flex-wrap gap-2 mb-2 pr-8">
                                  <h2 className="text-xl font-bold line-clamp-1 break-all group-hover:text-primary transition-colors">{server.name}</h2>
                                  {server.vanity_url_code && <Badge variant="secondary" className="font-mono">/{server.vanity_url_code}</Badge>}
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                  {server.description}
                              </p>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2" title="Online Members">
                                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                  <span className="font-medium text-foreground">{server.approximate_presence_count.toLocaleString()}</span> <span className="hidden sm:inline">Online</span>
                              </div>
                              <div className="flex items-center gap-2" title="Total Members">
                                  <div className="w-2.5 h-2.5 rounded-full bg-primary/20" />
                                  <span className="font-medium text-foreground">{server.approximate_member_count.toLocaleString()}</span> <span className="hidden sm:inline">Members</span>
                              </div>
                          </div>
                      </div>
                  </Card>
                </a>
            ))}
        </div>
    </div>
  )
}
