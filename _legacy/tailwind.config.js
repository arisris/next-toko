// @ts-nocheck
const screenSize = require("./lib/screen-size");
const konstaConfig = require("konsta/config");
const colors = require("./lib/colors");
const getColors = (prefix) => {
  const out = {};
  Object.keys(colors).forEach((i) => {
    if (i.startsWith(prefix)) {
      let name = i.split(prefix)[1];
      out[name] = colors[i];
    }
  });
  return out;
};

/** @type {import("tailwindcss").Config} */
const tailwindConfig = {
  darkMode: "class",
  theme: {
    fontFamily: {
      rubik: ["Rubik", "Arial", "Helvetica", "sans-serif"]
    },
    screens: Object.entries(screenSize).reduce(
      (a, [k, v]) => ((a[k] = `${v}px`), a),
      {}
    ),
    container: {
      padding: {
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem"
      }
    },
    colors: {
      green: getColors("green-"),
      gray: getColors("grey-"),
      purple: getColors("purple-"),
      blue: getColors("blue-"),
      primary: {
        DEFAULT: colors["green-500"],
        light: colors["green-400"],
        dark: colors["green-700"]
      }
    }
  },
  content: [
    "./lib/**/*.(ts|tsx)",
    "./components/**/*.(ts|tsx)",
    "./pages/**/*.(ts|tsx)",
    "./layouts/**/*.(ts|tsx)",
    "./hooks/**/*.(ts|tsx)"
  ],
  variants: {
    typography: ["dark"]
  },
  plugins: [require("./styles/plugins/scrollbar")]
};

module.exports = konstaConfig(tailwindConfig);
