/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-primary': '#DAFF72',
        'gray-primary': '#EFF1EF',
      },
      translate: {
        '3/2': '150%'
      },
      gridTemplateColumns: {
        'fit-3': 'repeat(auto-fill, 530px)'
      }
    }
  },
  plugins: []
}
