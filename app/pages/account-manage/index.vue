<template>
  <view class="wrap">
    <view class="box-head">
      <view class="box-select">
        <text @click="showAccountBook = true">{{ selectedAccountBook.name }}</text>
        <u-icon size="28" name="arrow-down-fill"></u-icon>
      </view>
    </view>
    <view class="box-content">
      <view class="box-in-out">
        <u-tabs active-color="#DC4232" inactive-color="#BFBFBF"
                :list="tabList" :is-scroll="false" :current="currentTab" @change="changeTab"></u-tabs>
      </view>
      <view class="box-input">
        <text>{{ selectedInOutCategory.name }}</text>
        <u-input v-model="form.amount" type="number" input-align="right"/>
<!--        <u-field-->
<!--            v-model="form.amount"-->
<!--            :label="selectedInOutCategory.name"-->
<!--            input-align="right"-->
<!--        >-->
<!--        </u-field>-->
      </view>
      <view class="box-category">
        <swiper class="swiper" @change="changeSwiper">
          <swiper-item v-for="i in Math.ceil(accountInOutCategoryList.length/10)" :key="i">
            <u-grid :col="5" :border="false" hover-class="hover-class">
              <u-grid-item
                  :class="{active: item.id === selectedInOutCategory.id}"
                  v-for="(item,index) in accountInOutCategoryList"
                  :key="index"
                  v-if="(index + 1) >= (i - 1) * 10 && (index + 1) <= i * 10"
                  @click="clickGrid(item)"
              >
                <view class="box-icon">
                  <u-icon size="50" :name="item.icon" custom-prefix="custom-icon"></u-icon>
                </view>
                <text class="grid-text">{{ item.name }}</text>
              </u-grid-item>
            </u-grid>
          </swiper-item>
        </swiper>
        <view class="indicator-dots">
          <view class="indicator-dots-item"
                v-for="i in Math.ceil(accountInOutCategoryList.length/10)" :key="i"
                :class="[currentSwiper == i - 1 ? 'indicator-dots-active' : '']">
          </view>
        </view>
      </view>
    </view>
    <view class="box-remark">
      <u-field
          @click="showDateTime = true"
          v-model="form.dateTime"
          :disabled="true"
          label="时间："
          placeholder="请选择时间"
          right-icon="arrow-right"
      >
      </u-field>
<!--      <u-field-->
<!--          label="标签："-->
<!--          :border-bottom="false"-->
<!--      >-->
<!--      </u-field>-->
<!--      <view class="box-category">-->
<!--        <u-tag text="午饭" type="info" mode="plain" size="mini"/>-->
<!--        <u-tag text="晚饭" type="info" mode="plain" size="mini"/>-->
<!--        <u-tag text="联通话费" type="info" mode="plain" size="mini"/>-->
<!--        <u-tag text="移动话费" type="info" mode="plain" size="mini"/>-->
<!--        <u-tag text="水费" type="info" mode="plain" size="mini"/>-->
<!--        <u-tag text="电费" type="info" mode="plain" size="mini"/>-->
<!--        <u-tag text="燃气费" type="info" mode="plain" size="mini"/>-->
<!--        <u-tag text="汽车保险" type="info" mode="plain" size="mini"/>-->
<!--        <u-tag text="摩托保险" type="info" mode="plain" size="mini"/>-->
<!--        <u-tag text="房贷" type="info" mode="plain" size="mini"/>-->
<!--      </view>-->
      <u-field
          label="备注："
          v-model="form.remark"
      >
      </u-field>
    </view>
    <view class="box-bottom">
<!--      <view class="box-audio">-->
<!--        <u-icon size="40" name="audio" custom-prefix="custom-icon"></u-icon>-->
<!--      </view>-->
      <view class="box-btn">
        <view class="item">
          <u-button type="error" :custom-style="customStyleBtnAgain" @click="resetData">再记一笔</u-button>
        </view>
        <view class="item">
          <u-button type="error" :custom-style="customStyleBtn" @click="submit">提交</u-button>
        </view>
      </view>
    </view>

    <u-select v-model="showAccountBook" :list="accountBookList" label-name="name" value-name="id"
              @confirm="confirmAccountBook"></u-select>
    <u-picker v-model="showDateTime" mode="time" :params="params" @confirm="confirmDateTime"></u-picker>

    <u-no-network></u-no-network>
    <tabbar></tabbar>
  </view>
