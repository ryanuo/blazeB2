<!--
 * @Author: Harry
 * @Date: 2022-07-07 19:33:08
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-07 19:59:58
 * @FilePath: \web\src\views\Setting\setUploadFile\SetUpload.vue
-->
<template>
  <div class="set-upload">
    <el-input v-model="tofile" placeholder="eg:hexo/2/"></el-input>
    <el-button @click="saveToFile">保存</el-button>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { mapActions, mapState } from 'pinia'
import useStore from '../../../store'

export default {
  data() {
    return {
      tofile: ''
    }
  },
  computed: {
    ...mapState(useStore, ['DefaultToFile'])
  },
  mounted() {
    this.tofile = this.DefaultToFile
  },
  methods: {
    ...mapActions(useStore, ['setDefaultToFile']),
    saveToFile() {
      const a_ = this.tofile.slice(-1) === '/' || this.tofile === ''
      Notification({
        title: '提示',
        message: a_ ? `上传路径修改为：${this.tofile}` : '路径要以“/”结尾',
        type: a_ ? 'success' : 'error'
      })
      if (a_) {
        this.setDefaultToFile(this.tofile)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.set-upload {
  .el-input {
    width: 249px;
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
