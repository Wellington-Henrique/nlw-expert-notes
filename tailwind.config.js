/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        minhaCorPersonalizada: '#8257e6'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

