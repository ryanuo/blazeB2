/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 21:36:02
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
import hevueImgPreview from 'hevue-img-preview'
const pinia = createPinia()
Vue.use(hevueImgPreview)
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
