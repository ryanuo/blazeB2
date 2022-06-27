<!--
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-06-25 11:00:44
 * @FilePath: \web\src\views\Home.vue
-->
<template>
  <div class="home-w">
    <form-view></form-view>
    <div class="upload-w">
      <el-upload class="upload-demo" action="customize" :show-file-list="false" drag :http-request="UploadFile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传图片文件，且不超过50MB</div>
      </el-upload>
    </div>
    <h3>链接格式</h3>
    <div style="margin-top: 20px;text-align: center;">
      <el-radio-group v-model="radio2" size="medium" class="e-rg" @change="changeCopyStatus">
        <el-radio-button class="e-rb" label="Markdown"></el-radio-button>
        <el-radio-button class="e-rb" label="Html"></el-radio-button>
        <el-radio-button class="e-rb" label="URL"></el-radio-button>
        <el-radio-button class="e-rb" label="自定义"></el-radio-button>
      </el-radio-group>
      <div class="res-upload">
        <div class="res-content" title="点击复制">
          <span>{{ resultCopy }}</span>
          <div @click="copyhandle">
            <CopyView class="copy-view" />
          </div>
        </div>
      </div>
    </div>
    <footer>
      Copyright ©2021-{{ timeE }} <a href="https://u.mr90.top" target="_blank">u.mr90.top</a> .All Rights Reserved
    </footer>
  </div>
</template>

<script>
import { Message, Notification } from 'element-ui'
import { debounce } from '../plugin/filter'
import axios from '../utils/http'
const FormView = () => import('./FormView.vue')
const CopyView = () => import('./CopyView.vue')
export default {
  components: { FormView, CopyView },
  data() {
    return {
      fdata: {},
      radio2: 'URL',
      copycontent: ''
    }
  },
  mounted() {
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
  methods: {
    changeFile(file, fileList) {
    },
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
    async UploadFile(params) {
      const formData = new FormData()
      formData.append('file_', params.file)
      for (const i in this.fdata) {
        formData.append(i, this.fdata[i])
      }
      const { data: res } = await axios.post('/api', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res)
      this.copycontent = res.link
      Notification({
        title: '提示',
        message: res.msg,
        type: res.status_code === 1 ? 'success' : 'error'
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

// .e-rg {
//   .e-rb {
//     &:first-child {
//       .el-radio-button__innerr {}
//     }
//   }
// }

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 16px;
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

    // span {}
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
</style>
