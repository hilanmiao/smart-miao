import store from '@/store'
import {httpClient as http} from '../services'

const internals = {}

internals.login = data => {
    return http
        .post('api/login-by-username-password', data)
        .then(response => {
            const {data: responseData} = response.data
            // 设置授权
            store.dispatch('setAuth', responseData)
            // const { accessToken, refreshToken } = responseData
            // 记住账号密码
            uni.$u.vuex('vuex_login', data)
            // // 设置授权
            // uni.$luchRequest.config.header.Authorization = accessToken
            // uni.$u.vuex('vuex_accessToken', accessToken);
            // uni.$u.vuex('vuex_refreshToken', refreshToken);
            return response
        })
        .catch(error => {
            console.error('authService.login-error:\n', error)
            throw error
        })
}

internals.getUserInfo = (data) => {
    return http
        .get('api/system/user/basic', data)
        .then(response => {
            const {data: responseData} = response.data
            // 设置登录的用户信息
            store.dispatch('setUserInfo', responseData)
            // uni.$u.vuex('vuex_user', data);
            return response
        })
        .catch(error => {
            console.error('authService.getUserInfo:-error:\n', error)
            throw error
        })
}

internals.logout = () => {
    // 使用refreshToken
    store.dispatch('useRefreshToken')
    // uni.$luchRequest.config.header.Authorization = store.state.vuex_refreshToken
    return http
        .put('api/logout')
        .then(response => {
            // 清除授权
            store.dispatch('clearAuth')
            // uni.$u.vuex('vuex_user', '');
            // uni.$u.vuex('vuex_accessToken', '');
            // uni.$u.vuex('vuex_refreshToken', '');
            // uni.$luchRequest.config.header.Authorization = ''
            return response.data
        })
        .catch(error => {
            console.error('authService.logout-error:\n', error)
            throw error
        })
}

export default internals
