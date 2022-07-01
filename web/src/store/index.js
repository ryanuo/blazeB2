/*
 * @Author: Harry
 * @Date: 2022-07-01 12:52:23
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-01 13:54:04
 * @FilePath: \web\src\store\index.js
 */
import { defineStore } from 'pinia'
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
  actions: {
    handleIsLogined() {
      const tokenApi = localStorage.getItem('token_api')
      this.isLogined = !!tokenApi
    }
  }
})
export default useStore
