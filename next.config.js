/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/skills",
        destination: "/about/#skills",
        permanent: true,
      },
      {
        source: "/skills/",
        destination: "/about/#skills",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
    formats: ["image/webp", "image/avif"],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/public": "./public",
    };

    if (!isServer) {
      if (!config.optimization) {
        config.optimization = {};
      }

      if (!config.optimization.splitChunks) {
        config.optimization.splitChunks = {};
      }

      if (typeof config.optimization.splitChunks === "object") {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...(config.optimization.splitChunks.cacheGroups || {}),
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        };
      }
    }

    return config;
  },
};

export default nextConfig;
