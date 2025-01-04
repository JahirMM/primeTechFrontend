import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0A403A",
        secondaryColor: "#ECE2D5",
        sectionColor: "#F9F0E5",
      },
    },
  },
  plugins: [],
} satisfies Config;
