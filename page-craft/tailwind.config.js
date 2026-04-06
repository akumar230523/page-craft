/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#E8A020',
        'brand-dark': '#C4860E',
        'brand-light': '#FBE8B8',
        canvas: '#F7F3ED',
        cream: {
          50: '#FDFAF4',
          100: '#FAF6EC',
          200: '#F5EDD8',
        },
        ink: {
          900: '#1A1614',
          700: '#3D332E',
          500: '#8C7B74',
          300: '#C4B5AF',
          100: '#E2D9D5',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}