<template>
  <div class="account-basic-setting-container">
    <h3>基本设置</h3>
    <el-form ref="form" v-loading="loading" :model="form" size="small">
      <el-form-item label="昵称">
        <el-input v-model.trim="form.nickName" placeholder="请输入呢称" />
      </el-form-item>
      <el-form-item label="绑定邮箱">
        <el-input v-model.trim="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="绑定手机">
        <el-input v-model.trim="form.phone" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" :loading="submitting" @click="handleSubmit">更新资料</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<!--<script>-->
<!--import { updateAccountInfo, getInfo } from '@/services/account'-->

<!--export default {-->
<!--  name: 'AccountBasicSetting',-->
<!--  data() {-->
<!--    return {-->
<!--      loading: false,-->
<!--      submitting: false,-->
<!--      form: {-->
<!--        nickName: '',-->
<!--        email: '',-->
<!--        phone: '',-->
<!--        remark: ''-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.getUserInfo()-->
<!--  },-->
<!--  methods: {-->
<!--    async getUserInfo() {-->
<!--      try {-->
<!--        this.loading = true-->
<!--        const { data } = await getInfo()-->
<!--        for (const key in this.form) {-->
<!--          this.form[key] = data[key]-->
<!--        }-->
<!--      } finally {-->
<!--        this.loading = false-->
<!--      }-->
<!--    },-->
<!--    async handleSubmit() {-->
<!--      try {-->
<!--        this.submitting = true-->
<!--        await updateAccountInfo(this.form)-->
<!--        this.$message({-->
<!--          message: '更新成功',-->
<!--          type: 'success'-->
<!--        })-->
<!--      } finally {-->
<!--        this.submitting = false-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="scss" scoped>
.account-basic-setting-container {
  margin-left: 22px;
  width: 50%;

  h4 {
    margin: 10px 0;
  }
}
</style>
