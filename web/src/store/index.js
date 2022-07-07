/*
 * @Author: Harry
 * @Date: 2022-07-01 12:52:23
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-07 12:33:54
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
      setdefaultFile: {
        methods: '',
        valPt: '',
        valAt: []
      },
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
    // 图片默认返回
    imgDefaultFile(state) {
      const med = state.setdefaultFile.methods
      if (med === '1') {
        return state.setdefaultFile.valPt
      } else if (med === '2') {
        return state.setdefaultFile.valAt.join('/') + '/'
      } else {
        return ''
      }
    },
    // 配置默认返回
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
    setDefaultFile(o) {
      this.setdefaultFile.methods = o.methods
      this.setdefaultFile.valAt = o.valAt
      this.setdefaultFile.valPt = o.valPt
    },
    setDefaultCompress(obj) {
      this.commpressParams = obj
    }
  }
})
export default useStore
