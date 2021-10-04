module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: "1em"
    },
    flex: {
      label: '1 0 30%',
      input: '1 0 50%'
    }, 
    // spacing: {
    // },
    maxWidth: {
      form: "500px"
    },
    extend: {
      width: {
        "9/10": "90%",
        "9.5/10": "95%",
      } 
    },
  },
  variants: {
    extend: {
      opacity: ['disabled']
    },
  },
  plugins: [],
}
