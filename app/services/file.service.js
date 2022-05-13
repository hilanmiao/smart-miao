import {httpClient as http} from '../services'

const internals = {}

internals.uploadAvatar = (options) => {
  return http.upload('api/uploadAvatar', options)
}

export default internals
