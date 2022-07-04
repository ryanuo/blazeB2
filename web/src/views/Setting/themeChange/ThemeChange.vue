<!--
 * @Author: Harry
 * @Date: 2022-07-04 12:24:22
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-04 14:14:55
 * @FilePath: \web\src\views\Setting\themeChange\ThemeChange.vue
-->
<template>
  <div>
    <el-select v-model="value" placeholder="请选择主题" @change="handleSelect">
      <el-option v-for="item in Options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      Options: [
        {
          label: '亮色主题',
          value: ''
        },
        {
          label: '深色主题',
          value: 'dark'
        }
      ]
    }
  },
  mounted() {
    const theme = localStorage.getItem('themeb2')
    if (theme) {
      this.value = JSON.parse(theme).theme
    }
  },
  methods: {
    handleSelect(e) {
      const dom = document.documentElement
      dom.className = this.value
      console.log(e)
      localStorage.setItem('themeb2', JSON.stringify({ theme: e }))
    }
  }
}
</script>

<style lang="less" scoped>
</style>
