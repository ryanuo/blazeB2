/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
<<<<<<< HEAD
 * @LastEditTime: 2022-07-12 16:43:19
 * @FilePath: \master\src\main.prod.js
=======
 * @LastEditTime: 2022-07-12 16:53:16
 * @FilePath: \dev\src\main.prod.js
>>>>>>> dev
 */

/* eslint-disable */
import Vue from 'vue'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import router from './router'
import ELEMENT from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import './registerServiceWorker'
// import element from './plugin/elements.js'
import './registerServiceWorker'
import './assets/css/global.less'
import './assets/css/element-variables.scss'
const pinia = createPinia()
pinia.use(createPersistedState())
VueClipboard.config.autoSetContainer = true
Vue.config.productionTip = process.env.NODE_ENV === 'dev'
Vue.config.devtools = process.env.NODE_ENV === 'dev'
Vue.use(ELEMENT)
Vue.use(VueClipboard)
Vue.use(PiniaVuePlugin)
new Vue({
  pinia,
  router,
  render: h => h(App)
}).$mount('#app')
