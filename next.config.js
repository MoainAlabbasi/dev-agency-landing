/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Disable static export to avoid SSR issues with client components
  output: undefined,
};

module.exports = nextConfig;
