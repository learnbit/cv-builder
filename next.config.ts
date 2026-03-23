import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cvbuilder.dev",
      },
    ],
  },
};

export default nextConfig;
