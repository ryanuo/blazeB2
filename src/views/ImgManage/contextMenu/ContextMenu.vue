<!--
 * @Author: Harry
 * @Date: 2022-07-30 16:50:32
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-04 14:20:18
 * @FilePath: \dev\src\views\ImgManage\contextMenu\ContextMenu.vue
-->
<template>
  <div>
    <ul class="context-menu-container" :style="menuStyle" @contextmenu.prevent.stop>
      <li v-for="item in menuType" :key="item.mid" @click="handleClickMenu(item.mid)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  data() {
    return {
      menuType: [
        {
          mid: 0,
          name: '打开',
          disable: false
        },
        {
          mid: 1,
          name: '复制',
          disable: false
        },
        {
          mid: 2,
          name: '修改复制格式',
          disable: false
        },
        {
          mid: 3,
          name: '详情',
          disable: false
        },
        {
          mid: 4,
          name: '分享',
          disable: false
        },
        {
          mid: 5,
          name: '下载',
          disable: false
        },
        {
          mid: 6,
          name: '删除',
          disable: false
        }

      ]
    }
  },
  props: {
    menuStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ['menuEvent'],
  methods: {
    handleClickMenu(item) {
      console.log(item)
      this.$emit('menuEvent', item)
    }
  }
}
</script>

<style lang="less" scoped>
@import './contextmenu.module.less';
</style>
