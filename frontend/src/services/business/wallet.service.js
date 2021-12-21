import { httpClient as http } from '@/services'
const internals = {}
const apiUrl = 'api/wallet/'

internals.getWallet = (params) => {
  return http.get(apiUrl, params)
}

internals.getWalletList = (params) => {
  return http.get(apiUrl + 'list', params)
}

internals.getWalletListByPage = (params) => {
  return http.get(apiUrl + 'page', params)
}

internals.createWallet = (data) => {
  return http.post(apiUrl, data)
}

internals.updateWallet = (data) => {
  return http.put(apiUrl, data)
}

internals.deleteWallet = (data) => {
  return http.delete(apiUrl, data)
}

internals.getWalletListByPageMine = (params) => {
  return http.get(apiUrl + 'page-mine', params)
}

export default internals
