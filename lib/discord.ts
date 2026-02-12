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

  // If query is a snowflake ID
  if (query.match(/^\d{17,20}$/)) {
    const member = await getMember(targetGuildId, query);
    if (member) {
      return member.user.bot ? [] : [member];
    }
  }

  const searchParams = new URLSearchParams({
    query: query,
    limit: (limit || 10).toString(),
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
    data = data.filter((member: any) => {
      return member.user.bot !== true;
    });
  }

  return data;
}
