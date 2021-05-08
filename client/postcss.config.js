module.exports = {
  plugins: [
    // require('postcss-import'),
    // require('autoprefixer'),
    require('postcss-css-variables'),
    require('postcss-nested'), // or require('postcss-nesting')
    require('tailwindcss')
  ]
};