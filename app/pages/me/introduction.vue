<template>
  <view class="wrap">
    <u-navbar back-text="简介"
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
        <u-form-item label="简介" prop="introduction">
          <u-input v-model="form.introduction" placeholder="请输入简介" type="textarea" />
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
        introduction: '',
      },
      rules: {
        introduction: [
          {
            required: true,
            message: '请输入简介',
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
    this.form.introduction = this.vuex_user.introduction
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
          formData.introduction = this.form.introduction
          formData = [formData]
          authService.changeInfo(formData)
              .then(response => {
                // 更新vuex保存的用户信息
                this.$u.vuex('vuex_user.introduction', this.form.introduction)

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
