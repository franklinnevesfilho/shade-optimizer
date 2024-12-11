/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'dark',
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}