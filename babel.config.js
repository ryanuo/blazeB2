/*
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-04-20 21:46:48
 * @FilePath: \webcli\babel.config.js
 */
// 项目在发布时需要用到的babel插件数组
const proPlugins = []
// 如果当前是生产环境，则使用去掉console的插件
if (process.env.NODE_ENV === 'pro') {
  proPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...proPlugins
  ]
}
