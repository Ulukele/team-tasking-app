const API_BASE_URL = "http://localhost:8081/api/user/"

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

    }
}