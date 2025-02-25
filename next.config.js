/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
    ],
  },
};

module.exports = nextConfig;