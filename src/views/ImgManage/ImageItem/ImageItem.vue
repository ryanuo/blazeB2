<!--
 * @Author: Harry
 * @Date: 2022-07-01 19:21:44
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-09 22:20:15
 * @FilePath: \master\src\views\ImgManage\ImageItem\ImageItem.vue
-->
<template>
  <div class="img-item-t1">
    <MoreMsg :piclink="piclink" :pictitle="pictitle" :fileId="fileId" :picid="picid" v-on="$listeners" />
    <el-image @click.stop="imgshow(picL)" :src="picL">
    </el-image>
    <!-- <img  :src="picL" alt="pictitle" srcset=""> -->
    <div class="item-t">
      <div class="pic-tit">{{ ptit }}</div>
      <div class="link-copy-w">
        <mark-down :link="picL" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import useStore from '@/store'
import MoreMsg from './moremsg/MoreMsg.vue'
import MarkDown from '@/views/svg/MarkDown.vue'
export default {
  props: {
    piclink: {
      type: String,
      required: true
    },
    pictitle: {
      type: String,
      required: true
    },
    fileId: {
      type: String,
      required: true
    },
    picid: {
      type: Number,
      required: true
    }
  },
  emits: ['ishow'],
  data() {
    return {
      loadimg: ''
    }
  },
  methods: {
    imgshow() {
      this.$emit('ishow', { id: this.picid, f_: this.picL })
    }
  },
  computed: {
    picL() {
      return this.loadimg + this.piclink
    },
    ptit() {
      const a_ = this.pictitle.split('/')
      return a_[a_.length - 1]
    },
    ...mapState(useStore, ['prefixImg'])
  },
  mounted() {
    const auth = localStorage.getItem('authmsg')
    const token = localStorage.getItem('token_api')
    if (auth && token) {
      const picD = this.prefixImg.defaultUrl.replace(/\/file\/(.*?)$/, '')
      console.log(picD)
      this.loadimg = picD + '/'
    }
  },
  components: { MoreMsg, MarkDown }
}
</script>

<style lang="less" scoped>
@import './imageitem.module.less';
</style>
