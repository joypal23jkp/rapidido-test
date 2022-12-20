/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['morepos.blob.core.windows.net', 'rapedido.blob.core.windows.net'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  i18n: {
    locales: ['es', 'en', 'sv_SE'],
    defaultLocale: 'es'
  }
}

module.exports = nextConfig
