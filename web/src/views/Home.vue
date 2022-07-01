<!--
 * @Author: Harry
 * @Date: 2022-04-20 20:40:43
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-01 19:49:50
 * @FilePath: \web\src\views\Home.vue
-->
<template>
  <div class="home-w">
    <div class="upload-w">
      <el-upload class="upload-demo" action="customize" :show-file-list="false" drag :http-request="UploadFile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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
    <footer>
      Copyright ©2021-{{ timeE }} <a href="https://u.mr90.top" target="_blank">u.mr90.top</a> .All Rights Reserved
    </footer>
  </div>
</template>

<script>
import { Message, Notification } from 'element-ui'
import { debounce } from '../plugin/filter'
import { uploadServer, auth } from '../utils/api/index'
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
    // 判断是否过期
    authIsexit() {
      const _this = this
      return new Promise((resolve, reject) => {
        const authmsg = localStorage.getItem('authmsg')
        if (authmsg) {
          const currentT = new Date()
          const t_ = JSON.parse(authmsg)
          // 过期时间定为23小时
          if (currentT.getTime() - t_.time > 82800 * 1000) {
            localStorage.removeItem('authmsg')
            _this.setAuthStorage().then(() => {
              resolve()
            })
          } else {
            resolve()
          }
        } else {
          _this.setAuthStorage().then(() => {
            resolve()
          })
        }
      })
    },
    // 设置授权信息缓冲
    async setAuthStorage() {
      const { data: res } = await auth(this.fdata)
      if (res.bucketId) {
        const sdata = {
          uploadUrl: res.uploadUrl,
          authorizationToken: res.authorizationToken,
          bucketId: res.bucketId,
          api_url: res.api_url,
          init_token: res.init_token,
          s3ApiUrl: res.s3ApiUrl,
          downloadUrl: res.downloadUrl,
          time: (new Date()).getTime()
        }
        localStorage.setItem('authmsg', JSON.stringify(sdata))
      } else {
        Notification({
          title: '提示',
          message: `状态码:${res.status},错误信息：${res.message},请检查keyid和key是否填写正确`,
          type: 'error'
        })
      }
      console.log(res)
    },
    UploadFile(params) {
      this.authIsexit().then(async () => {
        const authmsg = localStorage.getItem('authmsg')
        const formData = new FormData()
        formData.append('file_', params.file)
        const list_ = Object.assign(JSON.parse(authmsg), { tofile: this.fdata.tofile })
        console.log(list_)
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
</style>
