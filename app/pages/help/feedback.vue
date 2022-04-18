<template>
  <view class="wrap">
    <u-navbar back-text="建议反馈"
              back-icon-color="#fff"
              :border-bottom="false"
              :back-text-style="{ color: '#fff'}"
              :background="{ background: '#DC4232' }">
      <view class="navbar-right" slot="right">
        <view class="right-item">
          <text class="u-font-28" @click="save">提交</text>
        </view>
      </view>
    </u-navbar>
    <view>
      <u-form class="u-form" :model="form" ref="uForm" :errorType="errorType"
              label-position="top"
              label-width="150" label-align="left">
        <u-form-item label="问题建议" prop="feedback" required>
          <u-input v-model="form.feedback"
                   placeholder="请详细描述您遇到的问题，上传页面截图帮助更快解决！" type="textarea" />
        </u-form-item>
        <u-form-item label="上传图片" prop="photo">
          <u-upload width="160" height="160" max-count="3"></u-upload>
        </u-form-item>
      </u-form>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      form : {
        feedback: '',
        photo: ''
      },
      rules: {
        feedback: [
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
    this.form.feedback = this.vuex_user.feedback
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
          formData.feedback = this.form.feedback
          formData = [formData]
          authService.changeInfo(formData)
              .then(response => {
                // 更新vuex保存的用户信息
                this.$u.vuex('vuex_user.feedback', this.form.feedback)

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
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: rpx(24);
  min-height: 100%;
  overflow: auto;
}

.navbar-right {
  margin-right: rpx(44);
  display: flex;
  color: #FFFFFF;
}
</style>
