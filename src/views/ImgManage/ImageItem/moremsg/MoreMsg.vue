<!--
 * @Author: Harry
 * @Date: 2022-07-04 17:32:17
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-29 20:28:30
 * @FilePath: \dev\src\views\ImgManage\ImageItem\moremsg\MoreMsg.vue
-->
<template>
  <div class="more-w" @click.prevent>
    <el-dropdown @command="handleDrop">
      <span>
        <svg t="1656927071071" class="icon-more" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="10310">
          <path
            d="M512 398.848c-61.952 0-112.64 50.176-112.64 112.64v1.024c0 61.952 50.176 112.64 112.64 112.64 61.952 0 112.64-50.176 112.64-112.64v-1.024c0-62.464-50.688-112.64-112.64-112.64z m-266.24 40.96c-39.424 0-71.68 32.256-71.68 71.68v1.024c0 39.424 32.256 71.68 71.68 71.68s71.68-32.256 71.68-71.68v-1.024c0-39.424-32.256-71.68-71.68-71.68z m532.48 0c-39.424 0-71.68 32.256-71.68 71.68v1.024c0 39.424 32.256 71.68 71.68 71.68s71.68-32.256 71.68-71.68v-1.024c0-39.424-32.256-71.68-71.68-71.68z"
            fill="var(--bg-text)" p-id="10311"></path>
        </svg>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">删除</el-dropdown-item>
        <el-dropdown-item command="1">详情</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { deleteitemImg } from '@/utils/api/'
export default {
  data() {
    return {}
  },
  props: {
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
  methods: {
    handleDrop(e) {
      console.log(e)
      switch (e) {
        case '0':
          return this.deleteImg()
        case '1':
          return this.moreImageDetail()
      }
    },
    // 删除图片函数
    deleteImg() {
      MessageBox({
        title: '提示',
        message: '此操作将删除选中图片, 是否继续?',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning'
      }).then(async () => {
        const auth = JSON.parse(localStorage.getItem('authmsg'))
        const params = {
          api_url: auth.api_url,
          init_token: auth.init_token,
          file_name: this.pictitle,
          file_id: this.fileId
        }
        const { data: res } = await deleteitemImg({ params })
        this.$emit('update', this.picid)
        console.log(res)
      }).then(() => {
        Message({
          type: 'success',
          message: '删除成功'
        })
      })
    },
    // 详情函数
    moreImageDetail() {
      this.$emit('setshowdiag', this.picid)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
