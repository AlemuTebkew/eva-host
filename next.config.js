const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "standalone",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "16.171.71.23",
        port: "5007",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5006",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "photomarketingwizard.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "peekage.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en/products",
        permanent: true,
      },
    ];
  },
  // i18n: {
  //   locales: ["en", "am"],
  //   defaultLocale: "en",
  //   localeDetection: false,
  // },
};

module.exports = withNextIntl(nextConfig);

// module.exports = nextConfig;
