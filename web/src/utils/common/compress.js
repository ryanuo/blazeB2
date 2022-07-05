/*
 * @Author: Harry
 * @Date: 2022-07-05 12:33:10
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-05 15:58:07
 * @FilePath: \web\src\utils\common\compress.js
 */
import Compressor from 'compressorjs'
const HandleCompressor = function (file, quality, func, params) {
  /**
   * file：图片文件
   * quality: 图片质量
   * func：执行上传方法
   * params: 传递的信息消息体
   */
  const res = new Compressor(file, {
    quality,
    success(result) {
      console.log(result)
      func(result, params)
    },
    error(err) {
      console.log(err.message)
    }
  })
  return res
}

export {
  HandleCompressor
}
