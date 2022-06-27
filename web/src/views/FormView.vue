<!--
 * @Author: Harry
 * @Date: 2022-06-24 17:04:27
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-06-24 19:48:44
 * @FilePath: \web\src\views\FormView.vue
-->
<template>
  <div class="lay-out">
    <div v-if="!isSigned" @click="openhandle">
      <LayOut />
    </div>
    <div v-else @click="dialogVisible = true">
      <SignSvg />
    </div>
    <el-dialog title="填写blake存储桶基本信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="application_key_id" prop="application_key_id">
          <el-input v-model="form.application_key_id" placeholder="请填写应用程序密钥id"></el-input>
        </el-form-item>
        <el-form-item label="application_key" prop="application_key">
          <el-input v-model="form.application_key" placeholder="请填写应用程序密钥"></el-input>
        </el-form-item>
        <el-form-item label="host_url(自定义域名)" prop="host_url">
          <el-input v-model="form.host_url" placeholder="请填写地址,eg: https://cloud.mr90.top/file/imagecloud/"></el-input>
        </el-form-item>
        <el-form-item label=" bucket_name" prop="bucket_name">
          <el-input v-model="form.bucket_name" placeholder="请填写存储桶名称"></el-input>
        </el-form-item>
        <el-form-item label="存储桶上传目标文件路径" prop="tofile">
          <el-input v-model="form.tofile" placeholder="请填写上传到储存桶的文件路径，eg:hexo/2/"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formRef')">缓冲本地</el-button>
          <el-button @click="dialogVisible = !dialogVisible">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { Notification, MessageBox, Message } from 'element-ui'
import LayOut from './LayOut.vue'
import SignSvg from './SignSvg.vue'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        application_key_id: '',
        application_key: '',
        bucket_name: '',
        host_url: ''
      },
      isSigned: true,
      rules: {
        application_key_id: [
          { required: true, message: '请输入application_key_id', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
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
          { required: true, message: '请输入host_url', trigger: 'blur' },
          { min: 5, max: 100, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        tofile: [
          { required: true, message: '请输入tofile', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符,格式：hexo/3/', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('token_api')
    if (token) {
      this.isSigned = false
      this.dialogVisible = false
    } else {
      this.dialogVisible = true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const token = localStorage.getItem('token_api')
          if (!token) {
            localStorage.setItem('token_api', JSON.stringify(this.form))
            Notification({
              title: '提示',
              message: '已将数据缓冲到本地，数据仅本人可访问',
              type: 'success'
            })
            this.dialogVisible = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openhandle() {
      MessageBox({
        title: '提示',
        message: '此操作将删除本地缓冲信息, 是否继续?',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning'
      }).then(() => {
        Message({
          type: 'success',
          message: '缓冲清除删除成功!'
        })
        this.dialogVisible = true
        localStorage.clear()
      })
    },
    handleClose() {
      this.dialogVisible = false
    }
  },
  components: { LayOut, SignSvg }
}
</script>

<style lang="less" scoped>
.lay-out {
  position: absolute;
  top: 5%;
  right: 5%;
  width: 30px;
  height: 30px;
  z-index: 20000;

  .svg {
    width: 100%;
  }
}
</style>
