module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        },
        ignorePath: true,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: ['vuetify']
}
