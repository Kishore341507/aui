# AUI Website

Welcome to the **AUI Website**! This is an open-source project built with [Next.js](https://nextjs.org/) and [Prisma](https://www.prisma.io/) for database management. AUI is a community Discord server for hangouts.

## Features

- **Next.js 20+** for a modern full-stack experience
- **Prisma ORM** for seamless database management
- **PostgreSQL** as the database
- **Authentication via Discord** using NextAuth.js
- **Environment variables for configuration**

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v19+ recommended)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository:

```bash
git clone https://github.com/kishore341507/aui.git
cd aui
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and configure the required variables:

```env
AUTH_SECRET="your_auth_secret"
DATABASE_URL="postgres://username:password@host:port/database?sslmode=require"
AUTH_DISCORD_ID="your_discord_client_id"
AUTH_DISCORD_SECRET="your_discord_client_secret"

# Optional: Discord webhook URLs for form submissions (one per form)
CAP_MARSHAL_WEBHOOK_URL="https://discord.com/api/webhooks/..."
EVENT_TEAM_WEBHOOK_URL="https://discord.com/api/webhooks/..."
STAFF_REPORT_WEBHOOK_URL="https://discord.com/api/webhooks/..."
MEDIA_TEAM_WEBHOOK_URL="https://discord.com/api/webhooks/..."
```

> **Warning**: Do not share your `.env` file in public repositories. Use a `.gitignore` file to exclude it.

### Database Setup

Run Prisma migrations to set up the database:

```bash
npx prisma migrate dev --name init
```

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:3000`.

## Deployment

To deploy the application, ensure the required environment variables are set in your hosting provider. 

Platforms like **Vercel** and **Railway** support Prisma with PostgreSQL natively.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

**Happy coding! 🚀**

