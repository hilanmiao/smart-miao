<template>
  <view class="wrap">
<!--    <u-navbar class="u-navbar"-->
<!--        back-text="智能提醒"-->
<!--              :is-back="true"-->
<!--              :border-bottom="true"-->
<!--              :background="{ background: '#f8f8f8' }">-->
<!--      <view class="navbar-right" slot="right">-->
<!--        <view class="right-item">-->
<!--          <text class="u-font-28">添加</text>-->
<!--        </view>-->
<!--      </view>-->
<!--    </u-navbar>-->

    <view class="box-statistics">
      <view class="box-list">
        <view class="item">
          <text>重复</text>
          <text>99</text>
        </view>
        <view class="item">
          <text>一次性</text>
          <text>99</text>
        </view>
        <view class="item">
          <text>进行中</text>
          <text>99</text>
        </view><view class="item">
          <text>已停止</text>
          <text>99</text>
        </view>
      </view>
      <view class="box-cat">
        <u-image class="u-image" mode="scaleToFill" width="100%" height="100%" src="@/static/app/cat.png"></u-image>
      </view>
    </view>

    <div class="box-list">
      <div class="item">
        <view class="left">
          12:00
        </view>
        <view class="content">
          <view class="title">
            结婚纪念日
          </view>
          <view class="date">
            2022-12-12
          </view>
        </view>
        <view class="right">
          <view class="box-icon">
            <u-icon size="50" name="edit" custom-prefix="custom-icon"></u-icon>
            <u-icon size="50" name="delete" custom-prefix="custom-icon"></u-icon>
          </view>
          <u-button shape="circle" size="medium" :custom-style="customStyleBtn">暂停</u-button>
        </view>
      </div>
    </div>
    <u-back-top :scroll-top="scrollTop"></u-back-top>
    <u-no-network></u-no-network>
    <tabbar></tabbar>
  </view>
</template>

<script>
import tabbar from "../../components/tabbar/tabbar";

export default {
  components: {
    tabbar
  },
  data() {
    return {
      scrollTop: 0,
      customStyleBtn: {
        color: '#ffffff',
        backgroundColor: '#DC4232',
        border: 'none'
      },
    }
  },
  computed: {
  },
  onLoad() {

  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  methods: {

  }
}
</script>

<style>
/* page {
background-color: rgb(240, 242, 244);
} */
</style>

<style lang="scss" scoped>
.wrap {
  padding-top: var(--status-bar-height);
  .u-navbar {
    .navbar-right {
      color: $cus-title-color;
    }
    ::v-deep .u-back-wrap {
      .u-icon {
        display: none;
      }
    }
    ::v-deep .u-back-text {
      color: $cus-title-color !important;
      font-size: 20px;
    }
  }

  .box-statistics {
    position: relative;
    margin-top: 8px;
    padding: 24px 18px;
    background: linear-gradient(to right, $cus-main-color, #ff8c6f);
    border-radius: 8px;
    color: #fff;
    box-shadow: 0 10px 10px 0 rgba(220, 66, 50, .4);

    > .box-list {
      display: flex;
      justify-content: space-around;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        text:last-child {
          font-size: 16px;
          font-weight: bold;
          padding-top: rpx(8);
        }
      }
    }

    .box-cat {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      opacity: .08;
      width: 110px;
      height: 110px;
    }
  }

  > .box-list {
    margin-top: 25px;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: rpx(20);
      border: 1px solid $cus-divide-color;
      border-radius: rpx(16);
      padding: rpx(28) rpx(36);
      box-shadow: 0 0 rpx(20) 0 rgba(4, 0, 0, 0.08);

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        height: 100%;
        top: 0;
        left: 0;
        background: $cus-main-color;
        border-radius: 8px 0 0 8px;
      }

      .left {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        color: $cus-title-color;
        font-weight: bold;
        font-size: rpx(40);
      }

      .content {
        flex: 1;
        padding-left: rpx(36);

        .title {
          font-size: rpx(36);
          font-weight: bold;
        }

        .date {
          padding-top: rpx(10);
        }
      }

      .right {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-left: rpx(36);
        border-left: 1px dashed $cus-divide-color;

        .box-icon {
          .u-icon {
            &:last-child {
              margin-left: rpx(18);
            }
          }
        }

        .u-btn {
          margin-top: rpx(20);
          padding: 0 rpx(48);
        }
      }
    }
  }
}
</style>
