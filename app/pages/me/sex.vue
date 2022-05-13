<template>
  <view class="wrap">
    <u-navbar back-text="性别"
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
        <u-form-item label="性别" prop="sex" required>
          <u-input type="select" input-align="right" placeholder="请选择性别"
                   :select-open="showActionSheetSex"
                   v-model="form.sexName"
                   @click="showActionSheetSex = true"></u-input>
        </u-form-item>
      </u-form>
      <u-action-sheet :list="sexList" v-model="showActionSheetSex" @click="actionCallbackSex"></u-action-sheet>
    </view>
  </view>
</template>

<script>
import { userService } from '@/services'

export default {
  data() {
    return {
      form : {
        sex: '',
        sexName: '',
      },
      rules: {
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: ['change', 'blur'],
          }
        ]
      },
      errorType: ['toast'],
      sexList: [
        {
          text: '男',
          value: '1'
        },
        {
          text: '女',
          value: '2'
        }
      ],
      showActionSheetSex: false,
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
    const { sex } = this.vuex_user
    this.form.sex = sex
    this.form.sexName = this.sexList.find(element => element.value === sex)?.text

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
    // 点击性别actionSheet回调
    actionCallbackSex(index) {
      const obj = this.sexList[index]
      const {text, value} = obj
      this.form.sexName = text;
      this.form.sex = value;
    },
    save() {
      this.$refs.uForm.validate(async valid => {
        if (valid) {
          uni.showLoading()
          const formData = this.form
          try {
            await userService.updateCurrentUserProfile(formData)

            // 更新vuex保存的用户信息
            this.$u.vuex('vuex_user.sex', this.form.sex)

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
