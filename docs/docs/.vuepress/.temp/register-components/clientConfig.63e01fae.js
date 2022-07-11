import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("Comments", defineAsyncComponent(() => import("D:/Github/blazeB2/docs/docs/.vuepress/components/b2comments.vue")))
  },
}
