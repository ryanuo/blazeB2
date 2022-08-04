<!--
 * @Author: Harry
 * @Date: 2022-07-05 11:54:55
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 20:18:08
 * @FilePath: \dev\src\views\Setting\setMain\SetCompress.vue
-->
<template>
  <div class="set-commpress">
    <div class="set-commpress-hd">
      <h2 class="setting-hd-h2">
        是否开启压缩(<span class="red-c">首页</span>)
      </h2>
      <el-switch v-model="value" @change="handleComp" active-text="开启" inactive-text="关闭" :active-value="true"
        :inactive-value="false">
      </el-switch>
    </div>
    <div class="block-compress" v-show="value">
      <span class="demonstration">压缩等级({{ value1 }})</span>
      <div class="slide-w">
        <el-slider @change="handleComp" v-model="value1" :step="0.1" :max="1" show-stops>
        </el-slider>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'pinia'
import useStore from '@/store/'
import { Notification } from 'element-ui'

export default {
  data() {
    return {
      value: false,
      value1: 0.8
    }
  },
  mounted() {
    const store = useStore()
    this.$nextTick(() => {
      this.value = store.CompressData.iscompress
      this.value1 = store.CompressData.rank
    })
  },
  methods: {
    handleComp: function (e) {
      const store = useStore()
      const params = {
        iscompress: this.value,
        rank: this.value1
      }
      store.setDefaultCompress(params)
      Notification({
        title: '压缩功能提示',
        message: `上传压缩功能${this.value ? '已开启' : '已关闭'},${this.value ? '压缩等级为:' + this.value1 : ''}`,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './setcom.module.less';
</style>
