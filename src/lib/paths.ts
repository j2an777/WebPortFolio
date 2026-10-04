export function getBasePath(value = process.env.NEXT_PUBLIC_BASE_PATH || ""): string {
  if (!value || value === "/") return "";
  if (!/^\/(?:[A-Za-z0-9_-]+\/?)+$/.test(value)) throw new Error("Invalid base path");
  return value.replace(/\/$/, "");
}
export function withBasePath(path: string, basePath = getBasePath()): string {
  if (!basePath || path === basePath || path.startsWith(`${basePath}/`) || !path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
export function stripBasePath(path: string): string {
  const base = getBasePath();
  return base && (path === base || path.startsWith(`${base}/`)) ? path.slice(base.length) || "/" : path;
}
export function normalizePathname(path: string): string {
  return stripBasePath(path).replace(/\/$/, "") || "/";
}
