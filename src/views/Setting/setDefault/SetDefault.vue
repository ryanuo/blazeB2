<!--
 * @Author: Harry
 * @Date: 2022-07-04 20:19:12
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 18:53:25
 * @FilePath: \dev\src\views\Setting\setDefault\SetDefault.vue
-->
<template>
  <div class="set-defalut">
    <h2 class="setting-hd-h2">默认检索的图片文件夹(<span class="red-c">图床管理</span>)</h2>
    <div style="margin-top: 20px;">
      <el-radio-group v-model="radio" size="small">
        <el-radio label="1" border>手动输入目录</el-radio>
        <el-radio label="2" border>自动填写目录</el-radio>
        <el-radio label="3" border>自动时间格式</el-radio>
      </el-radio-group>
    </div>
    <el-input v-if="radio === '1'" v-model="valuePrint" placeholder="图片文件夹(格式：hexo/4/)"></el-input>
    <el-cascader v-else-if="radio === '2'" v-model="valueAuto" :props="options" clearable></el-cascader>
    <el-input v-if="radio === '3'" v-model="valueTime" placeholder="自动今日时间格式(eg:2022/07/08/)" disabled></el-input>
    <el-button @click="saveDefault">保存</el-button>
  </div>
</template>

<script>
import useStore from '@/store'
import { Notification } from 'element-ui'
import { mapActions, mapState } from 'pinia'
import { dataTitleGet } from '@/utils/api/'
import { transiTime } from '@/plugin/filter'
export default {
  data() {
    return {
      valueAuto: [],
      radio: '1',
      valuePrint: '',
      valueTime: '',
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
    ...mapState(useStore, ['defaultFile']),
    timeAuto() {
      const dateR = Date.now()
      return transiTime(dateR).split(' ')[0].replace(/-/g, '/') + '/'
    }
  },
  mounted() {
    this.radio = this.defaultFile.methods
    this.initData(this.radio)
    this.valueTime = this.timeAuto
  },
  methods: {
    ...mapActions(useStore, ['setDefaultFile']),
    ...mapActions(useStore, ['setShowSettingBtn']),
    initData(index) {
      const that = this
      const fn = function (arg) {
        const { vala, valt, valp } = arg
        that.valueAuto = vala || []
        that.valueTime = valt || ''
        that.valuePrint = valp || ''
      }
      switch (index) {
        case '1':
          fn({ valp: that.defaultFile.valPt })
          break
        case '2':
          fn({ vala: that.defaultFile.valAt })
          break
        case '3':
          fn({ valt: that.defaultFile.valTt })
          break
        default:
          fn()
      }
    },
    saveDefault() {
      const Pmd = { methods: this.radio, valAt: this.valueAuto, valPt: this.valuePrint, valTt: this.valueTime }
      this.setDefaultFile(Pmd)
      Notification({
        message: '保存成功',
        type: 'success'
      })
      this.setShowSettingBtn(false)
    }
  }
}
</script>

<style lang="less" scoped>
@import './setdefault.module.less';
</style>
