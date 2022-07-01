/*
 * @Author: Harry
 * @Date: 2022-04-20 22:28:23
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-01 15:30:04
 * @FilePath: \web\vue.config.js
 */
const path = require('path')
module.exports = {
  // ...
  publicPath: './', // 文件加载设置为相对路径
  outputDir: 'dist',
  // lintOnSave: false, // 关闭eslint
  // productionGzip: process.env.NODE_ENV === 'pro', //  开启gzip压缩代码
  productionSourceMap: process.env.NODE_ENV === 'pro', // 生产环境下css 分离文件
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },
  // vue.config.js
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'blazeB2图床 @Harry'
        return args
      })
  },
  devServer: {
    open: false, // 项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      '/v1': {
        target: 'http://127.0.0.1:501/', // 对应自己的接口，代理地址修改后必须重启项目
        changeOrigin: true, // 是否允许跨域
        pathRewrite: {
          '^/v1': ''
        }
      }
    }
  }
}
