<!--
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-03 19:22:17
 * @FilePath: \web\src\views\Home.vue
-->
<template>
  <div class="home-w">
    <div class="upload-w">
      <!-- @mouseenter="mouseHandle" @mouseleave.stop="mouseMoveHandle" -->
      <div id="tar_box" contenteditable=""></div>
      <el-upload ref="upload" class="upload-demo" action="customize" :show-file-list="false" drag
        :http-request="UploadFile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">支持<em>拖动、点击、粘贴</em>图片<em>上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传图片文件，且不超过50MB</div>
      </el-upload>
    </div>
    <h3>链接格式</h3>
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
import { debounce } from '../plugin/filter'
import { uploadServer } from '../utils/api/index'
import { authIsexit } from '../utils/common/login'
import { picPaste } from '../utils/common/paste'
const CopyView = () => import('./CopyView.vue')
export default {
  components: { CopyView },
  data() {
    return {
      fdata: {},
      radio2: 'URL',
      copycontent: ''
    }
  },
  created() {
    window.addEventListener('paste', this.pasteHandle)
  },
  mounted() {
    window.addEventListener('paste', this.pasteHandle)
    const token = localStorage.getItem('token_api')
    if (token) {
      this.fdata = JSON.parse(token)
    }
  },
  computed: {
    timeE() {
      const t = new Date()
      return t.getFullYear()
    },
    resultCopy() {
      return this.copycontent !== '' ? this.changeCopyStatus(this.radio2) : '暂无内容'
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
      authIsexit().then(async () => {
        const authmsg = localStorage.getItem('authmsg')
        const formData = new FormData()
        formData.append('file_', params.file)
        const list_ = Object.assign(JSON.parse(authmsg), { tofile: this.fdata.tofile })
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
      }).catch(() => {
        Notification({
          title: '提示',
          message: '请检查是否登陆,请检查keyid和key是否填写正确',
          type: 'error'
        })
      })
    }
  }
}
</script>
<style lang='less' scoped>
.upload-w {
  display: flex;
  justify-content: center;
  margin: 80px 0;
}

.el-radio-button:first-child .el-radio-button__inner {
  border-radius: 40px !important;
}

h3 {
  text-align: center;
  font-size: 18px;
}

.res-upload {
  text-align: center;

  .res-content {
    position: relative;
    width: 50%;
    margin: 20px auto;
    box-shadow: 0 0 2px #dddbdb;
    border: 1px dashed #ccc;
    height: 50px;
    line-height: 50px;
    padding: 0 30px 0 10px;

    p {
      word-break: keep-all;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.copy-view {
  position: absolute;
  top: calc(50% - 10px);
  right: 10px;
  width: 20px;
  z-index: 2;
  cursor: pointer;

  &:hover {
    transition: all .3s cubic-bezier(0.25, 0.88, 1, 1);
    width: 22px;
  }
}

@media only screen and (max-width: 537px) {
  .upload-w {
    margin-bottom: 50px;

    /deep/ .el-upload-dragger {
      width: 90vw;
      height: 253px;
    }
  }

  h3 {
    display: none;
  }
}
</style>
