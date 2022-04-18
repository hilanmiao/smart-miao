const internals = {}

internals.response = (response) => {
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
