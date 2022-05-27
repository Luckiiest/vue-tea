const { defineConfig } = require('@vue/cli-service')

let path = require('path')

module.exports = {
  //代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
  },
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
})
