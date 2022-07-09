<!--
 * @Author: Harry
 * @Date: 2022-07-01 12:37:58
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-09 22:22:24
 * @FilePath: \master\src\views\ImgManage\ImgManage.vue
-->
<template>
  <div v-loading="loadingPicShow" class="img-m common-container">
    <div class="inp-w">
      <!-- <el-input placeholder="请输入图片文件夹名称，eg:hexo/2/ 支持多级" v-model="reqParams.prefix" clearable>
      </el-input> -->
      <!-- <el-button type="primary" size="medium" round @click="searchList">搜索</el-button> -->
      <el-tag>
        {{ imgDefaultFile === '' ? '配置页面修改默认仓库地址' : `当前的仓库名：${imgDefaultFile}` }}
      </el-tag>
      <el-tag type="info" @click="$router.replace({ name: 'setting', query: { id: '3' } })">修改</el-tag>
      <!-- <el-button size="small"></el-button> -->
      <div class="svg-w" @click="classType = !classType">
        <div title="图片显示方式">
          <LargeList />
        </div>
        <div title="重新加载" @click.stop="refreshData">
          <Refresh />
        </div>
      </div>
    </div>
    <!-- <div class="waterfall-w"> -->
    <div class="pic-list-t1 animate__animated animate__fadeIn" :class="classType ? 'pic-list-t2' : ''" ref="picListRef">
      <image-item @setshowdiag="handleDiag" @ishow="imgshow" @update="updatePicLists"
        v-for="(item, index) in picListDatas" :key="item.fileName + index" :picid="index" :piclink="item.fileName"
        :pictitle="item.fileName" :fileId="item.fileId" :picTime="item.uploadTimestamp" />
    </div>
    <!-- </div> -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-sizes="[50, 80, 100, 200]" :page-size="reqParams.maxFileCount"
      layout="sizes,next">
    </el-pagination>
    <el-dialog class="tpxq_w" title="图片详情" :visible.sync="centerDialogVisible" width="40%" center>
      <div><span>图片名称：</span>{{ currentitemdetail.filename }}</div>
      <div><span>图片大小：</span>{{ currentitemdetail.filesize }}</div>
      <div><span>上传时间：</span>{{ currentitemdetail.filetime }}</div>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { debounce, transiTime } from '../../plugin/filter'
import useStore from '../../store'
import { picList } from '../../utils/api'
import LargeList from '../svg/LargeList.vue'
import Refresh from '../svg/Refresh.vue'
import ImageItem from './ImageItem/ImageItem.vue'
import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from 'v-viewer'
import { endLoading, startLoading } from '@/utils/common/loading'
export default {
  data() {
    return {
      inputval: '',
      centerDialogVisible: false,
      picListDatas: [],
      currentPage: 1,
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
      loadingPicShow: false
    }
  },
  components: { LargeList, Refresh, ImageItem },
  computed: {
    ...mapWritableState(useStore, ['isLogined']), // 映射函数，取出isLogined
    ...mapWritableState(useStore, ['prefixImg']), // 映射函数，取出prefixImg
    ...mapState(useStore, ['setdefaultFile']), // 映射函数，取出setdefaultFile
    ...mapState(useStore, ['imgDefaultFile']), // 映射函数，取出setdefaultFile
    ...mapState(useStore, ['noInvalid'])
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
    }
  },
  mounted() {
    if (this.imgDefaultFile) {
      this.reqParams.prefix = this.imgDefaultFile
    }
    if (this.noInvalid) {
      this.getPicList()
    }
  },
  methods: {
    handleDiag(e) {
      const a_ = this.picListDatas[e]
      this.currentitemdetail = {
        filesize: (a_.contentLength / 1000).toFixed(2) + 'kb',
        filename: a_.fileName,
        filetime: transiTime(a_.uploadTimestamp)
      }
      this.centerDialogVisible = true
    },
    imgshow(e) {
      viewerApi({
        images: [e.f_]
      })
    },
    updatePicLists(e) {
      this.picListDatas.splice(e, 1)
    },
    ...mapActions(useStore, ['handleIsLogined']),
    // 获取数据
    getPicList(fn = null) {
      const _this = this
      startLoading(document.querySelector('.img-m'), '正在加载....')
      const auth = localStorage.getItem('authmsg')
      if (auth) {
        const p_ = Object.assign(JSON.parse(auth), _this.reqParams)
        picList({ params: p_ })
          .then((res) => {
            if (res.data.files.length === 0) {
              Notification({
                title: '提示',
                message: '文件夹内无图片',
                type: 'error'
              })
            }
            _this.picListDatas = [..._this.picListDatas, ...res.data.files]
            _this.reqParams.startFileName = res.data.nextFileName
            endLoading()
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
      // this.$refs.picListRef.scrollTop = blockScrollHeight
      // // 滚动条滚动高度
      let blockScrollTop = this.$refs.picListRef.scrollTop
      const _this = this
      Roll()
      function Roll() {
        blockScrollTop += 100
        if (blockScrollHeight <= blockScrollTop) return false
        setTimeout(() => {
          _this.$refs.picListRef.scrollTop = blockScrollTop
          return Roll()
        }, 10)
      }
      // // 可视窗口高度
      // const blockClientHeight = this.$refs.picListRef.clientHeight
      // console.log(blockScrollHeight, blockScrollTop, blockClientHeight)
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
