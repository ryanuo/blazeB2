<!--
 * @Author: Harry
 * @Date: 2022-07-29 22:01:57
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-01 21:47:27
 * @FilePath: \dev\src\views\svg\TogChecked.vue
-->
<template>
  <div class="tog-checked-sty">
    <svg v-if="!isshow" class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"
        fill="#FF6666">
      </path>
    </svg>
    <svg v-else class="MuiSvgIcon-root jss823" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="var(--b2-theme-c)"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7a.9959.9959 0 010-1.41c.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z">
      </path>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isshow: true
    }
  },
  props: {
    isshow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
svg {
  width: 20px;
}
</style>
