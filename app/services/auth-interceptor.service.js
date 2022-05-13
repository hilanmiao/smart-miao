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
