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
    },
  },
  plugins: [],
}
