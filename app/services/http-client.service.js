const internals = {}

internals.get = function (url, params, options) {
  let config = {
    method: 'GET',
    url: url,
    params: params
  }
  config = Object.assign(config, options)
  return this.$luchRequest.middleware(config)
    .then(function (response) {
      if (response.header['x-access-token']) {
        internals.updateTokens(response.headers)
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
  return this.$luchRequest.middleware(config)
    .then(function (response) {
      if (response.header['x-access-token']) {
        internals.updateTokens(response.headers)
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
  return this.$luchRequest.middleware(config)
    .then(function (response) {
      if (response.header['x-access-token']) {
        internals.updateTokens(response.headers)
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
  return this.$luchRequest.middleware(config)
    .then(function (response) {
      if (response.header['x-access-token']) {
        internals.updateTokens(response.headers)
      }
      return response
    })
    .catch(function (error) {
      throw error
    })
}

internals.updateTokens = function (headers) {
  const tokens = {
    accessToken: headers['x-access-token'],
    refreshToken: headers['x-refresh-token']
  }
  store.dispatch('auth/updateTokens', tokens)
}

export default internals
