/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-01 14:18:21
 * @FilePath: \web\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import useStore from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/TabNav/TabNav.vue'),
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue')
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
//   const store = useStore()
//   store.handleIsLogined()
//   // if (to.path === '/login') return next()
//   // const token = sessionStorage.getItem('token')
//   // if (!token) return next('/login')
//   next()
// })
export default router
