<!--
 * @Author: Harry
 * @Date: 2022-07-01 12:38:31
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-03 10:37:14
 * @FilePath: \web\src\views\setting\Setting.vue
-->
<template>
  <div class="common-container">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="🗝️ 密钥配置管理" name="1">
        <form-view />
      </el-collapse-item>
      <el-collapse-item title="🍥 主题设置" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="🎃 页面图片管理" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>
import FormView from '../FormView.vue'
export default {
  components: {
    FormView
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
  /deep/ .el-collapse-item__header {
    font-size: 16px;
    font-weight: bold;
    height: 68px;
    line-height: 68px;
  }
}
</style>
