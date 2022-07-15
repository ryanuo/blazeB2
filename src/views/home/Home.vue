<!--
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-15 22:03:16
 * @FilePath: \dev\src\views\home\Home.vue
-->
<template>
  <div class="home-w">
    <div class="upload-w" style="width: 100%">
      <!-- @mouseenter="mouseHandle" @mouseleave.stop="mouseMoveHandle" -->
      <div id="tar_box" contenteditable=""></div>
      <el-upload ref="uploadRef" v-loading="loadings" :auto-upload="false" class="upload-demo" action="customize"
        :file-list="fileList" multiple :show-file-list="false" :limit="5" :on-change="handleChangeImage"
        :on-remove="handleFileRemove" drag :http-request="UploadFile">
        <div class="compress-remind" v-if="compressMsg.iscompress">开启压缩，压缩等级（<span class="red-c">{{ compressMsg.rank
        }}</span>）
        </div>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          支持<em>拖动、点击、粘贴</em>图片<em>上传</em>
        </div>
        <div slot="tip">
          <div class="el-upload__tip">
            <div>当前上传路径:<el-tag :type="fdata.tofile ? '' : 'danger'" size="mini"
                @click="$router.replace({ name: 'setting', query: { id: '2' } })">{{
                    fdata.tofile ? fdata.tofile : '你还未填写路径，点击这里'
                }}</el-tag>
            </div>
            <div v-if="fdata.bucket_name" @click="$router.replace({ name: 'setting', query: { id: '1' } })">当前B2桶名称:
              <el-tag size="mini">{{ fdata.bucket_name }}</el-tag>
            </div>
          </div>
          <span v-if="fileList.length > 0">
            <UploadList :fileList="fileList" />
            <el-button class="btn-upload" @click="handleSumbit">上传</el-button>
            <el-button class="btn-upload" @click="handleSumbit">重置</el-button>
          </span>
        </div>
      </el-upload>
    </div>
    <div style="margin: 20px 0;text-align: center;" v-if="fileList.lenght <= 0">
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
import { uploadServer } from '@/utils/api/index'
import { authIsexit } from '@/utils/common/login'
import { picPaste } from '@/utils/common/paste'
import { startLoading, endLoading } from '@/utils/common/loading'
import { HandleCompressor } from '@/utils/common/compress'
import useStore from '@/store'
import { mapActions, mapState } from 'pinia'
import UploadList from './components/UploadList.vue'
const CopyView = () => import('@/views/svg/CopyView.vue')
export default {
  components: { CopyView, UploadList },
  data() {
    return {
      fdata: {},
      radio2: 'URL',
      copycontent: '',
      loadings: false,
      fileList: [],
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
    resultCopy() {
      return this.copycontent !== '' ? this.defaultCopyUrl.replace(/%s/g, this.copycontent) : '暂无内容'
    }
  },
  mounted() {
    this.compressMsg = this.CompressData
    this.radio2 = this.defaultCopy
    window.addEventListener('paste', this.pasteHandle)
    const token = localStorage.getItem('token_api')
    if (token) {
      this.fdata = JSON.parse(token)
      this.fdata.tofile = this.toFile
    }
  },
  destroyed() {
    window.removeEventListener('paste', this.pasteHandle)
  },
  methods: {
    ...mapActions(useStore, ['setDefaultFormat']),
    // 处理文件更改事件
    handleChangeImage(file, filelist) {
      this.fileList = filelist
    },
    // 文件移除事件
    handleFileRemove(file, fileList) {
      const i = this.fileList.findIndex(v => file.uid === v.uid)
      this.fileList.splice(i, 1)
      console.log(file)
    },
    // 处理文件上传事件，手动控制
    handleSumbit: debounce(function () {
      this.$refs.uploadRef.submit()
    }, 450, true),
    // 图片的粘贴事件
    pasteHandle: debounce(function (event) {
      picPaste(event, this)
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
    // 上传文件事件
    UploadFile(params) {
      const _this = this
      authIsexit().then(() => {
        startLoading(document.querySelector('.el-upload'), '正在上传图片...')
        const authmsg = localStorage.getItem('authmsg')
        const list_ = Object.assign(JSON.parse(authmsg), { tofile: this.fdata.tofile })
        if (_this.compressMsg.iscompress) {
          HandleCompressor(params.file, _this.compressMsg.rank, this.nocommpress, list_)
        } else {
          _this.nocommpress(params.file, list_)
        }
      }).catch(() => {
        endLoading()
        Notification({
          title: '提示',
          message: '请检查是否登陆,请检查keyid和key是否填写正确',
          type: 'error'
        })
      })
    },
    async nocommpress(file, list_) {
      const formData = new FormData()
      formData.append('file_', file)
      for (const i in list_) {
        formData.append(i, list_[i])
      }
      const { data: res } = await uploadServer(formData)
      console.log(res)
      this.copycontent = res.action ? this.fdata.host_url + res.fileName : ''
      Notification({
        title: '提示',
        message: res.action ? '上传成功' : `状态码:${res.status},错误信息：${res.message},请检查keyid和key是否填写正确`,
        type: res.action ? 'success' : 'error'
      })
      document.getElementById('tar_box').innerHTML = ''
      this.$refs.uploadRef.clearFiles()
      this.fileList = []
      endLoading()
    }
  }
}
</script>
<style lang='less' scoped>
@import './home.module.less';
</style>
