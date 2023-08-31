/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        doom: {
          bg: '#000000', // Black for the background
          bgLight: '#1A1A1A', // Light black for the background
          orange: '#eb6f0f', // Orange for the logo of DOOM
          blue: '#000083', // Blue for the background of the logo
          yellow: '#ffe74b', // Yellow for the text of the logo
          text: '#FFFFFF', // Text for the text
          green: '#67df5f', // Green for the elements that are not saillant
          fluorescent: '#10ff00', // Fluorescent for the elements that are saillant
          red: '#a70000', // Red for the elements that are saillant
          gray: '#808080', // Gray for the elements that are not saillant
        },
      },
    },
  },
  plugins: [],
}
