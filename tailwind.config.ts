import { trace } from "console";
import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        scrollLeft:{
          "0%":{transform:"translateX(100%)"},
          "100%":{transform:"translateX(-100%)"},
        },
      },
      animation: {
        scrollLeft:"scrollLeft 20s linear infinite",
      }
    },
  },
  plugins: [],
};
export default config;
