/*
 * @Author: Harry
 * @Date: 2022-07-01 12:52:23
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-04 15:12:53
 * @FilePath: \dev\src\store\index.js
 */
import { defineStore } from 'pinia'
import { authIsexit } from '@/utils/common/login'
const useStore = defineStore('store', {
  // 开启数据缓存
  persist: {
    enabled: true
  },
  state: () => {
    return {
      isLogined: false, // 是否输入formview
      noInvalid: false, // 是否验证过期，默认过期
      defaultcopyformat: {
        formatList: {
          HTML: '<img src="%s" alt="" />',
          MarkDown: '![](%s)',
          URL: '%s',
          Custom: ''
        },
        formatStr: 'URL'
      },
      isshowSetting: false,
      prefixImg: {
        support: [],
        defaultUrl: ''
      },
      setdefaultFile: {
        methods: '1',
        valPt: '',
        valAt: [],
        valTt: ''
      },
      commpressParams: {
        iscompress: false,
        rank: 0.8
      },
      toFile: '',
      openUploadOutMD: false
    }
  },
  getters: {
    // 登录状态
    siginStatus(state) {
      return !state.isLogined
    },
    ShowSetting(state) {
      return state.isshowSetting
    },
    defaultCopy(state) {
      return state.defaultcopyformat.formatStr
    },
    defaultCopyUrl(state) {
      const a_ = state.defaultcopyformat.formatStr
      return state.defaultcopyformat.formatList[a_]
    },
    prefixStatus(state) {
      return state.prefixImg.defaultUrl
    },
    // 图片默认返回
    imgDefaultFile(state) {
      const med = state.setdefaultFile.methods
      switch (med) {
        case '1':
          return state.setdefaultFile.valPt
        case '2':
          return state.setdefaultFile.valAt.join('/') + '/'
        case '3':
          return state.setdefaultFile.valTt
        default:
          return ''
      }
    },
    // 配置默认返回
    defaultFile(state) {
      return state.setdefaultFile
    },
    // 返回压缩图片的配置
    CompressData(state) {
      return state.commpressParams
    },
    // 返回默认上传的文件路径
    DefaultToFile(state) {
      return state.toFile
    },
    defaultCopyType(state) {
      return state.openUploadOutMD
    }
  },
  actions: {
    setShowSettingBtn(e) {
      this.isshowSetting = e
    },
    handleIsLogined(e = null) {
      this.isLogined = !!localStorage.getItem('token_api')
      this.noInvalid = !!localStorage.getItem('authmsg')
      if (this.prefixStatus !== e && e) {
        this.prefixImg.support.map(v => {
          if (v.label === 'host_url') {
            console.log(e)
            v.url = e
          }
          return v
        })
        this.prefixImg.defaultUrl = e
      }
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
      this.setdefaultFile.valTt = o.valTt
    },
    setDefaultCompress(obj) {
      this.commpressParams = obj
    },
    setDefaultToFile(a) {
      this.toFile = a
    },
    // 处理格式问题
    setDefaultFormat(e) {
      this.defaultcopyformat.formatStr = e
    },
    // 设置自定义格式
    setCustomFormat(e) {
      this.defaultcopyformat.formatList.Custom = e
    }
  }
})
export default useStore
