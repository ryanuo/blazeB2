/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-04-20 21:00:47
 * @FilePath: \webcli\src\plugin\filter.js
 */
export function transiTime(timestamp) {
  /**
   *  时间戳转时间（10位）
   */
  const date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
