/*
 * @Author: Harry
 * @Date: 2022-07-03 08:59:18
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-29 20:27:53
 * @FilePath: \dev\src\utils\common\login.js
 */
import { auth } from '@/utils/api'
import { Notification } from 'element-ui'
import useStore from '../../store'
function authIsexit(fn = null) {
  return new Promise((resolve, reject) => {
    const authmsg = localStorage.getItem('authmsg')
    const token = localStorage.getItem('token_api')
    if (authmsg) {
      const currentT = new Date()
      const t_ = JSON.parse(authmsg)
      // 过期时间定为23小时
      if (currentT.getTime() - t_.time > 82800 * 1000) {
        localStorage.removeItem('authmsg')
        setAuthStorage(token).then(() => {
          resolve()
        })
      } else {
        resolve()
      }
    } else {
      setAuthStorage(token).then(() => {
        resolve()
      }).catch((res) => {
        Notification({
          title: '提示',
          message: `状态码:${res.status},错误信息：${res.message},请检查keyid和key是否填写正确`,
          type: 'error'
        })
        console.log(res)
      })
    }
  })
}
// 设置授权信息缓冲
async function setAuthStorage(token) {
  const fdata = JSON.parse(token)
  console.log(fdata)
  const { data: res } = await auth(fdata)
  if (res.bucketId) {
    const urlList = {
      // s3ApiUrl: `https://${fdata.bucket_name}.${res.s3ApiUrl.replace('https://', '')}`,
      // downloadUrl: res.downloadUrl,
      api_url: res.api_url,
      host_url: fdata.host_url
    }
    const sdata = {
      uploadUrl: res.uploadUrl,
      authorizationToken: res.authorizationToken,
      bucketId: res.bucketId,
      init_token: res.init_token,
      time: (new Date()).getTime()
    }
    const resStorData = Object.assign(sdata, urlList)
    setPrefixImg(urlList, fdata.host_url)
    localStorage.setItem('authmsg', JSON.stringify(resStorData))
    useStore().handleIsLogined()
  }
}

/**
 * 设置全局图片前缀
 */
const setPrefixImg = function (obj, defu) {
  const l_ = []
  const store = useStore()
  if (store.prefixImg.defaultUrl === '') {
    for (const i of Object.entries(obj)) {
      l_.push({ label: i[0], url: i[1] })
    }
    const prefixImg = {
      support: l_,
      defaultUrl: defu
    }
    store.setprefixImg(prefixImg)
  }
}

export {
  authIsexit, setAuthStorage
}
