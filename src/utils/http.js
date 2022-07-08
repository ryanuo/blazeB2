/*
 * @Author: Harry
 * @Date: 2022-04-20 21:07:44
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-08 12:25:57
 * @FilePath: \web\src\utils\http.js
 */
import axios from 'axios'
import NProgress from 'nprogress'
axios.defaults.baseURL = process.env.VUE_APP_URL
const startLoading = () => {
  NProgress.start()
}
const endLoading = () => {
  NProgress.done()
}
// 请求拦截
// axios.defaults.withCredentials = true  # 如果开启前后端需要同时配置
axios.interceptors.request.use((config) => {
  // 加载
  startLoading()
  return config
})

// 响应拦截
axios.interceptors.response.use((response) => {
  // 结束loading
  endLoading()
  return response
}, error => {
  // 结束loading
  endLoading()
  // 错误提醒
  return Promise.reject(error)
})

export default axios
