/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        page_primary_color: '#ffffff',
        page_secondary_color: '#7fcbb8',
        navBar_color: '#f9f9fc',
        navBar_text_color: '#60748c',
        text_black: '#03060b',
        button_primary : '#3ca6ba'
      }
    },
  },
  plugins: [],
}

