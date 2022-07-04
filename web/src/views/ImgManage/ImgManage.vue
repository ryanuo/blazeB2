<!--
 * @Author: Harry
 * @Date: 2022-07-01 12:37:58
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-04 13:55:58
 * @FilePath: \web\src\views\ImgManage\ImgManage.vue
-->
<template>
  <div class="img-m common-container">
    <div class="inp-w">
      <el-input placeholder="请输入图片文件夹名称，eg:hexo/2/ 支持多级" v-model="reqParams.prefix" clearable>
      </el-input>
      <el-button type="primary" size="medium" round @click="searchList">搜索</el-button>
      <div class="svg-w">
        <div title="图片显示方式">
          <LargeList />
        </div>
        <div title="重新加载" @click="refreshData">
          <Refresh />
        </div>
      </div>
    </div>
    <div class="pic-list-t1 animate__animated animate__fadeIn">
      <image-item v-for="item in picListDatas" :key="item.fileName" :piclink="item.fileName" :pictitle="item.fileName"
        :fileId="item.fileId" />
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-sizes="[50, 80, 100, 200]" :page-size="reqParams.maxFileCount"
      layout="sizes,next">
    </el-pagination>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { mapActions, mapState } from 'pinia'
import { debounce } from '../../plugin/filter'
import useStore from '../../store'
import { picList } from '../../utils/api'
import LargeList from '../svg/LargeList.vue'
import Refresh from '../svg/Refresh.vue'
import ImageItem from './ImageItem/ImageItem.vue'
export default {
  data() {
    return {
      inputval: '',
      picListDatas: [],
      currentPage: 1,
      reqParams: {
        startFileName: '', // 获得下一个文件名称，从该名称开始
        maxFileCount: 50, // 获取的数量
        prefix: '' // 指定文件夹前缀
      }
    }
  },
  components: { LargeList, Refresh, ImageItem },
  computed: {
    ...mapState(useStore, ['isLogined']) // 映射函数，取出tagslist
  },
  watch: {
    isLogined: {
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
    const auth = localStorage.getItem('authmsg')
    if (auth) {
      this.getPicList()
    }
  },
  methods: {
    ...mapActions(useStore, ['handleIsLogined']),
    // 获取数据
    async getPicList() {
      const auth = localStorage.getItem('authmsg')
      if (auth) {
        const p_ = Object.assign(JSON.parse(auth), this.reqParams)
        const { data: res } = await picList({ params: p_ })
        if (res.files.length === 0) {
          Notification({
            title: '提示',
            message: '文件夹内无图片',
            type: 'error'
          })
        }
        this.picListDatas = [...this.picListDatas, ...res.files]
        this.reqParams.startFileName = res.nextFileName
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
    refreshData: debounce(function () {
      // this.reqParams.startFileName = ''
      this.reqParams.prefix = ''
      this.getPicList()
    }, 400, true),
    handleSizeChange(e) {
      this.reqParams.maxFileCount = e
      this.getPicList()
    },
    handleCurrentChange(e) {
      this.getPicList()
    }
  }
}
</script>

<style lang="less" scoped>
.img-m {
  position: relative;
  padding-bottom: 20px;

  .el-input {
    width: 340px;
  }

  .el-button {
    margin-left: 10px;
  }

  .el-pagination {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
}

.inp-w {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #f2f2f2;
}

.svg-w {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;

  div[title] {
    margin: 0 5px;
    width: 30px;
    cursor: pointer;

    svg {
      width: 30px;
      height: 30px;
    }
  }
}

.pic-list-t1 {
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-evenly;
  overflow: auto;
  max-height: 70vh;
  border-bottom: 1px solid #f2f2f2;
  padding: 5px 0;

  .image-item {
    width: 25%;
  }
}
</style>
