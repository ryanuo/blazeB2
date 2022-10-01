<!--
 * @Author: Harry
 * @Date: 2022-07-31 20:52:35
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-31 21:12:27
 * @FilePath: \dev\docs\docs\.vitepress\theme\components\Comment.vue
-->
<template>
  <div id="gitalk-container"></div>
</template>

<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
export default {
  name: "blog-comments",
  mounted() {
    const commentConfig = {
      // 是否开启
      enable: true,
      // clientID
      clientID: "015c12dc1e5de1413425",
      // clientSecret
      clientSecret: "4c4dcc532189d7716296c80cebe6775e9557f70f",
      // 评论项目名
      repo: 'blazeb2',
      owner: 'rr210',
      admin: ['rr210'],
      githubID: 'rr210',
      id: decodeURI(window.location.pathname),
      language: 'zh-CN',
      distractionFreeMode: true
    };
    const gitalk = new Gitalk(commentConfig);
    gitalk.render("gitalk-container");
  },
};
</script>