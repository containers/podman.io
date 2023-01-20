/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {},
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../docs/**/*.mdx'], // my markdown stuff is in ../docs, not /src
  darkMode: ['class', '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
  theme: { colors: {}, fontFamily: {}, extend: { backgroundImage: {} } },
  plugins: [],
};
