<template>
  <view class="wrap">
    <u-navbar back-text="安全中心"
              back-icon-color="#fff"
              :back-text-style="{ color: '#fff'}"
              :background="{ background: '#DC4232' }"
              :border-bottom="false">
    </u-navbar>
    <view class="u-m-t-20">
      <u-cell-group class="u-cell-group" :border="false">
        <u-cell-item title="实名认证" @click="openPage('/pages/me/nickname')">
          <u-icon class="u-icon-left" slot="icon" size="34" name="idcard"
                  custom-prefix="custom-icon"></u-icon>
          <view slot="right-icon" class="u-flex">
            <u-tag text="已认证" type="error" mode="dark"/>
<!--            <u-tag text="未认证" type="warning" mode="dark"/>-->
            <u-icon name="arrow-right" custom-prefix="custom-icon"></u-icon>
          </view>
        </u-cell-item>
        <u-cell-item title="登录日志" :value="vuex_user.userName" @click="openPage('/pages/me/nickname')">
          <u-icon class="u-icon-left" slot="icon" size="34" name="solution"
                  custom-prefix="custom-icon"></u-icon>
        </u-cell-item>
        <u-cell-item title="修改手机号码" value="18353674768" @click="openPage('/pages/safety/mobile' ,'to')">
          <u-icon class="u-icon-left" slot="icon" size="34" name="mobile"
                  custom-prefix="custom-icon"></u-icon>
        </u-cell-item>
        <u-cell-item title="修改邮箱" value="hilanmiao@126.com" @click="openPage('/pages/me/nickname')">
          <u-icon class="u-icon-left" slot="icon" size="34" name="mail"
                  custom-prefix="custom-icon"></u-icon>
        </u-cell-item>
        <u-cell-item title="指纹登录" label="开启后可便捷登录，设置仅对本机有效" :arrow="false" @click="openPage('/pages/me/nickname')">
          <u-icon class="u-icon-left" slot="icon" size="34" name="fingerprint"
                  custom-prefix="custom-icon"></u-icon>
          <view slot="right-icon">
            <u-switch v-model="checked" active-color="#DC4232" inactive-color="#eee"></u-switch>
          </view>
        </u-cell-item>
      </u-cell-group>
    </view>
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
      checked: true
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
  methods: {
    openPage(url = '/pages/me/index', type = 'tab', params) {
      this.$u.route({
        url,
        type,
        params
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 0;
}

.u-cell-group {
  ::v-deep .u-icon-left {
    margin-right: 10px;
    color: $cus-secondary-color;
  }
  .u-mode-dark-error {
    background-color: $cus-secondary-color;
  }
  .u-switch--on {
    background-color: $cus-secondary-color !important;
  }
}


</style>
