/*
 * @Author: Harry
 * @Date: 2022-07-02 10:00:55
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-05 21:41:09
 * @FilePath: \docs\docs\.vuepress\config.ts
 */
import { defineUserConfig } from 'vuepress'
const { path } = require('@vuepress/utils')
const { defaultTheme } = require('vuepress')
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const str_ = process.env.npm_config_argv
const linkout = str_!.match(/(dev)/)! ? '/' : '/blazeB2/'
// import './enhanceApp.js'
console.log('当前的环境路径为:' + linkout)
export default defineUserConfig({
    lang: 'zh-CN',
    title: 'BlazeB2 图床',
    description: '基于 backBlazeb2 API & cloudflare 开发的具有 CDN 加速功能的图床工具',
    base: linkout,
    head: [
        [
            'link', { rel: 'icon', href: `${linkout}favicon.ico` }
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
            apiKey: 'b33f513f74064f76939843da6ad00b52',
            indexName: 'BlazeB2',
            appId: 'NMU3PE3UD9'
        }),
        registerComponentsPlugin({
            components: {
                Comments: path.resolve(__dirname, './components/b2comments.vue'),
            },
        })
    ],
    theme: defaultTheme({
        navbar: [
            {
                text: '在线使用',
                link: 'https://blaze-b2.vercel.app/'
            },
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
