/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  env: {
    EVOLUTION_API_URL: process.env.EVOLUTION_API_URL || 'http://localhost:8080',
    PUSHER_APP_ID: process.env.PUSHER_APP_ID || '',
    PUSHER_KEY: process.env.PUSHER_KEY || '',
    PUSHER_SECRET: process.env.PUSHER_SECRET || '',
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER || 'mt1',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  },
}

module.exports = nextConfig