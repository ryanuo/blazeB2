<!--
 * @Author: Harry
 * @Date: 2022-07-01 11:19:24
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-09 13:54:00
 * @FilePath: \master\src\views\TabNav\TabNav.vue
-->
<template>
  <div class="hd-w">
    <!-- <GithubView /> -->
    <div class="logo_w" @click="handleMainLogo">
      <div>
        <img src="img/logo.svg" title="" />
      </div>
      <span>BlazeB2</span>
    </div>
    <div class="lay-out">
      <div v-if="isLogined" @click="openhandle">
        <LayOut />
      </div>
      <div v-else @click="tapLoginPage">
        <SignSvg />
      </div>
    </div>
    <!-- background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b" -->
    <el-menu :default-active="$route.name" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item v-if="isLogined" index="imanage">图床管理</el-menu-item>
      <el-menu-item index="setting">配置管理</el-menu-item>
      <el-menu-item index="about">关于程序</el-menu-item>
    </el-menu>
    <router-view />
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
import { mapState, mapActions } from 'pinia'
import LayOut from '@/views/svg/LayOut.vue'
import SignSvg from '@/views/svg/SignSvg.vue'
import { Message, MessageBox } from 'element-ui'
import { debounce } from '../../plugin/filter'
export default {
  data() {
    return {
      currentMenu: 'home'
    }
  },
  components: { LayOut, SignSvg },
  mounted() {
    this.handleIsLogined()
    const theme = localStorage.getItem('themeb2')
    if (theme) {
      const dom = document.documentElement
      const t_ = JSON.parse(theme).theme
      if (dom.className !== t_) { document.documentElement.className = t_ }
    }
  },
  computed: {
    timeE() { return (new Date()).getFullYear() },
    ...mapState(useStore, ['isLogined']) // 映射函数，取出tagslist
  },
  methods: {
    handleMainLogo() {
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' })
      }
    },
    ...mapActions(useStore, ['handleIsLogined']),
    openhandle() {
      MessageBox({
        title: '提示',
        message: '此操作将删除本地缓冲信息, 是否继续?',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token_api')
        localStorage.removeItem('authmsg')
        localStorage.removeItem('pinia-store')
        this.handleIsLogined()
      }).then(() => {
        Message({
          type: 'success',
          message: '缓冲清除成功,已退出!'
        })
      })
    },
    // 跳转登录页面
    tapLoginPage: debounce(function () {
      if (this.$route.name !== 'setting') {
        this.$router.push({ name: 'setting', query: { id: '1' } })
      }
    }, 300, true)
  }
}
</script>

<style lang="less" scoped>
@import './tannav.module.less';
</style>
