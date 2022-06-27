/*
 * @Author: Harry
 * @Date: 2022-06-24 16:09:24
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-06-25 09:17:56
 * @FilePath: \web\src\plugin\elements.js
 */
/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-22 21:36:25
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-03 16:56:48
 * @LastEditors: Harry
 */
// 导入自己需要的组件
import {
  MessageBox,
  Dialog,
  Upload,
  Input,
  Button,
  Form,
  RadioGroup,
  FormItem,
  RadioButton,
  Message
} from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(Dialog)
    Vue.use(Upload)
    Vue.use(Input)
    Vue.use(RadioGroup)
    Vue.use(RadioButton)
    Vue.use(Form)
    Vue.use(Button)
    Vue.use(FormItem)
  },
  other: {
    Message, MessageBox
  }
}
export default element
