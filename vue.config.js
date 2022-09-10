const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy: {
      "": {
        target: "http://geek.itheima.net",
        // pathRewrite: {"^/api" : ""}
      }
    }
  }
})
