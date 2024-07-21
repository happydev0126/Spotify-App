/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "image-cdn-ak.spotifycdn.com",
      },
      {
        protocol: "https",
        hostname: "scontent-ams4-1.xx.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
      },
      {
        protocol: "https",
        hostname: "newjams-images.scdn.co",
      },
      {
        protocol: "https",
        hostname: "thisis-images.spotifycdn.com",
      },
    ],
  },
};

export default nextConfig;
