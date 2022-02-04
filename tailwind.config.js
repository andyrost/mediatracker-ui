const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        light: "#a9d6e5",
        light2: "#89c2d9",
        light3: "#61a5c2",
        light4: "#468faf",
        DEFAULT: "#2c7da0",
        dark: "#012a4a",
      },
      blue: colors.blue,
      white: colors.white,
      black: colors.black,
      red: colors.red,
      green: colors.green,
      purple: colors.purple,
    },
    extend: {},
  },
  variants: {
    extend: {
      fontWeight: ["hover"],
    },
  },
  plugins: [],
};
