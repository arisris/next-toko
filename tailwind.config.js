// @ts-nocheck
const screenSize = require("./lib/screen-size");
const konsta = require("konsta/config")({});
const colors = require("./styles/colors");
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
module.exports = {
  mode: "jit",
  darkMode: "class",
  theme: {
    fontFamily: {
      rubik: ["Rubik", "Arial", "Helvetica", "sans-serif"]
    },
    screens: Object.entries(screenSize).reduce(
      (a, [k, v]) => ((a[k] = v + "px"), a),
      {}
    ),
    container: {
      padding: {
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem"
      }
    },
    extend: {
      ...konsta.theme.extend,
      colors: {
        ...konsta.theme.extend.colors,
        green: getColors("green-"),
        gray: getColors("grey-"),
        purple: getColors("purple-"),
        blue: getColors("blue-"),
        primary: {
          ...konsta.theme.extend.colors.primary,
          DEFAULT: colors["green-500"],
          light: colors["green-400"],
          dark: colors["green-700"]
        }
      }
    }
  },
  variants: {
    typography: ["dark"]
  },
  purge: {
    content: [
      "./libs/**/*.(ts|tsx)",
      "./components/**/*.(ts|tsx)",
      "./pages/**/*.(ts|tsx)",
      "./layouts/**/*.(ts|tsx)",
      "./hooks/**/*.(ts|tsx)",
      ...konsta.content
    ],
    options: {}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("./styles/plugins/scrollbar"),
    ...konsta.plugins
  ]
};
