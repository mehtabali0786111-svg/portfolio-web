import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff5c00",
        canvas: "var(--color-light)",
        surface: "var(--color-light-box)",
        foreground: "var(--color-dark-text)",
        muted: "var(--color-secondary)",
        line: "var(--color-light-border)",
      },
    },
  },
};

export default config;
