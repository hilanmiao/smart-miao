<template>
  <view class="wrap">
    <!-- #ifdef MP-WEIXIN -->
    <image class="image-bg" src="@/static/app/login-background.png"/>
    <!-- #endif -->
    <view class="content u-relative">
      <!-- #ifdef MP-WEIXIN -->
<!--      <image class="image-bg" src="@/static/app/login-form-bg.png"/>-->
      <!-- #endif -->
<!--      <u-image class="u-image" mode="scaleToFill" height="200" width="210" src="@/static/app/login-logo.png"></u-image>-->
      <view class="box-title">
        <u-image class="u-image" mode="scaleToFill" height="200" width="200" src="@/static/app/common/logo.png"></u-image>
        <text class="title">招财猫</text>
        <text class="subtitle">您的私人理财专家</text>
      </view>
      <u-form class="u-form" :model="form" ref="uForm" :errorType="errorType">
        <u-form-item prop="userCode" :border-bottom="false">
          <view class="u-flex u-flex-1" style="width: 100%">
            <u-icon class="u-icon-left u-p-l-20 u-p-r-20" size="34" name="shouji" custom-prefix="custom-icon"></u-icon>
            <u-input class="u-flex-1" v-model="form.userCode" type="text" placeholder="请输入账号"/>
          </view>
        </u-form-item>
        <u-form-item prop="userPassword" :border-bottom="false">
          <view class="u-flex u-flex-1">
            <u-icon class="u-icon-left u-p-l-20 u-p-r-20" size="34" name="mima" custom-prefix="custom-icon"></u-icon>
            <u-input class="u-flex-1" v-model="form.userPassword" type="password" placeholder="请输入密码"/>
          </view>
        </u-form-item>
      </u-form>
      <view class="box-button">
        <u-button @click="submit" :hair-line="false" shape="circle" :custom-style="customStyleBtn" :loading="loading">登录</u-button>
        <u-button @click="submit" :hair-line="false" shape="circle" :custom-style="customStyleBtn2" :loading="loading">注册</u-button>
        <view class="alternative">
          <view @click="openPage('/pages/login/forget')">
              <u-checkbox-group>
                <u-checkbox v-model="checkedProtocal" shape="circle">
                  <text>同意协议</text>
                </u-checkbox>
              </u-checkbox-group>
          </view>
          <view @click="openPage('/pages/login/forget')">忘记密码？</view>
        </view>
        <view>
          <view class="box-divider">
            <u-divider >其他登录方式</u-divider>
          </view>
          <view class="box-others">
            <view class="item">
              <view class="box-icon">
                <u-icon class="" size="40" name="weixin" custom-prefix="custom-icon"></u-icon>
              </view>
              <text>微信登录</text>
            </view>
            <view class="item">
              <view class="box-icon">
                <u-icon class="" size="40" name="weixin" custom-prefix="custom-icon"></u-icon>
              </view>
              <text>微信登录</text>
            </view>
            <view class="item">
              <view class="box-icon">
                <u-icon class="" size="40" name="weixin" custom-prefix="custom-icon"></u-icon>
              </view>
              <text>微信登录</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex';
import { authService, configService } from '../../services'

export default {
  data() {
    return {
      customStyleBtn: {
        color: '#f11313',
        backgroundColor: '#fff',
        border: 'none'
      },
      customStyleBtn2: {
        color: '#fff',
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        marginTop: '14px'
      },
      form: {
        userCode: '1111',
        userPassword: '2'
      },
      rules: {
        userCode: [
          {
            required: true,
            message: '请输入账号',
            trigger: ['change', 'blur'],
          },
          // {
          //   validator: (rule, value, callback) => {
          //     // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
          //     return this.$u.test.mobile(value);
          //   },
          //   message: '手机号码不正确',
          //   // 触发器可以同时用blur和change，二者之间用英文逗号隔开
          //   trigger: ['change', 'blur'],
          // }
        ],
        userPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['change', 'blur'],
          },
          // {
          //   // 正则不能含有两边的引号
          //   pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
          //   message: '需同时含有字母和数字，长度在6-12之间',
          //   trigger: ['change', 'blur'],
          // }
        ]
      },
      errorType: ['toast'],
      loading: false,
      checkedProtocal: true
    }
  },
  computed: {
    ...mapState(['vuex_login'])
  },
  onLoad() {
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
    this.form.userCode = this.vuex_login.userCode
    this.form.userPassword = this.vuex_login.userPassword
  },
  methods: {
    openPage(path, type='to') {
      this.$u.route({
        type,
        url: path
      })
    },
    submit() {
      if(!this.checkedProtocal) {
        this.$tip.toast('请勾选服务协议')
        return
      }
      this.$refs.uForm.validate(valid => {
        if (valid) {
          this.$tip.loading('')
          authService.login(this.form)
              .then(response => {
                // 记住账号密码
                this.$u.vuex('vuex_login', this.form)
                this.$tip.loaded()
                authService.getUserInfo({ page:1, size:1, userCode: this.form.userCode})
                    .then(userInfo => {
                      this.openPage('/pages/news/index', 'tab')
                    })
                    .catch(e => {
                      this.$tip.loaded()
                      const errorMessage = e && e.data.message || '出错了，请重试'
                      this.$tip.error(errorMessage)
                    })
              })
              .catch(e => {
                this.$tip.loaded()
                const errorMessage = e && e.data.message || '出错了，请重试'
                this.$tip.error(errorMessage)
              })
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: rpx(24);
  height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  /* #ifndef MP-WEIXIN */
  background-image: url(~@/static/app/login-background.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  /* #endif */

  .content {
    width: 100%;
    padding: rpx(40);
    /* #ifndef MP-WEIXIN */
    //background-image: url(~@/static/app/login-form-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    /* #endif */

    .u-image {
      //position: absolute;
      //top: 0%;
      //left: 50%;
      //transform: translate(-50%, -50%);
    }

    .box-title {
      display: flex;
      justify-content: center;
      margin-bottom: rpx(72);
      flex-direction: column;
      align-items: center;

      .title {
        font-weight: 500;
        font-size: rpx(48);
        color: #fff;
      }
      .subtitle {
        color: #fff;
      }
    }

    .u-form {
      ::v-deep .u-form-item {
        //color: #ffffff;
        background: #fff;
        border-radius: 99px;
        padding: rpx(6) 0;
        margin-bottom: 20px;
      }

      ::v-deep .u-input__right-icon {
        margin-right: 14px;
      }
      //::v-deep .u-input__input {
      //  color: #ffffff;
      //}
      //
      //::v-deep .u-border-bottom:after {
      //  opacity: .3;
      //}
    }

    .box-button {
      padding-top: 20px;
    }

    .alternative {
      color: #fff;
      display: flex;
      justify-content: space-between;
      padding: rpx(20) rpx(20) 0 rpx(20);
      text {
        color: #fff;
      }
      ::v-deep .u-checkbox__icon-wrap {
        border-color: #fff !important;
        background-color: transparent !important;
      }
    }

    .box-divider {
      padding: rpx(40) 0;
      ::v-deep .u-divider {
        background-color: transparent !important;
        .u-divider-text {
          color: #fff !important;
        }
      }
    }
    .box-others {
      display: flex;
      align-items: center;
      justify-content: center;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 rpx(20);
        .box-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          border-radius: 100%;
          color: #1BB723;
          width: rpx(80);
          height: rpx(80);
        }
        text {
          color: #fff;
          padding-top: rpx(20);
        }
      }
    }
  }
}
</style>
