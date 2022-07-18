<!--
 * @Author: Harry
 * @Date: 2022-07-01 19:21:44
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-17 23:27:50
 * @FilePath: \dev\src\views\ImgManage\ImageItem\ImageItem.vue
-->
<template>
  <div class="img-item-t1">
    <MoreMsg :pictitle="pictitle" :fileId="fileId" :picid="picid" v-on="$listeners" />
    <div class="time-span">{{ picTime }}</div>
    <el-image data-fancybox="gallery" :src="piclink">
    </el-image>
    <!-- <img  :src="piclink" alt="pictitle" srcset=""> -->
    <div class="item-t">
      <div class="pic-tit">{{ ptit }}</div>
      <div class="link-copy-w">
        <mark-down :link="piclink" />
      </div>
    </div>
  </div>
</template>

<script>
import MoreMsg from '@/views/ImgManage/ImageItem/moremsg/MoreMsg.vue'
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
  mounted() { },
  components: { MoreMsg, MarkDown }
}
</script>

<style lang="less" scoped>
@import './imageitem.module.less';
</style>
