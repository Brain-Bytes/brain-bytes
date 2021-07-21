module.exports = {
  purge: ['./app/**/*.html.erb'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        grey: {
          light: '#7D858D',
          medium: '#474C50',
          background: '#2F3437',
          text: '#C4C4C4',
          dark: '#1C2633',
        },
        green: {
          light: '#487F5E',
          dark: '#00A41A',
        },
      },
      boxShadow: {
        light: '0px 4px 4px rgb(0 0 0 / 25%)',
        slidebar: '1px 0 10px white',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
