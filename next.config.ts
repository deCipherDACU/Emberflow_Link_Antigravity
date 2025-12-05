
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static export for Firebase Hosting
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,
  swcMinify: true,
  
  // Base path if deploying to subdirectory
  // basePath: '/odysseydaily',
  
  // Trailing slash for Firebase Hosting
  trailingSlash: true,
};

export default nextConfig;
