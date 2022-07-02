/*
 * @Author: Harry
 * @Date: 2022-07-02 10:00:55
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-02 18:24:27
 * @FilePath: \docs\docs\.vuepress\config.ts
 */
import { defineUserConfig } from 'vuepress'
const { defaultTheme } = require('vuepress')
export default defineUserConfig({
    lang: 'zh-CN',
    title: 'blazeB2 图床',
    description: '这是我的第一个 VuePress 站点',
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
            '/zh/guide/', '/zh/guide/page/', '/zh/guide/config/'
        ],
    })
})
