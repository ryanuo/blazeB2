<!--
 * @Author: Harry
 * @Date: 2022-07-04 21:11:48
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-04 15:31:47
 * @FilePath: \dev\src\views\svg\MarkDown.vue
-->
<template>
  <div class="mark-w">
    <el-tooltip class="item" effect="dark" :content="isMark ? '切换到普通链接模式' : '切换到MarkDown模式'" placement="top-start">
      <svg @click="handleMark" v-if="isMark" t="1631784688556" class="markdown-icon active" viewBox="0 0 1280 1024"
        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3242" width="22" height="22">
        <path
          d="M1187.6 118.2H92.4C41.4 118.2 0 159.6 0 210.4v603c0 51 41.4 92.4 92.4 92.4h1095.4c51 0 92.4-41.4 92.2-92.2V210.4c0-50.8-41.4-92.2-92.4-92.2zM677 721.2H554v-240l-123 153.8-123-153.8v240H184.6V302.8h123l123 153.8 123-153.8h123v418.4z m270.6 6.2L763 512H886V302.8h123V512H1132z"
          p-id="3243" fill="#3c3c3c"></path>
      </svg>
      <svg @click="handleMark" v-else t="1631782798077" class="markdown-icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="2861" width="22" height="22">
        <path
          d="M92 192C42.24 192 0 232.128 0 282.016v459.968C0 791.904 42.24 832 92 832h840C981.76 832 1024 791.872 1024 741.984V282.016C1024 232.16 981.76 192 932 192z m0 64h840c16.512 0 28 12.256 28 26.016v459.968c0 13.76-11.52 26.016-28 26.016H92C75.488 768 64 755.744 64 741.984V282.016c0-13.76 11.52-25.984 28-25.984zM160 352v320h96v-212.992l96 127.008 96-127.04V672h96V352h-96l-96 128-96-128z m544 0v160h-96l144 160 144-160h-96v-160z"
          p-id="2862" fill="#808080"></path>
      </svg>
    </el-tooltip>
    <svg @click="copyhandle" t="1656940838877" class="icon" viewBox="0 0 1024 1024" version="1.1"
      xmlns="http://www.w3.org/2000/svg" p-id="11279" width="22" height="22">
      <path
        d="M624.5 786.3c92.9 0 168.2-75.3 168.2-168.2V309c0-92.4-75.3-168.2-168.2-168.2H303.6c-92.4 0-168.2 75.3-168.2 168.2v309.1c0 92.4 75.3 168.2 168.2 168.2h320.9zM178.2 618.1V309c0-69.4 56.1-125.5 125.5-125.5h320.9c69.4 0 125.5 56.1 125.5 125.5v309.1c0 69.4-56.1 125.5-125.5 125.5h-321c-69.4 0-125.4-56.1-125.4-125.5z"
        p-id="11280"></path>
      <path
        d="M849.8 295.1v361.5c0 102.7-83.6 186.3-186.3 186.3H279.1v42.7h384.4c126.3 0 229.1-102.8 229.1-229.1V295.1h-42.8zM307.9 361.8h312.3c11.8 0 21.4-9.6 21.4-21.4 0-11.8-9.6-21.4-21.4-21.4H307.9c-11.8 0-21.4 9.6-21.4 21.4 0 11.9 9.6 21.4 21.4 21.4zM307.9 484.6h312.3c11.8 0 21.4-9.6 21.4-21.4 0-11.8-9.6-21.4-21.4-21.4H307.9c-11.8 0-21.4 9.6-21.4 21.4 0 11.9 9.6 21.4 21.4 21.4z"
        p-id="11281"></path>
      <path
        d="M620.2 607.4c11.8 0 21.4-9.6 21.4-21.4 0-11.8-9.6-21.4-21.4-21.4H307.9c-11.8 0-21.4 9.6-21.4 21.4 0 11.8 9.6 21.4 21.4 21.4h312.3z"
        p-id="11282"></path>
    </svg>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapState } from 'pinia'
import { debounce } from '@/plugin/filter'
import useStore from '@/store'

export default {
  data() {
    return {
      isMark: false,
      linktemp: ''
    }
  },
  props: {
    link: {
      type: String,
      default: ''
    }
  },
  watch: {
    defaultCopyType: {
      deep: true,
      immediate: true,
      handler(n, o) {
        this.isMark = n
        this.linktemp = this.isMark ? `![](${this.link})` : this.link
      }
    }
  },
  computed: {
    ...mapState(useStore, ['defaultCopyType'])
  },
  methods: {
    handleMark() {
      this.isMark = !this.isMark
      this.linktemp = this.isMark ? `![](${this.link})` : this.link
      const store = useStore()
      store.$patch({
        openUploadOutMD: this.isMark
      })
    },
    copyhandle: debounce(function () {
      const copyData = this.linktemp
      this.$copyText(copyData).then(() => {
        // element ui的弹窗
        Message({
          message: this.linktemp !== '' ? `已复制剪切板：${copyData}` : '复制失败',
          type: this.linktemp !== '' ? 'success' : 'error'
        })
      }).catch(() => {
        Message({
          message: '复制失败，请手动复制',
          type: 'error'
        })
      })
    }, 300, true)
  }
}
</script>

<style lang="less" scoped>
</style>
