import store from '../store'

import {httpClient as http} from '../services'

const internals = {}

internals.register = credentials => {
    return http
        .post('/sys/user/add', credentials)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error('authService.register-error:\n', error)
            throw error
        })
}

internals.login = credentials => {
    return http
        .post('sys/user/login', credentials)
        .then(response => {
            const { data } = response.data
            const { accessJwt: authentication } = data
            this.$luchRequest.config.header.Authorization = authentication
            uni.$u.vuex('vuex_token', authentication);
            return response
        })
        .catch(error => {
            console.error('authService.login-error:\n', error)
            throw error
        })
}

internals.logout = () => {
    return http
        .delete('Api/Member/LoginOut')
        .then(response => {
            store.dispatch('auth/clearAuth')
        })
        .catch(error => {
            console.error('authService.logout-error:\n', error)
            throw error
        })
}

internals.getUserInfo = (data) => {
    return http
        .post('/sys/user/getList', data)
        .then(response => {
            const { data } = response.data
            let user
            if(data.records && data.records.length) {
                user = data.records[0]
            }
            uni.$u.vuex('vuex_user', user);
            return response
        })
        .catch(error => {
            console.error('authService.logout-error:\n', error)
            throw error
        })
}

internals.changePass = credentials => {
    return http
        .post('/sys/user/change/password', credentials)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error('authService.ChangePass-error:\n', error)
            throw error
        })
}

internals.loginOut = () => {
    return http
        .get('Api/Member/LoginOut')
        .then(response => {
            uni.$u.vuex('vuex_user', '');
            uni.$u.vuex('vuex_token', '');
            this.$luchRequest.config.header.Authorization = ''
            return response.data
        })
        .catch(error => {
            console.error('authService.logout-error:\n', error)
            throw error
        })
}

internals.changeInfo = data => {
    return http
        .post('sys/user/update', data)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error('authService.ChangeInfo-error:\n', error)
            throw error
        })
}

internals.getRoleList = (data) => {
    return http
        .post('/sys/role/getList', data)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error('authService.logout-error:\n', error)
            throw error
        })
}

export default internals
