import { httpClient as http } from '@/services'
const internals = {}
const apiUrl = 'api/account-book/'

internals.getAccountBook = (params) => {
  return http.get(apiUrl, params)
}

internals.getAccountBookList = (params) => {
  return http.get(apiUrl + 'list', params)
}

internals.getAccountBookListByPage = (params) => {
  return http.get(apiUrl + 'page', params)
}

internals.createAccountBook = (data) => {
  return http.post(apiUrl, data)
}

internals.updateAccountBook = (data) => {
  return http.put(apiUrl, data)
}

internals.deleteAccountBook = (data) => {
  return http.delete(apiUrl, data)
}

internals.setAccountBookIsDefault = (data) => {
  return http.put(apiUrl + 'set-is-default', data)
}

internals.statisticsCurrentMonthComprehensive = (params) => {
  return http.get(apiUrl + 'statistics-current-month-comprehensive', params)
}

internals.statisticsCurrentMonthCategoryRank = (params) => {
  return http.get(apiUrl + 'statistics-current-month-category-rank', params)
}

export default internals
