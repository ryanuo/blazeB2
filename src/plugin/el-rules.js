/***
 * @Description: element-ui自定义表单验证规则
 * @Author: Harry
 * @Date: 2021-09-25 14:18:47
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-25 15:27:07
 * @LastEditors: Harry
 */
const phoneRegex = /^(?:(?:\+|00)86)?1\d{10}$/ // 手机正则匹配
// 邮箱正则匹配
// const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const urlRegex = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
// 姓名中文的正则
const chRegex = /^[\u4e00-\u9fa5]{0,}$/
// 年龄正则
const ageRegx = /^[0-9]*$/

const formRules = {
  username: [
    { required: true, message: '必填' },
    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
  ],
  // 邮箱
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
  // 检验中文的格式
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    {
      validator: function (rule, value, callback) {
        if (chRegex.test(value) === false) {
          callback(new Error('请输入中文'))
        } else {
          // 校验通过
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请填写密码',
      trigger: 'blur'
    },
    { min: 6, max: 16, message: '请输入6-16位的字符', trigger: 'blur' }
  ],
  // 手机号码
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    {
      validator: function (rule, value, callback) {
        if (phoneRegex.test(value) === false) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  // 年龄
  age: [
    {
      validator: function (rule, value, callback) {
        if (ageRegx.test(value) === false) {
          callback(new Error('请输入正确的数字'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  // 网站地址
  url: [
    {
      validator: function (rule, value, callback) {
        if (urlRegex.test(value) === false) {
          callback(new Error('请输入正确的Url'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  checkCar: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback()
        } else {
          let result = false
          if (value.length === 7) {
            // 车牌是7位时候规则为： 省份简称或大写字母共1位+大写字母共1位+大写字母或者数字共4位+大写字母或数字或特殊汉字1位  例如:AAAAAAA  京A9999警
            const express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
            result = express.test(value) // 满足条件时候 正则结果是true
          } else if (value.length === 8) {
            const express2 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{5}[A-Z0-9挂学警港澳]{1}$/
            result = express2.test(value)
          }
          if (result) {
            return callback()
          } else {
            return callback(new Error('请输入正确车牌号码'))
          }
        }
      }
    }
  ],
  // 身份证
  cardId: [
    { required: true, message: '请输入身证号', trigger: 'blur' },
    {
      pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
      message: '身份证号码格式有误',
      trigger: 'blur'
    }
  ]
}
module.exports = {
  formRules
}
