/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",  // ← jsx et pas tsx puisqu'on est en JSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}