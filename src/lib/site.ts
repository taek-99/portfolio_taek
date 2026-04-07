const repoName = "portfolio_taek";
const isProduction = process.env.NODE_ENV === "production";

export const siteBasePath = isProduction ? `/${repoName}` : "";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return `${siteBasePath}/${path}`;
  }

  return `${siteBasePath}${path}`;
}
