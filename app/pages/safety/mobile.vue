<template>
  <view class="wrap">
    <u-navbar back-text="修改手机号"
              back-icon-color="#fff"
              :border-bottom="false"
              :back-text-style="{ color: '#fff'}"
              :background="{ background: '#DC4232' }">
    </u-navbar>
    <view>
      <u-form class="u-form" :model="form" ref="uForm" :errorType="errorType"
              label-width="150" label-align="left">
        <u-form-item label="新手机号" prop="mobile" required>
          <u-input v-model="form.mobile" placeholder="请输入新手机号" />
        </u-form-item>
        <u-form-item label="验证码" prop="code" required>
          <u-input v-model="form.code" placeholder="请输入验证码" type="text"/>
          <u-button slot="right" type="error" size="mini" @click="getCode">{{codeTips}}</u-button>
        </u-form-item>
        <u-form-item label="登录密码" prop="mobile" required>
          <u-input v-model="form.password" placeholder="请输入登录密码" type="text" />
        </u-form-item>
      </u-form>
    </view>
    <view class="box-button">
      <u-button :custom-style="customStyleBtn">确认</u-button>
    </view>

    <u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
  </view>
</template>

<script>

export default {
  data() {
    return {
      customStyleBtn: {
        color: '#ffffff',
        backgroundColor: '#DC4232',
        border: 'none'
      },
      customStyleBtnCode: {
        color: '#E49D41',
        backgroundColor: 'transparent',
        border: 'none'
      },
      codeTips: '',
      form : {
        mobile: '',
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur' ,
          }
        ]
      },
      errorType: ['toast']
    }
  },
  computed: {
  },
  onBackPress(e) {
    console.log('onBacePress')
    this.openPage()
    return true
  },
  onShow() {

  },
  onReady() {
    this.form.mobile = this.vuex_user.mobile
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    openPage({type = 'to', url = '/pages/me/info', params}) {
      this.$u.route({
        type,
        url,
        params
      })
    },
    save() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          uni.showLoading()
          let formData = { ...this.vuex_user }
          formData.mobile = this.form.mobile
          formData = [formData]
          authService.changeInfo(formData)
              .then(response => {
                // 更新vuex保存的用户信息
                this.$u.vuex('vuex_user.mobile', this.form.mobile)

                uni.hideLoading()
                this.$u.toast('保存成功');
                this.openPage()
              })
              .catch(e => {
                uni.hideLoading()
                const errorMessage = e && e.data.message || '出错了，请重试'
                this.$u.toast(errorMessage);
              })
        }
      });
    },
    // 验证码文本
    codeChange(text) {
      this.codeTips = text;
    },
    // 获取验证码
    getCode() {
      if(!this.$u.test.mobile(this.form.MobilePhone)) {
        this.$u.toast('手机号不正确');
        return
      }
      if(this.$refs.uCode.canGetCode) {
        // 向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码',
          mask: true
        })
        smsService.SendLoginSmsCode({ key: this.form.MobilePhone, type: 1 })
            .then(response => {
              uni.hideLoading();
              // 这里此提示会被this.start()方法中的提示覆盖
              this.$u.toast('验证码已发送');
              // 通知验证码组件内部开始倒计时
              this.$refs.uCode.start();
            })
            .catch(error => {
              uni.hideLoading();
              this.$u.toast(error.data.msg);
            })
      } else {
        this.$u.toast('倒计时结束后再发送');
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  //padding: 0;
}

.box-button {
  padding: 20px;
}

.u-btn--error {
  background-color: $cus-secondary-color;
}
</style>
