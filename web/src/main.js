/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-06 09:29:17
 * @FilePath: \web\src\main.js
 */
import Vue from 'vue'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import router from './router'
import element from './plugin/elements.js'
import './assets/css/global.css'
import './assets/css/element-variables.scss'
import VueClipboard from 'vue-clipboard2'
import 'nprogress/nprogress.css'
// import './registerServiceWorker.js'
const pinia = createPinia()
pinia.use(createPersistedState())
VueClipboard.config.autoSetContainer = true
Vue.config.productionTip = process.env.NODE_ENV === 'dev'
Vue.config.devtools = process.env.NODE_ENV === 'dev'
Vue.use(element)
Vue.use(VueClipboard)
Vue.use(PiniaVuePlugin)
new Vue({
  pinia,
  router,
  render: h => h(App)
}).$mount('#app')
