<!--
 * @Author: Harry
 * @Date: 2022-07-01 12:37:58
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-29 22:12:47
 * @FilePath: \dev\src\views\ImgManage\ImgManage.vue
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
    <!-- <div class="waterfall-w"> -->
    <div class="pic-list-t1 animate__animated animate__fadeIn" :class="classType ? 'pic-list-t2' : ''" ref="picListRef">
      <div class="checkbox-wrap" v-if="selectList.length > 0">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{ selectText }}
        </el-checkbox>
        <span class="red-c">已选中{{ this.selectList.length }}张图片</span>
        <span class="cancel-btn" @click="handleCancel">取消选择</span>
        <CopyAll class="svg-btn" @click.native="copyAllHandle" />
        <DeleteSelect class="svg-btn" @click.native="delSelect" />
      </div>
      <el-checkbox-group v-model="selectList" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(item, index) in picListDatas" :label="index" :key="item.uid">
          <image-item @setshowdiag="handleDiag" @update="updatePicLists" :picid="index"
            :piclink="prefixStatus + item.fileName" :pictitle="item.fileName" :fileId="item.fileId"
            :picTime="timespan(item.uploadTimestamp)" :ref="'deleteRef' + index">
            <TogChecked class="tog-container" />
          </image-item>
        </el-checkbox>
      </el-checkbox-group>
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
import { Message, MessageBox, Notification } from 'element-ui'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { debounce, transiTime } from '@/plugin/filter'
import useStore from '@/store'
import { picList, deleteitemImg } from '@/utils/api'
import LargeList from '../svg/LargeList.vue'
import Refresh from '../svg/Refresh.vue'
import sortView from '../svg/sortView.vue'
import ImageItem from './ImageItem/ImageItem.vue'
import { endLoading, startLoading } from '@/utils/common/loading'
import CopyAll from '../svg/CopyAll.vue'
import DeleteSelect from '../svg/DeleteSelect.vue'
import TogChecked from '../svg/TogChecked.vue'

export default {
  data() {
    return {
      inputval: '',
      selectList: [],
      centerDialogVisible: false,
      picListDatas: [],
      currentPage: 1,
      checkAll: false,
      isIndeterminate: false,
      deleteprogress: 0,
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
      loadingPicShow: false,
      isUpSort: false
    }
  },
  components: { LargeList, Refresh, ImageItem, sortView, CopyAll, DeleteSelect, TogChecked },
  computed: {
    ...mapWritableState(useStore, ['isLogined']), // 映射函数，取出isLogined
    ...mapState(useStore, ['prefixStatus']),
    ...mapState(useStore, ['setdefaultFile']), // 映射函数，取出setdefaultFile
    ...mapState(useStore, ['imgDefaultFile']), // 映射函数，取出setdefaultFile
    ...mapState(useStore, ['noInvalid']),
    ...mapState(useStore, ['defaultCopyUrl']),
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
    // 取消选择
    handleCancel() {
      if (this.selectList.length > 0) {
        this.selectList = []
        this.isIndeterminate = false
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
    handleDiag(e) {
      const a_ = this.picListDatas[e]
      this.currentitemdetail = {
        filesize: (a_.contentLength / 1000).toFixed(2) + 'kb',
        filename: a_.fileName,
        filetime: transiTime(a_.uploadTimestamp)
      }
      this.centerDialogVisible = true
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
              Notification({ title: '提示', message: '文件夹内无图片', type: 'error' })
            }
            if (_this.reqParams.startFileName === res.data.nextFileName) {
              Notification({ type: 'warning', message: '当前文件夹下图片已全部加载', title: '提示' })
            } else {
              _this.reqParams.startFileName = res.data.nextFileName
              _this.picListDatas = [..._this.picListDatas, ...res.data.files]
              _this.handleUd()
            }
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
      this.$refs.picListRef.scrollTop = blockScrollHeight
      // // 滚动条滚动高度
      // const blockScrollTop = this.$refs.picListRef.scrollTop
      // const _this = this
      // Roll()
      // function Roll() {
      //   blockScrollTop += 100
      //   if (blockScrollHeight <= blockScrollTop) return false
      //   setTimeout(() => {
      //     _this.$refs.picListRef.scrollTop = blockScrollTop
      //     return Roll()
      //   }, 10)
      // }
      // // 可视窗口高度
      // const blockClientHeight = this.$refs.picListRef.clientHeight
      // console.log(blockScrollHeight, blockScrollTop, blockClientHeight)
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
