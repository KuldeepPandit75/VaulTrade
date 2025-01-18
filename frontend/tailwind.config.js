/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        coolvetica:["Coolvetica"],
      },
      colors: {
        red: '#df484c', 
        green: '#449682'
      },
    },
  },
  plugins: [],
}

