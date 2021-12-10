const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
        blue: colors.blue,
        green: colors.green,
        cyan: {
            DEFAULT: '#00FFEA'
        },
        gray_moi: {
            DEFAULT: '#242424',
            dark: '#1A1A1A',
            alt: '#090909',
            light: '#373737'
        }
    }
  }
}