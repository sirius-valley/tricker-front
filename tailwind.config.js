/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#151515',
        white: '#FEFEFE',
        gray: {
          200: '#DEDEDE',
          300: '#C1C1C1',
          400: '#585858',
          500: '#3A3A3A',
          600: '#2A2A2A',
          700: '#242424'
        },
        error: {
          500: '#FF5146'
        },
        success: {
          500: '#A4F572'
        },
        warning: {
          500: '#FCEA49'
        },
        primary: {
          200: '#B4FFF1',
          300: '#8EFFEB',
          400: '#43FFDD',
          500: '#2AE5C4',
          700: '#21806F'
        },
        secondary: {
          300: '#FFC085',
          400: '#FFA451',
          500: '#E58B37',
          600: '#CC711E'
        },
        tertiary: {
          300: '#E7BFFF',
          400: '#D795FF',
          500: '#BD7CE5',
          600: '#A462CC'
        }
      },
      backgroundImage: {
        // you can use this applying "bg-gradient" class
        gradient: 'linear-gradient(114deg, #D795FF 1.41%, #43FFDD 98.59%)',
        login: "url('/src/assets/Login/LoginBackground.svg')"
      },
      fontFamily: {
        inter: ['Inter']
      },
      boxShadow: {
        1: '0 4px 4px 0px rgba(182, 143, 189, 0.06)',
        2: '0px 2px 20px 0px #43FFDD1A',
        button: '0 0 10px 2px rgb(36 36 36 / 0.5)',
        buttonClicked: '0 0 2px 2px rgb(36 36 36 / 0.2)'
      },
      keyframes: {
        slideInLeft: {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' }
        }
      },
      animation: {
        slideInLeft: 'slideInLeft 1s ease-in-out'
      }
    }
  },
  plugins: []
}

export default config
