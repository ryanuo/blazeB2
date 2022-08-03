<!--
 * @Author: Harry
 * @Date: 2022-08-03 15:15:33
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 20:30:09
 * @FilePath: \dev\src\components\setting\SettingView.vue
-->
<template>
  <div class="setting-view-wrap" @click.self="toclose">
    <div class="setting-item-wrap animate__animated animate__fadeInDown">
      <div class="setting-hd">全局配置 | Global configuration
        <span class="close-setting" @click="toclose">
          <CloseSvg />
        </span>
      </div>
      <div class="setting-content">
        <FormView class="separate-line" />
        <set-default-copy class="separate-line" />
        <set-upload class="separate-line" />
        <set-compress class="separate-line" />
        <set-prefix class="separate-line" />
        <set-copy class="separate-line" />
        <set-default class="separate-line" />
      </div>
      <p><span class="red-c">*</span>按照文档进行配置 <a href="https://blazeb2.js.org/guide/prepare.html" target="_blank"
          rel="noopener noreferrer">点击这里传送</a></p>
    </div>
  </div>
</template>

<script>
import FormView from '@/views/formview/FormView.vue'
import SetPrefix from '@/views/Setting/setprefix/SetPrefix.vue'
import SetDefault from '@/views/Setting/setDefault/SetDefault.vue'
import SetCompress from '@/views/Setting/setMain/SetCompress.vue'
import SetUpload from '@/views/Setting/setUploadFile/SetUpload.vue'
import SetCopy from '@/views/Setting/setcopy/SetCopy.vue'
import SetDefaultCopy from '@/views/Setting/setdefaultCopy/SetDefaultCopy.vue'
import CloseSvg from '@/views/svg/CloseSvg.vue'
import { mapActions } from 'pinia'
import useStore from '@/store'
export default {
  components: {
    FormView,
    SetPrefix,
    SetDefault,
    SetCompress,
    SetUpload,
    SetCopy,
    SetDefaultCopy, // SetWatermark
    CloseSvg
  },
  props: {
    isshowSetting: {
      type: Boolean
    }
  },
  methods: {
    ...mapActions(useStore, ['setShowSettingBtn']),
    toclose() {
      this.setShowSettingBtn(false)
    }
  }
}
</script>

<style lang="less" scoped>
@import './Settingview.module.less';
</style>
