/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        500: "500px",
      },
    },
    colors: {
      'green': '#009933',
      'blue': '#0000ff',
      'red': '#ff0000'
    },
    screens: {
      'laptop': '1024px',
    },
  },
  plugins: [],
})