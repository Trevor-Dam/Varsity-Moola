/** @type {import('tailwindcss').Config} */

const { platformSelect, platformColor } = require("nativewind/theme")
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
      extend: {},
  },
  plugins: [
    require("nativewind/plugin"),
    require("nativewind/animations/plugin"),
    require("nativewind/typography/plugin"),
    require("nativewind/scroll/plugin"),
    require("nativewind/hover/plugin"),
    require("nativewind/focus/plugin"),
    require("nativewind/active/plugin"),
    require("nativewind/press/plugin"),
    require("nativewind/transform/plugin"),
    require("nativewind/transition/plugin"),
    require("nativewind/gradient/plugin"),
    require("nativewind/placeholder/plugin"),
    require("nativewind/scrollbar/plugin"),
    require("nativewind/outline/plugin"),
    require("nativewind/opacity/plugin"),
    require("nativewind/spacing/plugin"),
    require("nativewind/typography/plugin"),
    require("nativewind/animation/plugin"),
  
    {
      "@tailwindcss/postcss": {},
    }
  ],
  
  corePlugin: {
    backgroundOpacity: true,
    textOpacity: true,
  }
}

