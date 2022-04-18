<template>
  <view class="wrap">
    <u-navbar back-text="设置"
              back-icon-color="#fff"
              :border-bottom="false"
              :back-text-style="{ color: '#fff'}"
              :background="{ background: '#DC4232' }">
    </u-navbar>
    <view>
      <u-cell-group class="u-cell-group" :border="false">
        <u-cell-item title="头像" @click="showActionsAvatar=true">
          <view slot="right-icon" @click.stop="previewImage">
            <u-avatar :src="avatar" size="96" bg-color="#fafafa"></u-avatar>
          </view>
        </u-cell-item>
      </u-cell-group>
    </view>
    <view class="u-m-t-20">
      <u-cell-group class="u-cell-group">
        <u-cell-item title="昵称" :value="vuex_user.userName" @click="openPage('/pages/me/nickname')">
        </u-cell-item>
        <u-cell-item title="性别" :value="vuex_user.userName" @click="openPage('/pages/me/sex')">
        </u-cell-item>
        <u-cell-item title="个人简介" :value="vuex_user.userName" @click="openPage('/pages/me/introduction')">
        </u-cell-item>
      </u-cell-group>
    </view>

    <u-action-sheet :list="listActionsAvatar" v-model="showActionsAvatar" @click="handleActionAvatar"></u-action-sheet>
    <u-action-sheet :list="listActionsAvatarChooseImage" v-model="showActionsAvatarChooseImage" @click="handleActionAvatarChooseImage"></u-action-sheet>

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
      avatar: '/static/app/common/logo.png',
      listActionsAvatar: [
        {
          text: '拍照/上传头像'
        },
        {
          text: '恢复默认头像'
        }
      ],
      listActionsAvatarChooseImage: [
        {
          text: '拍摄'
        },
        {
          text: '从手机相册选择'
        }
      ],
      showActionsAvatar: false,
      showActionsAvatarChooseImage: false,
    }
  },
  computed: {},
  onBackPress(e) {
    console.log('onBacePress')
    this.openPage()
    return true
  },
  onShow() {
    this.onAvatarCropper()
  },
  methods: {
    openPage(url = '/pages/me/index', type = 'tab', params) {
      this.$u.route({
        url,
        type,
        params
      })
    },
    previewImage() {
      const urls = ['/static/app/common/logo.png']
      uni.previewImage({
        urls
      })
    },
    onAvatarCropper() {
      // 监听从裁剪页发布的事件，获得裁剪结果
      uni.$on('uAvatarCropper', path => {
        this.avatar = path;
        // 可以在此上传到服务端
        uni.uploadFile({
          url: 'http://www.example.com/upload',
          filePath: path,
          name: 'file',
          complete: (res) => {
            console.log(res);
          }
        });
      })
    },
    handleActionAvatar(index) {
      this.showActionsAvatar = false
      this.showActionsAvatarChooseImage = true
    },
    handleActionAvatarChooseImage(index) {
      this.showActionsAvatarChooseImage = false
      console.log(index)
      if(index === 0) {
        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            this.src = res.tempFilePaths[0];

          }
        });
      } else {
        this.$u.route({
          url: 'plugin/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
          // 内部已设置以下默认参数值，可不传这些参数
          params: {
            // 输出图片宽度，高等于宽，单位px
            destWidth: 300,
            // 裁剪框宽度，高等于宽，单位px
            rectWidth: 200,
            // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
            fileType: 'jpg',
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 0;
}

</style>
