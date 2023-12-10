module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        // 'hero5' : 'url(./)'
      },
      colors: {
        'primary': '#35B8BE',
        'coral': '#FF8946',
        'Alice': '#F5FBFC',
        'heading1': "#191B22",
        'muted': '#546285'
      },
      animation: {
        'slide-bottom': 'slide-bottom .3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-top': 'slide-top .3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'fade-in': 'fade-in .3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-right': 'slide-right .3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      },
      fontFamily: {
        'manrope': 'Manrope',
        'lobster': 'Lobster'
      },
      keyframes: {
        'slide-bottom': {
          '0%': { transform: ' translateY(-500px)' },
          '100%': { transform: 'translateY(0)' }
        },
        'slide-right': {
          '0%': { left: '-100%' },
          '100%': { left: '0%' }
        },
        'slide-top': {
          '0%': { transform: ' translateY(0)' },
          '100%': { transform: 'translateY(-500px)' }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}