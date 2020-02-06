module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === "production" ? "api.patientpreviewapp.com" : "http://localhost:3000",
        pathRewrite: {'^/api' : ''},
        ignorePath: true,
        changeOrigin: true
      }
    }
  }
}