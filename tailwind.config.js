const screenSize = require("./libs/screen-size");
const konsta = require("konsta/config")({});

/** @type { import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: "jit",
  darkMode: false,
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
    extend: konsta.theme.extend
  },
  variants: {},
  purge: {
    content: [
      "./libs/**/*.(js|jsx)",
      "./components/**/*.(js|jsx)",
      "./pages/**/*.(js|jsx)",
      "./layouts/**/*.(js|jsx)",
      "./hooks/**/*.(js|jsx)",
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
