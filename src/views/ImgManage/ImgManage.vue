<!--
 * @Author: Harry
 * @Date: 2022-07-01 12:37:58
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-04 18:19:05
 * @FilePath: \dev\src\views\ImgManage\ImgManage.vue
-->
<template>
  <div class="img-m common-container">
    <div v-if="isPreview">
      <PicPreview :pindex="pindex" :imgsList="picListDatas" @closeLayer="isPreview = false"
        :preFileName="prefixStatus" />
    </div>
    <mark-load loadText='正在加载请耐心等待' :isload="loadingPicShow" />
    <div class="inp-w">
      <!-- <el-input placeholder="请输入图片文件夹名称，eg:hexo/2/ 支持多级" v-model="reqParams.prefix" clearable>
      </el-input> -->
      <!-- <el-button type="primary" size="medium" round @click="searchList">搜索</el-button> -->
      <el-tooltip class="item" effect="dark" :content="'点击修改检索路径'" placement="right">
        <el-breadcrumb separator="/" @click.native="setShowSettingBtn(true)">
          <el-breadcrumb-item><span style="font-weight:600">Root</span></el-breadcrumb-item>
          <div v-if="imgDefaultFile">
            <el-breadcrumb-item v-for="item in breadcrumbNav" :key="item">{{ item }}</el-breadcrumb-item>
          </div>
          <span v-else>修改默认文件夹</span>
        </el-breadcrumb>
      </el-tooltip>
      <div class="svg-w">
        <div title="升降序排列" @click="handleSort">
          <sort-view />
        </div>
        <div title="图片显示方式" @click="classType = !classType">
          <LargeList />
        </div>
        <div title="重新加载" @click.stop="refreshData">
          <Refresh />
        </div>
      </div>
    </div>
    <div class="pic-list-t1 animate__animated animate__fadeIn" :class="classType ? 'pic-list-t2' : ''" ref="picListRef">
      <div class="checkbox-wrap" v-if="selectList.length > 0">
        <b2-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{ selectText }}
        </b2-checkbox>
        <span class="red-c">已选中{{ selectList.length }}张图片</span>
        <span class="cancel-btn" @click="handleCancel">取消选择</span>
        <CopyAll class="svg-btn" @click.native="copyAllHandle" />
        <DeleteSelect class="svg-btn" @click.native="delSelect" />
      </div>
      <b2-checkbox-group v-model="selectList" @change="handleCheckedCitiesChange"
        @dblclick.native.prevent="showImgPrew">
        <b2-checkbox :data-pindex="index" v-for="(item, index) in picListDatas" :label="index" :key="item.uid"
          @contextmenu.prevent.stop.native="handleKeyClick($event, index)">
          <template slot="csvg" slot-scope="content">
            <TogChecked :isshow="content.checked" class="tog-container" />
          </template>
          <image-item @update="updatePicLists" :checked="checkAll" :picid="index"
            :piclink="prefixStatus + item.fileName" :pictitle="item.fileName" :fileId="item.fileId"
            :picTime="timespan(item.uploadTimestamp)" :ref="'deleteRef' + index">
          </image-item>
        </b2-checkbox>
      </b2-checkbox-group>
    </div>
    <div v-if="showMenu" class="mark-cont" @click="showMenu = false" @contextmenu.prevent.stop="showMenu = false">
      <contextmenu @menuEvent="handleMenuEvent" ref="contextmenu" :menu-style="menuTopLeft" />
    </div>
    <MarkLoad :isload="isDownload" :totalnum="selectList.length" :progressnum="downloadProgress" loadText="正在下载请耐心等待" />
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-sizes="[50, 80, 100, 200]" :page-size="reqParams.maxFileCount"
      layout="sizes,next">
    </el-pagination>
  </div>
</template>

<script>
import { Message, MessageBox, Notification } from 'element-ui'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { debounce, transiTime, useText } from '@/plugin/filter'
import useStore from '@/store'
import { picList, deleteitemImg } from '@/utils/api'
import LargeList from '@/views/svg/LargeList.vue'
import Refresh from '@/views/svg/Refresh.vue'
import sortView from '@/views/svg/sortView.vue'
import ImageItem from './ImageItem/ImageItem.vue'
import CopyAll from '@/views/svg/CopyAll.vue'
import DeleteSelect from '@/views/svg/DeleteSelect.vue'
import TogChecked from '@/views/svg/TogChecked.vue'
import Contextmenu from '@/views/ImgManage/contextMenu/ContextMenu.vue'
import { B2Checkbox, B2CheckboxGroup } from '@/package/checkbox/'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import MarkLoad from '@/components/loading/MarkLoad.vue'
import PicPreview from '@/components/picprew/PicPreview.vue'

