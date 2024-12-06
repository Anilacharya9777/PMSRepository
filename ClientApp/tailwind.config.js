const { extend } = require('jquery');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths if necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  variants:{
    extend:{
      display:["focus-group"]
    }
  }
}

