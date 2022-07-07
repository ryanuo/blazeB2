<!--
 * @Author: Harry
 * @Date: 2022-07-01 19:21:44
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-07 13:20:09
 * @FilePath: \web\src\views\ImgManage\ImageItem\ImageItem.vue
-->
<template>
  <div class="img-item-w">
    <MoreMsg :piclink="piclink" :pictitle="pictitle" :fileId="fileId" :picid="picid" v-on="$listeners" />
    <img @click="imgshow(picL)" :src="picL" alt="pictitle" srcset="">
    <div class="pic-tit">{{ ptit }}</div>
    <div class="link-copy-w">
      <mark-down :link="picL" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import useStore from '@/store'
import MoreMsg from './moremsg/MoreMsg.vue'
import MarkDown from '@/views/svg/MarkDown.vue'
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
    },
    picid: {
      type: Number,
      required: true
    }
  },
  emits: ['ishow'],
  data() {
    return {
      loadimg: ''
    }
  },
  methods: {
    imgshow() {
      this.$emit('ishow', { id: this.picid, f_: this.picL })
    }
  },
  computed: {
    picL() {
      return this.loadimg + this.piclink
    },
    ptit() {
      const a_ = this.pictitle.split('/')
      return a_[a_.length - 1]
    },
    ...mapState(useStore, ['prefixImg'])
  },
  mounted() {
    const auth = localStorage.getItem('authmsg')
    const token = localStorage.getItem('token_api')
    if (auth && token) {
      const picD = this.prefixImg.defaultUrl.replace(/\/file\/(.*?)$/, '')
      this.loadimg = picD + '/'
    }
  },
  components: { MoreMsg, MarkDown }
}
</script>

<style lang="less" scoped>
.img-item-w {
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 5px #ccc;
  text-align: center;
  width: 15%;
  padding: 5px;
  box-sizing: border-box;
  margin: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 12px #ccc;

    .more-w {
      transition: all .4s linear;
      opacity: 1;
    }
  }

  img {
    width: 90%;
    height: 150px;
    border-radius: 10px;
  }

  .pic-tit {
    padding: 10px 0;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    border-bottom: 1px dashed #f2f2f2;
  }

}

@media only screen and (max-width: 537px) {
  .img-item-w {
    margin: 5px;
    width: 45%;

    img {
      width: 100%;
      height: 120px;
    }
  }
}

@media only screen and (max-width: 820px) {
  .img-item-w {
    width: 30%;
  }
}

.ink-copy-w {
  text-align: left;
}
</style>
