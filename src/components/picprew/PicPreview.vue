<!--
 * @Author: Harry
 * @Date: 2022-08-04 09:28:54
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-04 10:43:28
 * @FilePath: \dev\src\components\picprew\PicPreview.vue
-->
<template>
  <div class="imgs_previews animate__animated" @mousewheel.prevent="wheellEvent($event)" v-if="isOpen"
    :class="isShow ? 'animate__fadeIn' : 'animate__fadeOut'">
    <div class="mask" @click="closeLayer"></div>
    <a href="javascript:void(0);" class="close" @click="closeLayer">
      <svg t="1659513637204" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="1963" width="22" height="22">
        <path fill="#fff"
          d="M507.168 473.232L716.48 263.936a16 16 0 0 1 22.624 0l11.312 11.312a16 16 0 0 1 0 22.624L541.12 507.168 750.4 716.48a16 16 0 0 1 0 22.624l-11.312 11.312a16 16 0 0 1-22.624 0L507.168 541.12 297.872 750.4a16 16 0 0 1-22.624 0l-11.312-11.312a16 16 0 0 1 0-22.624l209.296-209.312-209.296-209.296a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l209.296 209.296z"
          p-id="1964"></path>
      </svg>
    </a>
    <div class="preview_content" @click.stop="closeLayer('mask')">
      <div class="img_list">
        <img :src="mainImg" height="778" />
      </div>
      <div class="thumb_imgs">
        <ul>
          <li :class="{ select: item.select }" v-for="(item, index) in viewsImg" @click.stop="changeImg(index)"
            :key="index">
            <div class="mask"></div>
            <img :src="item.thumb" width="78" height="60" />
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </div>
      <div class="preview_prev prev_next_btn">
        <svg @click.stop="prev" t="1659577486585" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="2269" width="88" height="88">
          <path fill="#fff"
            d="M576 672c-6.4 0-19.2 0-25.6-6.4l-128-128c-12.8-12.8-12.8-32 0-44.8l128-128c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L492.8 512l102.4 102.4c12.8 12.8 12.8 32 0 44.8C595.2 672 582.4 672 576 672z"
            p-id="2270"></path>
        </svg>
        <!-- <img src="/image/icon/icon_left.png" width="44" height="44" /> -->
      </div>
      <div class="preview_next prev_next_btn" @click.stop="next">
        <svg t="1659577549065" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4854" width="88" height="88">
          <path fill="#fff"
            d="M448 672c-6.4 0-19.2 0-25.6-6.4-12.8-12.8-12.8-32 0-44.8L531.2 512 422.4 409.6c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0l128 128c12.8 12.8 12.8 32 0 44.8l-128 128C467.2 672 454.4 672 448 672z"
            p-id="4855"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgsPreview',
  emits: ['closeLayer'],
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    imgsList: {
      type: Array,
      default() {
        return []
      }
    },
    pindex: {
      type: Number,
      default: 0
    },
    maskClose: {
      type: Boolean,
      default: false
    },
    preFileName: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: true,
      mainImg: '',
      viewsImg: [],
      index: 0,
      len: 0,
      id: 0
    }
  },
  watch: {
    isOpen() {
      // this.isShow = this.isOpen;
    },
    index() {
      this.init()
    }
  },
  mounted() {
    this.index = this.pindex
    this.imgsList.map((item, index) => {
      // console.log(item)
      const term = {}
      term.select = (index === this.index)
      term.title = item.fileName.split('/').pop()
      term.thumb = this.preFileName + item.fileName
      term.img = this.preFileName + item.fileName
      term.id = item.fileId
      this.viewsImg.push(term)
    })
    this.init()
    this.len = this.viewsImg.length

    window.onkeyup = this.keyEvent
  },
  methods: {
    init() {
      this.mainImg = this.viewsImg[this.index].img
      this.id = this.viewsImg[this.index].id
    },
    closeLayer(mask) { // 关闭窗口
      if (mask === 'mask') {
        if (!this.maskClose) return
      };
      this.isShow = false
      setTimeout(() => {
        this.$emit('closeLayer')
      }, 500)
    },
    changeImg(index) {
      this.setSelect(index)
      this.index = index
    },
    prev() {
      this.index--
      if (this.index < 0) this.index = this.len - 1
      this.setSelect(this.index)
    },
    next() {
      this.index++
      if (this.index >= this.len) this.index = 0
      this.setSelect(this.index)
    },
    setSelect(index) {
      this.viewsImg.map((item, index) => {
        item.select = false
      })
      this.viewsImg[index].select = true
    },
    wheellEvent(e) {
      e = e || window.event
      if (e.wheelDelta) { // 判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) { // 当滑轮向上滚动时
          this.prev()
        }
        if (e.wheelDelta < 0) { // 当滑轮向下滚动时
          this.next()
        }
      } else if (e.detail) { // Firefox滑轮事件
        if (e.detail > 0) { // 当滑轮向上滚动时
          this.prev()
        }
        if (e.detail < 0) { // 当滑轮向下滚动时
          this.next()
        }
      }
    },
    keyEvent(event) {
      var e = event || window.event
      if (e && e.keyCode === 37) { // 上,左
        this.prev()
      }
      if (e && e.keyCode === 39) { // 下,右
        this.next()
      }
    }
  },
  destroyed() {
    window.onkeyup = null
  }
}
</script>

<style lang="less" scoped>
/* 图片预览 */
.flex_center() {
  justify-content: center;
}

.flex() {
  display: flex;
}

.wh100() {
  width: 100%;
  height: 100%;
}

.imgs_previews {
  position: fixed;
  .wh100;
  top: 0;
  left: 0;
  z-index: 1998;

  .mask {
    position: absolute;
    .wh100;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 0;
  }

  .preview_content {
    top: 0;
    width: 60%;
    margin: auto;
    border-radius: 2px;
    position: relative;

    .img_list {
      margin: 44px auto 0;
      text-align: center;

      img {
        max-width: 100%;
        object-fit: contain;
        // max-height: 778px;
      }
    }
  }

  .thumb_imgs {
    z-index: 11;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    padding: 10px;
    height: 98px;
    background: #222;
    overflow-y: hidden;
    overflow-x: auto;

    ul {
      .flex;
      .flex_center;
      width: 100%;
      margin-top: 10px;

      li {
        width: 78px;
        height: 78px;
        margin-right: 6px;
        position: relative;
        cursor: pointer;

        img {
          height: 60px;
        }

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, .5);
        }

        p {
          line-height: 18px;
          color: rgba(255, 255, 255, .9);
          font-size: 12px;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }

      li.select .mask {
        display: none;
      }

      li:last-child {
        margin-right: 0;
      }
    }
  }

  a.close {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 24px;
    height: 24px;

    i {
      background-position: -380px -119px;
    }
  }

  .prev_next_btn {
    position: fixed;
    top: calc(45% - 44px);
    width: 88px;
    height: 88px;
    cursor: pointer;
  }

  .preview_prev {
    left: 20px;
  }

  .preview_next {
    right: 20px;
  }

}
</style>
