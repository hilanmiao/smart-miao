<template>
  <view class="wrap">
<!--    <u-navbar class="u-navbar"-->
<!--              back-text="智能提醒"-->
<!--              :is-back="true"-->
<!--              :border-bottom="true"-->
<!--              :background="{ background: '#fff' }">-->
<!--      <view class="navbar-right" slot="right">-->
<!--        <view class="right-item">-->
<!--          <text class="u-font-28">添加</text>-->
<!--        </view>-->
<!--      </view>-->
<!--    </u-navbar>-->
    <view class="u-search-box">
      <u-search placeholder="搜索"></u-search>
    </view>
    <view class="u-menu-wrap">
      <scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
                   :scroll-into-view="itemId">
        <view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']"
              @tap.stop="swichMenu(index)">
          <text class="u-line-1">{{item.name}}</text>
        </view>
      </scroll-view>
      <scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box" @scroll="rightScroll">
        <view class="page-view">
          <view class="class-item" :id="'item' + index" v-for="(item , index) in tabbar" :key="index">
            <view class="item-title">
              <text>{{item.name}}</text>
            </view>
            <view class="item-container">
              <view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
                <view class="left">
                  <view class="item-name">{{item1.name}}</view>
                  <view>
                    {{ item1.no }}
                  </view>
                  <view>
                    {{ item1.date }}
                  </view>
                </view>
                <view class="right">
                  <view class="box-icon">
                    <u-icon size="40" name="edit" custom-prefix="custom-icon"></u-icon>
                    <u-icon size="40" name="delete" custom-prefix="custom-icon"></u-icon>
                  </view>
                  <u-button shape="circle" size="mini" :custom-style="customStyleBtn">下载</u-button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <u-back-top :scroll-top="scrollTop"></u-back-top>
    <u-no-network></u-no-network>
    <tabbar></tabbar>
  </view>
</template>

<script>
const classifyData = [
  {
    "name": "身份证",
    "foods": [
      {
        "name": "张国栋",
        "key": "A字裙",
        "icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
        "cat": 10,
        no: '370784199206224510',
        date: '2022-12-12 ~ 2022-12-12'
      }
    ]
  },
  {
    "name": "户口本",
    "foods": [
      {
        "name": "A字裙",
        "key": "A字裙",
        "icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
        "cat": 10
      }
    ]
  },
  {
    "name": "驾驶证",
    "foods": [
      {
        "name": "A字裙",
        "key": "A字裙",
        "icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
        "cat": 10
      }
    ]
  },
  {
    "name": "行驶证",
    "foods": [
      {
        "name": "A字裙",
        "key": "A字裙",
        "icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
        "cat": 10
      }
    ]
  },
  {
    "name": "结婚证",
    "foods": [
      {
        "name": "A字裙",
        "key": "A字裙",
        "icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
        "cat": 10
      }
    ]
  },
  {
    "name": "产权证",
    "foods": [
      {
        "name": "A字裙",
        "key": "A字裙",
        "icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
        "cat": 10
      }
    ]
  },
  {
    "name": "出生证",
    "foods": [
      {
        "name": "A字裙",
        "key": "A字裙",
        "icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
        "cat": 10
      }
    ]
  },
  {
    "name": "营业执照",
    "foods": [
      {
        "name": "A字裙",
        "key": "A字裙",
        "icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
        "cat": 10
      }
    ]
  },
]
import tabbar from "../../components/tabbar/tabbar";

