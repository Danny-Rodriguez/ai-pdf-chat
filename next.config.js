/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    return config;
  },
  // useful for debugging
  experimental: {
    serverComponentsExternalPackages: ["llamaindex", "tiktoken-node"]
  }
};

module.exports = nextConfig;
