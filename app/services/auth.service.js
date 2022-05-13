import {httpClient as http} from '../services'

const internals = {}

internals.login = data => {
    return http
        .post('api/login-by-username-password', data)
        .then(response => {
            const { data: responseData } = response.data
            const { accessToken, refreshToken } = responseData
            // 记住账号密码
            uni.$u.vuex('vuex_login', data)
            // 设置授权
            uni.$luchRequest.config.header.Authorization = accessToken
            uni.$u.vuex('vuex_accessToken', accessToken);
            uni.$u.vuex('vuex_refreshToken', refreshToken);
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
            const { data } = response.data
            // 设置登录的用户信息
            uni.$u.vuex('vuex_user', data);
            return response
        })
        .catch(error => {
            console.error('authService.getUserInfo:-error:\n', error)
            throw error
        })
}

internals.logout = () => {
    return http
        .put('api/logout')
        .then(response => {
            // 清除授权
            uni.$u.vuex('vuex_user', '');
            uni.$u.vuex('vuex_accessToken', '');
            uni.$u.vuex('vuex_refreshToken', '');
            uni.$luchRequest.config.header.Authorization = ''
            return response.data
        })
        .catch(error => {
            console.error('authService.logout-error:\n', error)
            throw error
        })
}

export default internals
