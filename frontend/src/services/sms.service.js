import { httpClient as http } from '../services'

const internals = {}

internals.postSendLoginSmsCode = (payload) => {
  return http.post('api/sms/sendLoginSmsCode', payload)
}

export default internals
