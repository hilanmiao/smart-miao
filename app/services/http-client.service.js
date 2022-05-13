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
      throw error
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
      throw error
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
        throw error
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
      throw error
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
            throw error
        })
}

internals.download = function (url, options) {
    let config = {
        method: 'DOWNLOAD',
        url: url
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
            throw error
        })
}

internals.updateTokens = function (headers) {
    const accessToken = headers['x-access-token']
    const refreshToken = headers['x-refresh-token']

    // 设置授权
    uni.$luchRequest.config.header.Authorization = accessToken
    uni.$u.vuex('vuex_accessToken', accessToken);
    uni.$u.vuex('vuex_refreshToken', refreshToken);
}

export default internals
