<!--
 * @Author: Harry
 * @Date: 2022-07-10 14:19:44
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 17:30:35
 * @FilePath: \dev\src\views\Setting\setcopy\SetCopy.vue
-->
<template>
  <div>
    <h2 class="setting-hd-h2" style="margin-bottom:10px;">图片外链默认复制格式 <span class="red-c">%s</span>为外链地址</h2>
    <el-radio-group @change="handleFormat" v-model="radiov" size="small">
      <el-tooltip v-for="(item, index) in defaultcopyformat.formatList" :key="index" class="item" effect="dark"
        :content="item || '您还未定义'" placement="top-start">
        <el-radio :label="index" border>
          {{ index }}
        </el-radio>
      </el-tooltip>
    </el-radio-group>
    <div v-if="radiov === 'Custom'">
      <el-input type="text" v-model="custom" placeholder="自定义外链格式"
        style="width: 217px;margin-top: 10px;margin-right: 10px;" />
      <el-button @click="validCustom">保存</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import useStore from '@/store'
import { debounce } from '../../../plugin/filter'
import { Notification } from 'element-ui'
export default {
  data() {
    return {
      radiov: '',
      custom: ''
    }
  },
  computed: {
    ...mapState(useStore, ['defaultcopyformat']),
    ...mapState(useStore, ['defaultCopy'])
  },
  mounted() {
    this.radiov = this.defaultCopy
    console.log(this.defaultCopy)
    if (this.defaultCopy === 'Custom') {
      this.custom = this.defaultcopyformat.formatList.Custom
    }
  },
  methods: {
    ...mapActions(useStore, ['setDefaultFormat']),
    ...mapActions(useStore, ['setCustomFormat']),
    handleFormat(e) {
      if (e === 'Custom') {
        Notification({
          title: '自定义格式',
          message: '请在输入框中填写，格式 %s ，eg: ![](%s)',
          type: 'warning'
        })
        return
      }
      this.setDefaultFormat(e)
      Notification({
        title: '自定义格式',
        message: '已将格式设置为：' + e,
        type: 'success'
      })
    },
    // 校验自定义链接
    validCustom: debounce(function () {
      const reg = /%s/g.test(this.custom)
      Notification({
        title: '提示',
        message: reg ? `您当前的默认外链已设置为：${this.custom}` : '自定义格式有误，请将%s按照格式填写，例如：![](%s)',
        type: reg ? 'success' : 'error'
      })
      if (reg) {
        this.setDefaultFormat('Custom')
        this.setCustomFormat(this.custom)
      }
    }, 300, true)
  }
}
</script>

<style lang="less" scoped>
</style>
