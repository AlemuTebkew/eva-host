/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ec2-16-171-239-43.eu-north-1.compute.amazonaws.com',
        port: '5006',
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
        hostname: 'tse2.mm.bing.net',
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