module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  purge: {
    // Enable PurgeCSS
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.js"],
  },

}