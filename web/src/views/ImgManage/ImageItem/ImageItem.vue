<!--
 * @Author: Harry
 * @Date: 2022-07-01 19:21:44
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-01 21:16:30
 * @FilePath: \web\src\views\ImgManage\ImageItem\ImageItem.vue
-->
<template>
  <div class="img-item-w">
    <img :src="picL" alt="pictitle" srcset="">
    <div class="pic-tit">{{ ptit }}</div>
  </div>
</template>

<script>
export default {
  props: {
    piclink: {
      type: String,
      required: true
    },
    pictitle: {
      type: String,
      required: true
    },
    fileId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loadimg: ''
    }
  },
  computed: {
    picL() {
      return this.loadimg + '/' + this.piclink
    },
    ptit() {
      const a_ = this.pictitle.split('/')
      return a_[a_.length - 1]
    }
  },
  mounted() {
    const auth = localStorage.getItem('authmsg')
    const token = localStorage.getItem('token_api')
    if (auth && token) {
      this.loadimg = JSON.parse(auth).downloadUrl + '/file/' + JSON.parse(token).bucket_name
    }
  }
}
</script>

<style lang="less" scoped>
.img-item-w {
  border-radius: 10px;
  box-shadow: 0 0 5px #ccc;
  width: 10%;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  margin: 20px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 12px #ccc;
  }

  img {
    width: 80%;
    height: 100px;
    border-radius: 10px;
  }

  .pic-tit {
    padding: 10px 0;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }

}
</style>
