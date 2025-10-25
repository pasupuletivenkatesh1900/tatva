import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the workspace root is this folder so `public/` and build resolve correctly
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
