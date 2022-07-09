<!--
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-09 13:13:39
 * @FilePath: \master\src\views\home\Home.vue
-->
<template>
  <div class="home-w">
    <div class="upload-w" style="width: 100%">
      <!-- @mouseenter="mouseHandle" @mouseleave.stop="mouseMoveHandle" -->
      <div id="tar_box" contenteditable=""></div>
      <el-upload ref="upload" v-loading="loadings" class="upload-demo" action="customize" :show-file-list="false" drag
        :http-request="UploadFile">
        <div class="compress-remind" v-if="compressMsg.iscompress">开启压缩，压缩等级（<span class="red-c">{{ compressMsg.rank
        }}</span>）
        </div>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          支持<em>拖动、点击、粘贴</em>图片<em>上传</em>
        </div>
        <div slot="tip" class="el-upload__tip">
          <div>当前上传路径:<el-tag :type="fdata.tofile ? '' : 'danger'" size="mini"
              @click="$router.replace({ name: 'setting', query: { id: '2' } })">{{
                  fdata.tofile ? fdata.tofile : '你还未填写路径，点击这里'
              }}</el-tag>
          </div>
          <div v-if="fdata.bucket_name" @click="$router.replace({ name: 'setting', query: { id: '1' } })">当前B2桶名称:
            <el-tag size="mini">{{ fdata.bucket_name }}</el-tag>
          </div>
        </div>
      </el-upload>
    </div>
    <div style="margin: 20px 0;text-align: center;">
      <el-radio-group v-model="radio2" size="medium" class="e-rg" @change="changeCopyStatus">
        <el-radio-button class="e-rb" label="Markdown"></el-radio-button>
        <el-radio-button class="e-rb" label="Html"></el-radio-button>
        <el-radio-button class="e-rb" label="URL"></el-radio-button>
        <el-radio-button class="e-rb" label="自定义"></el-radio-button>
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
import { mapState } from 'pinia'
const CopyView = () => import('@/views/svg/CopyView.vue')
export default {
  components: { CopyView },
  data() {
    return {
      fdata: {},
      radio2: 'URL',
      copycontent: '',
      loadings: false,
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
    timeE() {
      const t = new Date()
      return t.getFullYear()
    },
    resultCopy() {
      return this.copycontent !== '' ? this.changeCopyStatus(this.radio2) : '暂无内容'
    }
  },
  mounted() {
    const store = useStore()
    this.compressMsg = store.CompressData
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
    pasteHandle: debounce(function (event) {
      picPaste(event, this)
    }, 500, true),
    changeCopyStatus(e) {
      const a_ = this.copycontent
      if (a_ !== '') {
        let u = ''
        switch (e) {
          case 'URL':
            u = a_
            break
          case 'Html':
            u = `<img src="${a_}" title="" />`
            break
          case 'Markdown':
            u = `![](${a_})`
            break
        }
        return u
      } else {
        Message({
          message: '您还未上传图片',
          type: 'error'
        })
      }
    },
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
      endLoading()
    }
  }
}
</script>
<style lang='less' scoped>
@import './home.module.less';
</style>
