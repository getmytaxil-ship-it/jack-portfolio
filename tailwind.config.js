/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5500',
          dark: '#050505',
          gray: '#1F1F1F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Heebo', 'sans-serif'],
        display: ['Anton', 'Heebo', 'sans-serif'],
        hebrew: ['Heebo', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 85, 0, 0.5)',
        'inner-lg': 'inset 0 0 50px rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [],
}
