const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      width: {
        'main-content': 'calc(100% - 24rem)',
      },
      minWidth: {
        10: '2.5rem',
      },
      boxShadow: {
        'around-sm': '0px 0px 6px',
        'around-md': '0px 0px 12px',
        'around-lg': '0px 0px 18px',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(327.21deg, rgb(4 0 9 / 24%) 3.65%, rgba(60, 0, 136, 0) 40.32%), linear-gradient(245.93deg, rgb(12 32 220 / 16%) 0%, rgb(204 23 77 / 0%) 36.63%), linear-gradient(147.6deg, rgb(39 15 160 / 0%) 29.79%, rgba(98, 19, 255, 0.01) 85.72%)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
