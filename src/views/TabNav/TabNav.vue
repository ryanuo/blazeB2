
<template>
  <div class="hd-w">
    <div :class="isMobile ? 'lay-out-mobile' : 'lay-out'">
      <SwitchTheme :isMobile="isMobile" />
    </div>
    <nav class="nav-container" @click="handleNav($event)">
      <span :class="currentMenu === 'home' ? 'is-nav-selected' : ''" data-index="home">首页</span>
      <span :class="currentMenu === 'imanage' ? 'is-nav-selected' : ''" v-if="isLogined" data-index="imanage">图床管理</span>
      <div class="logo-wrap">
        <img src="/img/icons/logo.svg" data-index="home" title="" />
      </div>
      <span :class="currentMenu === 'setting' ? 'is-nav-selected' : ''" data-index="setting">使用文档</span>
      <span :class="currentMenu === 'about' ? 'is-nav-selected' : ''" data-index="about">关于程序</span>
    </nav>
    <router-view />
    <SettingView />
    <footer>
      Copyright ©2021-{{ timeE }} <a style="text-decoration : none" href="https://u.ryanuo.cc" target="_blank"
        rel="noopener noreferrer">Ryanuo</a> Dev.
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
      currentMenu: 'home',
      disappear: false,
      isMobile: false
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
    this.getIsMobile()

    window.addEventListener('resize', this.getIsMobile)
    if (theme) {
      const dom = document.documentElement
      const t_ = JSON.parse(theme).theme
      if (dom.className !== t_) { document.documentElement.className = t_ }
    }
    this.handleReload()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getIsMobile)
  },
  computed: {
    timeE() { return (new Date()).getFullYear() },
    ...mapState(useStore, ['isLogined']), // 映射函数，取出tagslist
    ...mapState(useStore, ['routerName']) // 映射函数，取出tagslist
  },
  methods: {
    ...mapActions(useStore, ['setroutername']),
    // 页面刷新时的nav选中
    handleReload() {
      this.currentMenu = this.$route.name
    },
    getIsMobile() {
      this.isMobile = window.screen.availWidth < 768
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
