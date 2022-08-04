<template>
  <div class="switch-theme-wrap">
    <div>
      <button v-if="isLogined" @click="openhandle">
        <LayOut />
      </button>
      <button v-else @click="tapLoginPage">
        <SignSvg />
      </button>
    </div>
    <div @click="handleSetting">
      <button>
        <SettingSvg />
      </button>
    </div>
    <div @click="handleThemeChange" style="display:inline-block">
      <button v-if="isLight">
        <VPIconSun />
      </button>
      <button v-else>
        <VPIconMoon />
      </button>
    </div>
    <button @click="handleTogGithub">
      <VPIconGitHub />
    </button>
  </div>
</template>

<script>
import VPIconMoon from '@/views/svg/VPIconMoon.vue'
import VPIconSun from '@/views/svg/VPIconSun.vue'
import VPIconGitHub from '@/views/svg/VPIconGitHub.vue'
import LayOut from '@/views/svg/LayOut.vue'
import SignSvg from '@/views/svg/SignSvg.vue'
import { mapActions, mapState } from 'pinia'
import useStore from '@/store'
import { Message, MessageBox } from 'element-ui'
import { debounce } from '@/plugin/filter'
import SettingSvg from '@/views/svg/SettingSvg.vue'
export default {
  components: { VPIconMoon, VPIconSun, VPIconGitHub, LayOut, SignSvg, SettingSvg },
  data() {
    return {
      isLight: true,
      disappear: false
    }
  },
  mounted() {
    this.handleIsLogined()
    const theme = localStorage.getItem('themeb2')
    this.isLight = theme ? JSON.parse(theme).theme !== 'dark' : true
  },
  computed: {
    ...mapState(useStore, ['isLogined']) // 映射函数，取出tagslist
  },
  methods: {
    ...mapActions(useStore, ['handleIsLogined']),
    ...mapActions(useStore, ['setShowSettingBtn']),
    handleSetting() {
      this.setShowSettingBtn(true)
      // this.disappear = true
    },
    handleSelect(e) {
      const dom = document.documentElement
      dom.className = e
      localStorage.setItem('themeb2', JSON.stringify({ theme: e }))
    },
    handleTogGithub() {
      window.open('https://github.com/Rr210/blazeB2')
    },
    handleThemeChange() {
      this.isLight = !this.isLight
      const item = this.isLight ? '' : 'dark'
      this.handleSelect(item)
    },
    openhandle() {
      MessageBox({
        title: '提示',
        message: '此操作将删除本地缓冲信息, 是否继续?',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning'
      }).then(() => {
        this.handleIsLogined()
        localStorage.removeItem('token_api')
        localStorage.removeItem('authmsg')
        localStorage.removeItem('pinia-store')
      }).then(() => {
        Message({
          type: 'success',
          message: '缓冲清除成功,已退出!'
        })
      })
    },
    // 跳转登录页面
    tapLoginPage: debounce(function () {
      this.handleSetting()
    }, 300, true)
  }
}
</script>

<style lang="less" scoped>
.switch-theme-wrap {
  display: flex;

  button {
    border: 1px solid #d4d4d4;
    background-color: transparent;
    outline: none;
    margin-left: 12px;
    width: 28px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    box-sizing: border-box;
    padding: 0;
    padding-top: 3px;
    border-radius: 8px;

    &:hover {
      border-color: var(--b2-theme-c);
    }

    svg {
      // margin-left: 12px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
