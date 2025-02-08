const nextConfig = {
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
