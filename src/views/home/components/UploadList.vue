<!--
 * @Author: Harry
 * @Date: 2022-07-15 16:42:08
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-15 22:14:31
 * @FilePath: \dev\src\views\home\components\UploadList.vue
-->
<template>
  <div class="upload-part">
    <ul class="upload-wrap">
      <li class="upload-i" :style="styleCount(index) ? 'width:97.2%' : ''" v-for="(item, index) in fileList"
        :key="item.uid">
        <img data-fancybox="gallery" :src="picBlob(item.raw)" alt="" srcset="">
        <div>
          <h2 class="up_title">{{ item.name }}</h2>
          <svg t="1657877004609" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1342" width="22" height="22">
            <path
              d="M783 312.5v510c0 16.6-13.4 30-30 30H273c-16.6 0-30-13.4-30-30v-510h540m60-60H183v600c0 33.1 26.9 60 60 60h540c33.1 0 60-26.9 60-60v-600z"
              fill="var(--b2-close)" p-id="1343"></path>
            <path
              d="M333 251v-78h360v78H333m-60 60h420c33.1 0 60-26.9 60-60v-78c0-33.1-26.9-60-60-60H333c-33.1 0-60 26.9-60 60v138z"
              fill="var(--b2-close)" p-id="1344"></path>
            <path
              d="M882 252H145c-16.6 0-30 13.4-30 30s13.4 30 30 30h737c16.6 0 30-13.4 30-30s-13.4-30-30-30zM392.8 432.5h60v300h-60zM572.8 432.5h60v300h-60z"
              fill="var(--b2-close)" p-id="1345"></path>
          </svg>
          <div class="config-warp">
            <span>压缩配置</span>
            <span @click="setwarterMark(index)">水印设置</span>
          </div>
          <div><span></span><span></span></div>
        </div>
      </li>
    </ul>
    <div v-if="isShowWm">
      <div class="wm-contaniner" @click.self="handleClose(false)">
        <Wmarkview @uninstall="handleClose" :file="fileList[currentfileIndex]" />
      </div>
    </div>
  </div>
</template>

<script>
import Wmarkview from './wm/wmarkview.vue'
export default {
  data() {
    return {
      isShowWm: false,
      currentfileIndex: 0
    }
  },
  computed: {
    picBlob() {
      return function (item) {
        return window.URL.createObjectURL(item)
      }
    },
    styleCount() {
      const len = this.fileList.length
      return function (index) {
        if (len === 1) return true
        console.log(index === len - 1 && index % 2 !== 0)
        if (index === len - 1 && index % 2 === 0) return true
        return false
      }
    },
    fileListTo() {
      return this.fileList.map((v) => {
        return window.URL.createObjectURL(v.raw)
      })
    }
  },
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: { Wmarkview },
  methods: {
    handleClose(status) {
      this.isShowWm = status
    },
    setwarterMark(index) {
      this.isShowWm = true
      this.currentfileIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
@import './upload.module.less';
</style>
