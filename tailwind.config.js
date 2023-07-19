/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          neutral: '#c1c1c1',
          'base-100': '#EDEDED',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          neutral: '#434343',
          'base-100': '#152428',
          'base-200': '#142125',
          'base-300': '#121F22',
          'base-content': '#DBDBDB',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
