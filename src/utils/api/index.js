/*
 * @Author: Harry
 * @Date: 2022-07-01 09:21:31
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-07 12:05:53
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
const picList = function (params) {
  return axios.get(LIST_URL, params)
}

/**
 * 图片的删除操作
 */
const deleteitemImg = function (params) {
  return axios.delete(IMG_ITEM_URL, params)
}
/**
 *
 * @param {} prefix
 * 请求图床文件夹
 */
const dataTitleGet = async function (prefix) {
  // const _list = []
  const auth = localStorage.getItem('authmsg')
  const reqParams = {
    startFileName: '', // 获得下一个文件名称，从该名称开始
    maxFileCount: 50, // 获取的数量
    prefix, // 指定文件夹前缀
    delimiter: '/'
  }
  // console.log(prefix)
  const prm = Object.assign(reqParams, JSON.parse(auth))
  const { data: res } = await picList({ params: prm })
  const mz = res.files.filter(v => v.fileName[v.fileName.length - 1] === '/')
  const n = prefix !== '' ? prefix.split('/').slice(-2, 1)[0] : null
  // console.log(n)
  if (mz.length > 0) {
    const a_ = mz.map(v => {
      const val = v.fileName.split('/')
      return { value: val[val.length - 2], label: val[val.length - 2], parentId: n, children: [] }
    })
    return a_
  } else {
    return []
  }
}

export {
  auth, uploadServer, picList, deleteitemImg, dataTitleGet
}
