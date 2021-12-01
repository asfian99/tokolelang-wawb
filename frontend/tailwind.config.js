module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#008060",
        "primary-d": "#004C3F",
        "primary-l": "#69CF9C",
        "primary-l2": "#C1F0D0",
        cream: "#FBF7ED",
        "text-d": "#212326",
        "text-l": "#6B7177",
        danger: "#FF556D",
        "danger-d": "#F62C47",
      },
    },
    fontFamily: {
      inter: ["Inter", "ui-sans-serif", "-apple-system", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@themesberg/flowbite/plugin"),
  ],
};
