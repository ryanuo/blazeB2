/*
 * @Author: Harry
 * @Date: 2022-07-24 11:20:59
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-24 19:13:15
 * @FilePath: \vite\vite.config.js
 */
import { defineConfig, loadEnv } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'
import { createVuePlugin as vue } from 'vite-plugin-vue2'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import compressPlugin from 'vite-plugin-compression'

import eslintPlugin from 'vite-plugin-eslint'
import legacy from '@vitejs/plugin-legacy'
import path, { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import importToCDN from 'vite-plugin-cdn-import'
import { cdn } from './src/config'
const transformIndexHtml = (code) => {
  switch (process.env.NODE_ENV) {
    case 'pro':
      return code.replace(/__INDEX__/, '/src/main.prod.js') // 生产环境
    default:
      return code.replace(/__INDEX__/, '/src/main.js') // 开发环境
  }
}
export default ({ mode }) => {
  const isPro = mode === 'pro' // 我们可以通过mode直接判断当前是不是生产环境，注意mode可以在运行指令中指定：`vite build --mode master`，如果没有指定，那默认打包就是production
  function getEnv(key) { // 定义获取环境变量的方法
    return loadEnv(mode, process.cwd(), '')[key] // 第三个参数非常重要，下面有详解
  }
  //   const pageEntry = resolve(__dirname, `${mode === 'dev' ? './src/package/dev/index.html' : './src/package/pro/index.html'}`)
  //   console.log(pageEntry)
  return defineConfig({
    base: getEnv('VUE_APP_PUBLICPATH'), // 读取环境变量
    publicDir: 'public',
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./assets/css/element-variables.scss";' // 全局公共样式
        }
      }
    },
    optimizeDeps: {
      exclude: ['__INDEX__'] // 排除 __INDEX__
    },
    plugins: [
      {
        name: 'demo-transform',
        enforce: 'pre',
        // vite build is production will not invoke `transformIndexHtml`
        transform (code, id) {
          if (id.endsWith('.html')) {
            return { code: transformIndexHtml(code), map: null }
          }
        },
        transformIndexHtml
      },
      vue(),
      envCompatible(),
      viteCommonjs(),
      compressPlugin({
        ext: '.gz',
        deleteOriginFile: false, // 是否删除原始文件
        threshold: 10240, // 压缩前最小文件大小
        algorithm: 'gzip' // 压缩算法
      }),
      eslintPlugin({ // eslint插件，开发时存在eslint错误组织构建并提示
        cache: false,
        throwOnError: !isPro // 生产环境打包不抛出异常
      }),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), './src/icons')], // 在src下新建文件夹icons
        symbolId: 'icon-[dir]-[name]'
      }),
      importToCDN({
        modules: cdn
      })
    ],
    build: {
      sourcemap: !isPro,
      assetsDir: 'dist',
      minify: 'terser',
      assetsInlineLimit: 4096,
      rollupOptions: {
        // input: pageEntry, // 入口配置
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      },
      terserOptions: {
        compress: {
          // 生产环境时移除console.log()
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    envPrefix: ['VUE_APP_'], // 很重要
    resolve: {
      alias: [
        { find: /^~@/, replacement: resolve('src') },
        { find: 'vue$', replacement: 'vue/dist/vue.esm.js' },
        { find: '@', replacement: resolve('src') },
        { find: '_PUBLIC_', replacement: resolve('src/public') },
        { find: '_PAGES_', replacement: resolve('src/page') },
        { find: '_COMP_', replacement: resolve('src/public/components') }
      ],
      extensions: ['.js', '.json', '.scss', '.less']
    },
    server: {
      host: true,
      proxy: {
        '/v1': {
          target: 'http://127.0.0.1:501/', // 对应自己的接口，代理地址修改后必须重启项目
          changeOrigin: true, // 是否允许跨域
          rewrite: (path) => path.replace(/^\/v1/, '')
        }
      }
    }
  })
}
