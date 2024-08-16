/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Look inside src for all js, jsx, ts, tsx files
    './public/index.html',         // Add this if you use Tailwind in your HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
