/*
 * @Author: Harry
 * @Date: 2022-07-06 11:30:24
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-06 11:30:26
 * @FilePath: \master\docs\docs\.vuepress\theme\index.js
 */
const { defaultTheme } = require('@vuepress/theme-default')
const { path } = require('@vuepress/utils')

/**
 * 继承 VuePress 默认主题，并在 page-bottom 插槽中显示评论区
 * https://v2.vuepress.vuejs.org/zh/reference/default-theme/extending.html
 */
module.exports = (options) => {
  return {
    name: 'vuepress-theme-twikoo',
    extends: defaultTheme(options),
    layouts: {
      Layout: path.resolve(__dirname, 'Layout.vue'),
    }
  }
}