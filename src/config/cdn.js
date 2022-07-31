/*
 * @Author: Harry
 * @Date: 2022-07-24 17:45:05
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-24 18:38:50
 * @FilePath: \vite\src\config\cdn.js
 */
const cdn = [
  {
    name: 'vue',
    var: 'Vue',
    path: 'https://cdn.staticfile.org/vue/2.6.11/vue.min.js'
  },
  {
    name: 'vuex',
    var: 'Vuex',
    path: 'https://cdnjs.cloudflare.com/ajax/libs/vuex/4.0.2/vuex.global.prod.min.js'
  },
  {
    name: 'vue-router',
    var: 'VueRouter',
    path: 'https://cdn.staticfile.org/vue-router/3.2.0/vue-router.min.js'
  },
  {
    name: 'axios',
    var: 'axios',
    path: 'https://cdn.staticfile.org/axios/0.27.2/axios.min.js'
  },
  {
    name: 'element-ui',
    var: 'ELEMENT',
    path: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.6/index.min.js',
    css: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.6/theme-chalk/index.min.css'
  },
  {
    name: 'nprogress',
    var: 'NProgress',
    path: 'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.js',
    css: 'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css'
  },
  {
    name: 'vue-clipboard2',
    var: 'VueClipboard',
    path: 'https://cdn.bootcdn.net/ajax/libs/vue-clipboard2/0.3.3/vue-clipboard.min.js'
  }
]

export {
  cdn
}
