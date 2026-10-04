import type { NextConfig } from "next";
import { getBasePath } from "./src/lib/paths";
const staticExport = process.env.STATIC_EXPORT === "true";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  basePath: getBasePath(),
  ...(staticExport ? { output: "export", trailingSlash: true } : {}),
  images: staticExport ? {
    loader: "custom", loaderFile: "./src/lib/static-image-loader.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], imageSizes: [256, 384],
  } : { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
