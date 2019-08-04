const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 75
})
//https://cli.vuejs.org/zh/config/#devserver 
module.exports = {
  devServer: {
		proxy: {
            '/': {
				 target: 'https://bozunbaking.com',
				 changeOrigin: true,
				 ws:false
			}
        }
  },
	
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