import { httpClient as http } from '@/services/index'
const internals = {}
const apiUrl = 'api/system/server/'

internals.getServerStatus = (params) => {
  return http.get(apiUrl, params)
}

export default internals
