/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production'
const name = 'tas'

module.exports = {
  assetPrefix: !debug ? `/${name}/` : '',
}

module.exports = nextConfig
