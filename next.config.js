/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true,
  },
  // If you're deploying to GitHub Pages, add:
  basePath: '/fursphere-friend-test',  // Replace with your repository name
  assetPrefix: '/fursphere-friend-test/',
}

module.exports = nextConfig 