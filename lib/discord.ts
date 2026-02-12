export type EmbedField = { name: string; value?: unknown; inline?: boolean };

export type SessionData = {
  user?: {
    name?: string;
    userId?: string;
    id?: string;
    email?: string;
    image?: string;
  };
};

const MAX_FIELD_LENGTH = 1024;

function truncate(value: unknown, max = MAX_FIELD_LENGTH) {
  if (value === undefined || value === null) return "Not provided";
  const str = String(value);
  return str.length > max ? `${str.slice(0, max - 3)}...` : str;
}

export function buildFormEmbed(opts: {
  title: string;
  emoji?: string;
  color?: number;
  session: SessionData;
  fields?: EmbedField[];
  footerText?: string;
}) {
  const { title, emoji = "", color = 0x5865f2, session, fields = [], footerText } = opts;

  const applicantName = session?.user?.name || "Unknown";
  const applicantId = session?.user?.userId || session?.user?.id || "Unknown";
  const applicantEmail = session?.user?.email || "No email";
  const author = {
    name: applicantName,
    icon_url: session?.user?.image || undefined,
  };

  const builtFields: EmbedField[] = [
    {
      name: "👤 Applicant",
      value: `**${truncate(applicantName, 256)}**\nUser ID: \`${truncate(applicantId, 256)}\`\nEmail: ${truncate(applicantEmail, 256)}`,
      inline: false,
    },
    ...fields.map((f) => ({ name: f.name, value: truncate(f.value), inline: f.inline ?? false })),
  ];

  // A creative, professional description
  const description = `A new **${title}** was submitted. Review the details below and open the admin dashboard for more context.`;

  return {
    embeds: [
      {
        title: `${emoji} ${title}`.trim(),
        description,
        color,
        author,
        fields: builtFields,
        timestamp: new Date().toISOString(),
        footer: { text: footerText || `AUI • ${title}` },
      },
    ],
  };
}
