const repoName = "portfolio_taek";
const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isProduction ? `/${repoName}` : "",
};

export default nextConfig;
