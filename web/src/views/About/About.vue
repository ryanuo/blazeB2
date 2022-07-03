<!--
 * @Author: Harry
 * @Date: 2022-07-01 14:18:36
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-03 11:56:55
 * @FilePath: \web\src\views\About\About.vue
-->
<template>
  <div class="common-container">
    <div style="text-align: center;">
      <img src="img/logo.svg" alt="" srcset="">
      <h1 class="main-title">BlazeB2 图床</h1>
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
        { link: 'https://github.com/Rr210', alt: 'Author', svgpic: 'https://img.shields.io/badge/author-Rr210-violet.svg' },
        { link: 'https://m.mr90.top/blazeB2/', alt: 'docs', svgpic: 'https://img.shields.io/badge/docs-%E6%96%87%E6%A1%A3-blueviolet' },
        { link: 'https://github.com/Rr210/blazeB2/releases', alt: 'Release', svgpic: 'https://img.shields.io/github/release/Rr210/blazeB2.svg' },
        { link: 'https://github.com/Rr210/blazeB2/blob/master/LICENSE', alt: 'License', svgpic: 'https://img.shields.io/github/license/Rr210/blazeB2.svg' },
        { link: 'https://github.com/Rr210/blazeB2', alt: 'Stars', svgpic: 'https://img.shields.io/github/stars/Rr210/blazeB2' },
        { link: 'https://github.com/Rr210/blazeB2/issues', alt: 'Issues', svgpic: 'https://img.shields.io/github/issues/Rr210/blazeB2' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.main-title {
  margin: 1.8rem auto;
  font-size: 3rem;
}

.p-shield {
  a {
    padding: 5px;

    img {
      margin: 7px 0;
    }
  }
}
</style>
