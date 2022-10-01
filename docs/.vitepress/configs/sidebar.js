/*
 * @Author: Harry
 * @Date: 2022-07-30 21:57:08
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-31 14:11:58
 * @FilePath: \dev\docs\docs\.vitepress\configs\sidebar.js
 */
// const { getPath } = require('./utils')

export const sidebar = {
    '/guide/': getGuideSidebar()
}
function getGuideSidebar() {
    return [
        {
            text: '文档指南',
            collapsible: true,
            // collapsed: true,
            items: [
                { text: '概述', link: '/guide/summary' },
                { text: '开始使用', link: '/guide/prepare' },
                { text: '环境配置', link: '/guide/environment' },
                { text: '图床配置', link: '/guide/config' }
            ]
        },
        {
            text: '项目部署',
            collapsible: true,
            // collapsed: true,
            items: [
                { text: 'Vercel部署', link: '/guide/deploy/vercel' },
                { text: 'Docker部署', link: '/guide/deploy/docker' },
                { text: 'Heroku部署', link: '/guide/deploy/heroku' },
                { text: 'Serverless部署', link: '/guide/deploy/serverless' }
            ]
        },
        {
            text: '贡献指南',
            collapsible: true,
            // collapsed: true,
            items: [
                { text: '开始贡献', link: '/guide/contribution/start' },
                { text: '常见问题', link: '/guide/contribution/issue' },
                { text: '关于更新', link: '/guide/contribution/update' }
            ]
        }
    ]
}

