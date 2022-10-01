/*
 * @Author: Harry
 * @Date: 2022-07-30 21:56:16
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-10-01 21:45:47
 * @FilePath: \dev\docs\.vitepress\config.js
 */
import { sidebar, nav, head, markdown } from './configs/index'
export default {
    // 网站标题
    title: 'Blazeb2 图床',
    // 网站描述
    description: '📷基于 backBlazeb2 API & ⚡ cloudflare 开发的具有 CDN 加速功能的图床工具',
    head,
    markdown,
    themeConfig: {
        // 顶部右上角导航
        nav,
        // 左侧导航
        sidebar,
        logo: '/img/logo.svg',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/rr210/blazeb2' }
        ],
        algolia: {
            apiKey: '96df3907aa74556f4746511deee28203',
            indexName: 'BlazeB2',
        },
        //丝滑滚动
        smoothScroll: true,
        // 启用时间线
        editLinks: true,
        //在git上编辑提示文字
        editLinkText: '在 GitHub 上编辑此页',
        // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
        lastUpdated: '上次更新',
        footer: {
            message: 'Released under the Apache License 2.0.',
            copyright: 'Copyright © 2021-present Harry'
        }
    }
}
