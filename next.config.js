/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
