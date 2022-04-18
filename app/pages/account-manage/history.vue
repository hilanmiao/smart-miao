<template>
  <view class="wrap">
    <u-navbar title="历史记录"
              :border-bottom="true"
              :background="{ background: 'transparent' }">
    </u-navbar>

    <view class="box-select" @click="showCalendar = true">
      <text >{{ result }}</text>
      <u-icon size="28" name="arrow-down-fill"></u-icon>
    </view>

    <view class="box-statistics">
      <view class="item">
        <text>支出</text>
        <text class="money">¥3000.00</text>
      </view>
      <view class="item">
        <text>收入</text>
        <text class="money">¥9000.00</text>
      </view>
      <view class="box-cat">
        <u-image class="u-image" mode="scaleToFill" width="100%" height="100%" src="@/static/app/cat.png"></u-image>
      </view>
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

    <u-calendar v-model="showCalendar" ref="calendar" @change="change" :mode="mode"
                :start-text="startText" :end-text="endText" :range-color="rangeColor"
                :range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
    >
    </u-calendar>
  </view>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      showCalendar: false,
      mode: 'range',
      result: "请选择日期",
      startText: '开始',
      endText: '结束',
      rangeColor: '#fa3534',
      rangeBgColor: 'rgba(250,53,52,0.13)',
      activeBgColor: '#fa3534',
      btnType: 'error',
    }
  },
  computed: {},
  onLoad() {

  },
  onBackPress(e) {
    console.log('onBacePress')
    this.openPage()
    return true
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  methods: {
    openPage(url = '/pages/home/index', type = 'tab', params) {
      this.$u.route({
        url,
        type,
        params
      })
    },
    change(e) {
      if (this.mode == 'range') {
        this.result = e.startDate + " - " + e.endDate;
      } else {
        this.result = e.result;
      }
    }
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

  .box-select {
    font-size: 18px;
    font-weight: bold;
    ::v-deep .u-icon {
      margin-left: rpx(20);
    }
  }

  .box-statistics {
    margin-top: rpx(20);
    position: relative;
    padding: 24px 18px;
    background: linear-gradient(to right, $cus-main-color, #ff8c6f);
    border-radius: 8px;
    color: #fff;
    box-shadow: 0 10px 10px 0 rgba(220, 66, 50, .4);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item {
      display: flex;
      //align-items: center;
      justify-content: space-between;
      flex-direction: column;
    }

    .money {
      font-size: 22px;
      font-weight: bold;
      padding-top: 8px;
      font-family: monospace;
    }

    .box-cat {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      opacity: .08;
      width: 120px;
      height: 120px;
    }
  }

  .box-summary {
    margin-top: rpx(40);

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
}
</style>
