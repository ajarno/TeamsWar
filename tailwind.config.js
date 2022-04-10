module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        size: 'width, height, fontSize',
        elevate: 'boxShadow, backgroundColor, backgroundOpacity',
      },
    },
  },
  plugins: [],
}
