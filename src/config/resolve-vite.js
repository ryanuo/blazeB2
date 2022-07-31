/*
 * @Author: Harry
 * @Date: 2022-07-30 13:09:17
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-30 13:09:27
 * @FilePath: \dev\src\config\resolve-vite.js
 */
import { resolve } from 'path'
const resolveC = {
  alias: [
    { find: /^~@/, replacement: resolve('src') },
    { find: 'vue$', replacement: 'vue/dist/vue.esm.js' },
    { find: '@', replacement: resolve('src') },
    { find: '_PUBLIC_', replacement: resolve('src/public') },
    { find: '_PAGES_', replacement: resolve('src/page') },
    { find: '_COMP_', replacement: resolve('src/public/components') }
  ],
  extensions: ['.js', '.json', '.scss', '.less']
}

export default resolveC
