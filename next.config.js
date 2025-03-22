/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' if you need API routes
  images: {
    unoptimized: true,
  },
  // Remove experimental.appDir as it's no longer needed
}

module.exports = nextConfig