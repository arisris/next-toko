const screenSize = require("./lib/screen-size");
const konsta = require("konsta/config")({});

/** @type { import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  theme: {
    fontFamily: {
      rubik: ["Rubik", "Arial", "Helvetica", "sans-serif"]
    },
    screens: Object.entries(screenSize).reduce(
      // add "px" in values,
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
        primary: {
          ...konsta.theme.extend.colors.primary,
          DEFAULT: "#377702",
          light: "#4a9f03",
          dark: "#244f01"
        }
      }
    }
  },
  variants: {},
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
