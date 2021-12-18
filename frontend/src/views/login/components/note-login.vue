<template>
  <div class="component-note-login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <el-form-item prop="mobile">
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="手机号"
          name="mobile"
          type="text"
          tabindex="1"
          autocomplete="on"
        >
          <font-awesome-icon slot="prefix" :icon="['fas', 'mobile-alt']" class="icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="verificationCode" class="code-wrap">
        <el-input
          v-model="loginForm.verificationCode"
          maxlength="6"
          placeholder="短信验证码"
        >
          <font-awesome-icon slot="prefix" :icon="['fas', 'sms']" class="icon" />
        </el-input>
        <el-button plain class="btn-code" :disabled="disabled=!canSend" @click="send">
          <span v-show="canSend">获取验证码</span>
          <span v-show="!canSend" class="count">{{ countdown }} s</span>
        </el-button>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
        登&nbsp;&nbsp;&nbsp;录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import { authService, smsService } from '@/services'
import { Message } from 'element-ui'
// import _ from 'lodash'

export default {
  name: 'Login',
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validateVerificationCode = (rule, value, callback) => {
      if (!/^\d{6}$/.test(value)) {
        callback(new Error('请输入6位数字验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '',
        verificationCode: ''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        verificationCode: [{ required: true, trigger: 'blur', validator: validateVerificationCode }]
      },
      loading: false,
      redirect: undefined,
      otherQuery: {},
      totalTime: 60, // 记录具体倒计时时间秒
      canSend: true, // 可以发送
      countdown: '', // 倒计时
      timer: null
    }
  },
  created() {

  },
  mounted() {
    if (this.loginForm.mobile === '') {
      this.$refs.mobile.focus()
    }
  },
  destroyed() {

  },
  methods: {
    send() {
      // 判断手机号是否正确
      this.$refs.loginForm.validateField('mobile', mobileError => {
        if (!mobileError) {
          if (!this.timer) {
            this.countdown = this.totalTime
            this.canSend = false
            this.timer = setInterval(() => {
              if (this.countdown > 0 && this.countdown <= this.totalTime) {
                this.countdown--
              } else {
                this.canSend = true
                clearInterval(this.timer) // 清除定时器
                this.timer = null
              }
            }, 1000)

            // 发送短信
            this.sendLoginSmsCode()
          }
        }
      })
    },
    sendLoginSmsCode() {
      smsService.postSendLoginSmsCode({ mobile: this.loginForm.mobile })
        .then(response => {
        })
        .catch(error => {
          // 如果错误消息包含以下关键字，就禁止发送了
          // if (_.includes(error.data.message, '频繁') || _.includes(error.data.message, '上限')) {
          //   this.canSend = false
          //   this.countdown = 0
          //   clearInterval(this.timer) // 清除定时器
          // }

          Message({
            message: error.data.message,
            type: 'error',
            duration: 5 * 1000
          })
        })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          authService.loginNote(this.loginForm)
            .then(response => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            })
            .catch(error => {
              this.loading = false
              Message({
                message: error.data.message,
                type: 'error',
                duration: 5 * 1000
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style lang="scss" scoped>
  .code-wrap {
    .btn-code {
      width: 110px;
      margin-left: 10px;
    }
  }
</style>
<style lang="scss">
  .component-note-login {
    .code-wrap {
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
