import type { ImageLoaderProps } from "next/image";
import { withBasePath } from "./paths";
export default function staticImageLoader({ src, width }: ImageLoaderProps): string {
  if (src.startsWith("/images/") && src.endsWith(".webp")) {
    return withBasePath(src.replace("/images/", "/images/responsive/").replace(/\.webp$/, `-${width}.webp`));
  }
  return withBasePath(src);
}
