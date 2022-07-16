<!--
 * @Author: Harry
 * @Date: 2022-07-14 12:00:18
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-16 11:39:42
 * @FilePath: \dev\src\views\Setting\setwatermark\SetWatermark.vue
-->
<template>
  <div class="set-water-mask">
    <el-switch v-model="value" @change="handleComp" active-text="开启" inactive-text="关闭" :active-value="true"
      :inactive-value="false">
    </el-switch>
    <div v-if="value">
      <!-- <Watermarkview /> -->
      <p>注：点击上传图片然后<span class="red-c">预览图片</span>进行水印的设置</p>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'pinia'
import useStore from '@/store'
// import Watermarkview from './watermark/watermarkview.vue'
export default {
  data() {
    return {
      value: false
    }
  },
  mounted() {
    this.value = this.watermarkStatus.isopen
  },
  computed: {
    ...mapState(useStore, ['watermarkStatus'])
  },
  methods: {
    ...mapActions(useStore, ['setwatermak']),
    handleComp() {
      this.setwatermak(this.value)
    }
  }
  // components: { Watermarkview }
}
</script>

<style lang="less" scoped>
@import './setwate.module.less';
</style>
