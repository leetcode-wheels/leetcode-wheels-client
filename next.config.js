/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'leetcode.com',
      'assets.leetcode.com',
      's3-us-west-1.amazonaws.com',
      'aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com',
    ],
  },
  env: {
    NEXT_LEETCODE_BASE_URL: process.env.NEXT_LEETCODE_BASE_URL,
    NEXT_VERCEL_URL: process.env.NEXT_VERCEL_URL,
  },
}

module.exports = nextConfig
