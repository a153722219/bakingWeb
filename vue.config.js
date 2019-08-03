const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 75
})

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  baseUrl: process.env.NODE_ENV === 'production'
      ? './'
      : '/',
};