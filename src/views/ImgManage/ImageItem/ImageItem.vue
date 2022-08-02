<!--
 * @Author: Harry
 * @Date: 2022-07-01 19:21:44
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-02 15:02:08
 * @FilePath: \dev\src\views\ImgManage\ImageItem\ImageItem.vue
-->
<template>
  <div class="img-item-t1" :title="ptit">
    <div class="time-span">{{ picTime }}</div>
    <el-image :src="piclink">
      <div slot="placeholder" class="image-slot image-slot-placeholder">
      </div>
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div class="item-t">
      <div class="pic-tit">
        <span>{{ ptit }}</span>
      </div>
      <div class="link-copy-w">
        <mark-down :link="piclink" />
      </div>
    </div>
  </div>
</template>

<script>
import MarkDown from '@/views/svg/MarkDown.vue'
export default {
  data() {
    return {}
  },
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
    },
    picTime: {
      type: String,
      required: true
    }
  },
  computed: {
    ptit() {
      const a_ = this.pictitle.split('/')
      return a_[a_.length - 1]
    }
  },
  components: { MarkDown }
}
</script>

<style lang="less" scoped>
@import './imageitem.module.less';
</style>
