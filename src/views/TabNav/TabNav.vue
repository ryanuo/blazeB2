<!--
 * @Author: Harry
 * @Date: 2022-07-01 11:19:24
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 20:24:32
 * @FilePath: \dev\src\views\TabNav\TabNav.vue
-->
<template>
  <div class="hd-w">
    <div class="lay-out">
      <SwitchTheme />
    </div>
    <nav class="nav-container" @click="handleNav($event)">
      <span :class="currentMenu === 'home' ? 'is-nav-selected' : ''" data-index="home">首页</span>
      <span :class="currentMenu === 'imanage' ? 'is-nav-selected' : ''" v-if="isLogined"
        data-index="imanage">图床管理</span>
      <div class="logo-wrap">
        <img src="@/icons/logo.svg" data-index="home" title="" />
      </div>
      <span :class="currentMenu === 'setting' ? 'is-nav-selected' : ''" data-index="setting">使用文档</span>
      <span :class="currentMenu === 'about' ? 'is-nav-selected' : ''" data-index="about">关于程序</span>
    </nav>
    <router-view />
    <div v-if="isshowSetting">
      <SettingView />
    </div>
    <footer>
      Copyright ©2021-{{ timeE }} <a href="https://github.com/Rr210/blazeB2" target="_blank"><svg aria-hidden="true"
          height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true"
          class="octicon octicon-mark-github">
          <path fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
          </path>
        </svg>BlazeB2</a> .All Rights
      Reserved
    </footer>
  </div>
</template>

<script>
import useStore from '@/store' // 引入store
import { mapActions, mapState } from 'pinia'
import SwitchTheme from '@/components/switchtheme/SwitchTheme.vue'
import SettingView from '@/components/setting/SettingView.vue'
export default {
  data() {
    return {
      currentMenu: 'home'
    }
  },
  watch: {
    routerName: {
      handler(n, o) {
        if (n !== this.currentMenu) {
          this.currentMenu = n
        }
      }
    }
  },
  components: { SwitchTheme, SettingView },
  mounted() {
    const theme = localStorage.getItem('themeb2')
    if (theme) {
      const dom = document.documentElement
      const t_ = JSON.parse(theme).theme
      if (dom.className !== t_) { document.documentElement.className = t_ }
    }
    this.handleReload()
  },
  computed: {
    timeE() { return (new Date()).getFullYear() },
    ...mapState(useStore, ['isshowSetting']),
    ...mapState(useStore, ['isLogined']), // 映射函数，取出tagslist
    ...mapState(useStore, ['routerName']) // 映射函数，取出tagslist
  },
  methods: {
    ...mapActions(useStore, ['setroutername']),
    // 页面刷新时的nav选中
    handleReload() {
      this.currentMenu = this.$route.name
    },
    // 跳转
    handleNav(e) {
      const name = e.target.dataset.index
      const toname = this.$route.name
      if (name && toname !== name && name !== 'setting') {
        this.$router.push({ name })
        this.currentMenu = name
      }
      if (name === 'setting') {
        window.open('https://blazeb2.js.org')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './tannav.module.less';
</style>
