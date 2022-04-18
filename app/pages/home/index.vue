<template>
  <view class="wrap">
    <view class="box-head">
      <view class="box-select">
        <text @click="showPopup = true">{{ sexName }}</text>
        <u-icon size="28" name="play-right-fill"></u-icon>
      </view>
      <view class="box-icon">
        <view @click="openPage()">
          <u-icon size="50" name="calendar"></u-icon>
        </view>
        <view>
          <u-icon size="50" name="piechart" custom-prefix="custom-icon"></u-icon>
        </view>
      </view>
    </view>

    <view class="box-statistics">
      <view class="box-out-description">
        <text>本月支出（元）</text>
        <u-icon size="30" name="eye" custom-prefix="custom-icon"></u-icon>
        <!--        <u-icon size="30" name="eye-close" custom-prefix="custom-icon"></u-icon>-->
      </view>
      <view class="box-out-money">
        ¥ 3999.00
      </view>
      <view class="box-in-description">
        <view>
          <text>本月收入</text>
          <text>9000.00</text>
        </view>
        <view>
          <text>本月结余</text>
          <text>3000.00</text>
        </view>
      </view>
      <view class="box-cat">
        <u-image class="u-image" mode="scaleToFill" width="100%" height="100%" src="@/static/app/cat.png"></u-image>
      </view>
    </view>

    <view class="box-tabs">
      <u-tabs active-color="#DC4232" inactive-color="#BFBFBF"
              :list="list" :is-scroll="false" :show-bar="false" :current="current" @change="change"></u-tabs>
    </view>

    <view class="box-summary">
      <view class="box-group">
        <view class="box-head">
          <text>4月7日 周四</text>
          <view class="box-right">
            <view>收
              <text>¥9999.99</text>
            </view>
            <view>支
              <text>¥9999.99</text>
            </view>
          </view>
        </view>
        <view class="box-list">
          <view class="box-item">
            <view class="box-icon">
              <u-icon size="50" name="piechart" custom-prefix="custom-icon"></u-icon>
            </view>
            <view class="box-content">
              <view class="box-left">
                <view class="box-category">
                  <text class="category">餐饮美食</text>
                  <text class="tag">请客</text>
                </view>
                <view class="time">
                  12:50 | 坐地铁回家
                </view>
              </view>
              <text class="box-right">
                - ¥108.00
              </text>
            </view>
          </view>
          <view class="box-item in">
            <view class="box-icon">
              <u-icon size="50" name="piechart" custom-prefix="custom-icon"></u-icon>
            </view>
            <view class="box-content">
              <view class="box-left">
                <view class="box-category">
                  <text class="category">收入</text>
                  <text class="tag">工资</text>
                </view>
                <view class="time">
                  12:50 | 坐地铁回家
                </view>
              </view>
              <text class="box-right">
                + ¥9999.00
              </text>
            </view>
          </view>
        </view>
      </view>
      <view class="box-group">
        <view class="box-head">
          <text>4月7日 周四</text>
          <view class="box-right">
            <view>收
              <text>¥9999.99</text>
            </view>
            <view>支
              <text>¥9999.99</text>
            </view>
          </view>
        </view>
        <view class="box-list">
          <view class="box-item">
            <view class="box-icon">
              <u-icon size="50" name="piechart" custom-prefix="custom-icon"></u-icon>
            </view>
            <view class="box-content">
              <view class="box-left">
                <view class="box-category">
                  <text class="category">餐饮美食</text>
                  <text class="tag">请客</text>
                </view>
                <view class="time">
                  12:50 | 坐地铁回家
                </view>
              </view>
              <text class="box-right">
                - ¥108.00
              </text>
            </view>
          </view>
          <view class="box-item in">
            <view class="box-icon">
              <u-icon size="50" name="piechart" custom-prefix="custom-icon"></u-icon>
            </view>
            <view class="box-content">
              <view class="box-left">
                <view class="box-category">
                  <text class="category">收入</text>
                  <text class="tag">工资</text>
                </view>
                <view class="time">12:50</view>
              </view>
              <text class="box-right">
                + ¥9999.00
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

