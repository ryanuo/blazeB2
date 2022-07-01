<!--
 * @Author: Harry
 * @Date: 2022-07-01 11:19:24
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-01 16:24:36
 * @FilePath: \web\src\views\TabNav\TabNav.vue
-->
<template>
  <div class="hd-w">
    <div class="lay-out">
      <div v-if="isLogined" @click="openhandle">
        <LayOut />
      </div>
      <div v-else @click="dialogVisible = true">
        <SignSvg />
      </div>
    </div>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b" router>
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item v-if="isLogined" index="imanage">图床管理</el-menu-item>
      <el-menu-item index="setting">配置管理</el-menu-item>
      <el-menu-item index="about">关于程序</el-menu-item>
      <el-menu-item><a href="https://github.com/Rr210/blazeB2/issues/" target="_blank">帮助与反馈</a></el-menu-item>
    </el-menu>
    <router-view />
    <el-dialog title="填写blake存储桶基本信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <FormView />
    </el-dialog>
  </div>
</template>

<script>
import useStore from '@/store' // 引入store
import { mapState, mapActions } from 'pinia'
import LayOut from '@/views/LayOut.vue'
import SignSvg from '@/views/SignSvg.vue'
import { Message, MessageBox } from 'element-ui'
import FormView from '../FormView.vue'
export default {
  data() {
    return {
      activeIndex2: 'home',
      dialogVisible: false
    }
  },
  components: { LayOut, SignSvg, FormView },
  mounted() {
    this.handleIsLogined()
  },
  computed: {
    ...mapState(useStore, ['isLogined']) // 映射函数，取出tagslist
  },
  methods: {
    ...mapActions(useStore, ['handleIsLogined']),
    openhandle() {
      MessageBox({
        title: '提示',
        message: '此操作将删除本地缓冲信息, 是否继续?',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning'
      }).then(() => {
        this.dialogVisible = true
        localStorage.clear()
        this.handleIsLogined()
      }).then(() => {
        Message({
          type: 'success',
          message: '缓冲清除成功,已退出!'
        })
      })
    },

    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.hd-w {
  position: relative;
  height: 100vh;
}

.lay-out {
  position: absolute;
  top: 2%;
  right: 2%;
  width: 30px;
  height: 30px;
  z-index: 2000;

  .svg {
    width: 100%;
  }
}
</style>
