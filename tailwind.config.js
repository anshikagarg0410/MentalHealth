/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Sets Poppins as the default
        serif: ['Playfair Display', 'serif'],
        display: ['Yeseva One', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}