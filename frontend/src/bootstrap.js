import router, { constantRoutes } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getAccessToken, getRefreshToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import qs from 'querystring'
import { authService, authInterceptor, notificationService } from '@/services'
import axios from 'axios'

// 打印项目信息
console.log('%c更多内容请访问：https://gitee.com/XiaoLanMiao/smart-miao', 'color: red;')
// Ascii字符画 http://patorjk.com/software/taag/
console.log(`
 ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌
▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░▌
▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     ▐░▌
▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░▌
▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀      ▐░▌     ▐░▌
▐░▌       ▐░▌▐░▌          ▐░▌     ▐░▌       ▐░▌     ▐░▌
▐░▌       ▐░▌▐░▌          ▐░▌      ▐░▌  ▄▄▄▄█░█▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄
▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
 ▀         ▀  ▀            ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀
`)

// NProgress Configuration
NProgress.configure({ showSpinner: false })

// 配置axios
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.paramsSerializer = function(params) { return qs.stringify(params) }
axios.interceptors.response.use(authInterceptor.response, authInterceptor.responseError)
axios.defaults.headers.common.Authorization = store.state.auth.accessToken

// no redirect whitelist
const whiteList = ['/login']
// 通过全局路由守卫实现权限控制、用户信息获取、加载进度
router.beforeEach(async(to, from, next) => {
  // 设置路由跳转loading（正常情况下基本看不到，但刷新页面等行为会明显看到）
  await store.dispatch('router/setLoading', true)

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getAccessToken() || getRefreshToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
      // 设置路由跳转loading
      await store.dispatch('router/setLoading', false)
    } else {
      // 判断是否有权限路由
      const hasRoutes = store.getters.myRoutes &&
          (store.getters.myRoutes.length > constantRoutes.length)

      if (hasRoutes) {
        // pass
        next()
        // 设置路由跳转loading
        await store.dispatch('router/setLoading', false)
      } else {
        try {
          // 同步我的消息通知
          await notificationService.syncNotification()
          // 获取未读消息统计
          await store.dispatch('notification/countMyUnreadNotification')

          // 获取我的基本信息
          let user = {}
          await authService.getUserInfo()
            .then(response => {
              const { data } = response.data
              user = data
            })
            .catch(error => {
              throw error.data.message
            })
          await store.dispatch('auth/setUserInfo', user)

          // TODO: 获取我的操作权限
          // 获取我的菜单权限
          let myPowerMenus = []
          await authService.getMyPowerMenus()
            .then(response => {
              const { data } = response.data
              myPowerMenus = data
            })
            .catch(error => {
              throw error.data.message
            })
          await store.dispatch('auth/setMyPowerMenus', myPowerMenus)
          // 生成可访问的路由
          const accessRoutes = await store.dispatch('router/generateRoutes', myPowerMenus)
          // 动态添加可访问的路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
          // 设置路由跳转loading
          await store.dispatch('router/setLoading', false)
        } catch (error) {
          // remove token
          await store.dispatch('auth/clearAuth')
          Message.error(`${error}` || '发生了一些未知的错误，请重试！')

          // go to login page to re-login
          next(`/login?redirect=${to.path}`)
          NProgress.done()
          // 设置路由跳转loading
          await store.dispatch('router/setLoading', false)
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      // 设置路由跳转loading
      await store.dispatch('router/setLoading', false)
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
      // 设置路由跳转loading
      await store.dispatch('router/setLoading', false)
    }
  }
})
router.afterEach(async() => {
  // finish progress bar
  NProgress.done()
  // 设置路由跳转loading
  await store.dispatch('router/setLoading', false)
})