export default {
  data() {
    return {
      inputval: '',
      pindex: 0,
      isPreview: false,
      mainImg: '',
      isDownload: false,
      onShfit: false,
      onCtrl: false,
      onAKey: false,
      selectList: [],
      picListDatas: [],
      currentPage: 1,
      checkAll: false,
      isIndeterminate: false,
      deleteprogress: 0,
      downloadProgress: 0,
      currentitemdetail: {
        filesize: '',
        filename: '',
        filetime: ''
      },
      classType: '',
      reqParams: {
        startFileName: '', // 获得下一个文件名称，从该名称开始
        maxFileCount: 50, // 获取的数量
        prefix: '', // 指定文件夹前缀
        delimiter: ''
      },
      menuTopLeft: {
        top: '',
        left: ''
      },
      loadingPicShow: false,
      isUpSort: false,
      showMenu: false
    }
  },
  components: { LargeList, Refresh, ImageItem, sortView, CopyAll, DeleteSelect, Contextmenu, TogChecked, B2Checkbox, B2CheckboxGroup, MarkLoad, PicPreview },
  computed: {
    ...mapWritableState(useStore, ['isLogined']), // 映射函数，取出isLogined
    ...mapState(useStore, ['prefixStatus']),
    ...mapState(useStore, ['setdefaultFile']), // setdefaultFile
    ...mapState(useStore, ['imgDefaultFile']), // 映射函数，取出setdefaultFile
    ...mapState(useStore, ['noInvalid']),
    ...mapState(useStore, ['defaultCopyUrl']),
    breadcrumbNav() {
      console.log(this.imgDefaultFile.split('/'))
      return this.imgDefaultFile.split('/')
    },
    timespan() {
      return function (val) {
        return transiTime(val)
      }
    },
    selectText() {
      let str_ = ''
      if (this.isIndeterminate) {
        str_ = '选择部分'
        return str_
      }
      return this.checkAll ? '取消全选' : '全选'
    }
  },
  watch: {
    noInvalid: {
      // immediate: true,
      deep: true, // 深度监听
      handler(newValue) {
        console.log(newValue)
        if (newValue) {
          this.getPicList()
        }
      }
    },
    imgDefaultFile: {
      handler(n, o) {
        this.reqParams.prefix = n
        this.refreshData()
        console.log(n, o)
      }
    }
  },
  mounted() {
    this.watchKeyEvent()
    if (this.imgDefaultFile) {
      this.reqParams.prefix = this.imgDefaultFile
    }
    if (this.noInvalid) {
      this.getPicList()
    }
  },
  beforeDestroy() {
    const _this = this
    // 销毁监听键盘事件
    window.removeEventListener('keydown', _this.watchKeyEvent)
    window.removeEventListener('keyup', _this.watchKeyEvent)
  },
  methods: {
    ...mapActions(useStore, ['handleIsLogined']),
    ...mapActions(useStore, ['setShowSettingBtn']),
    // 下载图片zip
    downloadFileZip() {
      this.isDownload = true
      this.downloadProgress = 0
      const _this = this
      const zip = new JSZip()
      console.log(zip)
      zip.file('使用文档.md', useText)
      this.getImgObj().then(downlen => {
        const imgF = zip.folder('images')
        if (downlen.length > 0) {
          for (const i of downlen) {
            const data_ = i.bs64Data.split(',')[1]
            imgF.file(i.filename, data_, { base64: true })
          }
          return zip
        }
      }).then((zip) => {
        zip.generateAsync({ type: 'blob' })
          .then(function (content) {
            // see FileSaver.js
            FileSaver(content, `@BlazeB2-${Date.now()}.zip`)
            _this.isDownload = false
          })
      })
    },
    // 获取页面选中的图片对象
    async getImgObj() {
      // return new Promise((resolve) => {
      const imgObjList = []
      const a = document.querySelectorAll('.el-image__inner')
      for (const i of this.selectList) {
        const urlSplit = a[i].src.split('/')
        const filename = urlSplit[urlSplit.length - 1]
        const fileFormat = filename.split('.')[filename.split('.').length - 1]
        const res = await this.urlToBase64(a[i].src)
        imgObjList.push({
          filename,
          format: fileFormat,
          bs64Data: res
        })
      }
      return imgObjList
    },
    urlToBase64(url) {
      const image = new Image()
      const _this = this
      image.crossOrigin = 'Anonymous'
      image.src = url + '?response-content-type=application/octet-stream'
      return new Promise((resolve, reject) => {
        // image.setAttribute('crossOrigin', 'anonymous')
        console.log(image)
        image.onload = function () {
          const canvas = document.createElement('canvas')
          canvas.width = this.naturalWidth
          canvas.height = this.naturalHeight
          // 将图片插入画布并开始绘制
          canvas.getContext('2d').drawImage(image, 0, 0)
          // result
          const result = canvas.toDataURL('image/png')
          _this.downloadProgress += 1
          resolve(result)
        }
        // 图片加载失败的错误处理
        image.onerror = () => {
          reject(new Error('转换失败'))
        }
      })
    },
    // 图片预览功能
    showImgPrew(e) {
      const { pindex } = e.path[4].dataset
      if (pindex) {
        this.isPreview = true
        this.pindex = parseInt(pindex)
      }
    },
    handleMenuEvent(e) {
      console.log(e)
      const _this = this
      switch (e) {
        case 0: // 打开图片到新的窗口
          _this.handleMenuAfter(function (i) {
            window.open(_this.prefixStatus + _this.picListDatas[i].fileName)
          })
          break
        case 1: // 复制选中的所有图片链接
          _this.copyAllHandle()
          break
        case 2:
          _this.setShowSettingBtn(true)
          break
        case 5:
          _this.downloadFileZip()
          break
        case 6: // 删除选中的所有图片
          _this.delSelect()
          break
        default:
          Notification({ type: 'info', message: '功能待开发' })
      }
    },
    handleMenuAfter(callback) {
      for (const i of this.selectList) {
        callback(i)
      }
    },
    handleKeyClick(e, i) {
      console.log(e)
      const { x, y } = e
      this.menuTopLeft.top = (y - 40) + 'px'
      this.menuTopLeft.left = x + 'px'
      if (!this.selectList.includes(i)) {
        this.selectList = []
        this.selectList.push(i)
        this.isIndeterminate = true
      }
      this.showMenu = true
    },
    watchKeyEvent() {
      const handleKey = debounce((key, status) => {
        // console.log(key)
        switch (key) {
          case 'Shift':
            this.onShfit = status
            break
          case 'Control':
            this.onCtrl = status
            break
          case 'a':
            console.log(this.onCtrl)
            this.onAKey = status
            if (this.onCtrl && this.onAKey) {
              const flag = !this.selectList.length
              this.handleCheckAllChange(flag)
            }
            break
        }
      }, 100, true)
      window.addEventListener('keydown', function (e) {
        e.stopPropagation()
        document.body.onselectstart = function () {
          return false
        }
        // document.getElementById('app').style.userSelect = 'none'
        handleKey(e.key, true)
      })
      window.addEventListener('keyup', function (e) {
        e.stopPropagation()
        document.body.onselectstart = function () {
          return false
        }
        // document.getElementById('app').style.userSelect = 'none'
        handleKey(e.key, false)
      })
    },
    handleIsshowChecked(item) {
      return !this.selectList.includes(item)
    },
    // 取消选择
    handleCancel() {
      if (this.selectList.length > 0) {
        this.selectList = []
        this.isIndeterminate = false
        this.checkAll = false
      }
    },
    // 批量复制事件
    copyAllHandle() {
      let copycon = ''
      for (const i of this.selectList) {
        const a_ = this.defaultCopyUrl.replace(/%s/g, this.prefixStatus + this.picListDatas[i].fileName)
        copycon += a_ + '\n'
      }
      this.$copyText(copycon).then(() => {
        // element ui的弹窗
        Message({
          message: this.copycon !== '' ? '已批量复制到剪贴板' : '您还未上传图片',
          type: this.copycon !== '' ? 'success' : 'error'
        })
      }).catch(() => {
        Message({
          message: '复制失败，请手动复制',
          type: 'error'
        })
      })
      console.log(copycon)
    },
    handleCheckAllChange(val) {
      const sAll = [...(new Array(this.picListDatas.length)).keys()]
      console.log(sAll)
      this.selectList = val ? sAll : []
      this.checkAll = val
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(e) {
      this.selectList.sort((a, b) => b - a)
      console.log(this.selectList)
      const len = this.picListDatas.length
      if (e.length < len) this.isIndeterminate = true
      if (e.length === 0 || e.length === len) {
        this.isIndeterminate = false
      }
      this.checkAll = e.length === len
    },
    delqueue(arr) {
      const _this = this
      const data = []
      let sequence = Promise.resolve()
      arr.forEach(function (item) {
        sequence = sequence.then(item).then(r => {
          data.push(r)
          if (!r.status) {
            _this.deleteprogress += 1
          }
          console.log(r)
          return data
        })
      })
      return sequence
    },
    // 批量删除
    delSelect() {
      const that = this
      MessageBox({
        title: '提示',
        message: '此操作将删除选中图片, 是否继续?',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning'
      }).then(async () => {
        sessionStorage.removeItem('templist')
        const waitDelList = []
        const len = that.selectList.length
        that.currentTempNum = len
        that.deleteprogress = 0
        for (const i of that.selectList) {
          waitDelList.push(function () {
            return new Promise((resolve, reject) => {
              const n = that.deleteImg(that.picListDatas[i], i)
              resolve(n)
            })
          })
        }
        // console.log(waitDelList)
        const r_ = await that.delqueue(waitDelList)
        console.log(r_)
        const errorL = len - that.deleteprogress
        Notification({
          title: '删除提示',
          type: errorL ? 'error' : 'success',
          message: `删除成功：${that.deleteprogress}张,删除失败：${errorL}张；${errorL > 0 ? '失败原因：请求过于频繁，建议单张上传' : ''}`
        })
      })
    },
    async deleteImg(obj, val) {
      const auth = JSON.parse(localStorage.getItem('authmsg'))
      console.log(this.currentIndex)
      // this.picListDatas[this.currentIndex]
      const { fileName, fileId } = obj
      const params = {
        api_url: auth.api_url,
        init_token: auth.init_token,
        file_name: fileName,
        file_id: fileId
      }
      const { data: res } = await deleteitemImg({ params })
      this.picListDatas.splice(val, 1)
      this.selectList.shift()
      return res
    },
    // 执行删除的指令
    updatePicLists(e) {
      this.picListDatas.splice(e, 1)
    },
    // 获取数据
    getPicList(fn = null) {
      const _this = this
      _this.loadingPicShow = true
      const auth = localStorage.getItem('authmsg')
      if (auth) {
        const p_ = Object.assign(JSON.parse(auth), _this.reqParams)
        picList({ params: p_ })
          .then((res) => {
            if (res.data.files.length === 0) {
              Notification({ title: '提示', message: '文件夹内无图片', type: 'error' })
            }
            // const r_ = res.data.files.map((item) => {
            //   return Object.assign({}, item, { disabled: false })
            // })
            if (_this.reqParams.startFileName === res.data.nextFileName) {
              Notification({ type: 'warning', message: '当前文件夹下图片已全部加载', title: '提示' })
            } else {
              _this.reqParams.startFileName = res.data.nextFileName
              _this.picListDatas = [..._this.picListDatas, ...res.data.files]
              _this.handleUd()
            }
            _this.loadingPicShow = false
            if (fn) return fn()
          })
      }
    },
    // 根据文件夹前缀进行搜索
    searchList: debounce(function () {
      this.picListDatas = []
      this.reqParams.startFileName = ''
      const val = this.reqParams.prefix.trim()
      if (val) {
        this.getPicList()
      }
    }, 300, true),
    // 刷新完成后滑轮滑到最底部
    setRollBottom() {
      // 文档内容的实际高度
      const blockScrollHeight = this.$refs.picListRef.scrollHeight
      this.$refs.picListRef.scrollTop = blockScrollHeight
    },
    // 按升序降序排列
    handleSort() {
      this.isUpSort = !this.isUpSort
      this.handleUd()
    },
    // 处理升序降序
    handleUd() {
      if (this.isUpSort) {
        this.picListDatas.sort((a, b) => {
          // console.log(a.uploadTimestamp - b.uploadTimestamp)
          return a.uploadTimestamp - b.uploadTimestamp
        })
        console.log('时间升序')
      } else {
        this.picListDatas.sort((a, b) => {
          return b.uploadTimestamp - a.uploadTimestamp
        })
        console.log('时间降序')
      }
    },
    refreshData: debounce(function () {
      this.picListDatas = []
      this.reqParams.startFileName = ''
      // this.reqParams.prefix = ''
      this.getPicList()
    }, 400, true),
    handleSizeChange(e) {
      this.reqParams.maxFileCount = e
      this.getPicList()
    },
    handleCurrentChange(_e) {
      this.getPicList(this.setRollBottom)
    }
  }
}
</script>

<style lang="less" scoped>
@import './imgmanage.module.less';
</style>
