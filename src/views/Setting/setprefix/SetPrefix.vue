<!--
 * @Author: Harry
 * @Date: 2022-07-04 09:45:30
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-09 15:10:47
 * @FilePath: \master\src\views\Setting\setprefix\SetPrefix.vue
-->
<template>
  <div class="set-prefix">
    <el-select v-model="value" placeholder="请选择" @change="handleSelect">
      <el-option v-for="item in prefixImg.support" :key="item.url" :label="item.label" :value="item.url">
      </el-option>
    </el-select>
    <el-input placeholder="请选择图床管理页面图片地址前缀" v-model="value" :disabled="true">
    </el-input>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import useStore from '@/store/'
export default {
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState(useStore, ['prefixImg']),
    defaultUrl() {
      const store = useStore()
      console.log(store.prefixStatus)
      return store.prefixStatus
    }
  },
  mounted() {
    const auth = localStorage.getItem('authmsg')
    if (auth) {
      this.value = this.defaultUrl
    }
  },
  methods: {
    ...mapActions(useStore, ['setDefaultPrefix']),
    handleSelect(e) {
      this.setDefaultPrefix(e)
    }
  }
}
</script>

<style lang="less" scoped>
@import './setpre.module.less';
</style>
