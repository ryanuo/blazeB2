/*
 * @Author: Harry
 * @Date: 2022-07-02 10:00:55
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-11 13:39:09
 * @FilePath: \dev\docs\docs\.vuepress\config.ts
 */
import { defineUserConfig } from 'vuepress'
const { path } = require('@vuepress/utils')
// const { defaultTheme } = require('vuepress')
const BlazeTheme = require('./theme')
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const str_ = process.env.npm_config_argv
const linkout = str_!.match(/(dev)/)! ? '/' : '/'
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
        '/en': {
            lang: 'English',
        },
        '/zh/': {
            lang: 'zh-CN',
        },
    },
    plugins: [
        docsearchPlugin({
            apiKey: '96df3907aa74556f4746511deee28203',
            indexName: 'BlazeB2',
            appId: 'NMU3PE3UD9',
            algoliaOptions: {
                hitsPerPage: 10,
                facetFilters: ""
            }
        }),
        registerComponentsPlugin({
            components: {
                Comments: path.resolve(__dirname, './components/b2comments.vue'),
            },
        })
    ],
    theme: BlazeTheme({
        navbar: [
            {
                text: 'Online Use',
                link: 'https://b2.mr90.top/'
            },
            {
                text: 'Github',
                link: 'https://github.com/Rr210/blazeB2'
            }
        ],
        locales: {
            '/en/': {
                selectLanguageName: 'English',
                sidebar: [
                    // SidebarItem
                    '/en/guide/summary', '/en/guide/', '/en/guide/page/', '/en/guide/deploy/', '/en/guide/config/', '/en/guide/contribution'
                ],
            },
            '/zh/': {
                selectLanguageName: '简体中文',
                sidebar: [
                    // SidebarItem
                    '/zh/guide/summary', '/zh/guide/', '/zh/guide/page/', '/zh/guide/deploy/', '/zh/guide/config/', '/zh/guide/contribution'
                ],
            },
        },
    })
})
