// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
// "start": "node scripts/start.js",
// "build": "node scripts/build.js && npm run build:embedded",
// "build:embedded": "node scripts/build-embedded.js",
// "test": "node scripts/test.js --env=jsdom"
