// tailwind.config.js
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
    theme: {
      container: {
        center: true,           // centraliza automaticamente com mx-auto
        padding: '1rem',        // padding lateral
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',         // largura máxima para xl
          '2xl': '1400px',      // largura máxima para telas grandes
        },
      },
      extend: {},
    },
    plugins: [],
  }
  