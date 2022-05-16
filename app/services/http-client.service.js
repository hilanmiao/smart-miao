import store from '@/store'

const internals = {}

internals.get = function (url, params, options) {
  let config = {
    method: 'GET',
    url: url,
    params: params
  }
  config = Object.assign(config, options)
  return uni.$luchRequest.middleware(config)
    .then(function (response) {
      if (response.header['x-access-token']) {
        internals.updateTokens(response.header)
      }
      return response
    })
    .catch(function (error) {
        if (error === 'EXPIRED_ACCESS_TOKEN') {
            // 使用refreshToken
            store.dispatch('useRefreshToken')
            // uni.$luchRequest.config.header.Authorization = store.state.vuex_refreshToken
            return internals.get(url, params, options)
        } else {
            throw error
        }
    })
}

internals.post = function (url, payload, options) {
    let config = {
        method: 'POST',
        url: url,
        data: payload
    }
    config = Object.assign(config, options)
    return uni.$luchRequest.middleware(config)
        .then(function (response) {
            if (response.header['x-access-token']) {
                internals.updateTokens(response.header)
            }
            return response
        })
        .catch(function (error) {
            if (error === 'EXPIRED_ACCESS_TOKEN') {
                // 使用refreshToken
                store.dispatch('useRefreshToken')
                // uni.$luchRequest.config.header.Authorization = store.state.vuex_refreshToken
                return internals.post(url, data, options)
            } else {
                throw error
            }
        })
}

internals.put = function (url, payload, options) {
  let config = {
    method: 'PUT',
    url: url,
    data: payload
  }
  config = Object.assign(config, options)
  return uni.$luchRequest.middleware(config)
    .then(function (response) {
      if (response.header['x-access-token']) {
        internals.updateTokens(response.header)
      }
      return response
    })
    .catch(function (error) {
        if (error === 'EXPIRED_ACCESS_TOKEN') {
            // 使用refreshToken
            store.dispatch('useRefreshToken')
            // uni.$luchRequest.config.header.Authorization = store.state.vuex_refreshToken
            return internals.put(url, data, options)
        } else {
            throw error
        }
    })
}

internals.delete = function (url, payload, options) {
  let config = {
    method: 'DELETE',
    url: url,
    data: payload
  }
  config = Object.assign(config, options)
  return uni.$luchRequest.middleware(config)
    .then(function (response) {
      if (response.header['x-access-token']) {
        internals.updateTokens(response.header)
      }
      return response
    })
    .catch(function (error) {
        if (error === 'EXPIRED_ACCESS_TOKEN') {
            // 使用refreshToken
            store.dispatch('useRefreshToken')
            // uni.$luchRequest.config.header.Authorization = store.state.vuex_refreshToken
            return internals.delete(url, data, options)
        } else {
            throw error
        }
    })
}

internals.upload = function (url, options) {
    let config = {
        method: 'UPLOAD',
        url: url
    }
    config = Object.assign(config, options)
    return uni.$luchRequest.middleware(config)
        .then(function (response) {
            // todo: 没有像post 一样返回header
            // if (response.header['x-access-token']) {
            //     internals.updateTokens(response.headers)
            // }
            return response
        })
        .catch(function (error) {
            if (error === 'EXPIRED_ACCESS_TOKEN') {
                // 使用refreshToken
                store.dispatch('useRefreshToken')
                // uni.$luchRequest.config.header.Authorization = store.state.vuex_refreshToken
                return internals.delete(url, data, options)
            } else {
                throw error
            }
        })
}

// internals.download = function (url, options) {
//     let config = {
//         method: 'DOWNLOAD',
//         url: url
//     }
//     config = Object.assign(config, options)
//     return uni.$luchRequest.middleware(config)
//         .then(function (response) {
//             if (response.header['x-access-token']) {
//                 internals.updateTokens(response.header)
//             }
//             return response
//         })
//         .catch(function (error) {
//             if (error === 'EXPIRED_ACCESS_TOKEN') {
//                 // 使用refreshToken
//                 uni.$luchRequest.config.header.Authorization = store.state.vuex_refreshToken
//                 return internals.delete(url, data, options)
//             } else {
//                 throw error
//             }
//         })
// }

internals.updateTokens = function (headers) {
    const tokens = {
        accessToken: headers['x-access-token'],
        refreshToken: headers['x-refresh-token']
    }
    // 更新tokens
    store.dispatch('updateTokens', tokens)

    // const accessToken = headers['x-access-token']
    // const refreshToken = headers['x-refresh-token']

    // 设置授权
    // uni.$luchRequest.config.header.Authorization = accessToken
    // uni.$u.vuex('vuex_accessToken', accessToken);
    // uni.$u.vuex('vuex_refreshToken', refreshToken);
}

export default internals
