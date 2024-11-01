import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'xylex.ams3.cdn.digitaloceanspaces.com',
      'api.qrserver.com',
      'm.media-amazon.com',
      'upload.wikimedia.org',
      'images.unsplash.com',
      'blocks.tremor.so',
      'hdsfinance.nl'
    ],
  },
};

export default nextConfig;
