const nextConfig = {
  experimental: {
      serverActions: {
        allowedOrigins: [
          'localhost:3000',
          process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN 
            ? `${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
            : ''
        ].filter(Boolean),
      },
    },
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.discordapp.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'discord.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'amongusindia.com',
          port: '',
          pathname: '/**',
        },
      ],
  },
  logging : {
    fetches : {
      fullUrl : true

    }
  }
};


export default nextConfig;
