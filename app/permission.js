import store from '@/store';

export default function verifyPermission() {
  const hasToken = store.state.vuex_accessToken
  if (!hasToken) {
    // redirectTo 关闭当前页面并跳转到登录页
    this.$u.route({type: 'reLaunch', url: '/pages/login/index'})
    return false
  }
}
