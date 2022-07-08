/*
 * @Author: Harry
 * @Date: 2022-04-20 22:28:23
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-08 22:35:40
 * @FilePath: \master\vue.config.js
 */
const path = require('path')
// const webpack = require('webpack')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'svg', 'woff', 'ttf']
module.exports = {
  // ...
  publicPath: './', // 文件加载设置为相对路径
  outputDir: 'build',
  // outputDir: 'test',
  // lintOnSave: false, // 关闭eslint
  productionSourceMap: process.env.NODE_ENV === 'dev', // map去除生产环境下
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'pro') {
      // 下面是下载的插件的配置
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false // 不删除源文件
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      }))
    }
  },
  // vue.config.js
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, './src'))
    config.when(process.env.NODE_ENV === 'pro', config => {
      config.entry('app').clear().add('./src/main.prod.js')
    })

    config.when(process.env.NODE_ENV === 'dev', config => {
      config.entry('app').clear().add('./src/main.js')
    })
    let cdn
    if (process.env.NODE_ENV === 'pro') {
      // #region 忽略生成环境打包的文件
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        nprogress: 'NProgress',
        'vue-clipboard2': 'VueClipboard'
      }
      config.externals(externals)

      // 在html文件中引入相关CDN
      cdn = {
        css: [
          // element-ui css
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.6/theme-chalk/index.min.css',
          // nprogress css
          'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css'
        ],
        js: [
          // vue
          'https://cdn.staticfile.org/vue/2.6.11/vue.min.js',
          // vue-router
          'https://cdn.staticfile.org/vue-router/3.2.0/vue-router.min.js',
          // axios
          'https://cdn.staticfile.org/axios/0.27.2/axios.min.js',
          // element-ui js
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.6/index.min.js',
          // nprogress
          'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.js',
          //
          'https://cdn.bootcdn.net/ajax/libs/vue-clipboard2/0.3.3/vue-clipboard.min.js'
        ]
      }
    }
    config
      .plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        args[0].title = 'BlazeB2图床 @Harry'
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
  // pwa: {
  //   workboxOptions: {
  //     // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
  //     skipWaiting: true,
  //     clientsClaim: true,
  //     importWorkboxFrom: 'local',
  //     importsDirectory: 'js',
  //     navigateFallback: '/',
  //     navigateFallbackBlacklist: [/\/api\//]
  //   }
  // }
}
