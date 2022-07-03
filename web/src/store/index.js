/*
 * @Author: Harry
 * @Date: 2022-07-01 12:52:23
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-03 09:54:22
 * @FilePath: \web\src\store\index.js
 */
import { defineStore } from 'pinia'
import { authIsexit } from '../utils/common/login'
const useStore = defineStore('store', {
  // 开启数据缓存
  persist: {
    enabled: true
  },
  state: () => {
    return {
      isLogined: false
    }
  },
  getters: {
    // 登录状态
    siginStatus(state) {
      return !state.isLogined
    }
  },
  actions: {
    handleIsLogined() {
      const tokenApi = localStorage.getItem('token_api')
      this.isLogined = !!tokenApi
    },
    setNewAuthMsg() {
      authIsexit().then(() => {
        this.isLogined = true
      })
    }
  }
})
export default useStore
