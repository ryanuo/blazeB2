<!--
 * @Author: Harry
 * @Date: 2022-07-05 10:13:22
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-05 11:25:29
 * @FilePath: \blazeB2\docs\docs\.vuepress\components\b2comments.vue
-->
<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>

<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import md5 from 'blueimp-md5'
export default {
  mounted() {
    const commentConfig = {
      clientID: 'dc1841ca4ef4392434ea',
      clientSecret: '44b67d3ac701dcaa2313ea6698e2c3c296c4c562',
      repo: 'rr210.github.io',
      owner: 'rr210',
      admin: ['rr210'],
      id: md5(location.pathname)
    };
    const gitalk = new Gitalk(commentConfig);
    gitalk.render('gitalk-container');
  }
};
</script>