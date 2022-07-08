/*
 * @Author: Harry
 * @Date: 2022-07-03 12:14:36
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-03 18:29:50
 * @FilePath: \web\src\utils\common\paste.js
 */
const picPaste = function (event, content) {
  let isChrome = false
  if (event.clipboardData || event.originalEvent) {
    // not for ie11  某些chrome版本使用的是event.originalEvent
    const clipboardData = (event.clipboardData || event.originalEvent.clipboardData)
    if (clipboardData.items) {
      // for chrome
      const items = clipboardData.items
      console.log(items)
      const len = items.length
      let blob = null
      isChrome = true
      event.preventDefault()
      // 在items里找粘贴的image,据上面分析,需要循环
      for (let i = 0; i < len; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          blob = items[i].getAsFile()
        }
      }
      if (blob !== null) {
        const reader = new FileReader()
        reader.onload = function (event) {
          // event.target.result 即为图片的Base64编码字符串
          const base64Str = event.target.result
          // 可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
          uploadImgFromPaste(base64Str, content, 'paste', isChrome)
        }
        reader.readAsDataURL(blob)
      }
    } else {
      // for firefox
      setTimeout(function () {
        // 设置setTimeout的原因是为了保证图片先插入到div里，然后去获取值
        const imgList = document.querySelectorAll('#tar_box img')
        const len = imgList.length
        let srcStr = ''
        let i
        for (i = 0; i < len; i++) {
          if (imgList[i].className !== 'my_img') {
            // 如果是截图那么srcStr就是base64 如果是复制的其他网页图片那么srcStr就是此图片在别人服务器的地址
            srcStr = imgList[i].src
          }
        }
        uploadImgFromPaste(srcStr, content, 'paste', isChrome)
      }, 1)
    }
  } else {
    // for ie11
    setTimeout(function () {
      const imgList = document.querySelectorAll('#tar_box img')
      const len = imgList.length
      let srcStr = ''
      let i
      for (i = 0; i < len; i++) {
        if (imgList[i].className !== 'my_img') {
          srcStr = imgList[i].src
        }
      }
      // 调用上传方法
      uploadImgFromPaste(srcStr, content, 'paste', isChrome)
    }, 1)
  }
}
/**
 * 将base64转换为blob
 */
const dataURLtoBlob = function (dataurl) {
  var arr = dataurl.split(',')
  console.log(arr)
  var mime = arr[0].match(/:(.*?);/)[1]
  //   console.log(mime)
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
// 上传方法
const uploadImgFromPaste = function (file, con, type, isChrome) {
//   const formatT = beforeUploadCheck(file)
  const a = dataURLtoBlob(file)
  const b = {}
  b.file = blobToFile(a)
  setTimeout(() => {
    con.UploadFile(b)
  })
  return b
}

/**
* 将blob转换为file
*/
const blobToFile = function (theBlob, fileName = 'ocr1.jpeg') {
  theBlob.lastModifiedDate = new Date()
  theBlob.name = fileName
  return theBlob
}

/**
 * 上传前的文件检查
 */
// const beforeUploadCheck = function (file) {
//   console.log(file)
// }
export {
  picPaste, uploadImgFromPaste, blobToFile
}
