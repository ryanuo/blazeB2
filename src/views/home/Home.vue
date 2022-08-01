<!--
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-01 21:32:18
 * @FilePath: \dev\src\views\home\Home.vue
-->
<template>
  <div class="home-w">
    <!-- <div class="left-aside" v-if="leftTempList.length > 0">
      <LeftUpload v-model="leftTempList" />
    </div> -->
    <div class="upload-w" style="width: 100%">
      <!-- @mouseenter="mouseHandle" @mouseleave.stop="mouseMoveHandle" -->
      <div id="tar_box" contenteditable=""></div>
      <el-upload ref="uploadRef" v-loading="loadings" :auto-upload="false" class="upload-demo" action="customize"
        :file-list="fileList" multiple :show-file-list="false" :limit="limit" :on-change="checkFileType" drag>
        <div class="compress-remind" v-if="compressMsg.iscompress">开启压缩，压缩等级（<span class="red-c">{{ compressMsg.rank
        }}</span>）
        </div>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          支持<em>拖动、点击、粘贴</em>图片<em>上传，</em>每次最多<em>{{ limit }}</em>张
        </div>
        <div slot="tip">
          <div class="el-upload__tip">
            <div>当前上传路径:<el-tag :type="tofile ? '' : 'danger'" size="mini"
                @click="$router.replace({ name: 'setting', query: { id: '2' } })">{{
                    tofile ? tofile : '你还未填写路径，点击这里'
                }}</el-tag>
            </div>
            <div v-if="fdata && fdata.bucket_name" @click="$router.replace({ name: 'setting', query: { id: '1' } })">
              当前B2桶名称:
              <el-tag size="mini">{{ fdata.bucket_name }}</el-tag>
            </div>
          </div>
          <span v-if="fileList.length > 0">
            <p class="p-upload-hd">{{ '上传进度：' + uploadProgress + "/" + fileList.length }}</p>
            <ul class="upload-wrap">
              <UploadList @watermarkhandle="handleMark" @changefilelist="handleDelete" v-for="(item, index) in fileList"
                :styleCount="styC(index) ? 'width:97.2%' : ''" :file="item" :ref="'uploadRef' + index" :key="item.uid"
                :pid="index" />
            </ul>
            <div v-if="isShowWm">
              <div class="wm-contaniner" @click.self="handleClose(false)">
                <Wmarkview @waterpic="handleWatermarkEnd" @uninstall="handleClose" :file="fileList[currentfileIndex]" />
              </div>
            </div>
            <!-- <el-button class="btn-upload" @click="handleSumbit" type="primary" plain>上传</el-button> -->
            <el-button class="btn-upload" @click="moreUploadPic" type="primary" plain>上传</el-button>
            <el-button class="btn-upload" @click="handleReSet" type="info" plain>清空</el-button>
          </span>
        </div>
      </el-upload>
    </div>
    <!-- fileList.length <= 0 -->
    <div style="margin: 20px 0;text-align: center;" v-if="0">
      <el-radio-group v-model="radio2" size="medium" class="e-rg" @change="changeCopyStatus">
        <el-tooltip v-for="(item, index) in defaultcopyformat.formatList" :content="item.replace(/%s/g, copycontent)"
          :key="index" class="item" effect="dark" placement="top-start">
          <el-radio-button class="e-rb" :label="index"></el-radio-button>
        </el-tooltip>
      </el-radio-group>
      <div class="res-upload">
        <div class="res-content" title="点击复制">
          <p>{{ resultCopy }}</p>
          <div @click="copyhandle">
            <CopyView class="copy-view" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message, Notification } from 'element-ui'
