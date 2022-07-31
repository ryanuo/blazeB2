<!--
 * @Author: Harry
 * @Date: 2022-07-16 11:48:46
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-30 15:27:11
 * @FilePath: \dev\src\views\svg\uploadTaggle.vue
-->
<template>
  <div class="upload-tg" :style="`background-color:var(--b2-upload-c-${isshow})`">
    <svg v-if="isshow === '0'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path fill="var(--b2-pre-bg)"
        d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z">
      </path>
    </svg>
    <svg v-else-if='isshow === "1"' t="1657957196484" class="icon-1" viewBox="0 0 1024 1024" version="1.1"
      xmlns="http://www.w3.org/2000/svg" p-id="11339" width="14" height="14">
      <path
        d="M512 61.44a40.96 40.96 0 0 1 40.96 40.96v122.88a40.96 40.96 0 1 1-81.92 0V102.4a40.96 40.96 0 0 1 40.96-40.96z"
        fill="#000000" p-id="11340"></path>
      <path
        d="M737.28 121.79456a40.96 40.96 0 0 1 14.99136 55.95136l-61.44 106.43456a40.96 40.96 0 1 1-70.94272-40.96l61.44-106.43456A40.96 40.96 0 0 1 737.28 121.79456z"
        fill="#191919" p-id="11341"></path>
      <path
        d="M902.20544 286.72a40.96 40.96 0 0 1-14.99136 55.95136l-106.43456 61.44a40.96 40.96 0 0 1-40.96-70.94272l106.43456-61.44a40.96 40.96 0 0 1 55.95136 14.99136z"
        fill="#333333" p-id="11342"></path>
      <path
        d="M962.56 512a40.96 40.96 0 0 1-40.96 40.96h-122.88a40.96 40.96 0 1 1 0-81.92h122.88a40.96 40.96 0 0 1 40.96 40.96z"
        fill="#4C4C4C" p-id="11343"></path>
      <path
        d="M902.20544 737.28a40.96 40.96 0 0 1-55.95136 14.99136l-106.43456-61.44a40.96 40.96 0 1 1 40.96-70.94272l106.43456 61.44A40.96 40.96 0 0 1 902.20544 737.28z"
        fill="#666666" p-id="11344"></path>
      <path
        d="M737.28 902.20544a40.96 40.96 0 0 1-55.95136-14.99136l-61.44-106.43456a40.96 40.96 0 0 1 70.94272-40.96l61.44 106.43456A40.96 40.96 0 0 1 737.28 902.20544z"
        fill="#7F7F7F" p-id="11345"></path>
      <path
        d="M512 962.56a40.96 40.96 0 0 1-40.96-40.96v-122.88a40.96 40.96 0 1 1 81.92 0v122.88a40.96 40.96 0 0 1-40.96 40.96z"
        fill="#999999" p-id="11346"></path>
      <path
        d="M286.72 902.20544a40.96 40.96 0 0 1-14.99136-55.95136l61.44-106.43456a40.96 40.96 0 1 1 70.94272 40.96l-61.44 106.43456a40.96 40.96 0 0 1-55.95136 14.99136z"
        fill="#ACACAC" p-id="11347"></path>
      <path
        d="M121.79456 737.28a40.96 40.96 0 0 1 14.99136-55.95136l106.43456-61.44a40.96 40.96 0 0 1 40.96 70.94272l-106.43456 61.44A40.96 40.96 0 0 1 121.79456 737.28z"
        fill="#BFBFBF" p-id="11348"></path>
      <path
        d="M61.44 512a40.96 40.96 0 0 1 40.96-40.96h122.88a40.96 40.96 0 1 1 0 81.92H102.4a40.96 40.96 0 0 1-40.96-40.96z"
        fill="#CCCCCC" p-id="11349"></path>
      <path
        d="M121.79456 286.72a40.96 40.96 0 0 1 55.95136-14.99136l106.43456 61.44a40.96 40.96 0 1 1-40.96 70.94272l-106.43456-61.44A40.96 40.96 0 0 1 121.79456 286.72z"
        fill="#E5E5E5" p-id="11350"></path>
      <path
        d="M286.72 121.79456a40.96 40.96 0 0 1 55.95136 14.99136l61.44 106.43456a40.96 40.96 0 0 1-70.94272 40.96l-61.44-106.43456A40.96 40.96 0 0 1 286.72 121.79456z"
        fill="#F2F2F2" p-id="11351"></path>
    </svg>
    <svg v-else-if="isshow === '2'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path fill="currentColor"
        d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z">
      </path>
    </svg>
    <svg v-else-if="isshow === '3'" t="1657957656098" class="icon" viewBox="0 0 1024 1024" version="1.1"
      xmlns="http://www.w3.org/2000/svg" p-id="12283" width="14" height="14">
      <path d="M265.28 310.72a32 32 0 0 1 45.44-45.44l448 448a32 32 0 0 1-45.44 45.44z" p-id="12284"
        fill="var(--b2-pre-bg)"></path>
      <path d="M713.28 265.28a32 32 0 0 1 45.44 45.44l-448 448a32 32 0 0 1-45.44-45.44z" p-id="12285"
        fill="var(--b2-pre-bg)"></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    isshow: String
  }
}
</script>

<style lang="less" scoped>
.upload-tg {
  position: absolute;
  right: -17px;
  bottom: -7px;
  width: 46px;
  height: 26px;
  color: #fff;
  text-align: center;
  transform: rotate(-45deg);

  svg {
    transform: rotate(45deg);
  }
}

.icon-1 {
  animation: rotate 2s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
</style>
