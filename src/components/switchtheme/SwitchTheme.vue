<template>
  <div class="switch-theme-wrap" @click="handleThemeChange">
    <span v-if="isLight">
      <VPIconMoon />
    </span>
    <span v-else>
      <VPIconSun />
    </span>
  </div>
</template>

<script>
import VPIconMoon from '@/views/svg/VPIconMoon.vue'
import VPIconSun from '@/views/svg/VPIconSun.vue'
export default {
  components: { VPIconMoon, VPIconSun },
  data() {
    return {
      isLight: true
    }
  },
  mounted() {
    const theme = localStorage.getItem('themeb2')
    this.isLight = theme !== 'dark'
  },
  methods: {
    handleThemeChange() {
      this.isLight = !this.isLight
    }
  }
}
</script>

<style lang="less" scoped>
.switch-theme-wrap {
  span {
    width: 22px;

    svg {
      width: 100%;
    }
  }
}
</style>
