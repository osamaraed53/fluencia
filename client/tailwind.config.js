/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",

],
  theme: {
    extend: {
            colors: {
        "fluencia-dark-purple": "#522C6D",
        "fluencia-purple": "#613293",
        "fluencia-light-purple": "#9F69AC",
        "light-white": "rgba(255,255,255,0.17)", 
        "fluencia-blue": "#97D7DD",
        "fluencia-yellow-first": "#FCD12C",
        "fluencia-yellow-second": "rgb(234, 179, 8,1)",

      },
    },
  },
  plugins: [],
}