<!--    <u-action-sheet @click="clickItem" :list="sexList" v-model="show"></u-action-sheet>-->
    <u-popup class="box-popup" v-model="showPopup" width="85%">
      <view class="box-account-book">
        <view class="box-title">
          <text>账本</text>
          <u-icon size="50" name="plus-circle" custom-prefix="custom-icon" @click="openPage('/pages/account-book/edit')"></u-icon>
        </view>
        <view class="box-statistics">
          <view class="item">
            <text>累计支出</text>
            <text class="out">¥ 999999.99</text>
          </view>
          <view class="item">
            <text>累计收入</text>
            <text class="in">¥ 999999.99</text>
          </view>
        </view>
        <view class="box-list">
          <view class="item">
            <view class="box-name">
              我的账本
              <view class="box-icon">
                <u-icon size="40" name="edit" custom-prefix="custom-icon"></u-icon>
                <u-icon size="40" name="delete" custom-prefix="custom-icon"></u-icon>
              </view>
            </view>
            <view class="box-statistics">
              <view>
                <text>支出：¥ 99999.99</text>
              </view>
              <view>
                <text>收入：¥ 99999.99</text>
              </view>
            </view>
          </view>
          <view class="item">
            <view class="box-name">
              我的账本
              <view class="box-icon">
                <u-icon size="40" name="edit" custom-prefix="custom-icon"></u-icon>
                <u-icon size="40" name="delete" custom-prefix="custom-icon"></u-icon>
              </view>
            </view>
            <view class="box-statistics">
              <view>
                <text>支出：¥ 99999.99</text>
              </view>
              <view>
                <text>收入：¥ 99999.99</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>

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
      sex: '',
      sexName: '请选择账本',
      sexList: [
        {
          text: '我的账本',
          value: '0'
        },
        {
          text: '老婆的账本',
          value: '1'
        },
        {
          text: '麦琪的账本',
          value: '2'
        }
      ],
      show: false,
      list: [{
        name: '所有'
      },
        {
          name: '支出'
        }, {
          name: '收入'
        }
      ],
      current: 0,
      showPopup: true
    }
  },
  computed: {},
  onLoad() {

  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  methods: {
    openPage(url = '/pages/account-manage/history', type = 'to', params) {
      this.$u.route({
        url,
        type,
        params
      })
    },
    clickItem(index) {
      this.sexName = this.sexList[index].text;
    },
    change(index) {
      this.current = index;
    },
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
  padding: rpx(40);

  > .box-head {
    padding-top: 50px;
    display: flex;
    justify-content: space-between;

    .box-select {
      font-size: 18px;
      font-weight: bold;
    }

    .box-icon {
      display: flex;
      ::v-deep .u-icon {
        margin-left: 10px;
      }
    }
  }

  > .box-statistics {
    position: relative;
    margin-top: 8px;
    padding: 24px 18px;
    background: linear-gradient(to right, $cus-main-color, #ff8c6f);
    border-radius: 8px;
    color: #fff;
    box-shadow: 0 10px 10px 0 rgba(220, 66, 50, .4);

    .box-out-description {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .box-out-money {
      font-size: 22px;
      font-weight: bold;
      padding-top: 8px;
      font-family: monospace;
    }

    .box-in-description {
      padding-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      text {
        &:last-child {
          padding-left: 6px;
          font-weight: bold;
          font-family: monospace;
        }
      }
    }

    .box-cat {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      opacity: .08;
      width: 150px;
      height: 150px;
    }
  }

  .box-tabs {
    margin-top: 15px;
    width: rpx(300);

    ::v-deep .u-tabs {
      background-color: transparent !important;

      .u-tab-item {
        text-align: left;
      }
    }
  }

  .box-summary {
    margin-top: rpx(10);
    .box-group {
      padding-top: rpx(40);
      &:first-of-type {
        padding-top: rpx(10);
      }

      > .box-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $cus-sub-title-color;
        font-size: 12px;

        .box-right {
          display: flex;

          view {
            padding-left: 12px;
          }

          text {
            padding-left: 4px;
            color: $cus-title-color;
            font-weight: bold;
          }
        }
      }

      .box-list {
        .box-item {
          display: flex;
          align-items: center;

          .box-icon {
            width: rpx(80);
            height: rpx(80);
            border-radius: 50%;
            background-color: #eef1fa;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .box-content {
            flex: 1;
            display: flex;
            margin-left: rpx(20);
            padding: rpx(20) 0 rpx(20) 0;

            border-bottom: 1px solid $cus-divide-color;

            .box-left {
              flex: 1;

              .box-category {
                display: flex;
                align-items: center;

                .category {
                  color: $cus-title-color;
                  font-size: 16px;
                }

                .tag {
                  color: $cus-main-color;
                  font-size: 10px;
                  margin-left: 4px;
                  padding: 1px 2px;
                  border: 1px solid $cus-main-color;
                  border-radius: 2px;
                }
              }

              .time {
                color: $cus-sub-title-color;
                font-size: 12px;
                padding-top: 4px;
              }
            }

            .box-right {
              color: $cus-main-color;
              display: flex;
              align-items: center;
              font-size: 18px;
              font-weight: bold;
            }
          }

          &.in {
            .tag {
              border-color: #54b589 !important;
              color: #54b589 !important;
            }

            .box-right {
              color: #54b589;
            }
          }
        }
      }
    }

  }

  .box-popup {
    .box-account-book {
      height: 100%;
      background-color: #f8f8f8;
      .box-title {
        font-size: 24px;
        padding: rpx(40);
        background-color: #fff;
        display: flex;
        justify-content: space-between;
      }
      > .box-statistics {
        background-color: #fff;
        padding: rpx(40) rpx(40);
        display: flex;
        align-items: center;
        justify-content: space-around;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text {
            &:last-child {
              font-weight: bold;
              font-size: 18px;
            }
            &.in {
              color: #54b589;
            }
            &.out {
              color: $cus-main-color;
            }
          }
        }
      }

      .box-list {
        padding: rpx(40) rpx(40);
        .item {
          background-color: #fff;
          padding: rpx(20) rpx(20) rpx(20) rpx(40);
          margin-bottom: rpx(30);
          border-radius: 8px;
          position: relative;
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
          .box-name {
            font-size: rpx(40);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .box-icon {
              ::v-deep .u-icon {
                margin-left: rpx(20);
              }
            }
          }
          > .box-statistics {
            display: flex;
            padding-top: rpx(40);
            font-size: 12px;
            color: $cus-sub-title-color;
            view {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>
