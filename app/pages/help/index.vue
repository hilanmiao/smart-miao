<template>
  <view class="wrap">
    <u-navbar back-text="帮助与反馈"
              back-icon-color="#fff"
              :border-bottom="false"
              :back-text-style="{ color: '#fff'}"
              :background="{ background: '#DC4232' }">
    </u-navbar>
    <view>

    </view>
    <view class="u-m-t-20">
      <u-card title="热门问题">
        <view class="" slot="body">
          <u-cell-group class="u-cell-group" :border="false">
            <u-cell-item title="忘记密码如何操作？" @click="openPage('/pages/help/detail')">
              <text slot="icon" class="u-icon-left">1</text>
            </u-cell-item>
            <u-cell-item title="忘记密码如何操作？" :border-bottom="false" @click="openPage('/pages/help/detail')">
              <text slot="icon" class="u-icon-left">2</text>
            </u-cell-item>
          </u-cell-group>
        </view>
      </u-card>
      <u-card title="产品反馈" @click="openPage('/pages/help/feedback')">
        <view slot="head" class="box-feedback">
          <text class="box-feedback-title">产品反馈</text>
          <view>
            <text class="box-feedback-tip">吐个槽，拍个砖！</text>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </view>
      </u-card>
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

    }
  },
  computed: {},
  onBackPress(e) {
    console.log('onBacePress')
    this.openPage('/pages/me/index', 'tab')
    return true
  },
  onShow() {
  },
  methods: {
    openPage(url = '/pages/help/detail', type = 'to', params) {
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
::v-deep .u-card__body {
  padding: 0 !important;
}
.u-cell-group {
  ::v-deep .u-icon-left {
    margin-right: 10px;
    color: $cus-main-color;
    font-size: rpx(40)
  }
}
.box-feedback {
  display: flex;
  justify-content: space-between;
  .box-feedback-title {
    font-size: rpx(30);
  }
  .box-feedback-tip {
    font-size: 12px;
    color: $cus-description-color;
  }
  ::v-deep .u-icon {
    color: #969799;
  }
}
</style>