export default {
  components: {
    tabbar
  },
  data() {
    return {
      customStyleBtn: {
        color: '#ffffff',
        backgroundColor: '#DC4232',
        border: 'none'
      },
      scrollTop: 0, //tab标题的滚动条位置
      oldScrollTop: 0,
      current: 0, // 预设当前项的值
      menuHeight: 0, // 左边菜单的高度
      menuItemHeight: 0, // 左边菜单item的高度
      itemId: '', // 栏目右边scroll-view用于滚动的id
      tabbar: classifyData,
      menuItemPos: [],
      arr: [],
      scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
      timer: null, // 定时器
    }
  },
  computed: {
  },
  onLoad() {

  },
  onReady() {
    this.getMenuItemTop()
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  methods: {
// 点击左边的栏目切换
    async swichMenu(index) {
      if(this.arr.length == 0) {
        await this.getMenuItemTop();
      }
      if (index == this.current) return;
      this.scrollRightTop = this.oldScrollTop;
      this.$nextTick(function(){
        this.scrollRightTop = this.arr[index];
        this.current = index;
        this.leftMenuStatus(index);
      })
    },
    // 获取一个目标元素的高度
    getElRect(elClass, dataVal) {
      new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery().in(this);
        query.select('.' + elClass).fields({
          size: true
        }, res => {
          // 如果节点尚未生成，res值为null，循环调用执行
          if (!res) {
            setTimeout(() => {
              this.getElRect(elClass);
            }, 10);
            return;
          }
          this[dataVal] = res.height;
          resolve();
        }).exec();
      })
    },
    // 观测元素相交状态
    async observer() {
      this.tabbar.map((val, index) => {
        let observer = uni.createIntersectionObserver(this);
        // 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
        // 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
        observer.relativeTo('.right-box', {
          top: 0
        }).observe('#item' + index, res => {
          if (res.intersectionRatio > 0) {
            let id = res.id.substring(4);
            this.leftMenuStatus(id);
          }
        })
      })
    },
    // 设置左边菜单的滚动状态
    async leftMenuStatus(index) {
      this.current = index;
      // 如果为0，意味着尚未初始化
      if (this.menuHeight == 0 || this.menuItemHeight == 0) {
        await this.getElRect('menu-scroll-view', 'menuHeight');
        await this.getElRect('u-tab-item', 'menuItemHeight');
      }
      // 将菜单活动item垂直居中
      this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
    },
    // 获取右边菜单每个item到顶部的距离
    getMenuItemTop() {
      new Promise(resolve => {
        let selectorQuery = uni.createSelectorQuery();
        selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
          // 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
          if(!rects.length) {
            setTimeout(() => {
              this.getMenuItemTop();
            }, 10);
            return ;
          }
          rects.forEach((rect) => {
            // 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
            this.arr.push(rect.top - rects[0].top);
            resolve();
          })
        }).exec()
      })
    },
    // 右边菜单滚动
    async rightScroll(e) {
      this.oldScrollTop = e.detail.scrollTop;
      if(this.arr.length == 0) {
        await this.getMenuItemTop();
      }
      if(this.timer) return ;
      if(!this.menuHeight) {
        await this.getElRect('menu-scroll-view', 'menuHeight');
      }
      setTimeout(() => { // 节流
        this.timer = null;
        // scrollHeight为右边菜单垂直中点位置
        let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
        for (let i = 0; i < this.arr.length; i++) {
          let height1 = this.arr[i];
          let height2 = this.arr[i + 1];
          // 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
          if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
            this.leftMenuStatus(i);
            return ;
          }
        }
      }, 10)
    }
  }
}
</script>

<style>
page {
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
.wrap {
  padding: 0;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
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
}

.u-search-box {
  padding: 18rpx 30rpx;
}

.u-menu-wrap {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.u-search-inner {
  background-color: rgb(234, 234, 234);
  border-radius: 100rpx;
  display: flex;
  align-items: center;
  padding: 10rpx 16rpx;
}

.u-search-text {
  font-size: 26rpx;
  color: $u-tips-color;
  margin-left: 10rpx;
}

.u-tab-view {
  width: 200rpx;
  height: 100%;
}

.u-tab-item {
  height: 110rpx;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  color: #444;
  font-weight: 400;
  line-height: 1;
}

.u-tab-item-active {
  position: relative;
  color: #000;
  font-size: 30rpx;
  font-weight: 600;
  background: #fff;
}

.u-tab-item-active::before {
  content: "";
  position: absolute;
  border-left: 4px solid $u-type-primary;
  height: 32rpx;
  left: 0;
  top: 39rpx;
}

.u-tab-view {
  height: 100%;
}

.right-box {
  background-color: rgb(250, 250, 250);
}

.page-view {
  padding: 16rpx;
}

.class-item {
  margin-bottom: 30rpx;
  background-color: #fff;
  padding: 16rpx;
  border-radius: 8rpx;
}

.class-item:last-child {
  min-height: 100vh;
}

.item-title {
  font-size: 26rpx;
  color: $u-main-color;
  font-weight: bold;
}

.item-container {
  display: flex;
  flex-wrap: wrap;

  .thumb-box {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: rpx(20);
    border: 1px solid $cus-divide-color;
    border-radius: rpx(16);
    padding: rpx(16) rpx(20);
    box-shadow: 0 0 rpx(20) 0 rgba(4, 0, 0, 0.08);

    .left {
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      color: $cus-sub-title-color;
      .item-name {
        font-weight: bold;
        font-size: rpx(30);
        color: $cus-title-color;
      }
    }
    .right {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding-left: 14px;
      border-left: 1px dashed $cus-divide-color;
      .box-icon {
        .u-icon {
          &:last-child {
            margin-left: rpx(12);
          }
        }
      }
    }
  }
}



</style>
