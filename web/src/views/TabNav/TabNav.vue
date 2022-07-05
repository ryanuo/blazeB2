<!--
 * @Author: Harry
 * @Date: 2022-07-01 11:19:24
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-05 15:12:27
 * @FilePath: \web\src\views\TabNav\TabNav.vue
-->
<template>
  <div class="hd-w">
    <!-- <GithubView /> -->
    <div class="logo_w" @click="handleMainLogo">
      <div>
        <img src="/img/logo.svg" title="" />
      </div>
      <span>BlazeB2</span>
    </div>
    <div class="phone-tab">
      <phone-tab />
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
      Copyright ©2021-{{ timeE }} <a href="https://u.mr90.top" target="_blank">u.mr90.top</a> .All Rights Reserved
    </footer>
  </div>
</template>

<script>
import useStore from '@/store' // 引入store
import { mapState, mapActions } from 'pinia'
import LayOut from '@/views/svg/LayOut.vue'
import SignSvg from '@/views/SignSvg.vue'
import { Message, MessageBox } from 'element-ui'
import { debounce } from '../../plugin/filter'
import PhoneTab from './PhoneTab.vue'
export default {
  data() {
    return {
      currentMenu: 'home'
    }
  },
  components: { LayOut, SignSvg, PhoneTab },
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
        this.dialogVisible = true
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
      this.$router.push({ name: 'setting' })
    }, 300, true)
  }
}
</script>

<style lang="less" scoped>
.hd-w {
  .el-menu {
    padding-left: 15%;
    background-color: var(--b2-pre-bg);
  }

  /deep/ .el-menu--horizontal>.el-menu-item.is-active {
    color: var(--bg-text);
  }

  /deep/ .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus {
    background-color: var(--b2-active);
    border-radius: 10px;
  }

  .logo_w {
    position: absolute;
    top: 0;
    left: 2%;
    width: 120px;
    z-index: 1000;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 60px;

    div> {
      flex: auto;

      img {
        width: 100%;
      }
    }

    span {
      flex: 1;
      font-size: 20px;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
  }
}

.phone-tab {
  display: none;
}

@media screen and (max-width: 539px) {
  .el-menu {
    // visibility: hidden;
    display: none;
  }

  .phone-tab {
    position: absolute;
    display: block;
    top: 2%;
    right: 14%;
    // width: 3rem;
    // height: 3rem;
    z-index: 2000;

    /deep/ svg {
      width: 25px;
    }
  }
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 16px;
}

.lay-out {
  position: absolute;
  top: 2%;
  right: 2%;
  width: 25px;
  height: 25px;
  z-index: 2000;
  cursor: pointer;

  .svg {
    width: 100%;
  }
}
</style>
