import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        // (Header, Navbar, Buttons)
        primary: "#60E5AE",
        warning: "#DC2626",
        b_ground: "#009688",
        secondary: "#60E5AE",
        bg_secondary: "#193a36",
        text_secondary: "#667085",
        white: "#FFFFFF",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