import { debounce } from '@/plugin/filter'
import { authIsexit } from '@/utils/common/login'
import { startLoading, endLoading } from '@/utils/common/loading'
import useStore from '@/store'
import { mapActions, mapState } from 'pinia'
import UploadList from './components/UploadList.vue'
import Wmarkview from './components/wm/wmarkview.vue'
// import LeftUpload from './components/leftcontainer/LeftUpload.vue'
const CopyView = () => import('@/views/svg/CopyView.vue')
export default {
  components: { CopyView, UploadList, Wmarkview },
  data() {
    return {
      // leftTempList: [],
      fdata: null,
      radio2: 'URL',
      isShowWm: false,
      currentfileIndex: 0,
      copycontent: '',
      loadings: false,
      fileList: [],
      uploadProgress: 0,
      limit: 10,
      compressMsg: {
        iscompress: false,
        rank: 0.8
      },
      tofile: ''
    }
  },
  created() {
    window.addEventListener('paste', this.pasteHandle)
  },
  computed: {
    ...mapState(useStore, ['toFile']),
    ...mapState(useStore, ['defaultcopyformat']),
    ...mapState(useStore, ['defaultCopy']),
    ...mapState(useStore, ['defaultCopyUrl']),
    ...mapState(useStore, ['CompressData']),
    timeE() {
      const t = new Date()
      return t.getFullYear()
    },
    styC() {
      const len = this.fileList.length
      return function (index) {
        if (len === 1) return true
        console.log(index === len - 1 && index % 2 !== 0)
        if (index === len - 1 && index % 2 === 0) return true
        return false
      }
    },
    resultCopy() {
      return this.copycontent !== '' ? this.defaultCopyUrl.replace(/%s/g, this.copycontent) : '暂无内容'
    }
  },
  mounted() {
    this.compressMsg = this.CompressData
    this.radio2 = this.defaultCopy
    window.addEventListener('paste', this.pasteHandle)
    const templist = sessionStorage.getItem('templist')
    this.tofile = this.toFile && this.toFile
    this.fdata = localStorage.getItem('token_api') && JSON.parse(localStorage.getItem('token_api'))
    if (templist) this.leftTempList = JSON.parse(templist)
  },
  destroyed() {
    window.removeEventListener('paste', this.pasteHandle)
  },
  methods: {
    ...mapActions(useStore, ['setDefaultFormat']),
    handleDelete(index) {
      this.fileList.splice(index, 1)
    },
    // 处理水印结果
    handleWatermarkEnd(e) {
      console.log(e)
      this.leftTempList.unshift(e)
      this.handletempList(this.leftTempList)
      console.log(this.leftTempList)
    },
    // 处理水印
    handleMark(index) {
      this.isShowWm = true
      this.currentfileIndex = index
    },
    handleClose() {
      this.isShowWm = false
    },
    // 重置列表
    handleReSet() {
      this.$refs.uploadRef.clearFiles()
      this.fileList = []
      this.uploadProgress = 0
    },
    // 图片的粘贴事件
    pasteHandle: debounce(function (event) {
      console.log(event.clipboardData.files)
      const file = {
        percentage: 0,
        status: 'ready'
      }
      file.raw = event.clipboardData.files[0]
      console.log(file)
      file.name = file.raw.name
      file.size = file.raw.size
      file.url = window.URL.createObjectURL(file.raw)
      file.uid = Date.now()
      this.fileList = [...this.fileList, file]
      // picPaste(event, this)
    }, 500, true),
    // 链接赋值事件
    changeCopyStatus(e) {
      this.setDefaultFormat(e)
    },
    // 复制事件
    copyhandle: debounce(function () {
      const copyData = this.resultCopy
      this.$copyText(copyData).then(() => {
        // element ui的弹窗
        Message({
          message: this.copycontent !== '' ? '已复制到剪贴板' : '您还未上传图片',
          type: this.copycontent !== '' ? 'success' : 'error'
        })
      }).catch(() => {
        Message({
          message: '复制失败，请手动复制',
          type: 'error'
        })
      })
    }, 300, true),
    // / 构建队列
    queue(arr) {
      const _this = this
      const data = []
      let sequence = Promise.resolve()
      arr.forEach(function (item) {
        sequence = sequence.then(item).then(r => {
          data.push(r)
          if (r.fileName) {
            _this.uploadProgress += 1
            _this.leftTempList.unshift(r)
          }
          return data
        })
      })
      return sequence
    },
    // 上传多张图片
    moreUploadPic() {
      const pros = []
      const _this = this
      authIsexit().then(async () => {
        startLoading(document.querySelector('.el-upload'), '正在上传图片...')
        _this.fileList.forEach((v, i) => {
          // 延时操作，同步操作接口异常
          pros.push(
            _this.$refs['uploadRef' + i][0].uploadSumit)
        })
        await this.queue(pros)
        const errorL = _this.fileList.length - _this.uploadProgress
        _this.handletempList(this.leftTempList)
        document.getElementById('tar_box').innerHTML = ''
        endLoading()
        Notification({
          title: '上传提示',
          type: errorL ? 'error' : 'success',
          message: `上传成功：${_this.uploadProgress}张,上传失败：${errorL}张；${errorL > 0 ? '失败原因：请求过于频繁，建议单张上传' : ''}`
        })
      }).catch(() => {
        endLoading()
        Notification({
          title: '提示',
          message: '请检查是否登陆,请检查keyid和key是否填写正确',
          type: 'error'
        })
      })
    },
    // 临时列表展示
    handletempList(list) {
      sessionStorage.setItem('templist', JSON.stringify(list))
    },
    // 文件检查
    checkFileType(file) {
      const { uid, name } = file
      //   文件类型限制
      const fileTypeFlag = /^.png|.jpg|.jpeg|.gif|.webp$/.test(
        name.substring(name.lastIndexOf('.')).toLowerCase()
      )
      console.log(fileTypeFlag)
      if (!fileTypeFlag) {
        Message({
          message: '文件类型只能是.png|.jpg|.jpeg|.gif|.webp',
          type: 'warning'
        })
        const selectFileList = this.fileList.filter(item => {
          return item.uid !== uid
        })
        this.fileList = selectFileList
        return
      }
      const findCommonNameIndex = this.fileList.findIndex(
        item => item.name === name
      )
      if (findCommonNameIndex !== -1) {
        Message({
          message: '不能上传同名的文件',
          type: 'warning'
        })
        const selectFileList = this.fileList.filter(item => {
          return item.uid !== uid
        })
        this.fileList = selectFileList
        return false
      }
      this.fileList.push(file)
      // //   文件大小进行校验
      // if (size > 1024 * 1024 * 100) {
      //   this.$message.warning('文件大小不能超过100Mb')
      //   const selectFileList = this.modelForm.fileList.filter(item => {
      //     return item.uid !== uid
      //   })
      //   this.modelForm.fileList = selectFileList
      //   return
      // }
      // //   文件总大小限制
      // const totalSize = this.modelForm.fileList.reduce(
      //   (total, item) => total + item.size,
      //   0
      // )
      // if (totalSize + size > 1024 * 1024 * 100) {
      //   this.$message.warning('总文件大小不能超过100Mb')
      //   const selectFileList = this.modelForm.fileList.filter(item => {
      //     return item.uid !== uid
      //   })
      //   this.modelForm.fileList = selectFileList
      //   return
      // }
      //   文件重名限制
    }
  }
}
</script>
<style lang='less' scoped>
@import './home.module.less';
</style>
