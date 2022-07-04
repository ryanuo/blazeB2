/*
 * @Author: Harry
 * @Date: 2022-07-01 09:21:31
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-04 18:03:05
 * @FilePath: \web\src\utils\api\index.js
 */
import axios from '../http'

const AUTH_URL = '/auth'
const UPLOAD_URL = '/upload'
const LIST_URL = '/list'
const IMG_ITEM_URL = '/img'
// 登录授权接口
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
/**
 * 图床列表
 */
const picList = function(params) {
  return axios.get(LIST_URL, params)
}

/**
 * 图片的删除操作
 */
const deleteitemImg = function(params) {
  return axios.delete(IMG_ITEM_URL, params)
}

export {
  auth, uploadServer, picList, deleteitemImg
}
