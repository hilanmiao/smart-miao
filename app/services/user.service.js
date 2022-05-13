import {httpClient as http} from '../services'

const internals = {}

const apiUrl = 'api/system/user/'

internals.updateCurrentUserProfile = (data) => {
  return http.put(apiUrl + 'profile', data)
}

export default internals
