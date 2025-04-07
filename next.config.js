/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '13.60.253.93',
        port: '5007',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5006',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'photomarketingwizard.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'peekage.com',
        pathname: '/**'
      }
    ],
  },
};

module.exports = nextConfig;