/*
 * @Author: Ryanuo
 * @Date: 2022-07-31 11:12:10
 * @LastEditors: ryanuo
 * @Github: https://github.com/ryanuo
 * @LastEditTime: 2022-07-31 12:37:11
 * @FilePath: \dev\docs\docs\.vitepress\configs\markdown.js
 */
import mdItCustomAttrs from 'markdown-it-custom-attrs'
export const markdown = {
    // options for markdown-it-toc-done-right
    toc: { level: [1, 2, 3] },

    config: (md) => {
        // use more markdown-it plugins!
        md.use(mdItCustomAttrs, 'image', {
            'data-fancybox': "gallery"
        })
    }
}
