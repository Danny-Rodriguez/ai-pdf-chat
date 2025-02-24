/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config, options) => {
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["llamaindex", "tiktoken-node"]
  }
};

module.exports = nextConfig;
