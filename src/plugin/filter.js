/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 19:26:33
 * @FilePath: \dev\src\plugin\filter.js
 */
export function transiTime(timestamp) {
  /**
   *  时间戳转时间（10位）
   */
  const date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear()
  const M =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1

  function change(stage) {
    if (stage < 10) {
      return '0' + stage
    } else {
      return stage
    }
  }
  const D = change(date.getDate())
  const h = change(date.getHours()) // 小时
  const m = change(date.getMinutes()) // 分钟
  // const s = change(date.getSeconds()) // 秒
  // return Y + M + D + h + m
  return `${Y}-${M}-${D} ${h}:${m}`
}
// 设置图片信息
export function getImageBase64(img, ext) {
  img.setAttribute('crossorigin', 'Anonymous')
  var canvas = document.createElement('canvas') // 创建canvas DOM元素，并设置其宽高和图片一样
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height) // 使用画布画图
  var dataURL = canvas.toDataURL('image/' + ext) // 返回的是一串Base64编码的URL并指定格式
  canvas = null // 释放
  return dataURL
}
export function getUrlBase64(url, ext, callback) {
  var canvas = document.createElement('canvas') // 创建canvas DOM元素
  var ctx = canvas.getContext('2d')
  var img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = url
  img.onload = function () {
    canvas.height = 60 // 指定画板的高度,自定义
    canvas.width = 85 // 指定画板的宽度，自定义
    ctx.drawImage(img, 0, 0, 60, 85) // 参数可自定义
    var dataURL = canvas.toDataURL('image/' + ext)
    callback.call(this, dataURL) // 回掉函数获取Base64编码
    canvas = null
  }
}

export function downLoadQueue(arr) {
  const data = []
  let sequence = Promise.resolve()
  arr.forEach(function (item) {
    sequence = sequence.then(item).then(r => {
      data.push(r)
      console.log(r)
      return data
    })
  })
  return sequence
}
// 防抖
export function debounce(fn, wait = 500, isImmediate = false) {
  let timerId = null
  let flag = true
  return function () {
    // @ts-ignore
    const context = this
    const args = arguments
    if (timerId) clearTimeout(timerId)
    if (isImmediate) {
      if (flag) {
        fn.apply(context, args)
        flag = false
      }
      timerId = setTimeout(function () {
        flag = true
      }, wait)
    } else {
      timerId = setTimeout(function () {
        fn.apply(context, args)
      }, wait)
    }
  }
}

const deepCopy = (obj) => {
  let target = null
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) { // 数组
      target = []
      obj.forEach(item => {
        target.push(deepCopy(item))
      })
    } else if (obj) {
      target = {}
      const objKeys = Object.keys(obj)
      objKeys.forEach(key => {
        target[key] = deepCopy(obj[key])
      })
    } else {
      target = obj
    }
  } else {
    target = obj
  }
  return target
}

export { deepCopy }

