/** @type {import('next').NextConfig} */
require('dotenv').config({ path: '../../.env' })
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        destination: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
