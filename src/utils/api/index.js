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
    // _list.push(...a_)
    // // 深拷贝
    // const listCopy = JSON.parse(JSON.stringify(_list))
    // const treeList = dkFn(listCopy, 'label')
    // console.log(treeList)
    // localStorage.setItem('treeList', JSON.stringify(treeList))
    return a_
  } else {
    return []
  }
}

/**
 * 递归计算
 * 数据转换为树形（递归），示例：toTreeByRecursion(source, 'id', 'parentId', null, 'children')
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
const dkFn = function (data, id, parentId, children) {
  // 删除所有的children,以防多次调用
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  }

  var childrenListMap = {}
  var nodeIds = {}
  var tree = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }

  return tree
}

/**
 * 保存文件夹
 */
// const saveFileOptions = function (level, label, params) {
//   if (list_ === []) {
//     list_ = params
//   } else {
//     for (const i of list_) {
//       console.log(i.label, label)
//       console.log(i.label === label)
//       if (i.label === label) {
//         i.children = params
//         // console.log(i)
//       }
//     }
//   }
//   console.log(list_)
// saveFileOptions
// }
export {
  auth, uploadServer, picList, deleteitemImg, dataTitleGet, dkFn
}
