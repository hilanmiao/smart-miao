<template>
  <view class="wrap">
    <u-navbar back-text="昵称"
              back-icon-color="#fff"
              :border-bottom="false"
              :back-text-style="{ color: '#fff'}"
              :background="{ background: '#DC4232' }">
      <view class="navbar-right" slot="right">
        <view class="right-item">
          <text class="u-font-28" @click="save">保存</text>
        </view>
      </view>
    </u-navbar>
    <view>
      <u-form class="u-form" :model="form" ref="uForm" :errorType="errorType"
              label-width="150" label-align="left">
        <u-form-item label="昵称" prop="displayName" required>
          <u-input v-model="form.displayName" placeholder="请输入昵称" />
        </u-form-item>
      </u-form>
    </view>
  </view>
</template>

<script>
import { userService } from '@/services'

export default {
  data() {
    return {
      form : {
        displayName: '',
      },
      rules: {
        displayName: [
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
    this.form.displayName = this.vuex_user.displayName
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    openPage(url = '/pages/me/info', type = 'to', params) {
      this.$u.route({
        url,
        type,
        params
      })
    },
    save() {
      this.$refs.uForm.validate(async valid => {
        if (valid) {
          uni.showLoading()
          const formData = this.form
          try {
            await userService.updateCurrentUserProfile(formData)

            // 更新vuex保存的用户信息
            this.$u.vuex('vuex_user.displayName', this.form.displayName)

            uni.hideLoading()
            this.openPage()
          } catch (e) {
            console.error(e)
            uni.hideLoading()
            const errorMessage = e && e.data.message || '出错了，请重试'
            this.$u.toast(errorMessage);
          }
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
