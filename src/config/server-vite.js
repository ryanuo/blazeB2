/*
 * @Author: Harry
 * @Date: 2022-07-30 13:07:29
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-30 13:07:37
 * @FilePath: \dev\src\config\server-vite.js
 */
const server = {
  host: true,
  proxy: {
    '/v1': {
      target: 'http://127.0.0.1:501/', // 对应自己的接口，代理地址修改后必须重启项目
      changeOrigin: true, // 是否允许跨域
      rewrite: (path) => path.replace(/^\/v1/, '')
    }
  }
}

export default server
