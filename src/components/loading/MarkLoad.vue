<!--
 * @Author: Harry
 * @Date: 2022-08-03 20:08:17
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 20:17:02
 * @FilePath: \dev\src\components\loading\MarkLoad.vue
-->
<template>
  <div v-if="isDownload" class="isdload">
    <span><img src="/img/loading.gif" alt="" srcset="" />{{ loadText }}({{ progressnum }}/{{ totalnum }})</span>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    isDownload: {
      type: Boolean,
      default: false
    },
    totalnum: {
      type: Number,
      default: 0
    },
    progressnum: {
      type: Number,
      default: 0
    },
    loadText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
