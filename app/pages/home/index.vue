<template>
  <view class="wrap">
    <view class="box-head">
      <view class="box-select">
        <text @click="showPopup = true">{{ selectedAccountBook.name }}</text>
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
        {{ selectedAccountBook.sumTotalAmountOutMonth || 0 }}
      </view>
      <view class="box-in-description">
        <view>
          <text>本月收入</text>
          <text>{{ selectedAccountBook.sumTotalAmountInMonth || 0 }}</text>
        </view>
        <view>
          <text>本月结余</text>
          <text>{{ selectedAccountBook.sumTotalAmountInMonth - selectedAccountBook.sumTotalAmountOutMonth }}</text>
        </view>
      </view>
      <view class="box-cat">
        <u-image class="u-image" mode="scaleToFill" width="100%" height="100%" src="@/static/app/cat.png"></u-image>
      </view>
    </view>

    <view class="box-tabs">
      <u-tabs active-color="#DC4232" inactive-color="#BFBFBF"
              :list="listType" :is-scroll="false" :show-bar="false" :current="currentType"
              @change="changeType"></u-tabs>
    </view>

    <view class="box-summary">
      <view class="box-group">
        <u-index-list :scrollTop="scrollTop" :offset-top="0" :indexList="indexListAccountInOut">
          <view v-for="group in listAccountInOutGroup" :key="group.yearMonth">
            <u-index-anchor :use-slot="true">
              <!--              <text class="anchor-text">{{group.yearMonth}}</text>-->
              <view class="box-head">
                <text>{{ $dayjs(group.yearMonth).format('YYYY年MM月') }}</text>
                <view class="box-right">
                  <view>收
                    <text>¥9999.99</text>
                  </view>
                  <view>支
                    <text>¥9999.99</text>
                  </view>
                </view>
              </view>
            </u-index-anchor>
            <view class="box-list">
              <view class="box-item" :class="{ in : item.type === 'in' }" v-for="item in listAccountInOut"
                    :key="item.id">
                <view class="box-icon">
                  <u-icon size="50" :name="item.accountInOutCategory && item.accountInOutCategory.icon" custom-prefix="custom-icon"></u-icon>
                </view>
                <view class="box-content">
                  <view class="box-left">
                    <view class="box-category">
                      <text class="category">{{ item.accountInOutCategory && item.accountInOutCategory.name }}</text>
                      <!--                  <text class="tag">请客</text>-->
                      <text class="time">{{ $dayjs(item.inOutDate).format('MM月DD日 HH:mm') }}</text>
                    </view>
                    <view class="remark">
                      {{ item.remark }}
                    </view>
                  </view>
                  <text class="box-right">
                    {{ item.type === 'in' ? '+' : '-' }} ¥{{ item.amount }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </u-index-list>
        <u-loadmore :status="loadStatus" :load-text="loadText" @loadmore="loadmore"/>
      </view>
    </view>

    <u-popup class="box-popup" v-model="showPopup" width="85%">
      <view class="box-account-book">
        <view class="box-title">
          <text>账本</text>
          <u-icon size="50" name="plus-circle" custom-prefix="custom-icon"
                  @click="openPage('/pages/account-book/edit')"></u-icon>
        </view>
        <view class="box-statistics">
          <view class="item">
            <text>累计支出</text>
            <text class="out">¥{{ sumOut }}</text>
          </view>
          <view class="item">
            <text>累计收入</text>
            <text class="in">¥{{ sumIn }}</text>
          </view>
        </view>
        <view class="box-list">
          <view class="item" v-for="item in accountBookList" :key="item.id" @click="changeAccountBook(item)">
            <view class="box-name">
              {{ item.name }}
              <view class="box-icon">
                <view @click.stop="handleEdit(item)">
                  <u-icon size="40" name="edit" custom-prefix="custom-icon"></u-icon>
                </view>
                <view @click.stop="handleDelete(item)">
                  <u-icon size="40" name="delete" custom-prefix="custom-icon"></u-icon>
                </view>
              </view>
            </view>
            <view class="box-statistics">
              <view>
                <text>支出：¥{{ item.sumTotalAmountOut }}</text>
              </view>
              <view>
                <text>收入：¥{{ item.sumTotalAmountIn }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>

    <u-modal ref="uModal" :async-close="true" :mask-close-able="true" :show-cancel-button="true"
             v-model="showModalDelete" @confirm="confirmDelete"
             :content="contentDelete"></u-modal>

    <u-back-top :scroll-top="scrollTop"></u-back-top>
    <u-no-network></u-no-network>
    <tabbar></tabbar>
  </view>
</template>

<script>
import tabbar from "../../components/tabbar/tabbar";
import {accountBookService, accountInOutCategoryService, accountInOutService} from '@/services'

export default {
  components: {
    tabbar
  },
  data() {
    return {
      scrollTop: 0,
      accountBookList: [],
      selectedAccountBook: {},
      listType: [
        {
          name: '所有',
          value: ''
        },
        {
          name: '支出',
          value: 'out'
        },
        {
          name: '收入',
          value: 'in'
        }
      ],
      currentType: 0,
      showPopup: false,
      showModalDelete: false,
      deleteAccountBook: {},
      contentDelete: '',
      // 列表相关
      listAccountInOut: [],
      listAccountInOutGroup: [],
      indexListAccountInOut: ['8月', '7月'],
      last_id: '',
      isRefreshing: false,
      loadStatus: 'loadmore',
      loadText: {
        loadmore: '点击或上拉加载更多',
        loading: '努力加载中',
        nomore: '实在没有了'
      },
      page: 1,
      limit: 20
    }
  },
  computed: {
    sumOut() {
      const sum = this.$_.sumBy(this.accountBookList, o => {
        return parseFloat(o.sumTotalAmountOut) || 0
      })
      return sum
    },
    sumIn() {
      const sum = this.$_.sumBy(this.accountBookList, o => {
        return parseFloat(o.sumTotalAmountIn) || 0
      })
      return sum
    }
  },
  watch: {
    selectedAccountBook: {
      handler(val) {
        this.refresh()
      }
    },
    listAccountInOut: {
      handler(val) {
        if (val.length) {
          // 分组列表
          this.listAccountInOutGroup = this.$_.chain(val)
              .groupBy('yearMonth')
              .map((value, key) => ({yearMonth: key, list: value}))
              .orderBy(['yearMonth'], ['desc'])
              .value()

          // 锚点列表
          this.indexListAccountInOut = this.listAccountInOutGroup.map(o => o.yearMonth)
        }
      }
    }
  },
  async onShow() {
    if (!this.$verifyPermission()) {
      return false
    }
    await this.init()
    await this.refresh()
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onPullDownRefresh() {
    this.refresh()
  },
  onReachBottom() {
    this.loadmore()
  },
  methods: {
    openPage(url = '/pages/account-manage/history', type = 'to', params) {
      this.$u.route({
        url,
        type,
        params
      })
    },
    // 初始化数据事件等
    async init() {
      try {
        const response = await accountBookService.getAccountBookList()
        const {data: accountBookList} = response.data
        this.accountBookList = accountBookList.map(o => {
          o.sumTotalAmountIn = parseFloat(o.sumTotalAmountIn) || 0
          o.sumTotalAmountOut = parseFloat(o.sumTotalAmountOut) || 0
          return o
        })
        // 默认选中
        if (accountBookList.length) {
          const findOne = accountBookList.find(o => o.isDefault)
          if (findOne) {
            this.selectedAccountBook = findOne
          } else {
            this.selectedAccountBook = accountBookList[0]
          }
        }
      } catch (e) {
        console.error('accountInOut.getAccountBookList-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    changeType(index) {
      this.currentType = index;
    },
    changeAccountBook(obj) {
      this.selectedAccountBook = obj
      this.showPopup = false
    },
    handleEdit(row) {
      this.openPage('/pages/account-book/edit', 'to', {id: row.id})
    },
    handleDelete(row) {
      this.showModalDelete = true
      this.deleteAccountBook = row
      this.contentDelete = `确认删除账本 "${row.name}" ？`
    },
    async confirmDelete() {
      try {
        await accountBookService.deleteAccountBook({ids: [this.deleteAccountBook.id]})
        this.$u.toast('删除成功');
        await this.init()
        this.showModalDelete = false
      } catch (e) {
        console.error(e)
        this.showModalDelete = false
        const errorMessage = e && e.data.message || '出错了，请重试'
        this.$u.toast(errorMessage);
      }
    },
    async refresh() {
      this.listAccountInOut = []
      this.loadStatus = 'loadmore';
      this.page = 1
      this.isRefreshing = true;
      this.last_id = '';
      this.getAccountInOutListByPageComprehensive();
    },
    loadmore() {
      this.loadStatus = 'loadmore';
      this.getAccountInOutListByPageComprehensive();
    },
    async getAccountInOutListByPageComprehensive() {
      try {
        if (this.last_id) {
          //说明已有数据，目前处于上拉加载
          this.loadStatus = 'loading';
        }

        const page = this.page
        const limit = this.limit
        const accountBookId = this.selectedAccountBook.id
        const type = this.listType[this.currentType].value
        const accountInOutCategoryId = ''
        const yearMonth = ''

        const response = await accountInOutService.getAccountInOutListByPageComprehensive({
          page,
          limit,
          accountBookId,
          type,
          accountInOutCategoryId,
          yearMonth
        })
        const {data} = response.data
        const list = data.list

        if (list.length) {
          this.listAccountInOut = this.isRefreshing ? list : this.listAccountInOut.concat(list);
          this.last_id = list[list.length - 1].id;
          this.isRefreshing = false;
          this.page++
        } else {
          this.loadStatus = 'nomore'
        }

        uni.stopPullDownRefresh();
      } catch (e) {
        console.error('accountInOutService.getAccountInOutListByPageComprehensive-error:', e)
        uni.stopPullDownRefresh();
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
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
  padding: rpx(40);
  min-height: 100%;
  overflow: auto;

  > .box-head {
    //padding-top: 50px;
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

      //&:first-of-type {
      //  padding-top: rpx(10);
      //}

      ::v-deep .u-index-anchor {
        background-color: #f8f8f8;
        padding: 10px 0;
      }

      .box-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $cus-sub-title-color;
        font-size: 18px;

        text {
          color: $cus-title-color;
          font-weight: bold;
        }

        .box-right {
          display: flex;
          font-size: 14px;

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
        margin-bottom: rpx(20);

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
                //padding-top: 4px;
                padding-left: 4px;
              }

              .remark {
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

          &:last-child {
            .box-content {
              border-bottom: none;
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
              display: flex;

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
