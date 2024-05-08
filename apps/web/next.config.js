/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  reactStrictMode: false,
  optimizeFonts: false,
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

module.exports = withNextIntl(nextConfig);
