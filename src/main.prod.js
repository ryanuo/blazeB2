/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-04 10:51:29
 * @FilePath: \dev\src\main.prod.js
 */

/* eslint-disable */
import Vue from 'vue'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import router from './router'
import ELEMENT from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import './assets/css/global.less'
const pinia = createPinia()
pinia.use(createPersistedState())
VueClipboard.config.autoSetContainer = true
Vue.config.productionTip = process.env.NODE_ENV === 'dev'
Vue.config.devtools = process.env.NODE_ENV === 'dev'
Vue.use(ELEMENT)
Vue.use(VueClipboard)
Vue.use(PiniaVuePlugin)
console.log(window);
new Vue({
  pinia,
  router,
  render: h => h(App)
}).$mount('#app')
