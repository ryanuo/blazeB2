<!--
 * @Author: Harry
 * @Date: 2022-07-15 16:42:08
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-04 15:06:46
 * @FilePath: \dev\src\views\home\components\UploadList.vue
-->
<template>
  <li class="upload-i" :style="styleCount">
    <img data-fancybox="gallery" :src="picBlob(file.raw)" alt="" srcset="">
    <div>
      <h2 class="up_title">{{ file.name }} <span class="up-span"><del>{{ (file.size / 1024).toFixed(2) + 'KB'
      }}</del></span>
        <span class="up-span" v-if="CompressData.iscompress" style="color:var(--b2-theme-c)">{{ newSize + 'KB' }}</span>
      </h2>
      <svg v-if="svgType === '0'" @click="changeHandleFile(pid)" t="1657877004609" class="icon" viewBox="0 0 1024 1024"
        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1342" width="22" height="22">
        <path
          d="M783 312.5v510c0 16.6-13.4 30-30 30H273c-16.6 0-30-13.4-30-30v-510h540m60-60H183v600c0 33.1 26.9 60 60 60h540c33.1 0 60-26.9 60-60v-600z"
          fill="var(--b2-close)" p-id="1343"></path>
        <path
          d="M333 251v-78h360v78H333m-60 60h420c33.1 0 60-26.9 60-60v-78c0-33.1-26.9-60-60-60H333c-33.1 0-60 26.9-60 60v138z"
          fill="var(--b2-close)" p-id="1344"></path>
        <path
          d="M882 252H145c-16.6 0-30 13.4-30 30s13.4 30 30 30h737c16.6 0 30-13.4 30-30s-13.4-30-30-30zM392.8 432.5h60v300h-60zM572.8 432.5h60v300h-60z"
          fill="var(--b2-close)" p-id="1345"></path>
      </svg>
      <MarkDown class="home-md" :link="linkUrl" v-else-if="svgType === '2'" />
      <UploadTaggle :isshow="svgType" />
      <div class="config-warp">
        <span class="up-span" style="margin-right:auto">{{ TimeTran(file.uid) }}</span>
        <span class="up-span" v-if="svgType === '0'" @click="setShowSettingBtn(true)">{{
            CompressData.iscompress ? '已开启压缩' : '未开启压缩'
        }}</span>
        <span class="up-span" @click="setwarterMark(pid)">水印设置</span>
      </div>
    </div>
  </li>
</template>

<script>
import { transiTime } from '@/plugin/filter'
import UploadTaggle from '@/views/svg/uploadTaggle.vue'
import { NewHandleCompressor } from '@/utils/common/compress'
import { mapActions, mapState } from 'pinia'
import useStore from '@/store'
import { uploadServer } from '@/utils/api'
import MarkDown from '@/views/svg/MarkDown.vue'
export default {
  data() {
    return {
      compressMsg: {
        iscompress: false,
        rank: 0.8
      },
      oldSize: '',
      newSize: '',
      afterFile: {},
      svgType: '0',
      linkUrl: ''
    }
  },
  emits: ['changefilelist', 'watermarkhandle'],
  props: {
    file: {
      type: Object,
      default() {
        return {}
      }
    },
    pid: {
      type: Number,
      default: 0
    },
    styleCount: {
      type: String
    }
  },
  computed: {
    ...mapState(useStore, ['toFile']),
    ...mapState(useStore, ['prefixStatus']),
    ...mapState(useStore, ['CompressData']),
    picBlob() {
      return function (item) {
        return window.URL.createObjectURL(item)
      }
    },
    TimeTran() {
      return function (item) {
        return transiTime(item)
      }
    },
    fileListTo() {
      return this.filelist.map((v) => {
        return window.URL.createObjectURL(v.raw)
      })
    }
  },
  mounted() {
    this.compressMsg = this.CompressData
    this.UploadFile(this.file.raw)
  },
  components: { UploadTaggle, MarkDown },
  methods: {
    ...mapActions(useStore, ['setShowSettingBtn']),
    // 执行上传图片的功能
    uploadSumit() {
      return new Promise((resolve) => {
        console.log(this.svgType)
        if (this.svgType === '0') {
          this.svgType = '1'
          const file = this.afterFile
          const formData = new FormData()
          const authmsg = localStorage.getItem('authmsg')
          const list_ = Object.assign(JSON.parse(authmsg), { tofile: this.toFile })
          formData.append('file_', file)
          for (const i in list_) {
            formData.append(i, list_[i])
          }
          uploadServer(formData).then((res) => {
            console.log(res)
            this.svgType = res.data.status ? '3' : '2'
            this.linkUrl = this.prefixStatus + res.data.fileName
            resolve(res.data)
          })
        } else {
          resolve({ msg: '当前图片已上传' })
        }
      })
    },
    changeHandleFile(index) {
      this.$emit('changefilelist', index)
    },
    setwarterMark(index) {
      this.$emit('watermarkhandle', index)
    },
    async UploadFile(params) {
      const _this = this
      if (_this.compressMsg.iscompress) {
        const res = await NewHandleCompressor(params, _this.compressMsg.rank)
        if (res.result) {
          _this.newSize = (res.result.size / 1024).toFixed(2)
          _this.afterFile = res.result
        }
      } else {
        _this.afterFile = params
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './upload.module.less';
</style>
