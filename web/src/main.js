/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-06-25 10:22:44
 * @FilePath: \web\src\main.js
 */
import Vue from 'vue'
// import mitt from 'mitt' // EventBus
import App from './App.vue'
// import router from './router'
import element from './plugin/elements.js'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'

import VueClipboard from 'vue-clipboard2'
// main.js
// 全局组件
// import filter from './plugin/filter'
import 'nprogress/nprogress.css'
VueClipboard.config.autoSetContainer = true
// for (const key in filter) { // 一定要放在 new Vue之前
//   Vue.filter(key, filter[key])
// }
// Vue.prototype.$bus = mitt()
Vue.config.productionTip = process.env.NODE_ENV === 'pro'
Vue.use(element)
Vue.use(VueClipboard)
new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
