// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        aurora: {
          "0%": { transform: "translate3d(-2%, -2%, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, 1%, 0) scale(1.02)" },
          "100%": { transform: "translate3d(1%, 2%, 0) scale(1)" },
        },
        "aurora-hue": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(40deg)" },
        },
      },
      animation: {
        aurora: "aurora 18s ease-in-out infinite alternate",
        "aurora-hue": "aurora-hue 14s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
} satisfies Config;
