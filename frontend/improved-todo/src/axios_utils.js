const API_BASE_URL = "http://localhost:8080/api/user/"
const API_C_BASE_URL = "http://localhost:8081/api/" // will be 1 backend, change soon

import axios from 'axios'

export const axios_utils = {
    signIn(userName, password) {
        return axios({
            method: 'post',
            url: API_BASE_URL + 'sign-in/',
            data: {
                username: userName,
                password: password
            }
        })
    },

    signUp(userName, password) {
        return axios({
            method: 'post',
            url: API_BASE_URL + 'sign-up/',
            data: {
                username: userName,
                password: password
            }
        })
    },

    signOut() {

    },

    getUser(userName, sessionID) {
        return axios.get(API_C_BASE_URL + 'user/' + userName + '/',)
    },

    getTeams(username) {
        return axios.get(API_C_BASE_URL + 'team/' + userName + '/',)
    }
}
