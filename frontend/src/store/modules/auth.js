import { getAccessToken, setAccessToken, removeAccessToken,
  getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import axios from 'axios'

const state = {
  user: {},
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
  myPowerMenus: [], // 我的菜单权限（未使用，同 store 中的 addedRoutes）
  myPowerOperations: [] // 我的操作权限
}

const mutations = {
  RESET_STATE: state => {
    state.user = {}
    state.accessToken = ''
    state.refreshToken = ''
    state.myPowerMenus = []
    state.myPowerOperations = []
    removeAccessToken()
    removeRefreshToken()
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ACCESS_TOKEN: (state, token) => {
    state.accessToken = token
  },
  SET_REFRESH_TOKEN: (state, token) => {
    state.refreshToken = token
  },
  SET_MY_POWER_MENUS: (state, myPowerMenus) => {
    state.myPowerMenus = myPowerMenus
  },
  SET_MY_POWER_OPERATIONS: (state, myPowerOperations) => {
    state.myPowerOperations = myPowerOperations
  }
}

const actions = {
  // // 管理员退出
  // logout({ commit, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     logout()
  //       .then(() => {
  //         // 清除localstorage存储的token
  //         removeToken()
  //
  //         // 清除store存储的routes
  //         dispatch('router/resetRoutes', null, { root: true })
  //
  //         // reset visited views and cached views
  //         // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //         dispatch('tagsView/delAllViews', null, { root: true })
  //
  //         // clean vue-router
  //         resetRouter()
  //         commit('RESET_STATE')
  //         resolve()
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // },

  // 更新tokens
  updateTokens({ commit }, { accessToken, refreshToken }) {
    axios.defaults.headers.common.Authorization = accessToken
    commit('SET_ACCESS_TOKEN', accessToken)
    commit('SET_REFRESH_TOKEN', refreshToken)
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)

    console.debug('Tokens 已更新')
  },

  // 使用refreshToken
  useRefreshToken({ state }) {
    axios.defaults.headers.common.Authorization = state.refreshToken
    console.debug('使用refreshToken')
  },

  // 设置授权
  setAuth({ commit, dispatch }, data) {
    dispatch('updateTokens', data)
  },

  // 清除授权
  clearAuth({ commit, dispatch }) {
    axios.defaults.headers.common.Authorization = undefined
    commit('RESET_STATE')

    // 断开socket连接
    dispatch('socket/closeSocket', null, { root: true })
    // 清除store存储的routes
    dispatch('router/resetRoutes', null, { root: true })
    // 重置快捷导航
    dispatch('tagsView/delAllViews', null, { root: true })
    // 重置路由映射 https://github.com/pekonchan/Blog/issues/20
    resetRouter()
  },

  // 设置登录的用户信息
  setUserInfo({ commit, dispatch }, data) {
    commit('SET_USER', data)
    console.debug('设置登录的用户信息')

    // 初始化socket
    dispatch('socket/initSocket', data, { root: true })
  },

  // 设置我的菜单权限
  setMyPowerMenus({ commit, dispatch }, data) {
    commit('SET_MY_POWER_MENUS', data)

    console.debug('设置我的菜单权限')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
