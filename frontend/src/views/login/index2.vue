<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      size="small"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="verifyCode">
        <span class="svg-container">
          <svg-icon icon-class="captcha" />
        </span>
        <el-input
          :key="passwordType"
          ref="verifyCode"
          v-model="loginForm.verifyCode"
          placeholder="验证码"
          name="verifyCode"
          tabindex="3"
          @keyup.enter.native="handleLogin"
        />
        <div class="img-captcha-container">
          <img :src="captchaImageBase64" @click="handleRefreshCaptcha">
        </div>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import { authService, commonService } from '@/services'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('请输入合法的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validatecaptchaCode = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error('请输入合法的验证码'))
      } else {
        callback()
      }
    }
    return {
      title: defaultSettings.title,
      loginForm: {
        username: '',
        password: '',
        verifyCode: '',
        captchaId: ''
      },
      captchaImageBase64: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verifyCode: [{ required: true, trigger: 'blur', validator: validatecaptchaCode }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  async created() {
    this.handleRefreshCaptcha()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      if (this.loading) {
        return
      }
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            await authService.login(this.loginForm)
            this.loading = false
            this.$router.push({ path: this.redirect || '/' }).catch(() => {
            })
          } catch (e) {
            console.error('login.login-error:', e)
            this.loading = false
            const { code } = e.data
            // 验证码不正确
            if (code && code === 20106) {
              await this.handleRefreshCaptcha()
            }
            const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
            this.$message.error(errorMessage)
          }
        } else {
          return false
        }
      })
    },
    async handleRefreshCaptcha() {
      try {
        const response = await commonService.getImageCaptcha({ width: 100, height: 50 })
        const { data } = response.data
        this.loginForm.captchaId = data.id
        this.captchaImageBase64 = data.img
      } catch (e) {
        console.error('login.getImageCaptcha-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #f0f2f5;
$dark_gray: #d9d9d9;
$cursor: black;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 37px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 37px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid $dark_gray;
    border-radius: 5px;
    color: $dark_gray;
    margin-bottom: 34px;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$bg: #f0f2f5;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background: $bg url('~@/assets/images/background.png') no-repeat 50%;
  background-size: 100%;

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
      color: black;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .img-captcha-container {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 80px;
    cursor: pointer;

      img {
        height: 100%;
        width: 100%;
      }
  }
}
</style>
