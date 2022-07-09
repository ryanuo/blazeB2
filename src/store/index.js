/*
 * @Author: Harry
 * @Date: 2022-07-01 12:52:23
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-09 15:02:41
 * @FilePath: \master\src\store\index.js
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
      isLogined: false, // 是否输入formview
      noInvalid: false, // 是否验证过期，默认过期
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
      },
      toFile: ''
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
    },
    DefaultToFile(state) {
      return state.toFile
    }
  },
  actions: {
    handleIsLogined() {
      this.isLogined = !!localStorage.getItem('token_api')
      this.noInvalid = !!localStorage.getItem('authmsg')
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
    },
    setDefaultToFile(a) {
      this.toFile = a
    }
  }
})
export default useStore
