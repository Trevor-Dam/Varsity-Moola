/** @type {import('tailwindcss').Config} */

const { platformSelect, platformColor } = require("nativewind/theme")
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
      extend: {},
  },
  plugins: [],
  
  corePlugin: {
    backgroundOpacity: true,
    textOpacity: true,
  }
}

