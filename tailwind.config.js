module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        N: {
          0: "#FFFFFF",
          50: "#FAFBFF",
          100: "#F4F6FA",
          200: "#EDEFF5",
          300: "#E6E8F0",
          400: "#D8DAE5",
          600: "#8F95B2",
          700: "#696F8C",
          800: "#474D66",
          900: "#101840",
        },
        B: {
          200: "#D6E0FF",
          400: "#3366FF",
          500: "#2952CC",
        },
        G: {
          50: "#F5FBF8",
          400: "#52BD94",
          600: "#317159",
        },
        R: {
          400: "#D14343",
        },
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