</template>

<script>
import {accountBookService, accountInOutCategoryService, accountInOutService } from '@/services'
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
      tabList: [{
        name: '支出'
      }, {
        name: '收入'
      }],
      currentTab: 0,
      accountBook: '',
      accountBookName: '请选择账本',
      accountBookList: [],
      accountInOutCategoryList: [],
      showAccountBook: false,
      selectedAccountBook: {},
      selectedInOutCategory: {},
      currentSwiper: 0,

      form: {
        id: '',
        accountInOutCategoryId: '',
        accountBookId: '',
        type: 'out',
        amount: 0,
        remark: '',
        dateTime: ''
      },
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
  watch: {
    currentTab () {
      this.form.type = this.currentTab === 0 ? 'out' : 'in'
    },
    selectedAccountBook () {
      this.form.accountBookId = this.selectedAccountBook.id
    },
    selectedInOutCategory () {
      this.form.accountInOutCategoryId = this.selectedInOutCategory.id
    },
  },
  onLoad() {
    this.form.dateTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.init()
  },
  onReady() {
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  methods: {
    // 初始化数据事件等
    async init() {
      try {
        const response = await accountBookService.getAccountBookList()
        const {data: accountBookList} = response.data
        this.accountBookList = accountBookList
        // 默认选中
        if (accountBookList.length) {
          const findOne = accountBookList.find(o => o.isDefault)
          if(findOne) {
            this.selectedAccountBook = findOne
          } else {
            this.selectedAccountBook = accountBookList[0]
          }
        }

        const responseCategory = await accountInOutCategoryService.getAccountInOutCategoryList()
        const {data: accountInOutCategoryList} = responseCategory.data
        this.accountInOutCategoryList = accountInOutCategoryList
        // 默认选中第一个
        if (accountInOutCategoryList.length) {
          this.selectedInOutCategory = accountInOutCategoryList[0]
        }
      } catch (e) {
        console.error('accountInOut.getAccountBookList-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    setData() {},
    resetData() {
      this.currentTab = 0
      this.currentSwiper = 0
      this.selectedAccountBook = this.accountBookList[0]
      this.selectedInOutCategory = this.accountInOutCategoryList[0]
      this.form.amount = 0
      this.form.dateTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
      this.form.remark = ''
    },
    confirmAccountBook(e) {
      console.log(e)
      const obj = e[0]
      const {label, value} = obj
      this.selectedAccountBook = this.accountBookList.find(item => item.id === value)
    },
    changeTab(index) {
      this.currentTab = index;
    },
    changeSwiper(e) {
      this.currentSwiper = e.detail.current;
    },
    clickGrid(obj) {
      this.selectedInOutCategory = obj
    },
    confirmDateTime(e) {
      // console.log(e);
      this.form.dateTime = '';
      if (this.params.year) this.form.dateTime += e.year;
      if (this.params.month) this.form.dateTime += '-' + e.month;
      if (this.params.day) this.form.dateTime += '-' + e.day;
      if (this.params.hour) this.form.dateTime += ' ' + e.hour;
      if (this.params.minute) this.form.dateTime += ':' + e.minute;
      if (this.params.second) this.form.dateTime += ':' + e.second;
    },
    validateForm() {
      if(!this.form.accountBookId) {
        this.$u.toast('请选择账本');
      }
      if(!this.form.accountInOutCategoryId) {
        this.$u.toast('请选择分类');
      }
      return true
    },
    async submit() {
      if (this.validateForm()) {
        uni.showLoading()
        const formData = this.form
        try {
          await accountInOutService.createAccountInOut(formData)
          this.$u.toast('保存成功');
          uni.hideLoading()
        } catch (e) {
          console.error(e)
          uni.hideLoading()
          const errorMessage = e && e.data.message || '出错了，请重试'
          this.$u.toast(errorMessage);
        }
      }
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
    display: flex;
    align-items: center;
    color: $cus-main-color;
    ::v-deep .uni-input-input {
      color: $cus-main-color;
      font-size: 24px;
      font-family: monospace;
      font-weight: bold;
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
