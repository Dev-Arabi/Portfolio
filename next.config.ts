import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Production-safe configuration
  poweredByHeader: false,
  compress: true,

  // Only ignore ESLint/TypeScript in development if needed
  ...(process.env.NODE_ENV === "development" && {
    eslint: {
      // Only ignore during development builds, not production
      ignoreDuringBuilds: false,
    },
    typescript: {
      // Only ignore during development builds, not production
      ignoreBuildErrors: false,
    },
  }),

  // Enable image optimization for better performance
  images: {
    // Enable optimization for better performance
    unoptimized: false,
    // Add domains if you're using external images
    domains: [],
    // Configure image formats
    formats: ["image/webp", "image/avif"],
    // Set reasonable image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable experimental features for better performance
  experimental: {
    // Optimize CSS loading
    optimizeCss: true,
    // Enable modern bundling
    esmExternals: true,
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
      }
    }
    return config
  },

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // Cache static assets
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Different caching for pages
        source: "/((?!_next/static|favicon.ico).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ]
  },
}

export default nextConfig
