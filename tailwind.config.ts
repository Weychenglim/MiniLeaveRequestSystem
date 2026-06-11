import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17201b",
        moss: "#355442",
        fern: "#6f8f72",
        clay: "#c96f44",
        linen: "#f4efe5"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(36, 48, 40, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
