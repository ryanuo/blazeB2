<!--
 * @Author: Harry
 * @Date: 2022-06-24 17:04:27
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-08-03 17:29:29
 * @FilePath: \dev\src\views\formview\FormView.vue
-->
<template>
  <div class="form-w">
    <h2 class="setting-hd-h2">密钥配置</h2>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="application_key_id" prop="application_key_id">
        <el-input v-model="form.application_key_id" placeholder="请填写应用程序密钥id"></el-input>
      </el-form-item>
      <el-form-item label="application_key" prop="application_key">
        <el-input v-model="form.application_key" show-password placeholder="请填写应用程序密钥"></el-input>
      </el-form-item>
      <el-form-item label="host_url(图床自定义域名)" prop="host_url">
        <el-input v-model="form.host_url" placeholder="请填写地址,eg: https://cloud.mr90.top/file/imagecloud/ 注意:结尾必须加 ‘/’">
        </el-input>
      </el-form-item>
      <el-form-item label=" bucket_name" prop="bucket_name">
        <el-input v-model="form.bucket_name" placeholder="请填写存储桶名称"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn-wrap-form">
          <el-button type="primary" @click="submitForm('formRef')" plain>保存本地</el-button>
          <el-button @click="resetForm('formRef')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Notification } from 'element-ui'
import { mapActions, mapState } from 'pinia'
import { debounce } from '@/plugin/filter'
import useStore from '@/store'
export default {
  data() {
    return {
      form: {
        application_key_id: '',
        application_key: '',
        bucket_name: '',
        host_url: ''
      },
      rules: {
        application_key_id: [
          { required: true, message: '请输入application_key_id', trigger: 'blur' },
          { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
        ],
        application_key: [
          { required: true, message: '请输入application_key', trigger: 'blur' },
          { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
        ],
        bucket_name: [
          { required: true, message: '请输入bucket_name', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        host_url: [
          { required: true, validator: this.validateURL, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(useStore, ['isLogined']) // 映射函数，取出tagslist
  },
  mounted() {
    const token = localStorage.getItem('token_api')
    if (token) {
      this.form = JSON.parse(token)
    }
  },
  methods: {
    ...mapActions(useStore, ['handleIsLogined']),
    // 检验表单
    validateURL: (rule, value, callback) => {
      const reg = value.charAt(value.length - 1) === '/'
      if (!reg || value.length === 0) {
        callback(new Error('请输入图片地址前缀，输入的连接结尾必须加 /'))
      } else {
        callback()
      }
    },
    submitForm: debounce(function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          localStorage.setItem('token_api', JSON.stringify(this.form))
          localStorage.removeItem('authmsg')
          Notification({
            title: '提示',
            message: '已将数据缓冲到本地，数据信息仅本人可知',
            type: 'success'
          })
          this.handleIsLogined(this.form.host_url)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, 400, true),
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
@import './formview.module.less';
</style>
