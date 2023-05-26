/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        dos: ['Nunito']
      },
      colors: {
        // backg: '#D8C3A5',
        // fore: '#EAE7DC',
        // boss: '#E85A4F'
        backg: '#F0EBF4',
        fore: '#F2F2F2',
        boss: '#AF69EF'
        // boss: '#B39BC8'
      },
      width: {
        'sev': '70%',
      }
    },
  },
  plugins: [],
}

