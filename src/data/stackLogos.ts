import { withBasePath } from "../lib/site";

const stackLogoMap: Record<string, string> = {
  "React 19": withBasePath("/techstack/React.svg"),
  React: withBasePath("/techstack/React.svg"),
  TypeScript: withBasePath("/techstack/TypeScript.svg"),
  JavaScript: withBasePath("/techstack/JavaScript.svg"),
  "Vue 3": withBasePath("/techstack/Vue.svg"),
  Vue: withBasePath("/techstack/Vue.svg"),
  "Next.js": withBasePath("/techstack/NextJS.svg"),
  "Tailwind CSS": withBasePath("/techstack/TailwindCSS.svg"),
  "Tailwind CSS v4": withBasePath("/techstack/TailwindCSS.svg"),
  "Three.js": withBasePath("/techstack/ThreeJS.svg"),
  Docker: withBasePath("/techstack/Docker.svg"),
  Django: withBasePath("/techstack/Django.svg"),
  Python: withBasePath("/techstack/Python.svg"),
  AWS: withBasePath("/techstack/AWS-Dark.svg"),
  Figma: withBasePath("/techstack/Figma.svg"),
};

export function getStackLogoSrc(name: string) {
  return stackLogoMap[name];
}

export function getStackBadgeLabel(name: string) {
  const compact = name
    .replace(/\(.*?\)/g, "")
    .replace(/[^A-Za-z0-9+.#]/g, " ")
    .trim();

  const tokens = compact.split(/\s+/).filter(Boolean);

  if (tokens.length >= 2) {
    return `${tokens[0][0] ?? ""}${tokens[1][0] ?? ""}`.toUpperCase();
  }

  const single = tokens[0] ?? name;
  return single.slice(0, 3).toUpperCase();
}
