import type { Config } from "tailwindcss";
import {
  spacingTokens,
  borderRadiusTokens,
  lightSemanticColors,
  semanticColorVars
} from "./lib/utils/tokens";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...semanticColorVars,
        tealPrimary: "var(--tealPrimary)",
        tealSecondary: "var(--teal-secondary)",
      },
      spacing: {
        ...spacingTokens,
      },
      borderRadius: {
        ...borderRadiusTokens,
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
