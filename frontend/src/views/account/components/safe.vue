<template>
  <div class="account-safe-setting-container">
    <h3>安全设置</h3>
    <el-form ref="form" :model="form" size="small" :rules="rules">
      <el-form-item label="旧密码" prop="originPassword">
        <el-input
          v-model.trim="form.originPassword"
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model.trim="form.newPassword" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="confirmPassword">
        <el-input
          v-model.trim="form.confirmPassword"
          placeholder="再次输入确认新密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          :loading="submitting"
          @click="handleSubmit"
        >更改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<!--<script>-->
<!--import { updatePassword } from '@/services/account'-->

<!--export default {-->
<!--  name: 'AccountSafeSetting',-->
<!--  data() {-->
<!--    const validateConfirmPassword = (rule, value, callback) => {-->
<!--      if (value.length <= 0) {-->
<!--        callback(new Error('请二次输入新密码以确认'))-->
<!--      } else if (value !== this.form.newPassword) {-->
<!--        callback(new Error('二次输入的密码与原来不一致'))-->
<!--      } else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->
<!--    return {-->
<!--      submitting: false,-->
<!--      form: {-->
<!--        originPassword: '',-->
<!--        newPassword: '',-->
<!--        confirmPassword: ''-->
<!--      },-->
<!--      rules: {-->
<!--        originPassword: [-->
<!--          { required: true, message: '请输入原密码', trigger: 'blur' }-->
<!--        ],-->
<!--        newPassword: [-->
<!--          { required: true, message: '请输入新密码', trigger: 'blur' }-->
<!--        ],-->
<!--        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async handleSubmit() {-->
<!--      this.$refs.form.validate(async(valid) => {-->
<!--        if (valid) {-->
<!--          try {-->
<!--            this.submitting = true-->
<!--            await updatePassword({-->
<!--              originPassword: this.form.originPassword,-->
<!--              newPassword: this.form.newPassword-->
<!--            })-->
<!--            this.$message({-->
<!--              message: '密码更改成功',-->
<!--              type: 'success'-->
<!--            })-->
<!--            // reset form-->
<!--            this.$refs.form.resetFields()-->
<!--          } finally {-->
<!--            this.submitting = false-->
<!--          }-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="scss" scoped>
.account-safe-setting-container {
  margin-left: 22px;
  width: 50%;

  h4 {
    margin: 10px 0;
  }
}
</style>
