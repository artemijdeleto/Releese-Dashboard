module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['-apple-system', 'Inter', 'Helvetica', 'Roboto', 'Arial', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
      mono: ['Hack', 'serif'],
    },
  },
  plugins: [],
}
