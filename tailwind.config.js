/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: { preflight: false },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      text: ['"Source Sans Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['"Source Code Pro"', 'ui-monospace', 'monospace'],
    },
    extend: {
      backgroundImage: {
        'hero-water': 'url(/images/original/water-background-1370w-605h.png',
      },
      colors: {},
    },
  },
  plugins: [],
};
