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
          neutral: '#DCDCDC',
          primary: '#BE4B92',
          'primary-content': '#ffffff',
          'neutral-content': '#000000',
          'base-100': '#EDEDED',
          'base-200': '#DCDCDC',
          'base-300': '#CBCBCB',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          neutral: '#20373D',
          'neutral-focus': '#2A4850',
          primary: '#B44188',
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
