<!--
 * @Author: Harry
 * @Date: 2022-07-17 10:26:50
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-17 12:36:17
 * @FilePath: \dev\src\views\home\components\leftcontainer\LeftUpload.vue
-->
<template>
  <div class="left-upload">
    <h2>临时上传管理</h2>
    <div class="temp-content">
      <image-item @setshowdiag="handleDiag" @update="updatePicLists" v-for="(item, index) in list"
        :key="item.fileName + index" :picid="index" :piclink="prefixStatus + item.fileName" :pictitle="item.fileName"
        :fileId="item.fileId" :picTime="timespan(item.uploadTimestamp)" />
    </div>
    <el-dialog class="tpxq_w" title="图片详情" :visible.sync="centerDialogVisible" width="40%" center>
      <div><span>图片名称：</span>{{ currentitemdetail.filename }}</div>
      <div><span>图片大小：</span>{{ currentitemdetail.filesize }}</div>
      <div><span>上传时间：</span>{{ currentitemdetail.filetime }}</div>
    </el-dialog>
  </div>
</template>

<script>
import ImageItem from '@/views/ImgManage/ImageItem/ImageItem.vue'
import { transiTime } from '@/plugin/filter'
import { mapState, mapWritableState } from 'pinia'
import useStore from '@/store'
export default {
  components: { ImageItem },
  data() {
    return {
      centerDialogVisible: false,
      currentitemdetail: {
        filesize: '',
        filename: '',
        filetime: ''
      }
    }
  },
  props: {
    list: Array,
    default() {
      return []
    }
  },
  model: {
    // 需要定义哪一个props可以用v-model绑定属性
    prop: 'list',
    // 声明一个事件，调用之后，就会改变父级容器的值
    event: 'updatePicLists'
  },
  computed: {
    ...mapWritableState(useStore, ['isLogined']), // 映射函数，取出isLogined
    ...mapState(useStore, ['prefixStatus']),
    ...mapState(useStore, ['setdefaultFile']), // 映射函数，取出setdefaultFile
    ...mapState(useStore, ['imgDefaultFile']), // 映射函数，取出setdefaultFile
    ...mapState(useStore, ['noInvalid']),
    timespan() {
      return function (val) {
        return transiTime(val)
      }
    }
  },
  methods: {
    handleDiag(e) {
      const a_ = this.list[e]
      this.currentitemdetail = {
        filesize: (a_.contentLength / 1000).toFixed(2) + 'kb',
        filename: a_.fileName,
        filetime: transiTime(a_.uploadTimestamp)
      }
      this.centerDialogVisible = true
    },
    updatePicLists(e) {
      this.list.splice(e, 1)
      this.$emit('updatePicLists', this.list)
      sessionStorage.setItem('templist', JSON.stringify(this.list))
    }
  }
}
</script>

<style lang="less" scoped>
@import './leftUpload.module.less';
</style>
