const colors = require('tailwindcss/colors');
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        sky: colors.sky,
        red: colors.rose,
    },
      outline: {
        blue: "2px solid rgba(0, 112, 244, 0.5)",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5715" }],
        base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "3xl": ["1.88rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "6xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      screens: {
        xs: { min: "360px", max: "639px" },
      },
      borderWidth: {
        3: "3px",
      },
      minWidth: {
        36: "9rem",
        44: "11rem",
        56: "14rem",
        60: "15rem",
        80: "20rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      minHeight: {
       '0': '0',

       '1/4': '25%',

       '1/2': '50%',

       '3/4': '75%',

       'full': '100%',
      },
      zIndex: {
        60: "60",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
