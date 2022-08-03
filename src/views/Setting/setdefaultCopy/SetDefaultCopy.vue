<!--
 * @Author: Harry
 * @Date: 2022-07-26 19:42:01
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 17:28:12
 * @FilePath: \dev\src\views\Setting\setdefaultCopy\SetDefaultCopy.vue
-->
<template>
  <div class="set-default-copy">
    <h2 class="setting-hd-h2">是否开启默认Markdown模式(<span class="red-c">全局</span>)</h2>
    <el-switch v-model="value" @change="handleComp" active-text="开启" inactive-text="关闭" :active-value="true"
      :inactive-value="false">
    </el-switch>
  </div>
</template>

<script>
import useStore from '@/store'
import { mapState } from 'pinia'
export default {
  data() {
    return {
      value: false
    }
  },
  computed: {
    ...mapState(useStore, ['openUploadOutMD'])
  },
  mounted() {
    this.value = !!this.openUploadOutMD
  },
  methods: {
    handleComp(e) {
      console.log(e)
      const store = useStore()
      store.$patch({
        openUploadOutMD: e
      })
      // console.log()
    }
  }
}
</script>

<style lang="less" scoped>
.set-default-copy {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
