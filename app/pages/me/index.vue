<template>
  <view class="wrap">
<!--    <u-navbar title-color="#fff"-->
<!--              title="我的"-->
<!--              :is-back="false"-->
<!--              :border-bottom="false"-->
<!--              :background="{ background: '#DC4232' }">-->
<!--    </u-navbar>-->
    <view class="box-head" @click="openPage()">
      <view class="box-info">
        <view class="box-avatar">
          <u-avatar :src="avatar" size="140" bg-color="#fafafa"></u-avatar>
        </view>
        <view class="box-name">
          <view class="nickname">{{ vuex_user.displayName }}</view>
          <view class="mobile">{{ vuex_user.mobile }}</view>
        </view>
        <view class="box-arrow">
          <u-icon name="arrow-right" size="34"></u-icon>
        </view>
      </view>
      <view class="box-statistics">
        <view class="item">
          <text>125</text>
          <text>记账天数</text>
        </view>
        <view class="item">
          <text>¥ 999,0000</text>
          <text>净资产</text>
        </view>
        <view class="item">
          <text>125</text>
          <text>记账笔数</text>
        </view>
      </view>
      <view class="box-buy">
        <u-icon size="34" name="level"></u-icon>
        <text>超多功能让生活更方便</text>
        <u-button type="warning" shape="circle" :custom-style="customStyleBtn" size="mini">开通会员</u-button>
      </view>
      <view class="box-cat">
        <u-image class="u-image" mode="scaleToFill" width="100%" height="100%" src="@/static/app/cat.png"></u-image>
      </view>
    </view>

    <view class="box-vip">
      <view class="item">
        <u-icon size="50" name="Field-number" custom-prefix="custom-icon"></u-icon>
        <text>去除广告</text>
      </view>
      <view class="item">
        <u-icon size="50" name="database" custom-prefix="custom-icon"></u-icon>
        <text>数据导出</text>
      </view>
      <view class="item">
        <u-icon size="50" name="sync" custom-prefix="custom-icon"></u-icon>
        <text>备份恢复</text>
      </view>
      <view class="item">
        <u-icon size="50" name="appstoreadd" custom-prefix="custom-icon"></u-icon>
        <text>更多功能</text>
      </view>
    </view>

    <view class="box-cell-group">
      <u-cell-group class="u-cell-group" :border="true">
        <u-cell-item title="安全中心" hover-class="cell-hover-class" :border-bottom="true"
                     @click="openPage('/pages/safety/index')">
          <u-icon class="u-icon-left" slot="icon" size="34" name="safetycertificate"
                  custom-prefix="custom-icon"></u-icon>
        </u-cell-item>
        <u-cell-item title="反馈与帮助" hover-class="cell-hover-class" :border-bottom="true"
                     @click="openPage('/pages/help/index')">
          <u-icon class="u-icon-left" slot="icon" size="34" name="bulb" custom-prefix="custom-icon"></u-icon>
        </u-cell-item>
        <u-cell-item title="设置" hover-class="cell-hover-class" :border-bottom="true"
                     @click="openPage('/pages/setting/index')">
          <u-icon class="u-icon-left" slot="icon" size="34" name="setting" custom-prefix="custom-icon"></u-icon>
        </u-cell-item>
      </u-cell-group>
    </view>

    <u-no-network></u-no-network>
    <tabbar></tabbar>
  </view>
</template>

<script>
import { serverURL } from '@/config'

import tabbar from "../../components/tabbar/tabbar";

export default {
  components: {
    tabbar
  },
  data() {
    return {
      avatar: '',
      customStyleBtn: {
        color: '#323232',
        backgroundColor: '#ffe2b4',
        border: 'none',
        display: 'inline-flex'
      },
    }
  },
  computed: {},
  watch: {},
  onShow() {
    this.avatar = serverURL + this.vuex_user.avatar || '/static/app/common/logo.png'
  },
  methods: {
    openPage(url = '/pages/me/info', type = 'to', params) {
      this.$u.route({
        url,
        type,
        params
      })
    },
  }
}
</script>

<style>
page {
  /*background-color: rgb(240, 242, 244);*/
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.wrap {
  padding: 0;
  overflow: hidden;
}

.box-head {
  position: relative;
  padding: rpx(120) rpx(30) 0 rpx(30);
  background: linear-gradient(to right, $cus-main-color, #ff8c6f);
  color: #fff;

  .box-avatar {
    margin-right: rpx(40);
    margin-left: rpx(20);
  }

  .box-info {
    display: flex;
    align-items: center;
    .box-name {
      flex: 1;
    }
    .nickname {
      font-size: 20px;
      //color: $cus-title-color
    }

    .mobile {
      font-size: 16px;
      //color: $cus-sub-title-color
    }

    .box-arrow {
      padding: rpx(10);
      margin-left: rpx(10);
    }
  }

  .box-statistics {
    display: flex;
    justify-content: space-around;
    margin-top: rpx(30);
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text:first-child {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: rpx(8);
      }
    }
  }

  .box-buy {
    display: flex;
    align-items: center;
    margin-top: rpx(30);
    padding: rpx(20);
    background: linear-gradient(to right, #575757, #2f2828);
    color: #ffe2b4;
    border-radius: 8px 8px 0 0;
    text {
      flex: 1;
    }
  }

  .box-cat {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-60%);
    opacity: .08;
    width: 200px;
    height: 200px;
  }
}

.box-vip {
  display: flex;
  align-items: center;
  background-color: #fff;
  margin: rpx(30);
  padding: rpx(20);
  border-radius: 8px;
  box-shadow: 0 0 rpx(20) 0 rgba(4, 0, 0, 0.06);
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .u-icon {
      color: $cus-secondary-color;
    }
    text {
      padding-top: rpx(20);
      color: #606266;
    }
  }
}

.box-cell-group {
  margin: rpx(30);
  border-radius: 8px;
  box-shadow: 0 0 rpx(20) 0 rgba(4, 0, 0, 0.06);
  .u-cell-group {
    ::v-deep .u-cell-item-box {
      border-radius: 8px;
    }
    ::v-deep .u-icon-left {
      margin-right: 10px;
      color: $cus-secondary-color;
    }
  }
}


</style>
