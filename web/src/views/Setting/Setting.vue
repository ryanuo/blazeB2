<!--
 * @Author: Harry
 * @Date: 2022-07-01 12:38:31
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-05 13:05:02
 * @FilePath: \web\src\views\Setting\Setting.vue
-->
<template>
  <div class="common-container">
    <h1 class="set-tit">⌜全局配置⌟</h1>
    <el-collapse class="img-manage" v-model="activeName" accordion>
      <el-collapse-item title="🗝️ 密钥配置管理" name="1">
        <form-view />
      </el-collapse-item>
      <el-collapse-item title="🍥 主题设置" name="2">
        <h2>主题选择</h2>
        <theme-change />
      </el-collapse-item>
      <el-collapse-item title="🎃 页面图片管理" name="3">
        <h2>图片前缀(默认选择host_url 在密钥配置中可修改)</h2>
        <set-prefix />
        <h2>默认检索的图片文件夹</h2>
        <set-default />
      </el-collapse-item>
      <el-collapse-item title="📷 上传图片设置" name="4">
        <h2>是否开启压缩</h2>
        <set-compress />
        <h2>是否修改图片格式</h2>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>
import FormView from '../FormView.vue'
import SetPrefix from './setprefix/SetPrefix.vue'
import ThemeChange from './themeChange/ThemeChange.vue'
import SetDefault from './setDefault/SetDefault.vue'
import SetCompress from './setMain/SetCompress.vue'
export default {
  components: {
    FormView,
    SetPrefix,
    ThemeChange,
    SetDefault,
    SetCompress
  },
  data() {
    return {
      activeName: ''
    }
  }
}
</script>

<style lang="less" scoped>
.el-collapse-item {
  color: var(--b2-text);

  /deep/ .el-collapse-item__header {
    font-size: 16px;
    font-weight: bold;
    height: 68px;
    line-height: 68px;
    background-color: var(--b2-bg);
    color: var(--b2-text);
    border-bottom: 1px solid var(--b2-border);
  }

  /deep/ .el-form-item__label {
    color: var(--b2-text);
  }

  /deep/ .el-collapse-item__content {
    padding-left: 5px;
    color: var(--b2-text);
  }

  /deep/ .el-collapse-item__wrap {
    background-color: var(--b2-pre-bg);
  }
}

.el-collapse {
  margin: 0 20px;
  height: 70vh;
  max-height: 70vh;
  overflow: auto;
  border-top: 1px solid var(--b2-border);
  border-bottom: 1px solid var(--b2-border);

  /deep/ .el-select {
    margin-top: 10px;
    margin-right: 10px;
  }

  h2 {
    margin-top: 10px;
    padding-left: 10px;
    font-size: 15px;
    font-weight: bold;
    border-left: 5px solid var(--b2-theme-c);
  }
}

.set-tit {
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  margin: 20px 0;
}
</style>
