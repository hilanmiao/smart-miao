import { httpClient as http } from '@/services'
const internals = {}
const apiUrl = 'api/system/menu/'

internals.getMenuAndParentMenu = (params) => {
  return http.get(apiUrl + 'menu-and-parent-menu', params)
}

internals.getMenuList = (params) => {
  return http.get(apiUrl + 'list', params)
}

internals.createMenu = (data) => {
  return http.post(apiUrl, data)
}

internals.updateMenu = (data) => {
  return http.put(apiUrl, data)
}

internals.deleteMenu = (data) => {
  return http.delete(apiUrl, data)
}

export default internals
