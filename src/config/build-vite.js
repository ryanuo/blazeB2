/*
 * @Author: Harry
 * @Date: 2022-07-30 12:53:09
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-31 15:08:41
 * @FilePath: \dev\src\config\build-vite.js
 */
// const isPro = import.meta.env.VITE_ENV === 'pro'
// console.log(isPro)
const build = {
  sourcemap: false,
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
