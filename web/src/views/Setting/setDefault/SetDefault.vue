<!--
 * @Author: Harry
 * @Date: 2022-07-04 20:19:12
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-07 12:14:47
 * @FilePath: \web\src\views\Setting\setDefault\SetDefault.vue
-->
<template>
  <div class="set-defalut">
    <div style="margin-top: 20px;padding-bottom: 20px; border-bottom: 1px solid #f2f2f2;">
      <el-radio-group @change="handleRadio" v-model="radio" size="small">
        <el-radio label="1" border>手动输入目录</el-radio>
        <el-radio label="2" border>自动填写目录</el-radio>
      </el-radio-group>
    </div>
    <el-input v-if="radio === '1'" v-model="valuePrint" placeholder="图片文件夹(格式：hexo/4/)"></el-input>
    <el-cascader v-else @expand-change="handleexpandChange" @change="handleCascader" v-model="valueAuto"
      :props="options" clearable></el-cascader>
    <el-button @click="saveDefault">保存</el-button>
  </div>
</template>

<script>
import useStore from '@/store'
import { Notification } from 'element-ui'
import { mapActions, mapState } from 'pinia'
import { dataTitleGet } from '@/utils/api/'
export default {
  data() {
    return {
      valueAuto: [],
      radio: '1',
      valuePrint: '',
      options: {
        lazy: true,
        checkStrictly: true,
        lazyLoad(node, resolve) {
          let defaultLabels = ''
          const { level, pathLabels } = node
          // console.log(pathLabels)
          const p_ = pathLabels && pathLabels.reduce((a, b) => {
            if (level <= pathLabels.length) return `${a}${b}/`
          }, '')
          // console.log(p_)
          defaultLabels = pathLabels ? p_ : defaultLabels
          // defaultLabels = pathLabels ? pathLabels[level - 1] : defaultLabels
          dataTitleGet(defaultLabels).then(res => {
            const r_ = res.length > 0 ? res : []
            resolve(r_)
          })
          // 通过调用resolve将子节点数据返回，通知组件数据加载完成
        }
      }
    }
  },
  computed: {
    ...mapState(useStore, ['defaultFile'])
  },
  mounted() {
    this.radio = this.defaultFile.methods
    this.initData(this.radio)
  },
  methods: {
    initData(index) {
      if (index === '1') {
        this.valueAuto = []
        this.valuePrint = this.defaultFile.valPt
      } else {
        this.valuePrint = ''
        this.valueAuto = this.defaultFile.valAt
      }
    },
    // 切换按钮时的操作
    handleRadio(e) {
      this.initData(e)
    },
    handleCascader(e) {
      console.log(e)
    },
    handleexpandChange(e) {
    },
    ...mapActions(useStore, ['setDefaultFile']),
    saveDefault() {
      const Pmd = { methods: this.radio, valAt: this.valueAuto, valPt: this.valuePrint }
      this.setDefaultFile(Pmd)
      Notification({
        message: '保存成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.set-defalut {

  .el-cascader,
  .el-input {
    width: 249px;
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
