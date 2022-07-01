/*
 * @Author: Harry
 * @Date: 2022-07-01 09:21:31
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-01 09:26:34
 * @FilePath: \web\src\utils\api\index.js
 */
import axios from '../http'
// 登录授权接口
const AUTH_URL = '/auth'
const UPLOAD_URL = '/upload'
const auth = function (data) {
  return axios.post(AUTH_URL, data)
}
// 上传文件的接口
const uploadServer = function (data) {
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  return axios.post(UPLOAD_URL, data, { headers })
}
export {
  auth, uploadServer
}
