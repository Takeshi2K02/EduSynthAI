/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ABE4',
        secondary: '#E9F1FA',
        light: '#FFFFFF',
        dark: '#1E1E1E',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}