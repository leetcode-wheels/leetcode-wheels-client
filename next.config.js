/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'leetcode.com',
      'assets.leetcode.com',
      's3-us-west-1.amazonaws.com',
    ],
  },
  env: {
    NEXT_LEETCODE_BASE_URL: process.env.NEXT_LEETCODE_BASE_URL,
  },
}

module.exports = nextConfig
