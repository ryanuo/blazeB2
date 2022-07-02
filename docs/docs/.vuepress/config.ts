/*
 * @Author: Harry
 * @Date: 2022-07-02 10:00:55
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-02 22:51:24
 * @FilePath: \docs\docs\.vuepress\config.ts
 */
import { defineUserConfig } from 'vuepress'
const { defaultTheme } = require('vuepress')
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')
export default defineUserConfig({
    lang: 'zh-CN',
    title: 'blazeB2 图床',
    description: '这是我的第一个 VuePress 站点',
    base: "/blazeB2/",
    head: [
        [
            'link', { rel: 'icon', href: './favicon.ico' }
        ]
    ],
    locales: {
        '/en/': {
            lang: 'en-US',
        },
        '/zh/': {
            lang: 'zh-CN',
        },
    },
    plugins: [
        docsearchPlugin({
            // 配置项
        }),
    ],
    theme: defaultTheme({
        navbar: [
            {
                text: 'Github',
                link: 'https://github.com/Rr210/blazeB2'
            }
        ],

        locales: {
            '/en/': {
                selectLanguageName: 'English',
            },
            '/zh/': {
                selectLanguageName: '简体中文',
            },
        },
        sidebar: [
            // SidebarItem
            '/zh/guide/summary', '/zh/guide/', '/zh/guide/page/', '/zh/guide/deploy/', '/zh/guide/config/', '/zh/guide/contribution'
        ],
    })
})
