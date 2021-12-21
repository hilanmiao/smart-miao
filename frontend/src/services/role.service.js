import { httpClient as http } from '@/services/index'
const internals = {}
const apiUrl = 'api/system/role/'

internals.getRole = (params) => {
  return http.get(apiUrl, params)
}

internals.getRoleList = (params) => {
  return http.get(apiUrl + 'list', params)
}

internals.getRoleListByPage = (params) => {
  return http.get(apiUrl + 'page', params)
}

internals.createRole = (data) => {
  return http.post(apiUrl, data)
}

internals.updateRole = (data) => {
  return http.put(apiUrl, data)
}

internals.deleteRole = (data) => {
  return http.delete(apiUrl, data)
}

export default internals
