/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, options) => {
    //rule for .glb files
    config.module.rules.push({
      test: /\.glb$/,
      use: [
        {
          loader: 'url-loader',
        },
      ],
    });

    //rule for .mp3 files
    config.module.rules.push({
      test: /\.mp3$/,
      use: [
        {
          loader: 'url-loader',
        },
      ],
    });

    return config;
  },
};

export default nextConfig;