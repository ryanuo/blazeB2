<!--
 * @Author: Harry
 * @Date: 2022-07-14 17:19:21
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-17 10:16:57
 * @FilePath: \dev\src\views\svg\TextSet.vue
-->
<template>
  <div class="text-set">
    <svg @click="handleBold" t="1657790440978" class="icon" viewBox="0 0 1024 1024" version="1.1"
      xmlns="http://www.w3.org/2000/svg" p-id="1320" width="22" height="22">
      <path
        d="M582.83 125.77c78.2 0 138.52 17.89 183.23 55.86 42.43 35.75 63.66 83.8 63.66 145.25 0 44.68-11.16 82.66-33.5 113.95-22.34 29.05-52.52 51.39-92.73 65.91 52.5 10.05 92.73 31.27 119.52 63.68 26.82 32.39 40.23 75.95 40.23 129.59 0 80.43-27.93 138.52-82.66 176.5-46.93 31.3-112.84 46.93-197.75 46.93h-364.2V125.77h364.2zM340.4 464.29h210.02c55.86 0 96.09-10.07 120.66-29.05 24.59-20.11 36.86-51.39 36.86-93.84 0-40.23-12.27-69.27-36.86-87.16-24.57-18.98-64.8-27.91-118.41-27.91H340.4v237.96z m0 358.62h225.68c51.39 0 91.59-8.93 120.64-24.57 35.75-21.23 54.75-54.75 54.75-100.57 0-46.91-14.52-81.55-42.45-102.77-27.93-21.23-71.5-31.27-129.59-31.27H340.4v259.18z"
        p-id="1321" :fill="svgBC ? 'var(--b2-theme-c)' : 'var(--b2-text)'"></path>
    </svg>
    <svg @click="handleInt" t="1657794066811" class="icon" viewBox="0 0 1024 1024" version="1.1"
      xmlns="http://www.w3.org/2000/svg" p-id="2125" width="22" height="22">
      <path d="M656.64 165.184l-186.432 695.296-92.736-24.896 186.432-695.232z"
        :fill="svgIC ? 'var(--b2-theme-c)' : 'var(--b2-text)'" p-id="2126"></path>
      <path d="M787.2 224m-48 0l-288 0q-48 0-48-48l0 0q0-48 48-48l288 0q48 0 48 48l0 0q0 48-48 48Z"
        :fill="svgIC ? 'var(--b2-theme-c)' : 'var(--b2-text)'" p-id="2127"></path>
      <path d="M620.8 896m-48 0l-288 0q-48 0-48-48l0 0q0-48 48-48l288 0q48 0 48 48l0 0q0 48-48 48Z"
        :fill="svgIC ? 'var(--b2-theme-c)' : 'var(--b2-text)'" p-id="2128"></path>
    </svg>
    <el-color-picker @active-change="handleChangeColor" v-model="color" size="mini" />
    <el-select @change="handleFontFamily" v-model="Textvalue" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      svgBC: false,
      svgIC: false,
      Textvalue: 'sans-serif',
      color: '',
      options: [
        { label: '默认字体', value: 'sans-serif' },
        { label: '微软雅黑', value: 'Microsoft Yahei' },
        { label: '宋体', value: 'SimSun' },
        { label: '仿宋', value: 'FangSong' },
        { label: '幼圆 ', value: 'YouYuan' },
        { label: '黑体', value: 'SimHei' }
      ]
    }
  },
  emits: ['textEvent'],
  methods: {
    handleText(temp, val) {
      this.$emit('textEvent', { label: temp, value: val })
    },
    handleBold() {
      this.svgBC = !this.svgBC
      const v_ = this.svgBC ? '600' : '400'
      const l_ = 'fontWeight'
      this.handleText(l_, v_)
    },
    handleInt() {
      this.svgIC = !this.svgIC
      const v_ = this.svgIC ? 'italic' : 'normal'
      const l_ = 'fontStyle'
      this.handleText(l_, v_)
    },
    handleChangeColor(e) {
      const l_ = 'fontColor'
      const v_ = e
      this.handleText(l_, v_)
    },
    handleFontFamily(e) {
      const l_ = 'fontFamily'
      const v_ = e
      this.handleText(l_, v_)
    }
  }
}
</script>

<style lang="less" scoped>
svg {
  cursor: pointer;
  border: 1px solid #d5d5d5;
  border-right: 0;
  padding: 2px;
  // border-radius: 4px 0 0 4px;
}

.text-set {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;

  /deep/.el-color-picker__trigger {
    border-radius: 0;
  }

  /deep/.el-input__inner {
    width: 168px;
    height: 30px;
  }

  /deep/.el-select {
    margin: 0 !important;

    /deep/.el-input__suffix {
      top: 23%;
    }
  }

}
</style>
