<!--
 * @Author: Harry
 * @Date: 2022-07-14 13:02:06
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-29 20:38:51
 * @FilePath: \dev\src\views\home\components\wm\wmarkview.vue
-->
<template>
  <div>
    <div class="wm-isshow">
      <div class="wm-header"><span>添加水印</span>
      </div>
      <div class="wm-main">
        <div class="wm-left">
          <div class="wm-i-w">
            <h2 class="">水印</h2>
            <div>
              <el-radio @change="handleRadio" v-model="radio" label="1">文本水印</el-radio>
              <el-input v-model="wmConfig.text" :disabled="radio === '2'" placeholder="" />
              <div :class="radio !== '1' ? 'noshow' : ''">
                <TextSet @textEvent="handleSetText" />
              </div>
              <div class="wm-t2">
                <el-radio @change="handleRadio" v-model="radio" label="2">图片水印</el-radio>
                <el-button size="mini" :disabled="radio !== '2'">添加图片(不推荐)
                  <input :disabled="radio !== '2' ? 'disabled' : false" class="o-btn1" id="upload" type="file"
                    @change="viewer" />
                </el-button>
              </div>
            </div>
          </div>
          <div class="wm-i-w">
            <h2 class="">外观</h2>
            <div :class="radio === '2' ? 'noshow' : ''" class="wm-block">
              <span class="demonstration">大小</span>
              <el-slider v-model="wmConfig.fontSize" :max="80"></el-slider>
            </div>
            <div class="wm-block">
              <span class="demonstration">透明度</span>
              <el-slider v-model="wmConfig.opacity" :step=".1" :max="1"></el-slider>
            </div>
            <div class="wm-block">
              <span class="demonstration">旋转</span>
              <el-slider v-model="wmConfig.rotate" :min="-90" :max="90" :show-tooltip="false"></el-slider>
            </div>
            <div class="wm-block">
              <span class="demonstration">水平间距</span>
              <el-slider v-model="wmConfig.gapX" :max="400"></el-slider>
            </div>
            <div class="wm-block">
              <span class="demonstration">垂直间距</span>
              <el-slider v-model="wmConfig.gapY" :disabled="false" :max="400"></el-slider>
            </div>
          </div>
          <div class="wm-i-w">
            <h2 class="">位置</h2>
            <el-switch v-model="wmConfig.mode" active-text="重复展示" active-value="repeat" inactive-value="interval"
              inactive-text="错行展示">
            </el-switch>
          </div>
        </div>
        <div class="wm-right">
          <p>预览</p>
          <div class="preview">
            <div ref="previewImg">
              <Watermark :options="wmConfig" :visible="true">
                <canvas id="imageEffectCanvas" ref="canvasRef"></canvas>
              </Watermark>
            </div>
          </div>
          <div class="tipsFooter">
            <el-button class="cancel" @click="resetHandle">取消</el-button>
            <el-button class="true_w" type="primary" @click="submitHandle" :loading="isLoad">{{ isLoad ? '正在上传' : '立即上传'
            }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Watermark } from '@pansy/vue-watermark'
import TextSet from '@/views/svg/TextSet.vue'
import useStore from '@/store'
import { Notification } from 'element-ui'
import { doCut } from '@/plugin/htmlcav.js'
import { uploadServer } from '@/utils/api'
import { mapState } from 'pinia'
export default {
  data() {
    return {
      dialogImageUrl: '',
      afterFile: {},
      radio: '1',
      isLoad: false,
      wmConfig: {
        image: '',
        gapX: 100,
        gapY: 100,
        opacity: 0.2,
        rotate: -22,
        fontSize: 20,
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: '400',
        fontColor: '#000',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        monitor: true,
        zIndex: 9999,
        mode: 'interval',
        text: 'Blazeb2水印'
      }
    }
  },
  props: {
    file: {
      type: Object
    }
  },
  emits: ['resfile', 'uninstall'],
  computed: {
    newOption() {
      return this.wmConfig
    },
    ...mapState(useStore, ['toFile'])
  },
  mounted() {
    this.handlePictureCardPreview(this.file)
  },
  methods: {
    submitHandle() {
      this.isLoad = true
      this.uploadSumit()
    },
    resetHandle() {
      this.$emit('uninstall', false)
    },
    handleRadio() {
      if (this.radio === '1') {
        this.wmConfig.image = ''
      }
    },
    handleSetText(e) {
      const { label, value } = e
      this.wmConfig[label] = value
    },
    viewer(e) {
      const url = this.getObjectURL(e.target.files[0])
      this.wmConfig.image = url
    },
    getObjectURL(file) {
      let url = null
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    blobToImg(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          const img = new Image()
          img.src = reader.result
          img.addEventListener('load', () => resolve(img))
        })
        reader.readAsDataURL(blob)
      })
    },
    SetImgAutoSize(MaxWidth, MaxHeight, img) {
      // var img=document.all.img1;//获取图片
      const HeightWidth = img.height / img.width // 设置高宽比
      const WidthHeight = img.width / img.height // 设置宽高比
      if (img.width >= MaxWidth) {
        img.width = MaxWidth
        img.height = MaxWidth * HeightWidth
      }
      if (img.height > MaxHeight) {
        img.height = MaxHeight
        img.width = MaxHeight * WidthHeight
      }
      if (img.height < MaxHeight && img.width < MaxWidth) {
        if (img.width > img.height) {
          img.height = MaxHeight
          img.width = HeightWidth * MaxWidth
        } else {
          img.width = MaxWidth
          img.height = WidthHeight * MaxHeight
        }
      }
      return img
    },
    ImageToCanvas(image) {
      const canvas = document.getElementById('imageEffectCanvas')
      const img_ = this.SetImgAutoSize(572, 442, image)
      canvas.width = img_.width
      canvas.height = img_.height
      canvas.getContext('2d').drawImage(img_, 0, 0, img_.width, img_.height) // 0, 0参数画布上的坐标点，图片将会拷贝到这个地方
      return canvas
    },
    async handlePictureCardPreview(file) {
      // console.log(first)
      this.dialogImageUrl = file.url
      const img = await this.blobToImg(file.raw)
      this.ImageToCanvas(img)
    },
    async uploadSumit() {
      const dom = this.$refs.previewImg
      const file = await doCut(dom, this)
      return new Promise((resolve) => {
        // const file = this.afterFile
        const formData = new FormData()
        const authmsg = localStorage.getItem('authmsg')
        const list_ = Object.assign(JSON.parse(authmsg), { tofile: this.toFile })
        formData.append('file_', file)
        for (const i in list_) {
          formData.append(i, list_[i])
        }
        uploadServer(formData).then((res) => {
          console.log(res)
          console.log(1)
          this.$emit('uninstall')
          this.$emit('waterpic', res.data)
          Notification({
            title: '提示',
            message: '水印图片已上传',
            type: 'success'
          })
          resolve(res.data)
        })
      })
    }
  },
  components: { TextSet, Watermark }
}
</script>

<style lang="less" scoped>
@import './wmarkview.module.less';
</style>
