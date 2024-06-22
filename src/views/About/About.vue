<!--
 * @Author: Ryanuo
 * @Date: 2022-07-01 14:18:36
 * @LastEditors: ryanuo
 * @Github: https://github.com/ryanuo
 * @LastEditTime: 2023-07-02 21:26:07
 * @FilePath: \blazeB2\src\views\About\About.vue
-->
<template>
  <div class="common-container">
    <div style="text-align: center;">
      <img src="/img/icons/logo.svg" alt="" srcset="">
      <h1 class="main-title">BlazeB2 图床</h1>
      <p class="p-simple">📷基于 backBlazeb2 API & ⚡ cloudflare 开发的具有 CDN 加速功能的图床工具</p>
      <p class="p-statement">郑重声明：请勿通过本站上传违反你当地法律的图片，所造成的一切后果与本站无关。</p>
      <p class="p-shield">
        <a v-for="item in shieldsList" :key="item.alt" :href="item.link" target="_blank" rel="noopener noreferrer"><img
            :src="item.svgpic" :alt="item.alt">
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shieldsList: [
        { link: 'https://github.com/ryanuo', alt: 'Author', svgpic: 'https://img.shields.io/badge/author-ryanuo-violet.svg' },
        { link: 'https://blazeb2.js.org/', alt: 'docs', svgpic: 'https://img.shields.io/badge/docs-%E6%96%87%E6%A1%A3-blueviolet' },
        { link: 'https://github.com/ryanuo/blazeB2/releases', alt: 'Release', svgpic: 'https://img.shields.io/github/release/ryanuo/blazeB2.svg' },
        { link: 'https://github.com/ryanuo/blazeB2/blob/master/LICENSE', alt: 'License', svgpic: 'https://img.shields.io/github/license/ryanuo/blazeB2.svg' },
        { link: 'https://github.com/ryanuo/blazeB2', alt: 'Stars', svgpic: 'https://img.shields.io/github/stars/ryanuo/blazeB2' },
        { link: 'https://github.com/ryanuo/blazeB2/issues', alt: 'Issues', svgpic: 'https://img.shields.io/github/issues/ryanuo/blazeB2' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import 'about.module.less';
</style>
