/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4183C4',
        secondary: '#f2f2f2',
        'text-primary': '#333333',
        'text-secondary': '#666666',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Lucida Console', 'Courier New', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
              border: 'none',
              marginTop: '0',
              borderRadius: theme('borderRadius.lg'),
              padding: theme('spacing.4'),
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: theme('borderRadius.lg'),
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
