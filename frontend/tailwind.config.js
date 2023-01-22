/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'carretera': "url('/src/components/assets/carretera.png')",   
        },
        backgroundSize: {
          '100%': '100%',
  
        },
        colors: {
          'orange': 'rgb(255, 94, 0)',
          'orangeHover': 'rgb(249, 218, 187)',
          
        },
      },
    },
    plugins: [],
  }