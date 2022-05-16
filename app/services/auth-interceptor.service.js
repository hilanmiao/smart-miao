import { camelizeKeys } from '@/utils'

const internals = {}

internals.response = (response) => {
  // 递归下划线转驼峰
  // TODO：因为我的后台返回的是带下划线的字段，转换为驼峰方便前端，但是如果全大写的字段会变成全小写，
  //  如车辆识别码VIN-vin，所以前后端命名基本没有大写的字段，有一定的局限性，可以把统一转换为驼峰这一行注释掉，让每个具体的业务逻辑自行处理
  response.data = camelizeKeys(response.data)
  console.log('正常请求', response)

  const { code } = response.data
  // if(response.data.code == 1002 || response.data.code === 1001) {
  //   uni.$u.vuex('vuex_accessToken', '')
  //   uni.$u.route({url: 'pages/login/index', type: 'reLaunch'})
  //   return Promise.reject(response)
  // }
  if(code !== 200) {
    if (code === 20104) {
      // accessToken 过期，允许尝试一次 refreshToken，交由 http-client 处理
      response = 'EXPIRED_ACCESS_TOKEN'
    } else if (code === 20105 || code === 20109) {
      // 如果 accessToken 是无效的，或者 refreshToken 已过期，强制用户登录
      uni.$u.vuex('vuex_accessToken', '')
      uni.$u.vuex('vuex_refreshToken', '')
      uni.$u.route({url: 'pages/login/index', type: 'reLaunch'})
    } else if (code === 20105) {
      console.debug('检验失败，这个用户的session可能已经被删除')
      // Message.error('用户已被下线')
      uni.$u.vuex('vuex_accessToken', '')
      uni.$u.vuex('vuex_refreshToken', '')
      uni.$u.route({url: 'pages/login/index', type: 'reLaunch'})
    } else if (code === 20110) {
      console.debug('检验失败，这个用户的session可能已经被删除')
      // Message.error('用户会话可能已经被删除')
      uni.$u.vuex('vuex_accessToken', '')
      uni.$u.vuex('vuex_refreshToken', '')
      uni.$u.route({url: 'pages/login/index', type: 'reLaunch'})
    } else if (code === 20111) {
      console.debug('校验失败，这个用户可能已经被删除')
      // Message.error('用户可能已经被删除')
      uni.$u.vuex('vuex_accessToken', '')
      uni.$u.vuex('vuex_refreshToken', '')
      uni.$u.route({url: 'pages/login/index', type: 'reLaunch'})
    } else if (code === 20112) {
      console.debug('检验失败，用户密码可能已经被修改了（另一台电脑）')
      // Message.error('用户密码可能已经被修改')
      uni.$u.vuex('vuex_accessToken', '')
      uni.$u.vuex('vuex_refreshToken', '')
      uni.$u.route({url: 'pages/login/index', type: 'reLaunch'})
    }
    return Promise.reject(response)
  }
  return response
}

internals.responseError =  (error) => {
  console.log('异常请求', error)
  const response = error
  return Promise.reject(response)
}

export default {
  response: internals.response,
  responseError: internals.responseError
}
