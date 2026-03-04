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
        brand: {
          primary: "hsl(var(--brand-primary))",
          secondary: "hsl(var(--brand-secondary))",
        },
        ui: {
          bg: "hsl(var(--ui-bg))",
          border: "var(--ui-border)",
          card: "var(--ui-card)",
          text: {
            main: "hsl(var(--ui-text-main))",
            muted: "hsl(var(--ui-text-muted))",
            dim: "hsl(var(--ui-text-dim))",
          }
        },
      },
    },
  },
  plugins: [],
};
export default config;