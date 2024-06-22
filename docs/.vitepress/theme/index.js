/*
 * @Author: Ryanuo
 * @Date: 2022-07-31 09:02:02
 * @LastEditors: ryanuo
 * @Github: https://github.com/ryanuo
 * @LastEditTime: 2022-07-31 21:24:17
 * @FilePath: \dev\docs\docs\.vitepress\theme\index.js
 */
import DefaultTheme from '../theme-default'
import Comment from './components/Comment.vue';
import './css/index.css'
export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        // 注册组件
        app.component("Comment", Comment);
    }
}
