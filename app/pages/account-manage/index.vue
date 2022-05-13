<template>
  <view class="wrap">
    <view class="box-head">
      <view class="box-select">
        <text @click="showAction">{{ sexName }}</text>
        <u-icon size="28" name="arrow-down-fill"></u-icon>
      </view>
    </view>
    <view class="box-content">
      <view class="box-in-out">
        <u-tabs active-color="#DC4232" inactive-color="#BFBFBF"
                :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
      </view>
      <view class="box-input">
        <u-field
            v-model="money"
            label="早饭"
            input-align="right"
        >
        </u-field>
      </view>
      <view class="box-category">
        <swiper class="swiper">
          <swiper-item>
            <u-grid :col="5" :border="false" hover-class="hover-class">
              <u-grid-item class="active">
                <view class="box-icon">
                  <u-icon size="50" name="food" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">餐饮美食</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="skin" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">服饰装扮</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="shop" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">日用百货</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="sofa" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">家居家装</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="camera" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">数码电器</text>
              </u-grid-item>

              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="sports" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">运动户外</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="lipstick" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">美容美发</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="babybottle" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">母婴亲子</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="dog" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">宠物</text>
              </u-grid-item>
            </u-grid>
          </swiper-item>
          <swiper-item>
            <u-grid :col="5" :border="false" hover-class="hover-class">
              <u-grid-item class="active">
                <view class="box-icon">
                  <u-icon size="50" name="bus" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">交通出行</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="car" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">爱车养车</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="home" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">住房物业</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="suitcase" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">酒店旅游</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="movie" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">文化休闲</text>
              </u-grid-item>

              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="read" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">教育培训</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="medicinebox" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">医疗健康</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="life" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">生活服务</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="heartinhand" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">公共服务</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="business" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">商业服务</text>
              </u-grid-item>
            </u-grid>
          </swiper-item>
          <swiper-item>
            <u-grid :col="5" :border="false" hover-class="hover-class">
              <u-grid-item class="active">
                <view class="box-icon">
                  <u-icon size="50" name="love" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">公益捐赠</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="YUAN" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">投资理财</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="insurance" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">保险</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="creditcard" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">信用借还</text>
              </u-grid-item>

              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="recharge" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">充值缴费</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="moneycollect" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">收入</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="redenvelope" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">转账红包</text>
              </u-grid-item>
              <u-grid-item class="active">
                <view class="box-icon">
                  <u-icon size="50" name="refund" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">退款</text>
              </u-grid-item>
              <u-grid-item>
                <view class="box-icon">
                  <u-icon size="50" name="appstore" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">其他</text>
              </u-grid-item>
            </u-grid>
          </swiper-item>
        </swiper>
        <view class="indicator-dots">
          <view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
          </view>
          <view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
          </view>
          <view class="indicator-dots-item" :class="[current == 2 ? 'indicator-dots-active' : '']">
          </view>
        </view>

      </view>
    </view>
    <view class="box-remark">
      <u-field
          @click="showDateTime = true"
          v-model="dateTime"
          :disabled="true"
          label="时间："
          placeholder="请选择时间"
          right-icon="arrow-right"
      >
      </u-field>
      <u-field
          label="标签："
          :border-bottom="false"
      >
      </u-field>
      <view class="box-category">
        <u-tag text="午饭" type="info" mode="plain" size="mini"/>
        <u-tag text="晚饭" type="info" mode="plain" size="mini"/>
        <u-tag text="联通话费" type="info" mode="plain" size="mini"/>
        <u-tag text="移动话费" type="info" mode="plain" size="mini"/>
        <u-tag text="水费" type="info" mode="plain" size="mini"/>
        <u-tag text="电费" type="info" mode="plain" size="mini"/>
        <u-tag text="燃气费" type="info" mode="plain" size="mini"/>
        <u-tag text="汽车保险" type="info" mode="plain" size="mini"/>
        <u-tag text="摩托保险" type="info" mode="plain" size="mini"/>
        <u-tag text="房贷" type="info" mode="plain" size="mini"/>
      </view>
      <u-field
          label="备注："
      >
      </u-field>
    </view>
    <view class="box-bottom">
      <view class="box-audio">
        <u-icon size="40" name="audio" custom-prefix="custom-icon"></u-icon>
      </view>
      <view class="box-btn">
        <view class="item">
          <u-button type="error" :custom-style="customStyleBtnAgain">再记一笔</u-button>

        </view>
        <view class="item">
          <u-button type="error" :custom-style="customStyleBtn">提交</u-button>

        </view>
      </view>
    </view>

    <u-action-sheet @click="clickItem" :list="sexList" v-model="show"></u-action-sheet>
    <u-picker v-model="showDateTime" mode="time" :params="params" @confirm="confirmDateTime"></u-picker>


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
      customStyleBtn: {
        color: '#ffffff',
        background: 'linear-gradient(to right, #DC4232, #ff8c6f)',
        border: 'none',
      },
      customStyleBtnAgain: {
        color: '#DC4232',
        backgroundColor: 'transparent',
        border: '1px solid #DC4232',
      },
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
        name: '支出'
      }, {
        name: '收入'
      }],
      current: 0,
      money: '99999999.00',
      dateTime: '',
      showDateTime: false,
      params: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: true,
        province: true,
        city: true,
        area: true,
        timestamp: true
      }
    }
  },
  computed: {},
  onLoad() {
    this.dateTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  onReady() {
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  methods: {
    showAction() {
      this.show = true;
    },
    clickItem(index) {
      this.sexName = this.sexList[index].text;
    },
    change(index) {
      this.current = index;
    },
    confirmDateTime(e) {
      // console.log(e);
      this.dateTime = '';
      if (this.params.year) this.dateTime += e.year;
      if (this.params.month) this.dateTime += '-' + e.month;
      if (this.params.day) this.dateTime += '-' + e.day;
      if (this.params.hour) this.dateTime += ' ' + e.hour;
      if (this.params.minute) this.dateTime += ':' + e.minute;
      if (this.params.second) this.dateTime += ':' + e.second;
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
  padding: 0;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
}

.box-head {
  position: fixed;
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  background: linear-gradient(to right, $cus-main-color, #ff8c6f);
  height: 160px;
  color: #fff;

  .box-select {
    text {
      padding-right: 6px;
      font-size: 18px;
    }
  }
}

.box-content {
  margin: 120px 15px 15px 15px;
  padding: rpx(30);
  z-index: 999;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 rpx(20) 0 rgba(4, 0, 0, 0.06);

  .box-in-out {
    display: flex;
    justify-content: center;

    ::v-deep .u-tabs {
      width: 180px;
    }

    text {
      color: $cus-sub-title-color;
      font-size: 16px;
      font-weight: bold;

      &:first-child {
        margin-right: 60px;
      }
    }

  }

  .box-input {
    margin-top: 4px;

    ::v-deep .u-field {
      color: $cus-main-color;

      .u-label {
        color: $cus-main-color;
      }

      input {
        font-size: 24px;
        font-family: monospace;
        font-weight: bold;
      }
    }
  }

  .box-category {
    //margin-top: 14px;
    //max-height: 100px;
    //display: flex;
    //flex-wrap: wrap;
    //justify-content: space-between;

    .box-icon {
      width: rpx(80);
      height: rpx(80);
      border-radius: 50%;
      background-color: #eef1fa;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active {
      .box-icon {
        background: linear-gradient($cus-main-color, #ff8c6f);
        color: #fff;
      }

      text {
        color: $cus-main-color;
      }
    }
    ::v-deep .u-grid-item-box {
      padding: 16px 0 0 0 !important;
    }

    .grid-text {
      font-size: rpx(28);
      margin-top: rpx(8);
      color: $u-type-info;
    }

    .swiper {
      height: rpx(340);
    }

    .indicator-dots {
      //margin-top: rpx(40);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .indicator-dots-item {
      background-color: $cus-divide-color;
      height: 6px;
      width: 6px;
      border-radius: 10px;
      margin: 0 3px;
    }

    .indicator-dots-active {
      background-color: $cus-main-color;
    }

    //overflow: auto;
    //&::-webkit-scrollbar {
    //  width: 6px;
    //}
    //&::-webkit-scrollbar-track {
    //  background-color: $cus-description-color;
    //  border-radius: 100px;
    //}
    //&::-webkit-scrollbar-thumb {
    //  background: linear-gradient(to bottom, $cus-main-color, #ff8c6f);
    //  border-radius: 100px;
    //}

    ::v-deep .u-tag {
      margin-right: 6px;
      margin-bottom: 6px;

      &.active {
        color: $cus-main-color;
        border: 1px solid $cus-main-color;
      }
    }

    /* #ifdef MP-WEIXIN */
    .active {
      ::v-deep .u-tag {
        color: $cus-main-color;
        border: 1px solid $cus-main-color;
      }
    }

    /* #endif */
  }
}

.box-remark {
  padding: 0 rpx(30) rpx(30);

  .box-category {
    padding: 0 16px;

    ::v-deep .u-tag {
      margin-right: 6px;
      margin-bottom: 6px;
    }
  }
}

.box-bottom {
  flex: 1;
  padding: rpx(30);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  .box-audio {
    width: 40px;
    height: 40px;
    background: linear-gradient(to right, $cus-main-color, #ff8c6f);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .box-btn {
    display: flex;
    width: 100%;
    padding-top: rpx(30);

    .item {
      flex: 1;

      &:last-child {
        margin-left: 20px;
      }
    }
  }
}


</style>
