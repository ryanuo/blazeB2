/*
 * @Author: Harry
 * @Date: 2022-07-16 20:35:30
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-29 20:24:43
 * @FilePath: \dev\src\plugin\htmlcav.js
 */
import html2canvas from 'html2canvas'
export const doCut = function (shareDom, state) {
  console.log(shareDom.offsetHeight)
  return new Promise((resolve, reject) => {
    html2canvas(shareDom, {
      dpi: window.devicePixelRatio * 2,
      scale: 1,
      allowTaint: true,
      useCORS: true,
      height: shareDom.offsetHeight - 2,
      width: shareDom.offsetWidth,
      scrollY: 0,
      scrollX: 0
    }).then((canvas) => {
      const img = new Image()
      img.src = canvas.toDataURL('png')
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = function () {
        const imgUrl = canvas.toDataURL('image/png')
        // console.log(imgUrl)
        state.imageUrl = imgUrl
        //   console.log(imgUrl)
        const blob = base64ToBlob(imgUrl)
        resolve(blob)
        //   saveFile(imgUrl, 'test.png')
        // 根据生成的图片地址imgUrl（base64）进行后续保存操作
      }
    })
  })
}

function base64ToBlob(base64) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
