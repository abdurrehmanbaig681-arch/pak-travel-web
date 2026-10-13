import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "paktravel.com.pk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/tours-sidebar-filter",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/tours-page",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/my-account",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/booking/:slug",
        destination: "/tours/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
