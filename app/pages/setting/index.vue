<template>
  <view class="wrap">
    <u-navbar back-text="设置"
              back-icon-color="#fff"
              :back-text-style="{ color: '#fff'}"
              :background="{ background: '#DC4232' }"
              :border-bottom="false">
    </u-navbar>
    <view>
      <u-cell-group class="u-cell-group">
        <u-cell-item title="清除缓存"  :value="cache + 'MB'" :arrow="false">
        </u-cell-item>
        <u-cell-item title="版本" hover-class="cell-hover-class" :value="version">
        </u-cell-item>
      </u-cell-group>
    </view>
    <view class="box-button">
      <u-button :custom-style="customStyleBtn" @click="logout">退出登录</u-button>
    </view>
  </view>
</template>

<script>
import { authService } from '@/services'

export default {
  data() {
    return {
      customStyleBtn: {
        color: '#ffffff',
        backgroundColor: '#DC4232',
        border: 'none'
      },
      version: 'v1.0.0',
      cache: '0'
    }
  },
  computed: {
  },
  onBackPress(e) {
    console.log('onBacePress')
    this.openPage()
    return true
  },
  onLoad() {
    // #ifdef APP-PLUS
    this.version = plus.runtime.version
    // #endif
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
    logout() {
      try {
        authService.logout()

        this.openPage('/pages/login/index', 'to')
      } catch (e) {
        console.error(e)
        const errorMessage = e && e.data.message || '出错了，请重试'
        this.$u.toast(errorMessage);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 0;
}

.box-button {
  padding: 20px;
}

</style>
