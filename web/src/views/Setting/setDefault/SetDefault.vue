<!--
 * @Author: Harry
 * @Date: 2022-07-04 20:19:12
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-04 20:47:21
 * @FilePath: \web\src\views\Setting\setDefault\SetDefault.vue
-->
<template>
  <div class="set-defalut">
    <el-input v-model="value" placeholder="默认搜索的图片文件夹"></el-input>
    <el-button @click="saveDefault">保存</el-button>
  </div>
</template>

<script>
import useStore from '@/store'
import { Notification } from 'element-ui'
import { mapActions, mapState } from 'pinia'
export default {
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState(useStore, ['defaultFile'])
  },
  mounted() {
    this.value = this.defaultFile
  },
  methods: {
    ...mapActions(useStore, ['setDefaultFile']),
    saveDefault() {
      const val = this.value.trim()
      if (val && val.length !== 0) {
        this.setDefaultFile(this.value)
        Notification({
          message: '保存成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.set-defalut {
  .el-input {
    width: 217px;
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
