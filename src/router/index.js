/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-18 20:05:07
 * @FilePath: \dev\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import useStore from '@/store'
import Home from '@/views/home/Home.vue'
Vue.use(VueRouter)
let storeInit = null
const routes = [
  {
    path: '/',
    component: () => import('@/views/TabNav/TabNav.vue'),
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/imanage',
        name: 'imanage',
        component: () => import('@/views/ImgManage/ImgManage.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/Setting/Setting.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About/About.vue')
      }
    ]
  }

]
const router = new VueRouter({
  routes
})
// 路由前置守卫
// router.beforeEach((to, from, next) => {
//   // 初始化store放在这里
//   if (storeInit === null) {
//     storeInit = useStore()
//   }
//   next()
// })

router.afterEach(
  (to, from) => {
    if (storeInit === null) {
      storeInit = useStore()
    }
    if (to.path === '/home' || to.path === '/imanage' || to.path === '/setting') {
      storeInit.handleIsLogined()
      if (storeInit.isLogined) {
        storeInit.setNewAuthMsg()
      } else {
        console.log('您还未输入信息，还无法使用该程序')
      }
    }
  }
)
export default router
