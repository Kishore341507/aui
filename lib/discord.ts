export const DISCORD_API_URL = "https://discord.com/api/v10";

async function getMember(guildId: string, userId: string) {
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.error("DISCORD_BOT_TOKEN is not defined");
    return null;
  }
  
  const response = await fetch(
    `${DISCORD_API_URL}/guilds/${guildId}/members/${userId}`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );
  if (!response.ok) return null;
  return response.json();
}

interface Member {
  nick: string | null;
  user: {
    id: string;
    username: string;
    avatar: string;
    global_name: string;
    bot: boolean;
  };
}

export async function searchGuildMembers(
  query: string,
  limit?: number,
  guildId?: string
) {
  const targetGuildId = guildId || process.env.GUILD_ID;
  
  if (!targetGuildId) {
    console.error("GUILD_ID is not defined");
    return [];
  }

  if (!process.env.DISCORD_BOT_TOKEN) {
    console.error("DISCORD_BOT_TOKEN is not defined");
    return [];
  }

  // Return empty if query length is less than 2
  if (query.length < 2) {
    return [];
  }

  // Restrict max limit to 10
  const effectiveLimit = limit && limit > 10 ? 10 : (limit || 10);

  // If query is a snowflake ID
  if (query.match(/^\d{17,20}$/)) {
    const member = await getMember(targetGuildId, query);
    if (member) {
      return member.user.bot ? [] : [member];
    }
  }

  const searchParams = new URLSearchParams({
    query: query,
    limit: effectiveLimit.toString(),
  });

  const searchResponse = await fetch(
    `${DISCORD_API_URL}/guilds/${targetGuildId}/members/search?${searchParams}`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  if (!searchResponse.ok) {
    return [];
  }

  let data = await searchResponse.json();
  if (Array.isArray(data) && data.length > 0) {
    data = data.filter((member: Member) => {
      return member.user.bot !== true;
    });
  }

  return data;
}

export async function sendChannelMessage(channelId: string, body: unknown) {
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.error("DISCORD_BOT_TOKEN is not defined");
    return null;
  }

  const response = await fetch(
    `${DISCORD_API_URL}/channels/${channelId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    console.error(`Failed to send message to channel ${channelId}:`, await response.text());
    return null;
  }

  return response.json();
}
