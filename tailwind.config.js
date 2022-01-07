/** @type { import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: 'jit',
  darkMode: false,
  theme: {
    fontFamily: {
      rubik: ['Rubik', 'Arial', 'Helvetica', 'sans-serif']
    },
    container: {
      padding: {
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem'
      }
    }
  },
  variants: {},
  purge: {
    content: [
      './libs/**/*.(js|jsx)',
      './components/**/*.(js|jsx)',
      './pages/**/*.(js|jsx)',
      './layouts/**/*.(js|jsx)',
      './hooks/**/*.(js|jsx)'
    ],
    options: {
      safelist: []
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('./styles/plugins/scrollbar')
  ]
};
