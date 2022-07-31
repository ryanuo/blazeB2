/*
 * @Author: Harry
 * @Date: 2022-07-30 12:53:09
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-30 13:06:30
 * @FilePath: \dev\src\config\build-vite.js
 */
const isPro = process.env.NODE_ENV === 'pro'
const build = {
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
}
export default build
