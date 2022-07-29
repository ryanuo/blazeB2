<!--
 * @Author: Harry
 * @Date: 2022-07-26 19:42:01
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-26 19:59:20
 * @FilePath: \dev\src\views\Setting\setdefaultCopy\SetDefaultCopy.vue
-->
<template>
  <div class="">
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
</style>
