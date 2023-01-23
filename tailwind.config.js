/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: { preflight: true },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    colors: {
      black: '#000000',
      blue: {
        100: '#D698FF',
        300: '#83F1FF',
        500: '#1ECCFF',
        700: '#009FFF',
        900: '#0D569B',
      },
      'deep-purple': {
        100: '#E1C5FF',
        300: '#B39ADD',
        500: '#8870B0',
        700: '#5F4986',
        900: '#37255D',
      },
      gray: {
        100: '#514C5C',
        300: '#A5A0B1',
        500: '#7A7485',
        700: '#A5A0B1',
        900: '#2B2735',
      },

      purple: '#892CA0',
      white: '#FFFFFFF',
    },
    fontFamily: {
      display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      text: ['"Source Sans Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['"Source Code Pro"', 'ui-monospace', 'monospace'],
    },
    backgroundImage: {
      'waterTexture': 'url(/images/original/water-background-1370w-605h.png',
    },
  },
};