export const useText = `
<a href="https://b2.mr90.top/" >
<img width="100" align="right" alt="blazeB2" src="https://cloud.mr90.top/hexo/4/16533db7-b477-46ec-bbf8-44ae848bc771.png">
</a>

# Blaze B2图床

[![文档](https://img.shields.io/badge/docs-%E6%96%87%E6%A1%A3-blueviolet)](https://blazeb2.js.org/) [![Author](https://img.shields.io/badge/author-Rr210-violet.svg)](https://github.com/Rr210)  [![Release](https://img.shields.io/github/release/Rr210/blazeB2.svg)](https://github.com/Rr210/blazeB2/releases)  [![License](https://img.shields.io/github/license/Rr210/blazeB2.svg)](https://github.com/Rr210/blazeB2/blob/master/LICENSE)  [![Stars](https://img.shields.io/github/stars/Rr210/blazeB2)](https://github.com/Rr210/blazeB2)   [![Issues](https://img.shields.io/github/issues/Rr210/blazeB2)](https://github.com/Rr210/blazeB2/issues)
## 📃 仓库介绍 | Warehouse introduction

> 📷基于 backBlazeb2 API  ⚡ cloudflare 开发的具有 CDN 加速功能的图床工具

- 在线使用 [传送](https://blazeb2.mr90.cf)  | 镜像站点 [传送](https://b2.mr90.top) | 功能展示 [传送](https://www.bilibili.com/video/BV1gB4y1v7qs)
- deploys 文件为项目部署文件 [传送](https://blazeb2.js.org/zh/guide/deploy.html)
## 🎉 功能特点 | Features
- [x] 支持 **拖拽**、**复制粘贴**、**选择文件** 等方式进行选择图片
- [x] 支持 **一键复制** 图片外链支持多种格式(**MarkDown**、**HTML**、**自定义**)
- [x] 支持 **一键部署**（Vercel,ServerLess,Heroku,Docker）[查看部署方法](https://blazeb2.js.org/zh/guide/deploy.html)
- [x] 支持 图片名称 **唯一性** 后端生成uuid字符串，暂不支持自定义名称
- [x] 支持 **显示仓库下所有文件夹名称** 支持自定义默认搜索仓库名
- [x] 支持 **图片压缩** 可自定义压缩等级 默认关闭，开启默认(**0.8**)
- [x] 支持 **批量上传图片**、**批量删除图片** 和 **批量复制图片外链**
- [x] 支持 **图床管理**（对仓库图片的 **增删改查** 放大预览）
- [x] 支持 **自定义上传文件夹** 可自动生成文件夹
- [x] 支持 自定义 **检索** 某个指定文件夹或图片
- [x] 支持 **图片水印** 单张处理上传,**文字 / 图片**
- [x] 支持 **暗夜模式** (自由切换)
- [x] 支持 **PWA**


## 💻 使用教程 | Using the tutorial

- 点击这里查看 [传送门](https://blazeb2.js.org/zh/guide/)

## 🍥 部署方法 | Deployment method

- 支持 vercel 一键部署 [![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=flat&logo=vercel&logoColor=white)](https://blazeb2.js.org/zh/guide/deploy.html#vercel%E4%B8%80%E9%94%AE%E7%A7%92%E9%83%A8%E7%BD%B2)

- 支持 serverless [![serverless](https://img.shields.io/badge/serverless-%23000000.svg?style=flat&logo=serverless&logoColor=white)](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fscf%2Flist-create%3Frid%3D1%26ns%3Ddefault%26createType%3Dempty)

- 支持 heroku 部署 [![heroku](https://img.shields.io/badge/heroku-%23000000.svg?style=flat&logo=heroku&logoColor=white)](https://blazeb2.js.org/zh/guide/deploy.html#heroku-%E9%83%A8%E7%BD%B2)

- 支持 Docker 部署 [![docker](https://img.shields.io/badge/docker-%23000000.svg?style=flat&logo=docker&logoColor=white)](https://blazeb2.js.org/zh/guide/deploy.html#%E5%9F%BA%E4%BA%8Edocker-nginx-%E9%83%A8%E7%BD%B2)
## 📸 预览 | preview

<details>
<summary>点击展开</summary>

<table>
<tr>
<td>
<strong>上传图片</strong>
</td>
<td>
<img src="https://cloud.mr90.top/hexo/5/d15c17f1-b06f-4560-a363-dd9adce488b2.gif" />
</td>
</tr>
<tr>
<td>
<strong>水印上传</strong>
</td>
<td>
<img src="https://cloud.mr90.top/hexo/5/c8f15ba7-b934-4ef6-afb2-22dd472fb4d2.gif" />
</td>
</tr>
<tr>
<td>
<strong>图床管理</strong>
</td>
<td>
<img src="https://cloud.mr90.top/hexo/5/1d146393-3012-4b55-8083-01b8c0e562c8.gif" />
</td>
</tr>
</table>
</details>

## ⭐ 历史star | Star History

![Star History Chart](https://api.star-history.com/svg?repos=Rr210/blazeB2&type=Date)


## ✨ 贡献 | Contribution

欢迎各种形式的贡献，包括但不限于：美化界面、增加功能、改进代码、 修复 Bug 等

<a href="https://github.com/rr210/blazeB2/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rr210/blazeB2" />
</a>

## 🎃 反馈 | Feedback

在使用过程中，如遇问题，请仔细阅读 **[文档](https://blazeb2.js.org)** ，或给作者提 **[Issue](https://github.com/rr210/blazeB2/issues)**

## 💿 许可 | License

**[Apache License 2.0](https://github.com/Rr210/blazeB2/blob/master/LICENSE)** 

Copyright © 2022-Present blazeB2
`
