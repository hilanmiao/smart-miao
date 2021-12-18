<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <onlineUsers class="right-menu-item hover-effect badge-container" />

      <template v-if="device!=='mobile'">
        <!-- 全屏按钮控件 -->
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>

      <notification class="right-menu-item hover-effect" :unread-count="unreadNotifications" />

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="user.avatar" :src="VUE_APP_BASE_API + user.avatar" class="user-avatar">
          <img v-else src="@/assets/images/logo.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/profile">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OnlineUsers from '@/components/OnlineUsers'
import Notification from '@/components/Notification'
import Screenfull from '@/components/Screenfull'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { authService } from '@/services'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    Notification,
    OnlineUsers
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user',
      'device',
      'unreadNotifications'
    ])
  },
  created() {
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      authService.logout()
        .then(response => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        })
        .catch(e => {
          console.error('MainHeader.logout-error:', e)
          const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
          this.$message.error(errorMessage)

          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .badge-container {
      padding-right: 20px;
    }

    .avatar-container {
      margin-left: 10px;
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
