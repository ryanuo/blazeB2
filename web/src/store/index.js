/*
 * @Author: Harry
 * @Date: 2022-07-01 12:52:23
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-05 15:37:09
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
      isLogined: false,
      prefixImg: {
        support: [],
        defaultUrl: ''
      },
      setdefaultFile: '',
      commpressParams: {
        iscompress: false,
        rank: 0.8
      }
    }
  },
  getters: {
    // 登录状态
    siginStatus(state) {
      return !state.isLogined
    },
    prefixStatus(state) {
      const a = state.prefixImg.support.filter(v => v.url === state.prefixImg.defaultUrl)
      console.log(a)
      return a[0].url
    },
    defaultFile(state) {
      return state.setdefaultFile
    },
    CompressData(state) {
      return state.commpressParams
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
    },
    setprefixImg(obj) {
      this.prefixImg = obj
    },
    setDefaultPrefix(name) {
      this.prefixImg.defaultUrl = name
    },
    setDefaultFile(val) {
      this.setdefaultFile = val.trim()
    },
    setDefaultCompress(obj) {
      this.commpressParams = obj
    }
  }
})
export default useStore
