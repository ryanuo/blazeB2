/*
 * @Author: Harry
 * @Date: 2022-07-03 08:59:18
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-03 11:10:00
 * @FilePath: \web\src\utils\common\login.js
 */
import { auth } from '@/utils/api'
import { Notification } from 'element-ui'
function authIsexit() {
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
    console.log(1)
    const sdata = {
      uploadUrl: res.uploadUrl,
      authorizationToken: res.authorizationToken,
      bucketId: res.bucketId,
      api_url: res.api_url,
      init_token: res.init_token,
      s3ApiUrl: res.s3ApiUrl,
      downloadUrl: res.downloadUrl,
      time: (new Date()).getTime()
    }
    localStorage.setItem('authmsg', JSON.stringify(sdata))
  }
}

export {
  authIsexit, setAuthStorage
}
