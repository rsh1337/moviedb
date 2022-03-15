/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
  env: {
    apiKey: process.env.TMDB_API_KEY,
  },
  serverRuntimeConfig: {
    apiKey: process.env.TMDB_API_KEY,
  },
  publicRuntimeConfig: {
    apiKey: process.env.TMDB_API_KEY,
  },
}
module.exports = nextConfig
